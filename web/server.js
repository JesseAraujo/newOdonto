const express = require("express")
const server = express()

//exportar db
const db = require("./src/database/db")

//pasta publica
server.use(express.static("public"))

//habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true }))

server.set("view engine", "njk")

//template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true,
    autoescape: false,
})


//rotas da páginas
server.get("/", (req, res) => {
    return res.render("home")
})

server.get("/Clinica", (req, res) => {
    return res.render("clinica")
})

server.get("/Dentistas", (req, res) => {
    return res.render("dentistas")
})

server.get("/Contato", (req, res) => {
    return res.render("contato")
})

server.get("/BuscarAgendamento", (req, res) => {
    return res.render("buscarMeuAgendamento")
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

        return res.render("home", { saved: true })
    }

    db.run(query, values, afterInsertData)
})

//-------------------------------------------------------
//
server.get("/MeusAgendamentos", (req, res) => {
    const id = req.params.id

    db.all(`SELECT * FROM schedules`, function (err, rows) {
        if (err) {
            return console.log(err)
        }

        const total = rows.length
        console.log(id)

        return res.render("meuAgendamento", { schedules: rows, total, id: id })
    })

})

//-------------------------------------------------------
//Buscar
server.get("/search", (req, res) => {
    const search = req.query.search

    if (search == "") {
        return res.render("meuAgendamento", { total: 0 })
    }

    //pegar dados do bd
    db.all(`SELECT * FROM schedules WHERE cpf = '${search}'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }

        const total = rows.length

        //console.log(total)
        //mostrar página com dados do bd
        return res.render("meuAgendamento", { schedules: rows, total: total })

    })
})

//-------------------------------------------------------
//deletar
server.get("/MeusAgendamentos/:id", function (req, res) {
    const id = req.params.id

    db.run("DELETE FROM schedules WHERE id =?", [id], function (err) {
        if (err) {
            return res.send("Erro no banco de dados!")
        }
        //return res.redirect("/search")
        return res.render("home", { cancel: true })
    })

})

//iniciando servidor
server.listen(3000)