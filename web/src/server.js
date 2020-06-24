const express = require("express")
const server = express()


//pasta publica
server.use(express.static("public"))


//template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true,
})


//rotas
server.get("/", (req, res) => {
    return res.render(__dirname + "/views/index.html")
})

server.get("/Clinica", (req, res) => {
    return res.render(__dirname + "/views/clinica.html")
})

server.get("/Dentistas", (req, res) => {
    return res.render(__dirname + "/views/dentistas.html")
})

server.get("/Contato", (req, res) => {
    return res.render(__dirname + "/views/contato.html")
})


//iniciando servidor
server.listen(3000)