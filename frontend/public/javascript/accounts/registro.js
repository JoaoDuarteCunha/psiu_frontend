"use strict";
onload = () => {
    document.getElementById('btnRegistro').addEventListener('click', evento => {
        evento.preventDefault();
        const username = document.getElementById('username').value;
        const password1 = document.getElementById('password1').value;
        const password2 = document.getElementById('password2').value;
        const msg = document.getElementById('msg');
        fetch(backendAddress + 'accounts/registro/', {
            method: 'POST',
            body: JSON.stringify({
                'username': username,
                'password1': password1,
                'password2': password2,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
            if (response.ok) {
                return response.json();
            }
            else {
                lidarErrosRegistro(response);
            }
        })
            .then((data) => {
            const token = data.token;
            localStorage.setItem('token', token);
            window.location.replace('perfil_editar.html');
        })
            .catch(erro => { console.log(erro); });
    });
};
/**
 * Função que adiciona as mensagens de erro em caso de formulário inválido.
 *
 * @param {Response} response Retorno do formulário
 *
 */
async function lidarErrosRegistro(response) {
    const errorData = await response.json();
    console.log(errorData);
    for (let field in errorData) {
        let errors = errorData[field];
        for (let error of errors) {
            document.getElementById(field + '-erro').innerHTML = error;
        }
    }
}
