const http = require('http')
const app = require('./app')

//setting the port
const port = process.env.PORT || 3000

//creating the server 
const server = http.createServer(app)

//starting the server on port
server.listen(port, (err) => {
    if (err)
        console.log("Error!")
    else
        console.log("Server starting...")
})