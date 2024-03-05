const idUsuarioLogado=localStorage.getItem('id')
const idTask = localStorage.getItem('idTask')
console.log(idTask)

async function getComentarios(){
    const url = 'http://localhost:5080/comentarios'

    const objComentarios = await fetch(url)

    const listComentarios = await objComentarios.json()

    const container = document.getElementById('container')

    listComentarios.forEach(async(comentario) => {
        if(comentario.idTarefa == idTask){

            let idUserComment=comentario.idUsuario

            let nomeUsuario= await validarUsuario(idUserComment)
            const descricao = document.createElement('p')   

            descricao.textContent = `${nomeUsuario}: ${comentario.comentario}`           

            container.appendChild(descricao)

        }
    });

}

async function validarTarefa(){
    const url=`http://localhost:5080/tarefas/${idTask}`
    const objTarefas=await fetch(url)
    const listComentarios=await objTarefas.json()
    console.log(listComentarios.descrição)
    const header=document.getElementById('header')
    const titulo=document.createElement('h1')
    titulo.textContent=`Comentários - ${listComentarios.descrição}`
    header.appendChild(titulo)
}

window.onload = () => {
    getComentarios(),
    validarTarefa()
}

async function validarUsuario(id){
    const url=`http://localhost:5080/usuario/${id}`
    const objUser=await fetch(url)
    const user=await objUser.json()
    return user.nome
}

async function postarComentario(){
    const comentario=document.getElementById('inputComentario').value
    const idUsuario=idUsuarioLogado
    const idTarefa=idTask

    const newComentario={
        comentario,
        idTarefa,
        idUsuario
    }
    const url = 'http://localhost:5080/comentarios'
    const options = {
        method: 'POST',
        headers: {
             'Content-Type': 'application/json'
         },
         body: JSON.stringify(newComentario)
    }
    await fetch(url, options)
    window.location.reload()
}