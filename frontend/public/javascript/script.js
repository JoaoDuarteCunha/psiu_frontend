"use strict";
function exibeListaDeCarros(tipo_atividade) {
    fetch(backendAddress + "psiuApiApp/lista/" + tipo_atividade + "/")
        .then(response => response.json())
        .then(carros => {
        if (carros.length > 0) {
            let container_cards = document.getElementById('container_cards');
            container_cards.innerHTML = "";
            for (let carro of carros) {
                const formatacao = document.createElement('div');
                formatacao.className = 'col-auto';
                const borda_carta = document.createElement('div');
                borda_carta.className = 'card border-dark mb-3';
                const corpo_carta = document.createElement('div');
                corpo_carta.className = 'card-body';
                const titulo = document.createElement('h5');
                titulo.className = 'card-title';
                titulo.textContent = 'Destino: ' + carro['data'];
                corpo_carta.appendChild(titulo);
                borda_carta.appendChild(corpo_carta);
                formatacao.appendChild(borda_carta);
                container_cards.appendChild(formatacao);
            }
        }
        else {
            let sem_atividades = document.getElementById('sem_cadastradas');
            sem_atividades.hidden = false;
        }
    })
        .catch(error => {
        let sem_atividades = document.getElementById('sem_cadastradas');
        sem_atividades.hidden = false;
    });
}
onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const tipo_atividade = urlParams.get('tipo_atividade');
    //Imagem para o tipo da atividade
    let imagem = this.document.getElementById("imagem_atividade");
    imagem.setAttribute('src', 'images/' + tipo_atividade + '.png');
    //Texto para o tipo de atividade
    const nome_tipo_atividade = document.getElementById('nome_atividade');
    nome_tipo_atividade.innerText = nome_atividade[tipo_atividade];
    //Botão de criar atividade
    let botao_criar_atividade = this.document.getElementById("criar_atividade");
    botao_criar_atividade.setAttribute('href', 'insere.html?tipo_atividade=' + tipo_atividade);
    //Redireciona se o tipo de atividade é inválido
    if (tipos_atividade.includes(tipo_atividade) == false) {
        window.location.pathname = '/index.html';
    }
    exibeListaDeCarros(tipo_atividade);
};
