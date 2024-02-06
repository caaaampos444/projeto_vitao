'use strict'

document.addEventListener('DOMContentLoaded', function() {
    const botaoCriarConta = document.getElementById('btnCriarConta')
    function validacao(event) {
        event.preventDefault()
        const nome = document.getElementById('nome').value
        const email = document.getElementById('email').value
        const senha = document.getElementById('senha').value
        if (nome !== '' && email !== '' && senha !== '') {
            window.location.href = "./tela login/login.html"
        } else {
            alert('Por favor, preencha todos os campos.')
        }
    }
    if (botaoCriarConta) {
        botaoCriarConta.addEventListener('click', validacao)
    }
})