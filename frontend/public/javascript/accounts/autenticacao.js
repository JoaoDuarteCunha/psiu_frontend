"use strict";
window.addEventListener('load', () => {
    // Verifica o username e coloca no cabeçalho da página 
    const token = localStorage.getItem('token');
    fetch(backendAddress + 'accounts/token-auth/', {
        method: 'GET',
        headers: {
            'Authorization': tokenKeyword + token
        }
    })
        .then(response => {
        response.json().then(data => {
            const usuario = data;
            let cabecalho = document.getElementById('cabecalho_autenticacao');
            if (response.ok) { // LOGADO
                let nomeUsuario = document.createElement('span');
                nomeUsuario.className = 'navbar-text';
                nomeUsuario.innerHTML = 'Olá ' + usuario.username + '!  ';
                let perfil = document.createElement('a');
                perfil.className = 'nav-link';
                perfil.setAttribute('href', 'perfil.html?usuario=' + data.username);
                perfil.setAttribute('target', '_top');
                let icon_perfil = document.createElement('i');
                icon_perfil.className = 'fa fa-user-circle';
                icon_perfil.setAttribute('aria-hidden', 'true');
                perfil.appendChild(icon_perfil);
                let text_perfil = document.createTextNode(' Perfil');
                perfil.appendChild(text_perfil);
                let logout = document.createElement('a');
                logout.className = 'nav-link';
                logout.setAttribute('href', 'index.html');
                logout.setAttribute('target', '_top');
                logout.setAttribute('onclick', 'click_logout()');
                let icon_logout = document.createElement('i');
                icon_logout.className = 'fa fa-sign-out';
                icon_logout.setAttribute('aria-hidden', 'true');
                logout.appendChild(icon_logout);
                let text_logout = document.createTextNode(' Logout');
                logout.appendChild(text_logout);
                cabecalho.appendChild(nomeUsuario);
                cabecalho.appendChild(perfil);
                cabecalho.appendChild(logout);
            }
            else { // VISITANTE
                let registrar = document.createElement('a');
                registrar.className = 'nav-link';
                registrar.setAttribute('href', 'registro.html');
                registrar.setAttribute('target', '_top');
                let icon_registrar = document.createElement('i');
                icon_registrar.className = 'fa fa-user-circle';
                icon_registrar.setAttribute('aria-hidden', 'true');
                registrar.appendChild(icon_registrar);
                let text_registrar = document.createTextNode(' Registrar');
                registrar.appendChild(text_registrar);
                let login = document.createElement('a');
                login.className = 'nav-link';
                login.setAttribute('href', 'login.html');
                login.setAttribute('target', '_top');
                let icon_login = document.createElement('i');
                icon_login.className = 'fa fa-sign-in';
                icon_login.setAttribute('aria-hidden', 'true');
                login.appendChild(icon_login);
                let text_login = document.createTextNode(' Login');
                login.appendChild(text_login);
                cabecalho.appendChild(registrar);
                cabecalho.appendChild(login);
            }
        });
    })
        .catch(erro => {
        console.log('[setLoggedUser] deu erro: ' + erro);
    });
});
