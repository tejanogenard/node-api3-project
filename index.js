const server = require("./server.js")

const port = 6000

server.listen(port, () => {
    console.log(`\n== Server is Running on http://localhost:${port} ==\\n`)
})