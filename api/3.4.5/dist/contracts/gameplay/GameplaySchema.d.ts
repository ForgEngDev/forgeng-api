export declare const GAMEPLAY_MANIFEST_JSON_SCHEMA: Readonly<{
    readonly $schema: 'https://json-schema.org/draft/2020-12/schema';
    readonly $id: 'https://forgeng.dev/schema/gameplay/manifest-1.0.0.json';
    readonly title: 'ForgeNG Gameplay Manifest';
    readonly type: 'object';
    readonly additionalProperties: false;
    readonly required: readonly [
        "manifestVersion",
        "contractVersion",
        "id",
        "version",
        "initialScene",
        "scenes"
    ];
    readonly properties: {
        readonly manifestVersion: {
            readonly const: 1;
        };
        readonly contractVersion: {
            readonly const: '1.0.0';
        };
        readonly id: {
            readonly $ref: '#/$defs/id';
        };
        readonly version: {
            readonly type: 'integer';
            readonly minimum: 1;
        };
        readonly initialScene: {
            readonly $ref: '#/$defs/id';
        };
        readonly randomSeed: {
            readonly type: 'integer';
            readonly minimum: 0;
            readonly maximum: 4294967295;
        };
        readonly metadata: {
            readonly type: 'object';
        };
        readonly components: {
            readonly type: 'array';
            readonly items: {
                readonly $ref: '#/$defs/component';
            };
        };
        readonly prefabs: {
            readonly type: 'array';
            readonly items: {
                readonly $ref: '#/$defs/prefab';
            };
        };
        readonly systems: {
            readonly type: 'array';
            readonly items: {
                readonly $ref: '#/$defs/system';
            };
        };
        readonly events: {
            readonly type: 'array';
            readonly items: {
                readonly $ref: '#/$defs/versionedId';
            };
        };
        readonly commands: {
            readonly type: 'array';
            readonly items: {
                readonly $ref: '#/$defs/versionedId';
            };
        };
        readonly actionMaps: {
            readonly type: 'array';
            readonly items: {
                readonly $ref: '#/$defs/actionMap';
            };
        };
        readonly scenes: {
            readonly type: 'array';
            readonly items: {
                readonly $ref: '#/$defs/scene';
            };
        };
    };
    readonly $defs: {
        readonly id: {
            readonly type: 'string';
            readonly pattern: '^[a-z0-9]+(?:[.-][a-z0-9]+)+:[a-z0-9]+(?:[._/-][a-z0-9]+)*$';
            readonly maxLength: 160;
        };
        readonly versionedId: {
            readonly type: 'object';
            readonly additionalProperties: false;
            readonly required: readonly [
                "id",
                "version"
            ];
            readonly properties: {
                readonly id: {
                    readonly $ref: '#/$defs/id';
                };
                readonly version: {
                    readonly type: 'integer';
                    readonly minimum: 1;
                };
            };
        };
        readonly component: {
            readonly type: 'object';
            readonly additionalProperties: false;
            readonly required: readonly [
                "id",
                "version",
                "schema",
                "default",
                "serializable"
            ];
            readonly properties: {
                readonly id: {
                    readonly $ref: '#/$defs/id';
                };
                readonly version: {
                    readonly type: 'integer';
                    readonly minimum: 1;
                };
                readonly schema: {
                    readonly type: 'object';
                };
                readonly default: {};
                readonly serializable: {
                    readonly type: 'boolean';
                };
            };
        };
        readonly initializer: {
            readonly type: 'object';
            readonly additionalProperties: false;
            readonly required: readonly [
                "component",
                "value"
            ];
            readonly properties: {
                readonly component: {
                    readonly $ref: '#/$defs/id';
                };
                readonly value: {};
            };
        };
        readonly prefab: {
            readonly type: 'object';
            readonly additionalProperties: false;
            readonly required: readonly [
                "id",
                "version",
                "components",
                "children",
                "assets",
                "capabilities",
                "entityCapabilities",
                "tags",
                "groups",
                "pool"
            ];
            readonly properties: {
                readonly id: {
                    readonly $ref: '#/$defs/id';
                };
                readonly version: {
                    readonly type: 'integer';
                    readonly minimum: 1;
                };
                readonly variantOf: {
                    readonly anyOf: readonly [
                        {
                            readonly $ref: '#/$defs/id';
                        },
                        {
                            readonly type: 'null';
                        }
                    ];
                };
                readonly components: {
                    readonly type: 'array';
                    readonly items: {
                        readonly $ref: '#/$defs/initializer';
                    };
                };
                readonly children: {
                    readonly type: 'array';
                    readonly items: {
                        readonly type: 'object';
                    };
                };
                readonly assets: {
                    readonly type: 'array';
                    readonly items: {
                        readonly type: 'object';
                    };
                };
                readonly capabilities: {
                    readonly type: 'array';
                    readonly items: {
                        readonly $ref: '#/$defs/id';
                    };
                };
                readonly entityCapabilities: {
                    readonly type: 'array';
                    readonly items: {
                        readonly $ref: '#/$defs/id';
                    };
                };
                readonly tags: {
                    readonly type: 'array';
                    readonly items: {
                        readonly type: 'string';
                    };
                    readonly maxItems: 64;
                };
                readonly groups: {
                    readonly type: 'array';
                    readonly items: {
                        readonly type: 'string';
                    };
                    readonly maxItems: 32;
                };
                readonly pool: {
                    readonly anyOf: readonly [
                        {
                            readonly type: 'null';
                        },
                        {
                            readonly type: 'object';
                            readonly additionalProperties: false;
                            readonly required: readonly [
                                "maxRetained"
                            ];
                            readonly properties: {
                                readonly maxRetained: {
                                    readonly type: 'integer';
                                    readonly minimum: 0;
                                    readonly maximum: 100000;
                                };
                            };
                        }
                    ];
                };
                readonly metadata: {
                    readonly type: 'object';
                };
            };
        };
        readonly system: {
            readonly type: 'object';
            readonly additionalProperties: false;
            readonly required: readonly [
                "id",
                "version",
                "phase",
                "before",
                "after",
                "reads",
                "writes",
                "failurePolicy"
            ];
            readonly properties: {
                readonly id: {
                    readonly $ref: '#/$defs/id';
                };
                readonly version: {
                    readonly type: 'integer';
                    readonly minimum: 1;
                };
                readonly phase: {
                    readonly enum: readonly [
                        "fixed-simulation",
                        "post-simulation-sync",
                        "frame",
                        "render-sync"
                    ];
                };
                readonly before: {
                    readonly type: 'array';
                    readonly items: {
                        readonly $ref: '#/$defs/id';
                    };
                };
                readonly after: {
                    readonly type: 'array';
                    readonly items: {
                        readonly $ref: '#/$defs/id';
                    };
                };
                readonly reads: {
                    readonly type: 'array';
                    readonly items: {
                        readonly $ref: '#/$defs/id';
                    };
                };
                readonly writes: {
                    readonly type: 'array';
                    readonly items: {
                        readonly $ref: '#/$defs/id';
                    };
                };
                readonly failurePolicy: {
                    readonly enum: readonly [
                        "fail-scene",
                        "disable-system"
                    ];
                };
            };
        };
        readonly actionMap: {
            readonly type: 'object';
            readonly additionalProperties: false;
            readonly required: readonly [
                "id",
                "actions"
            ];
            readonly properties: {
                readonly id: {
                    readonly $ref: '#/$defs/id';
                };
                readonly actions: {
                    readonly type: 'object';
                };
                readonly metadata: {
                    readonly type: 'object';
                };
            };
        };
        readonly scene: {
            readonly type: 'object';
            readonly additionalProperties: false;
            readonly required: readonly [
                "id",
                "version",
                "assets",
                "input",
                "capabilities",
                "components",
                "prefabs",
                "systems",
                "events",
                "commands",
                "entities"
            ];
            readonly properties: {
                readonly id: {
                    readonly $ref: '#/$defs/id';
                };
                readonly version: {
                    readonly type: 'integer';
                    readonly minimum: 1;
                };
                readonly assets: {
                    readonly type: 'object';
                };
                readonly input: {
                    readonly type: 'object';
                };
                readonly capabilities: {
                    readonly type: 'object';
                };
                readonly components: {
                    readonly type: 'array';
                    readonly items: {
                        readonly $ref: '#/$defs/id';
                    };
                };
                readonly prefabs: {
                    readonly type: 'array';
                    readonly items: {
                        readonly $ref: '#/$defs/id';
                    };
                };
                readonly systems: {
                    readonly type: 'array';
                    readonly items: {
                        readonly $ref: '#/$defs/id';
                    };
                };
                readonly events: {
                    readonly type: 'array';
                    readonly items: {
                        readonly $ref: '#/$defs/id';
                    };
                };
                readonly commands: {
                    readonly type: 'array';
                    readonly items: {
                        readonly $ref: '#/$defs/id';
                    };
                };
                readonly entities: {
                    readonly type: 'array';
                    readonly items: {
                        readonly type: 'object';
                    };
                };
                readonly metadata: {
                    readonly type: 'object';
                };
            };
        };
    };
}>;
