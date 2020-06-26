const sqlite3 = require("sqlite3").verbose()

const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

//db.serialize(() => {
    //criar tabela
    //db.run(`
    //    CREATE TABLE IF NOT EXISTS schedules (
    //        id INTEGER PRIMARY KEY AUTOINCREMENT,
    //        name TEXT,
    //        cpf TEXT,            
    //        email TEXT,
    //        phone TEXT,
    //        date TEXT,
    //        month TEXT,
    //        hour TEXT,
    //        subject TEXT
    //    );
    //`)


   //inserir 
   // const query = `
   //     INSERT INTO schedules (
   //         name,
   //         cpf,
   //         email,
   //         phone,
   //         date,
   //        month,
   //         hour,
   //         subject
   //    ) VALUES (
   //         ?, ?, ?, ?, ?, ?, ?, ?
   //     )
   // `
    //const values = [
    //    "Jessé Brisola de Araujo",
    //    "440.697.878-01",
    //    "jesse.br@hotmail.com",
    //    "(14) 99624-7077",
    //    "10",
    //    "6",
    //    "13h00",
    //   "Agendamento para avaliação"
    //]

    //function afterisertData(err) {
    //    if (err) {
    //        return console.log(err)
    //    }

    //    console.log("Cadastrado com sucesso!")
    //    console.log(this)
    //}

    //db.run(query, values, afterisertData)

    //consultar
    //db.all(`SELECT * FROM schedules`, function(err, rows) {
    //    if (err) {
    //        return console.log(err)
    //    }

    //    console.log("Aqui estão os registros:")
    //    console.log(rows)
    //})

    //deletar
//})