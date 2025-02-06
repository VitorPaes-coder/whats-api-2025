/************************************************************************************************
 * Objetivo: 
 * Autor: Vitor Paes Rodrigues
 * Data: 30/01/2025
 * Versão: 1.0
 ***********************************************************************************************/

//IMPORTAR ARQUIVO DE CONTATOS
var arquivoContatos = require('./contatos')
var listaContatos = arquivoContatos.contatos['whats-users']


//FUNÇÂO 01
const listarDadosPessoais = function(valor){
    let numeroCelular = Number(valor)
    let retorno = {numeroCelular: numeroCelular, id: '', nome: '', dataInicio: '', dataFim: ''}
    
    listaContatos.forEach(function(item){
        if(item.number == numeroCelular){
            retorno.id = (item.id)
            retorno.nome = (item.account)
            retorno.dataInicio = (item['created-since'].start)
            retorno.dataFim = (item['created-since'].end)
        }
    })

    if(retorno.id.length > 0){
        return retorno
    }else{
        return false
    }
}
//console.log(listarDadosPessoais('11987876567'));


//FUNÇÂO 02
const listarDadosPerfil = function(valor){
    let numeroCelular = Number(valor)
    let status = false
    let retorno = {fotoPerfil: '', apelido: '', wallpaper: ''}
    
    listaContatos.forEach(function(item){
        if(item.number == numeroCelular){
            retorno.fotoPerfil = (item['profile-image'])
            retorno.apelido = (item.nickname)
            retorno.wallpaper = (item.background)
            status = true
        }
    })
    return status ? retorno : status
}
//console.log(listarDadosPerfil('11987876567'));


//FUNÇÂO 03
const listarDadosContatos = function(valor){
    let numeroCelular = valor
    let status = false
    let retorno = {numero: numeroCelular, contatos: []}
    
    listaContatos.forEach(function(item){
        if(item.number == numeroCelular){
            status = true
            item.contacts.forEach(function(contato){
                let contatoItem = {nome: '', fotoPerfil: '', descricao: ''}
                contatoItem.nome = (contato.name)
                contatoItem.fotoPerfil = (contato.image)
                contatoItem.descricao = (contato.description)

                retorno.contatos.push(contatoItem)
            })
        }
    })
   return status ? retorno : status
}
//console.log(listarDadosContatos('11987876567'));


//FUNÇÂO 04
const listaConversasUsuario = function(valor){
    let numeroCelular = valor
    let status = false
    let retorno = {numero: numeroCelular, conversas: []}
    
    listaContatos.forEach(function(item){
        if(item.number == numeroCelular){
            status = true
            item.contacts.forEach(function(conversa){
                let conversaItem = {fotoPerfil: '', nome: '',  descricao: '', mensagens: ''}
                conversaItem.fotoPerfil = (conversa.image)
                conversaItem.nome = (conversa.name)
                conversaItem.descricao = (conversa.description)
                conversaItem.mensagens = (conversa.messages)
                
                retorno.conversas.push(conversaItem)
            })
        }
    })
   return status ? retorno : status
}
//console.log(listaConversasUsuario('11987876567'));


//FUNÇÂO 05
const listaMensagensContato = function(nUsuario, nContato){
    let numeroUsuario = nUsuario
    let nomeContato = nContato
    let status = false
    let retorno = {numeroUsuario: numeroUsuario, nomeContato: nomeContato, mensagens: []}
    
    listaContatos.forEach(function(item){
        if(item.number == numeroUsuario){
            status = true
            item.contacts.forEach(function(contato){
                if(contato.name == nomeContato){
                    retorno.mensagens = contato.messages
                }
            })
        }
    })
   return status ? retorno : status
}
//console.log(listaMensagensContato('11987876567', 'Julia Smith'));


//FUNÇÂO 06
const filtraMensagensPelaPalavra = function(nUsuario, nContato, palavra){
    let numeroUsuario = nUsuario
    let nomeContato = nContato
    let palavraChave = palavra
    let status = false
    let retorno = {numeroUsuario: numeroUsuario, nomeContato: nomeContato, palavraChave: palavraChave, mensagens: []}
    
    listaContatos.forEach(function(item){
        if(item.number == numeroUsuario){
            status = true
            item.contacts.forEach(function(contato){
                if(contato.name == nomeContato){
                    contato.messages.forEach(function(mensagem){
                        if(mensagem.content.includes(palavraChave)){
                            retorno.mensagens.push(mensagem)
                        }
                    })
                }
            })
        }
    })
   return status ? retorno : status
}
//console.log(filtraMensagensPelaPalavra('11987876567', 'Juia Smith', 'bem'));

module.exports = {
    listarDadosPessoais, 
    listarDadosPerfil, 
    listarDadosContatos, 
    listaConversasUsuario, 
    listaMensagensContato, 
    filtraMensagensPelaPalavra}