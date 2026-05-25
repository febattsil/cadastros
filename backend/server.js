const express = require('express')
const cors = require('cors')
const db = require('./db')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

// INSERE NOVO USUARIO OU NOVO COLABORADOR, A DEPENDER DA VARIÁVEL 'TIPO' QUE O DEFINE,
// E QUE DETERMINA SE POSSUIRÁ PONTOS CADASTRADOS
app.post('/cadastro', (req, res) => {

    const {
        nome,
        email,
        cpf,
        idade,
        senha,
        tipo
    } = req.body

    let sql
    let valores

    if(req.body.tipo == 'usuario'){

        sql = `
            INSERT INTO usuarios
            (nome,email,cpf,idade,senha,tipo)
            VALUES (?, ?, ?, ?, ?, ?)
        `

        valores = [
            nome,
            email,
            cpf,
            idade,
            senha,
            tipo,
        ]


    }else if(req.body.tipo == 'colaborador'){
        
        sql = `
            INSERT INTO colaboradores
            (nome,email,cpf,idade,senha,tipo,pontos)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `
        
        valores = [
            nome,
            email,
            cpf,
            idade,
            senha,
            tipo,
            JSON.stringify([])
        ]
    } else {

        return res.status(400).json({
            erro : 'Tipo Inválido'
        }
        )
    
    }


    db.query(
        sql,
        valores,
        (err, result) => {

            if(err){
                return res.status(500).json(err)
            }

            res.json(result)
        }
    )
})


//BUSCA TODOS OS USUÁRIOS CADASTRADOS
app.get('/usuarios', (req, res) => {

    db.query(
        'SELECT * FROM usuarios',
        (err, result) => {

            if(err){
                return res.status(500).json(err)
            }

            res.json(result)
        }
    )
})

// RETORNA TODOS OS COLABORADORES CADASTRADOS
app.get('/colaboradores', (req, res) => {

    db.query(
        'SELECT * FROM colaboradores',
        (err, result) => {

            if(err){
                return res.status(500).json(err)
            }

            res.json(result)
        }
    )
})

// RETORNA TODOS OS COLABORADORES CADASTRADOS
app.get('/colaborador', (req, res) => {

    db.query(
        'SELECT * FROM colaboradores',
        (err, result) => {

            if(err){
                return res.status(500).json(err)
            }

            res.json(result)
        }
    )
})

app.get('/pontos/:colaboradorId', (req, res) => {

    const colaboradorId = req.params.colaboradorId

    db.query(
        `
        SELECT *
        FROM pontos
        WHERE colaborador_id = ?
        ORDER BY data_hora DESC
        `,
        [colaboradorId],
        (err, result) => {

            if(err){
                return res.status(500).json(err)
            }

            res.json(result)
        }
    )
})

// RETORNA TODOS OS PONTOS ADICIONADOS
app.post('/ponto', (req, res) => {

    const {
        colaborador_id,
        data_hora,
        descricao
    } = req.body

    const sql = `
        INSERT INTO pontos
        (
            colaborador_id,
            data_hora,
            descricao
        )
        VALUES (?, ?, ?)
    `

    db.query(
        sql,
        [colaborador_id, data_hora, descricao],
        (err, result) => {

            if(err){
                console.error('Erro SQL:')
                console.error(err)
                return res.status(500).json(err)
            }

            res.json(result)
        }
    )
})
console.log('Arquivo server.js carregado')

app.listen(3000, () => {
    console.log('API rodando')
})