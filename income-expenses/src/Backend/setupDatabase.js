import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export async function setupDatabase() {
    const dbPath = path.join(__dirname, 'database.db')
    const db = await open({
        filename: dbPath,
        driver: sqlite3.Database
    })

    try {
        console.log('🚀 Creating your custom database...\n')

        // TODO: Define your tables here
        // Tables customized for your localStorage functions:

        // Push table (for income/additions)
        await db.exec(`
            CREATE TABLE IF NOT EXISTS push (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                amount REAL NOT NULL,
                date TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `)

        // Expense table  
        await db.exec(`
            CREATE TABLE IF NOT EXISTS expense (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                amount REAL NOT NULL,
                date TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `)

        // Optional: Categories table (uncomment if you want categories)
        /*
        await db.exec(`
            CREATE TABLE IF NOT EXISTS categories (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL UNIQUE,
                type TEXT NOT NULL CHECK(type IN ('push', 'expense')),
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `)
        */

        console.log('✅ Push table created')
        console.log('✅ Expense table created')
        console.log('✅ Database setup complete!')

        // Show the created tables
        const tables = await db.all("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'")
        console.log('\n📊 Your tables:', tables.map(t => t.name).join(', '))

    } catch (error) {
        console.error('❌ Error setting up database:', error)
    } finally {
        await db.close()
    }
}

// Run the setup
setupDatabase() 