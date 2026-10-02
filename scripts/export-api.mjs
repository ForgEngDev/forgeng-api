import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

// Run only against a built SDK. Copy declaration dependencies, never implementation.
const source = path.resolve(process.argv[2] || '');
if (!process.argv[2]) throw new Error('Usage: node scripts/export-api.mjs <built-engine-directory>');
const pkg = JSON.parse(fs.readFileSync(path.join(source, 'package.json'), 'utf8'));
const root = path.resolve('api', pkg.version);
if (fs.existsSync(path.join(root, 'manifest.json')) && !process.argv.includes('--refresh')) throw new Error('Snapshot already exists; pass --refresh to regenerate and review the diff.');
const entries = Object.fromEntries(Object.entries(pkg.exports).filter(([, v]) => v?.types).map(([key, v]) => [key === '.' ? 'forgeng' : `forgeng/${key.slice(2)}`, v.types.replace(/^\.\//, '')]));
const visited = new Set();
const externals = new Set();
function copy(relative) {
  if (visited.has(relative)) return;
  if (!relative.startsWith('dist/') || !relative.endsWith('.d.ts') || relative.includes('private-symbols')) throw new Error(`Outside public declaration boundary: ${relative}`);
  const input = fs.readFileSync(path.join(source, relative), 'utf8').replace(/^.*\/\/# sourceMappingURL=.*$/gm, '')
    .replaceAll("'../core/ForgeCoreConfigurationSurface'", "'forgeng'")
    .replaceAll("'@forgeng/contracts/network'", "'forgeng/contracts/network'")
    .replaceAll("'@forgeng/gameplay-core/network'", "'forgeng/network'");
  visited.add(relative);
  const destination = path.join(root, relative);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, input);
  const references = [...input.matchAll(/(?:from\s*|import\s*\(\s*|import\s+)["']([^"']+)["']/g)].map(m => m[1]);
  for (const ref of references) {
    if (entries[ref]) { copy(entries[ref]); continue; }
    if (!ref.startsWith('.')) { externals.add(ref); continue; }
    const base = path.posix.normalize(path.posix.join(path.posix.dirname(relative), ref));
    const candidates = [base, `${base}.d.ts`, `${base}/index.d.ts`, base.replace(/\.js$/, '.d.ts')];
    const resolved = candidates.find(p => p.endsWith('.d.ts') && fs.existsSync(path.join(source, p)));
    if (!resolved) throw new Error(`Unresolved declaration: ${relative} -> ${ref}`);
    copy(resolved);
  }
}
for (const relative of Object.values(entries)) copy(relative);
const files = Object.fromEntries([...visited].sort().map(file => [file, crypto.createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex')]));
fs.writeFileSync(path.join(root, 'manifest.json'), JSON.stringify({ schemaVersion: 1, engineVersion: pkg.version, status: 'built-sdk-snapshot', runtimeIncluded: false, publicEntries: entries, externalTypeDependencies: [...externals].sort(), files }, null, 2) + '\n');
console.log(`Exported ${Object.keys(entries).length} public entries and ${visited.size} declaration files for ${pkg.version}.`);
