"use strict";
onload = () => {
    // Carrega os dados do banco de dados 
    // e preenche o formulário 
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id_atividade');
    const idPlace = document.getElementById('id');
    if (id) {
        console.log('id = ', id);
        idPlace.innerHTML = id;
        //Botão de cancelar
        let botao_cancelar = document.getElementById("cancelar");
        botao_cancelar.setAttribute('href', 'atividade.html?id_atividade=' + id);
        fetch(backendAddress + 'psiuApiApp/uma_atividade/' + id + '/')
            .then(response => response.json())
            .then(resp => {
            let tipo_atividade = resp['atividade']['tipo_atividade'];
            //Imagem para o tipo da atividade
            let imagem = document.getElementById("imagem_atividade");
            imagem.setAttribute('src', 'images/' + tipo_atividade + '.png');
            //Texto para o tipo de atividade
            const nome_tipo_atividade = document.getElementById('nome_atividade');
            nome_tipo_atividade.innerText = nome_atividade[tipo_atividade];
            let atividade = resp['atividade'];
            let campos_dinamicos = [];
            let atividades_dinamicas = campos[atividade['tipo_atividade']];
            for (let elem of atividades_dinamicas) {
                campos_dinamicos.push(elem[0]);
            }
            adicionaCamposDinamicos(tipo_atividade);
            campos_dinamicos.push('vagas', 'data', 'hora', 'adicionais');
            for (let i = 0; i < campos_dinamicos.length; i++) {
                document.getElementById(campos_dinamicos[i]).value = atividade[campos_dinamicos[i]];
            }
        })
            .catch(erro => {
            console.log('Deu erro: ' + erro);
        });
    }
    else {
        idPlace.innerHTML = 'URL mal formada: ' + window.location;
    }
    document.getElementById('atualiza')
        .addEventListener('click', (evento) => {
        evento.preventDefault();
        const form = document.getElementById('meuFormulario');
        const elements = form.elements;
        let data = {};
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            data[element.name] = element.value;
        }
        const token = localStorage.getItem('token');
        fetch(backendAddress + "psiuApiApp/uma_atividade/" + id + '/', {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: { 'Authorization': tokenKeyword + token, 'Content-Type': 'application/json' },
        })
            .then(response => {
            if (response.ok) {
                window.location.assign('atividade.html?id_atividade=' + id);
            }
            else {
                document.getElementById('mensagem').innerHTML = 'Erro: '
                    + response.status + " " + response.statusText;
            }
        })
            .catch(erro => { console.log('Deu erro: ' + erro); });
    });
};
function adicionaCamposDinamicos(tipo_atividade) {
    let campos_atividade = campos[tipo_atividade];
    let campos_dinamicos = document.getElementById('campos_dinamicos');
    for (let campo of campos_atividade) {
        let grupo_campo = document.createElement('div');
        grupo_campo.className = 'form-group';
        let label_campo = document.createElement('label');
        label_campo.setAttribute('for', campo[0]);
        label_campo.innerHTML = campo[1];
        grupo_campo.appendChild(label_campo);
        let formulario_campo = document.createElement('input');
        formulario_campo.className = 'form-control';
        formulario_campo.setAttribute('id', campo[0]);
        formulario_campo.setAttribute('name', campo[0]);
        grupo_campo.appendChild(formulario_campo);
        campos_dinamicos.appendChild(grupo_campo);
    }
}
