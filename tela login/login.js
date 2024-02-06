

async function validarLogin(){

    const nome=document.getElementById('nome').value
    const senha=document.getElementById('senha').value

    console.log(nome)

    if(nome==''||senha==''){
        alert('Preencha todos os campos')
        return false
    }

    try{
        const users=await fetch('http://localhost:5080/usuario')

        const listUsers=await users.json()

        listUsers.forEach((user)=>{
            if(nome===user.nome&&senha===user.senha){
                alert('Usuário encontrado com sucesso!')
                return true
            }
        })
        alert('Usuário não encontrado!')
        return false

    }catch(error){
        alert('Erro ao acessar a API')
        console.error(error)
    }

}