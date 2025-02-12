/**********************************************************************
 * Objetivo: API para manipular dados de uma aplicação de mensagens.
 * Autor: Vitor Paes Rodrigues
 * Data: 06/02/2024
 * Versão: 1.0
 **********************************************************************/

const  express = require('express');
const  cors = require('cors');
const  bodyParser = require('body-parser');

//Inicializanddo o express através do objeto app
const app = express()

//request   -->    Dados que chegam na API
//response  -->    Dados que a API envia de volta para o cliente
app.use((request,response, next)=>{
    //Permissão de acesso para liberar quais máquinas poderão usar a API
    response.header('Acess-Control-Allow-Origin',  '*');
    //Permissão de acesso para liberar os verbos da requisição da API
    response.header('Acess-Control-Allow-Methods',  'GET');

    app.use(cors())//Ativando as configurações do cors

    next()
})

const whatsapp = require('./modulo/funcoes.js')

// Endopoint 01
app.get('/v1/whatsapp/dados-pessoais/:numero', cors(), async function(request, response) {
    let numero = request.params.numero
    let dados = whatsapp.listarDadosPessoais(numero)

    if (dados) {
        response.status(200)
        response.json(dados)
    } else {
        response.status(404)
        response.json({ 'status': 404, 'message': "Usuário não encontrado." })
    }
})

// Endopoint 02
app.get('/v1/whatsapp/dados-perfil/:numero', cors(), async function(request, response) {
    let numero = request.params.numero
    let dados = whatsapp.listarDadosPerfil(numero)

    if (dados) {
        response.status(200)
        response.json(dados)
    } else {
        response.status(404)
        response.json({ 'status': 404, 'message': "Usuário não encontrado." })
    }
})

// Endopoint 03
app.get('/v1/whatsapp/dados-contatos/:numero', cors(), async function(request, response) {
    let numero = request.params.numero
    let dados = whatsapp.listarDadosContatos(numero)

    if (dados) {
        response.status(200)
        response.json(dados)
    } else {
        response.status(404)
        response.json({ 'status': 404, 'message': "Usuário não encontrado." })
    }
})

// Endopoint 04
app.get('/v1/whatsapp/conversas-usuario/:numero', cors(), async function(request, response) {
    let numero = request.params.numero
    let dados = whatsapp.listaConversasUsuario(numero)

    if (dados) {
        response.status(200)
        response.json(dados)
    } else {
        response.status(404)
        response.json({ 'status': 404, 'message': "Usuário não encontrado." })
    }
})

// Endopoint 05
app.get('/v1/whatsapp/mensagens-contato', cors(), async function(request, response) {
    let numeroUsuario = request.query.numeroUsuario
    let nomeContato = request.query.nomeContato
    let dados = whatsapp.listaMensagensContato(numeroUsuario, nomeContato)

    if (dados) {
        response.status(200)
        response.json(dados)
    } else {
        response.status(404)
        response.json({ 'status': 404, 'message': "Contato não encontrado." })
    }
})

// Endopoint 06
app.get('/v1/whatsapp/filtra-mensagens', cors(), async function(request, response) {
    let numeroUsuario = request.query.numeroUsuario
    let nomeContato = request.query.nomeContato
    let palavra = request.query.palavra
    let dados = whatsapp.filtraMensagensPelaPalavra(numeroUsuario, nomeContato, palavra)

    if (dados) {
        response.status(200)
        response.json(dados)
    } else {
        response.status(404)
        response.json({ 'status': 404, 'message': "Nenhuma mensagem encontrada." })
    }
})

app.listen('8080', function() {
    console.log('API aguardando requisições...');
})
