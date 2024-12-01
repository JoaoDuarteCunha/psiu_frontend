"use strict";
onload = () => {
    //Tipo da atividade
    const urlParams = new URLSearchParams(window.location.search);
    const tipo_atividade = urlParams.get('tipo_atividade');
    //Imagem para o tipo da atividade
    let imagem = document.getElementById("imagem_atividade");
    imagem.setAttribute('src', 'images/' + tipo_atividade + '.png');
    //Texto para o tipo de atividade
    const nome_tipo_atividade = document.getElementById('nome_atividade');
    nome_tipo_atividade.innerText = nome_atividade[tipo_atividade];
    //Adiciona os campos específicos para cada tipo de atividade
    adicionaCamposDinamicos_insere(tipo_atividade);
    //Botão de cancelar
    let botao_cancelar = document.getElementById("cancelar");
    botao_cancelar.setAttribute('href', 'lista.html?tipo_atividade=' + tipo_atividade);
    //Insere 
    document.getElementById('insere').addEventListener('click', evento => {
        evento.preventDefault();
        const elements = document.getElementById('meuFormulario').elements;
        let data = {};
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            data[element.name] = element.value;
        }
        data['tipo_atividade'] = tipo_atividade;
        const token = localStorage.getItem('token');
        fetch(backendAddress + "psiuApiApp/uma_atividade/", {
            method: 'POST', body: JSON.stringify(data),
            headers: {
                'Authorization': tokenKeyword + token,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
            if (response.ok) {
                window.location.assign('lista.html?tipo_atividade=' + tipo_atividade);
            }
            else {
                lidarErrosInsere(response);
            }
        })
            .catch(error => { console.log(error); });
    });
};
/**
 * Função que adiciona as mensagens de erro em caso de formulário inválido.
 *
 * @param {Response} response Retorno do formulário
 *
 */
async function lidarErrosInsere(response) {
    const errorData = await response.json();
    for (let field in errorData) {
        let errors = errorData[field];
        for (let error of errors) {
            document.getElementById(field + '-erro').innerHTML = error;
        }
    }
}
/**
 * Função que adiciona os campos que dependem de um certo tipo de atividade ao HTML.
 *
 * @param {string} tipo_atividade Tipo de atividade
 *
 */
function adicionaCamposDinamicos_insere(tipo_atividade) {
    let campos_atividade = campos[tipo_atividade];
    let campos_dinamicos = document.getElementById('campos_dinamicos');
    for (let campo of campos_atividade) {
        let grupo_campo = document.createElement('div');
        grupo_campo.className = 'form-group';
        let label_campo = document.createElement('label');
        label_campo.setAttribute('for', 'input' + campo[0]);
        label_campo.innerHTML = campo[1];
        grupo_campo.appendChild(label_campo);
        let formulario_campo = document.createElement('input');
        formulario_campo.className = 'form-control';
        formulario_campo.setAttribute('id', 'input' + campo[0]);
        formulario_campo.setAttribute('name', campo[0]);
        grupo_campo.appendChild(formulario_campo);
        let erro_campo = document.createElement('small');
        erro_campo.className = 'form-text errorlist';
        erro_campo.setAttribute('id', campo[0] + '-erro');
        grupo_campo.appendChild(erro_campo);
        campos_dinamicos.appendChild(grupo_campo);
    }
}
