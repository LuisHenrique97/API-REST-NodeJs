const express = require('express')

const server = express();

server.use(express.json())

// Query params = ?nome=NodeJS (São os parametros passados na frente da rota)
// Route Params = /developers/2
// Request Body = { nome: 'Nodejs', tipo: 'Backend'} (Passando um objeto no corpo da requisição)

const developers = [
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

// Checagem se os parametros do corpo da função estão corretos
function checkDeveloper(req, res, next){
    if(!req.body.dev){
        return res.status(400).json({error: 'Algo não está correto'})
    }

    return next()
}

// Verificação do numero elementos da lista
function checkIndex(req, res, next){
    const developer = developers[req.params.index]

    if(!developer){
        return res.status(400).json({error: "Esse desenvolvedor não existe"})
    }

    return next()
}


//Listagem de todos os developers
server.get('/developers', (req, res) => {
    return res.json(developers)
})

// Listagem por index
server.get('/developers/:id', (req, res) => {
    const { id } = req.params;
    const { nome } = req.body
    const { sexo } = req.body
    const { idade } = req.body
    const { dataNasc } = req.body
    const { hobby } = req.body

    const objIndex = developers.findIndex((obj => obj.id == id));

    return res.json(objIndex [id, nome, sexo, idade, dataNasc, hobby])
})

// Listagem por parametros
server.get('/developers', (req, res) => {
    const {nome} = req.query
    
    return res.json(developers [nome])
})


// Adicionar um Desenvolvedor
server.post('/developers', checkDeveloper,(req, res) => {
    const {dev} = req.body
    
    dev.id = developers.length + 1
    developers.push(dev);
    

    return res.json(developers);
})

// Atualizar um desenvolvedor
server.put('/developers/:id', checkIndex, (req, res) => {
    const {id} = req.params
    const {dev} = req.body

    const objIndex = developers.findIndex((obj => obj.id == id));
    dev.id = id

    developers[objIndex] = dev

    return res.json(developers[objIndex])
})

// Deletar um desenvolvedor (É necessario passar o index do curso a ser alterado)
server.delete(`/developers/:id`, checkIndex, (req, res) => {
    const { id } = req.params

    const objIndex = developers.findIndex((obj => obj.id == id));
    developers.splice(objIndex, 1)
    return res.json({ message: `O desenvolvedor ${id} foi exluido`}) 
})

server.listen(3000);