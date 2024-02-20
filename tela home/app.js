 
const containerCards = document.getElementById('cards')

//console.log(localStorage.getItem("id"))

async function getTarefas(){
    let url = 'http://localhost:5080/tarefas'

    const responseTarefas = await fetch(url)

    const listTarefas = await responseTarefas.json()

    listTarefas.forEach((tarefa)=>{

        if(localStorage.getItem("id")==tarefa.idUsuario){
            const container = document.createElement('div');
            container.className = 'card';

            console.log(tarefa.descrição)
            container.innerHTML = `
                <h2>${tarefa.descrição}</h2>
                <p>${tarefa.dataConclusão}</p>
                <img src="./img/lapis.png" alt="" class="editar">
                <img src="./img/menos.png" alt="" class="excluir">
            `
            
            containerCards.appendChild(container)
        }
    
    })

 

    
}

window.onload = () => {
    getTarefas()
}

function criarTarefas(){
    const tituloUsuario=prompt('Digite o título da tarefa')
    const dataConclusãoUsuario=prompt('Digite quando a tarefa foi finalizada')
    const container = document.createElement('div');
    container.className = 'card';
    container.innerHTML = `
                <h2>${tituloUsuario}</h2>
                <p>${dataConclusãoUsuario}</p>
                <img src="./img/lapis.png" alt="" class="editar">
                <img src="./img/menos.png" alt="" class="excluir">
            `
    containerCards.appendChild(container)
}


document.addEventListener('click', function(event) {
    const card = event.target.closest('.card')
    if (card) {
        const editarButton = card.querySelector('.editar')
        const excluirButton = card.querySelector('.excluir')
        
        if (event.target === editarButton) {
            const novoTitulo = prompt('Digite o novo título:')
            const novaDataConclusao = prompt('Digite a nova data de conclusão:')
            card.querySelector('h2').textContent = novoTitulo
            card.querySelector('p').textContent = novaDataConclusao
        } else if (event.target === excluirButton) {
            card.remove()
        }
    }
});


