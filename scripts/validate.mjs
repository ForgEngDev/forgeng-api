import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
function walk(dir) { return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => e.name === '.git' ? [] : e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]); }
for (const file of walk('.')) {
  const normalized = file.replaceAll('\\', '/');
  if (/\.(?:map|wasm|wgsl|zip|tgz|tsbuildinfo)$/.test(normalized) || (/\.(?:js|ts)$/.test(normalized) && !normalized.endsWith('.d.ts'))) throw new Error(`Implementation artifact forbidden: ${file}`);
  if (normalized.endsWith('.mjs') && !normalized.startsWith('scripts/')) throw new Error(`Executable outside maintenance scripts: ${file}`);
}
for (const file of walk('api')) {
  if (!file.endsWith('.json') && !file.endsWith('.d.ts')) throw new Error(`Unexpected API file: ${file}`);
  if (file.endsWith('.json')) JSON.parse(fs.readFileSync(file, 'utf8'));
}
for (const version of fs.readdirSync('api')) {
  const root = path.join('api', version);
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf8'));
  for (const [file, hash] of Object.entries(manifest.files)) {
    const text = fs.readFileSync(path.join(root, file), 'utf8');
    if (crypto.createHash('sha256').update(text).digest('hex') !== hash) throw new Error(`Hash mismatch: ${file}`);
    for (const [, ref] of text.matchAll(/(?:from\s*|import\s*\(\s*|import\s+)["']([^"']+)["']/g)) {
      if (manifest.publicEntries[ref] || manifest.externalTypeDependencies.includes(ref)) continue;
      const base = path.posix.normalize(path.posix.join(path.posix.dirname(file), ref));
      if (![base, `${base}.d.ts`, `${base}/index.d.ts`, base.replace(/\.js$/, '.d.ts')].some(p => manifest.files[p])) throw new Error(`Broken import: ${file} -> ${ref}`);
    }
  }
  const actual = walk(root).filter(f => f.endsWith('.d.ts')).length;
  if (actual !== Object.keys(manifest.files).length) throw new Error('Unlisted declaration files');
  console.log(`${version}: ${actual} declarations, ${Object.keys(manifest.publicEntries).length} entries; hashes and imports valid.`);
}
JSON.parse(fs.readFileSync('templates.json', 'utf8'));
console.log('Validation passed. No engine runtime or source maps in API snapshots.');
