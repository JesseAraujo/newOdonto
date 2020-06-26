const express = require("express")
const server = express()

//exportar db
const db = require("./database/db")

//pasta publica
server.use(express.static("public"))

//habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true }))


//template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true,
})


//rotas da páginas
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


//-------------------------------------------------------
//
server.post("/Agendamento", (req, res) => {

    const subject = 'Agendamento de Avaliação'

    //inserir dados no banco de dados
    const query = `
         INSERT INTO schedules (
            name,
            cpf,
            email,
            phone,
            date,
            month,
            hour,
            subject
         ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ? );    
     `

    const values = [
        req.body.name,
        req.body.cpf,
        req.body.email,
        req.body.phone,
        req.body.day,
        req.body.month,
        req.body.hour,
        subject
    ]

    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no cadastro!")
            //return res.render("create-point.html", { err: true })
        }
        console.log('Cadastrado com sucesso')
        console.log(this)

        return res.render(__dirname + "/views/index.html")
    }

    db.run(query, values, afterInsertData)
})

//-------------------------------------------------------
//
server.get("/MeusAgendamentos", (req, res) => {

    db.all(`SELECT * FROM schedules`, function (err, rows) {
        if (err) {
            return console.log(err)
        }

        const total = rows.length

        

        return res.render(__dirname + "/views/meuAgendamento.html", { schedules: rows, total })
    })

})

server.get("/MeusAgendamentos/:id", (req, res) => {
    const  id  = req.params.id

    db.all(`SELECT * FROM schedules WHERE id =?`,[id], function (err, rows) {
        if (err) {
            return console.log(err)
        }

        const total = rows.length
        console.log(id)

        return res.render(__dirname + "/views/meuAgendamento.html", { schedules: rows, id: id })
    })

})

//-------------------------------------------------------
//
server.get("/MeuAgendamento/:id", function (req, res) {
    const  id  = req.params.id

    db.run("DELETE FROM schedules WHERE id =?",[id], function(err) {
        if (err){
             return res.send("Erro no banco de dados!")
         }
         //return res.redirect("/search")
         return res.render(__dirname + "/views/index.html")
    })

})

//iniciando servidor
server.listen(3000)