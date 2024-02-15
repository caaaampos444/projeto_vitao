 
const containerCards = document.getElementById('cards')


async function getTarefas(){
    let url = 'http://localhost:5080/tarefas'

    const responseTarefas = await fetch(url)

    const listTarefas = await responseTarefas.json()

    listTarefas.forEach((tarefa)=>{

        const container = document.createElement('div');
        container.className = 'card';

        console.log(tarefa.descrição)
        container.innerHTML = `
            <h2>${tarefa.descrição}</h2>
            <p>${tarefa.dataConclusão}</p>
        
        `
        
        containerCards.appendChild(container)
    
    })

 

    
}

window.onload = () => {
    getTarefas()
}

