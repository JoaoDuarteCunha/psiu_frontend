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
                preencheInfoUsuario(usuario);
                const usuario_logado = data.username;
                if (usuario == usuario_logado) {
                    let botoes_perfil = document.getElementById('botoes_perfil');
                    let espaco = document.createElement('br');
                    let editar_perfil = document.createElement('a');
                    editar_perfil.setAttribute('type', 'button');
                    editar_perfil.className = 'btn btn-primary ml-3';
                    editar_perfil.setAttribute('href', 'perfil_editar.html');
                    editar_perfil.innerHTML = 'Editar perfil';
                    let alterar_senha = document.createElement('a');
                    alterar_senha.setAttribute('type', 'button');
                    alterar_senha.className = 'btn btn-secondary ml-3';
                    alterar_senha.setAttribute('href', 'alterar_senha.html');
                    alterar_senha.innerHTML = 'Alterar senha';
                    botoes_perfil.appendChild(espaco);
                    botoes_perfil.appendChild(editar_perfil);
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
function preencheInfoUsuario(usuario) {
    fetch(backendAddress + 'accounts/perfil/' + usuario + '/')
        .then(response => response.json())
        .then(info_usuario => {
        let campos_perfil = ['first_name', 'last_name', 'email'];
        for (let i = 0; i < campos_perfil.length; i++) {
            document.getElementById(campos_perfil[i]).innerHTML = info_usuario[campos_perfil[i]];
        }
    })
        .catch(erro => {
        window.location.assign('index.html');
    });
}
