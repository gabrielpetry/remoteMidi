"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemSchema = void 0;
exports.itemSchema = {
    name: 'items',
    schema: {
        title: 'Item schema',
        description: 'describes a simple item',
        version: 0,
        type: 'object',
        properties: {
            key: {
                type: 'string',
                primary: true,
            },
            value: {
                type: 'any',
            },
        },
    },
};
//# sourceMappingURL=itemSchema.js.map