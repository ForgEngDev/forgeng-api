export declare const ASSET_MANIFEST_JSON_SCHEMA: Readonly<{
    readonly $schema: 'https://json-schema.org/draft/2020-12/schema';
    readonly $id: 'https://forgeng.dev/schema/assets/manifest-1.0.0.json';
    readonly title: 'ForgeNG Asset Manifest';
    readonly description: 'Provider-neutral ForgeNG asset catalog input.';
    readonly type: 'object';
    readonly additionalProperties: false;
    readonly required: readonly [
        "version",
        "namespace",
        "assets"
    ];
    readonly properties: {
        readonly version: {
            readonly const: 1;
        };
        readonly namespace: {
            readonly type: 'string';
            readonly pattern: '^[a-z0-9]+(?:[.-][a-z0-9]+)+$';
            readonly maxLength: 128;
        };
        readonly assets: {
            readonly type: 'object';
            readonly maxProperties: 10000;
            readonly propertyNames: {
                readonly pattern: '^[a-z0-9]+(?:[._/-][a-z0-9]+)*$';
            };
            readonly additionalProperties: {
                readonly $ref: '#/$defs/asset';
            };
        };
        readonly groups: {
            readonly type: 'object';
            readonly maxProperties: 1000;
            readonly propertyNames: {
                readonly pattern: '^[a-z0-9]+(?:[._/-][a-z0-9]+)*$';
            };
            readonly additionalProperties: {
                readonly type: 'array';
                readonly uniqueItems: true;
                readonly items: {
                    readonly $ref: '#/$defs/referenceId';
                };
            };
        };
        readonly metadata: {
            readonly $ref: '#/$defs/jsonObject';
        };
    };
    readonly $defs: {
        readonly localId: {
            readonly type: 'string';
            readonly pattern: '^[a-z0-9]+(?:[._/-][a-z0-9]+)*$';
        };
        readonly canonicalId: {
            readonly type: 'string';
            readonly pattern: '^[a-z0-9]+(?:[.-][a-z0-9]+)+:[a-z0-9]+(?:[._/-][a-z0-9]+)*$';
        };
        readonly referenceId: {
            readonly oneOf: readonly [
                {
                    readonly $ref: '#/$defs/localId';
                },
                {
                    readonly $ref: '#/$defs/canonicalId';
                }
            ];
        };
        readonly kind: {
            readonly type: 'string';
            readonly pattern: '^[a-z0-9]+(?:[._-][a-z0-9]+)*(?:/[a-z0-9]+(?:[._-][a-z0-9]+)*)+$';
            readonly maxLength: 128;
        };
        readonly jsonValue: {
            readonly oneOf: readonly [
                {
                    readonly type: 'null';
                },
                {
                    readonly type: 'boolean';
                },
                {
                    readonly type: 'number';
                },
                {
                    readonly type: 'string';
                },
                {
                    readonly type: 'array';
                    readonly items: {
                        readonly $ref: '#/$defs/jsonValue';
                    };
                },
                {
                    readonly $ref: '#/$defs/jsonObject';
                }
            ];
        };
        readonly jsonObject: {
            readonly type: 'object';
            readonly additionalProperties: {
                readonly $ref: '#/$defs/jsonValue';
            };
        };
        readonly source: {
            readonly type: 'object';
            readonly additionalProperties: false;
            readonly required: readonly [
                "uri"
            ];
            readonly properties: {
                readonly uri: {
                    readonly type: 'string';
                    readonly minLength: 1;
                    readonly maxLength: 2048;
                    readonly pattern: '^[^\\\\\\u0000-\\u001f]+$';
                };
                readonly contentType: {
                    readonly type: 'string';
                    readonly pattern: '^[a-z0-9!#$&^_.+-]+/[a-z0-9!#$&^_.+-]+$';
                };
                readonly integrity: {
                    readonly type: 'string';
                    readonly pattern: '^(?:sha256|sha384|sha512)-[A-Za-z0-9+/=_-]+$';
                };
                readonly expectedBytes: {
                    readonly type: 'integer';
                    readonly minimum: 0;
                    readonly maximum: 536870912;
                };
                readonly metadata: {
                    readonly $ref: '#/$defs/jsonObject';
                };
            };
        };
        readonly policy: {
            readonly type: 'object';
            readonly additionalProperties: false;
            readonly properties: {
                readonly cache: {
                    readonly enum: readonly [
                        "release-when-unused",
                        "retain",
                        "pinned"
                    ];
                };
                readonly preload: {
                    readonly enum: readonly [
                        "none",
                        "boot"
                    ];
                };
                readonly priority: {
                    readonly type: 'integer';
                    readonly minimum: -1000;
                    readonly maximum: 1000;
                };
            };
        };
        readonly asset: {
            readonly type: 'object';
            readonly additionalProperties: false;
            readonly required: readonly [
                "kind",
                "source"
            ];
            readonly properties: {
                readonly kind: {
                    readonly $ref: '#/$defs/kind';
                };
                readonly source: {
                    readonly $ref: '#/$defs/source';
                };
                readonly dependencies: {
                    readonly type: 'array';
                    readonly maxItems: 128;
                    readonly uniqueItems: true;
                    readonly items: {
                        readonly $ref: '#/$defs/referenceId';
                    };
                };
                readonly tags: {
                    readonly type: 'array';
                    readonly uniqueItems: true;
                    readonly items: {
                        readonly type: 'string';
                        readonly pattern: '^[a-z0-9]+(?:[._/-][a-z0-9]+)*$';
                    };
                };
                readonly label: {
                    readonly type: 'string';
                    readonly minLength: 1;
                    readonly maxLength: 2048;
                };
                readonly options: {
                    readonly $ref: '#/$defs/jsonObject';
                };
                readonly policy: {
                    readonly $ref: '#/$defs/policy';
                };
                readonly metadata: {
                    readonly $ref: '#/$defs/jsonObject';
                };
            };
        };
    };
}>;
