const express = require('express')

const server = express();

server.use(express.json())

// Query params = ?nome=NodeJS (São os parametros passados na frente da rota)
// Route Params = /developers/2
// Request Body = { nome: 'Nodejs', tipo: 'Backend'} (Passando um objeto no corpo da requisição)

const cursos = [
    {id: 1, nome: 'Luis', sexo: 'Masculino', idade: 24, dataNasc: '06/02/1997', hobby: 'Leitura'},
    {id: 2, nome: 'Ayrton', sexo: 'Masculino', idade: 25, dataNasc: '06/02/1996', hobby: 'Correr'},
    {id: 3, nome: 'Flavia', sexo: 'Feminino', idade: 26, dataNasc: '06/02/1995', hobby: 'Viajar'},
    {id: 4, nome: 'Michel', sexo: 'Masculino', idade: 26, dataNasc: '06/02/1995', hobby: 'Jogar'}
]

// Middleware Global
server.use((req, res, next) => {
    console.log(`URL CHAMADA: ${req.url}`)

    return next()
})

function checkCurso(req, res, next){
    if(!req.body.name){
        return res.status(400).json({error: 'Propriedade errada'})
    }

    return next()
}

function checkIndex(req, res, next){
    const curso = cursos[req.params.index]

    if(!curso){
        return res.status(400).json({error: "Esse curso não existe"})
    }

    return next()
}


//Listagem de todos os cursos
server.get('/developers', (req, res) => {
    return res.json(cursos)
})

// Listagem de um curso especificado pelo index
server.get('/developers/:index', checkIndex, (req, res) => {
    const { index } = req.params;

    return res.json(cursos [index])
})

// Adicionar um curso
server.post('/developers', checkCurso, (req, res) => {
    const {name} = req.body
    
    cursos.push(name);
    

    return res.json(cursos);
})

// Atualizar um curso (É necessario passar o index do curso a ser alterado)
server.put('/developers/:index', checkCurso,checkIndex, (req, res) => {
    const {index} = req.params
    const { name } = req.body

    cursos[index] = name

    return res.json(name)
})

// Deletar um curso (É necessario passar o index do curso a ser alterado)
server.delete(`/developers/:index`, checkIndex, (req, res) => {
    const { index } = req.params
    const { name } = req.body
    
    cursos.splice(name, [index])
    return res.json({ message: `O curso ${index} foi exluido`}) 
})

server.listen(3000);