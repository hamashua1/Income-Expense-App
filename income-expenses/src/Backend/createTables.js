import sqlite3 from 'sqlite3'
import {open} from 'sqlite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export async function createTables(){

const dbPath = path.join(__dirname, 'database.db') //path to the database file
const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
})

await db.exec(`
    CREATE TABLE IF NOT EXISTS income (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        amount REAL NOT NULL,
        date TEXT NOT NULL
    )
`)
await db.close()
console.log('Tables created successfully')

}


createTables()
