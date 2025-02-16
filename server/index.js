import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.js'
import noteRouter from './routes/note.js';
import connectToMongoDb from './db/db.js';

const app = express(); // instance of the Express appln
// app will define the routes, middleware and start the server
 
app.use(cors())
app.use(express.json()) // json request will go to api calls
app.use('/api/auth', authRouter)
app.use('/api/note', noteRouter)

app.listen(5000, () => {
    connectToMongoDb();
    console.log("Server is running")
})