
const containerCards = document.getElementById('cards')
const button = document.getElementById('cadastrarTarefas')
const btnDelete = document.getElementById('excluirTarefas')
const btnEdit = document.getElementById('editarTarefas')
const bntComment = document.getElementById('comentar')

// console.log(localStorage.getItem("id"))
//console.log(localStorage.getItem("premium"))

async function getTarefas() {
    let url = 'http://localhost:5080/tarefas'

    const responseTarefas = await fetch(url)

    const listTarefas = await responseTarefas.json()

    listTarefas.forEach(async(tarefa) => {


        const container = document.createElement('div');

        let idUserTask= tarefa.idUsuario

        let nomeUsuario=await validarUsuario(idUserTask)

        container.className = 'card';

        //console.log(tarefa.descrição)
        container.innerHTML = `
                <h2>${tarefa.descrição}</h2>
                <p>${tarefa.dataConclusão}</p>
                <p class="id">ID: ${tarefa.id}</p>
                <p class="user">Usuário: ${nomeUsuario}</p>
                <button class="comentarios" onclick="getComentarios(${tarefa.id})">Comentar</button>
            `

        // getComentarios(tarefa.id)
    
        containerCards.appendChild(container)
    })


}

async function getComentarios(idTarefa){
    const idTask=idTarefa
    localStorage.setItem('idTask',idTask)
    window.location.href='../tela comentarios/comentarios.html'
}

window.onload = () => {
    getTarefas()
}

async function validarUsuario(id){
    const url=`http://localhost:5080/usuario/${id}`
    const objUser=await fetch(url)
    const user=await objUser.json()
    return user.nome
}

async function editarTarefas() {
    if (localStorage.getItem("premium") == 'true') {
        const id = prompt('Digite o ID da tarefa que você deseja editar')
        const descrição = prompt('Digite o novo título da tarefa')
        const dataConclusão = prompt('Digite a nova data de conclusão da tarefa')
        const idUsuario = localStorage.getItem("id")

        const tarefaAtualizada = {
            descrição,
            dataConclusão,
            idUsuario
        }



        const url = `http://localhost:5080/tarefas/${id}`

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tarefaAtualizada)
        }

        await fetch(url, options)

        window.location.reload()

    }
    else
        alert('Assine o premium para editar as tarefas!')
}

async function criarTarefas() {
    if (localStorage.getItem("premium") == 'true') {
        const descrição = prompt('Digite o título da tarefa')
        const dataConclusão = prompt('Digite quando a tarefa foi finalizada')
        const idUsuario = localStorage.getItem("id")

        const newTarefa = {
            descrição,
            dataConclusão,
            idUsuario
        }

        const url = 'http://localhost:5080/tarefas'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTarefa)
        }

        await fetch(url, options)

        window.location.reload()
    }
    else
        alert('Assine o premium para criar novas tarefas!')
}

async function criarComentarios() {
    const id = prompt('Digite o ID da tarfe que você deseja comentar')
    const comentario = prompt('Digite o que você deseja comentar')
    const url = `http://localhost:5080/tarefas/${id}`
    const idUsuario = localStorage.getItem("id")

    const newComentario = {
        comentario,
        idUsuario
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newComentario)
    }
}

async function deletarTarefas() {
    if (localStorage.getItem("premium") == 'true') {
        const id = prompt('Digite o ID da tarefa que você deseja deletar')
        const url = `http://localhost:5080/tarefas/${id}`

        const options = {
            method: 'DELETE'
        }

        await fetch(url, options)

        window.location.reload()
    }
    else
        alert('Assine o premium para deletar as tarefas!')
}




button.addEventListener('click', criarTarefas)
btnDelete.addEventListener('click', deletarTarefas)
btnEdit.addEventListener('click', editarTarefas)


// document.addEventListener('click', function(event) {
//     const card = event.target.closest('.card')
//     if (card) {
//         const editarButton = card.querySelector('.editar')
//         const excluirButton = card.querySelector('.excluir')

//         if (event.target === editarButton) {
//             const novoTitulo = prompt('Digite o novo título:')
//             const novaDataConclusao = prompt('Digite a nova data de conclusão:')
//             card.querySelector('h2').textContent = novoTitulo
//             card.querySelector('p').textContent = novaDataConclusao
//         } else if (event.target === excluirButton) {
//             card.remove()
//         }
//     }
// });