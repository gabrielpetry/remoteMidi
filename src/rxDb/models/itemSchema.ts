export const itemSchema = {
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
}
