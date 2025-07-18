import express from 'express'
import cors from 'cors'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = 8000

app.use(cors())
app.use(express.json())

// Database connection
async function getDatabase() {
    const dbPath = path.join(__dirname, 'database.db')
    return await open({
        filename: dbPath,
        driver: sqlite3.Database
    })
}

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'Income-Expense App API Server',
        status: 'running',
        endpoints: {
            'POST /api/push': 'Add new income/expense entry',
            'GET /api/expense': 'Get all entries',
            'DELETE /api/expense/:id': 'Delete specific entry'
        }
    })
})



//API endpoint to push user inputs to the database
app.post('/api/push', async(req,res) => {
try {
    const {title, amount, type, date} = req.body
    const db = await getDatabase()
    const result = await db.run('INSERT INTO push(title, amount, type, date) VALUES (?,?,?,?)', [title, amount, type, date])
    await db.close()
    res.status(201).json({
      success:true,
      message: 'income successfully added',
      data: {
        id : result.lastID,
        title,
        amount,
        type,
        date
     }
    })
} catch (error) {
    res.status(500).json({success: false, message: 'Failed to add income', error: error.message})
}
})



//API endpoint to retrieve user data from database 
app.get('/api/expense', async(req,res)=>{
try{
const db = await getDatabase()
const data = await db.all('SELECT * FROM push')
await db.close()
 res.json(data)

}catch (error){
    res.status(404).json({success:false, message:'failed to fetch data', error: error.message})
}

})


//API endpoint to delete user data from database
app.delete('/api/expense/:id', async(req,res)=>{
try{
    const {id} = req.params
    const db = await getDatabase()
    await db.run('DELETE FROM push WHERE id = ?', [id])
    await db.close()
    res.json({
        success:true, 
        message:'data deleted successfully'})
}catch (error){
    res.status(404).json({success:false, message:'failed to delete data', error: error.message})
}
})


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})

















