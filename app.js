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

//Listar todos os dados pessoais por usuário (Apenas dados pessoais que não podem ser editados)
app.get('/v1/whatsapp/dados/usuario/imutavel/', cors(), async function(request, response){
    let numero = request.query.nu
    let dados = whatsapp.listarDadosPessoais(numero)

    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': "Usuário não encontrado."})	
    }
})


app.get('/v1/whatsapp/dados-usuario', cors(), async function(request, response){
    let listaCursos = alunosCursos.getListaDeCursos()

    if(listaCursos){
        response.status(200) //sucess
        response.json(listaCursos)
    }else{
        response.status(404) // not found
        response.json({'status': 404, 'message':  'Não foi possível encontrar nenhum item de retorno.'})
    }
})

//Recupera uma lista de todos os alunos matriculados na escola.
app.get('/v1/lion-school/lista-alunos', cors(), async function(request, response){
    let listaAlunos = alunosCursos.getListaAlunos()

    if(listaAlunos){
        response.status(200) //sucess
        response.json(listaAlunos)
    }else{
        response.status(404) // not found
        response.json({'status': 404, 'message':  'Não foi possível encontrar nenhum item de retorno.'})
    }
})


//Recupera uma lista de todos os alunos matriculados no curso especificado. DS ou REDES 
app.get('/v1/lion-school/alunos-matriculados/:curso', cors(), async function(request, response){
    let dados = request.params.curso

    let alunosDoCurso = alunosCursos.alunoCurso(dados)

    if(alunosDoCurso){
        response.status(200)
        response.json(alunosDoCurso)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Nenhum aluno foi localizado.'})
    }
})

//Recupera uma lista de todos os alunos com o status especificado. Finalizado ou Cursando
// app.get('/v1/lion-school/alunos/filtro', cors(), async function(request, response){
//     let dados = request.query.status

//     let alunosDoCurso = alunosCursos.alunoStatus(dados)

//     if(alunosDoCurso){
//         response.status(200)
//         response.json(alunosDoCurso)
//     }else{
//         response.status(404)
//         response.json({'status': 404, 'message': 'Nenhum aluno foi localizado.'})
//     }
// })

app.get('/v1/lion-school/alunos/filtro', cors(), async function(request, response){
    let statusAluno = request.query.sta
    let curso = request.query.nc
    let statusDisciplinas = request.query.std
    let anoConclusao = request.query.adc
    
    let alunosDoCurso = alunosCursos.filtroLionSchool(statusAluno, curso, statusDisciplinas, anoConclusao)
    
    // console.log(alunosDoCurso);
    // console.log(statusAluno);
    // console.log(curso);
    // console.log(statusDisciplinas);
    // console.log(anoConclusao);

    if(alunosDoCurso){
        response.status(200)
        response.json(alunosDoCurso)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Nenhum aluno foi localizado.'})
    }
})

// app.get('/v1/lion-school/alunos/filtro', cors(), async function(request, response){
//     let dados = request.query.curso

//     let alunosDoCurso = alunosCursos.alunoCurso(dados)

//     if(alunosDoCurso){
//         response.status(200)
//         response.json(alunosDoCurso)
//     }else{
//         response.status(404)
//         response.json({'status': 404, 'message': 'Nenhum aluno foi localizado.'})
//     }
// })

app.listen('8080', function(){
    console.log('API aguardando requisições...');
})
