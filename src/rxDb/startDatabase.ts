import { createRxDatabase, addRxPlugin } from 'rxdb'
import { itemSchema } from './models/itemSchema'
import { createDataMigrator } from 'rxdb/dist/types/plugins/migration/data-migrator'
addRxPlugin(require('pouchdb-adapter-memory'))

let _thisDatabase = null
let collections = []

collections.push(itemSchema)

async function startDatabase(name: string, adapter: string) {
  const db = await createRxDatabase({
    name,
    adapter,
  })

  await db.collection({
    name: collections[0].name,
    schema: collections[0].schema,
  })

  return db
}

export async function getDatabase(name: string = 'main', adapter: string = 'memory') {
  if (!_thisDatabase) {
    // const dbSuffix = new Date().getTime()
    name = name + new Date().getTime()
    _thisDatabase = startDatabase(name, adapter)
  }

  return _thisDatabase
}
