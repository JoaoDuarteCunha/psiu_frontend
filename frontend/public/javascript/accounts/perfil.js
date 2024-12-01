"use strict";
var usuario = 'visitante';
onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    usuario = urlParams.get('usuario');
    let usernames = document.getElementsByName('username');
    usernames.forEach(substituiNome);
    //Pega usuário atual
    //Se o usuário atual for o dono do perfil, pode alterar senha ou alterar perfil
    const token = localStorage.getItem('token');
    fetch(backendAddress + 'accounts/token-auth/', {
        method: 'GET',
        headers: {
            'Authorization': tokenKeyword + token
        }
    })
        .then(response => {
        response.json().then(data => {
            if (response.ok) {
                const usuario_logado = data.username;
                if (usuario == usuario_logado) {
                    let botoes_perfil = document.getElementById('botoes_perfil');
                    let espaco = document.createElement('br');
                    let editar_atividade = document.createElement('a');
                    editar_atividade.setAttribute('type', 'button');
                    editar_atividade.className = 'btn btn-primary ml-3';
                    editar_atividade.setAttribute('href', 'update.html?id_atividade=');
                    editar_atividade.innerHTML = 'Editar perfil';
                    let alterar_senha = document.createElement('a');
                    alterar_senha.setAttribute('type', 'button');
                    alterar_senha.className = 'btn btn-secondary ml-3';
                    alterar_senha.setAttribute('href', 'alterar_senha.html');
                    alterar_senha.innerHTML = 'Alterar senha';
                    botoes_perfil.appendChild(espaco);
                    botoes_perfil.appendChild(editar_atividade);
                    botoes_perfil.appendChild(alterar_senha);
                }
            }
        });
    })
        .catch(erro => {
        console.log('[setLoggedUser] deu erro: ' + erro);
    });
};
function substituiNome(item) {
    item.innerHTML = usuario;
}
