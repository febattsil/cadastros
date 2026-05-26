const express = require('express')
const PDFDocument = require('pdfkit')
const cors = require('cors')
const db = require('./db')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

// INSERE NOVO USUARIO OU NOVO COLABORADOR, A DEPENDER DA VARIÁVEL 'TIPO' QUE O DEFINE,
// E QUE DETERMINA SE POSSUIRÁ apontamentos CADASTRADOS
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
            (nome,email,cpf,idade,senha,tipo)
            VALUES (?, ?, ?, ?, ?, ?)
        `
        
        valores = [
            nome,
            email,
            cpf,
            idade,
            senha,
            tipo
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

    const { inicio, fim } = req.query

    let sql = `
        SELECT
            c.id,
            c.nome,
            c.email,
            c.cpf,
            c.idade,
            a.id AS apontamento_id,
            a.data_hora,
            a.descricao
        FROM colaboradores c
        LEFT JOIN apontamentos a
            ON c.id = a.colaborador_id
    `

    const params = []
    const filtros = []

    if(inicio){
        filtros.push('a.data_hora >= ?')
        params.push(inicio)
    }

    if(fim){
        filtros.push('a.data_hora <= ?')
        params.push(fim)
    }

    if(filtros.length){
        sql += ' WHERE ' + filtros.join(' AND ')
    }

    sql += `
        ORDER BY
            c.nome,
            a.data_hora DESC
    `

    db.query(sql, params, (err, result) => {

        if(err){
            return res.status(500).json(err)
        }

        const colaboradoresMap = {}

        result.forEach(row => {

            if(!colaboradoresMap[row.id]){

                colaboradoresMap[row.id] = {
                    id: row.id,
                    nome: row.nome,
                    email: row.email,
                    cpf: row.cpf,
                    idade: row.idade,
                    apontamentos: []
                }

            }

            if(row.apontamento_id){

                colaboradoresMap[row.id].apontamentos.push({
                    id: row.apontamento_id,
                    data_hora: row.data_hora,
                    descricao: row.descricao
                })

            }

        })

        res.json(
            Object.values(colaboradoresMap)
        )

    })

})

app.get('/apontamentos/:colaboradorId', (req, res) => {

    const colaboradorId = req.params.colaboradorId

    db.query(
        `
        SELECT *
        FROM apontamentos
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

app.get('/relatorio', async (req, res) => {

    const { inicio, fim } = req.query

    const sql = `
        SELECT
            c.id,
            c.nome,
            c.email,
            c.cpf,
            a.data_hora,
            a.descricao
        FROM colaboradores c
        LEFT JOIN apontamentos a
            ON c.id = a.colaborador_id
        WHERE (? IS NULL OR a.data_hora >= ?)
        AND (? IS NULL OR a.data_hora <= ?)
        ORDER BY c.nome, a.data_hora
    `

    db.query(
        sql,
        [inicio, inicio, fim, fim],
        (err, result) => {

            if(err){
                return res.status(500).json(err)
            }

            const doc = new PDFDocument()

            res.setHeader(
                'Content-Type',
                'application/pdf'
            )

            res.setHeader(
                'Content-Disposition',
                'attachment; filename=relatorio-geral.pdf'
            )

            doc.pipe(res)

            doc.fontSize(20)
            doc.text(
                'RELATÓRIO GERAL DE APONTAMENTOS',
                {
                    align: 'center'
                }
            )

            doc.moveDown()

            doc.fontSize(12)

            doc.text(
                `Período: ${inicio} até ${fim}`
            )

            doc.moveDown()

            let colaboradorAtual = null

            result.forEach(registro => {

                if(colaboradorAtual !== registro.id){

                    colaboradorAtual = registro.id

                    doc.moveDown()

                    doc.fontSize(14)
                    doc.text(
                        `Colaborador: ${registro.nome}`
                    )

                    doc.fontSize(11)
                    doc.text(
                        `Email: ${registro.email}`
                    )

                    doc.text(
                        `CPF: ${registro.cpf}`
                    )

                    doc.moveDown()
                }

                if(registro.data_hora){

                    const dataFormatada =
                        new Date(
                            registro.data_hora
                        ).toLocaleString('pt-BR')

                    doc.text(
                        `${dataFormatada} - ${registro.descricao}`
                    )

                }

            })

            doc.moveDown()

            doc.text(
                `Total de registros: ${result.length}`
            )

            doc.end()

        }
    )

})

app.post('/cadastroponto', (req, res) => {

    const {
        colaborador_id,
        data_hora,
        descricao
    } = req.body

    const sql = `
        INSERT INTO apontamentos
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

app.listen(3000, () => {
    console.log('API rodando')
})