import express from 'express'

const app = express(); // instance of the Express appln
// app will define the routes, middleware and start the server

app.listen(5000, () => {
    console.log("Server is running")
})