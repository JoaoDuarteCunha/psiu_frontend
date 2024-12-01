"use strict";
var targetData = new Date();
onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id_atividade = urlParams.get('id_atividade');
    fetch(backendAddress + "psiuApiApp/uma_atividade/" + id_atividade + "/")
        .then(response => response.json())
        .then(resp => {
        console.log(resp);
        let atividade = resp['atividade'];
        let participantes = resp['participantes'];
        let tipo_atividade = atividade['tipo_atividade'];
        //Imagem para o tipo da atividade
        let imagem = this.document.getElementById("imagem_atividade");
        imagem.setAttribute('src', 'images/' + tipo_atividade + '.png');
        //Texto para o tipo de atividade
        const nome_tipo_atividade = document.getElementById('nome_atividade');
        nome_tipo_atividade.innerText = nome_atividade[tipo_atividade];
        //Botão de voltar
        let botao_voltar = document.getElementById("voltar");
        botao_voltar.setAttribute('href', 'lista.html?tipo_atividade=' + tipo_atividade);
        //Título
        let titulo = document.getElementById('titulo');
        let text_titulo = document.createTextNode(' ' + atividade[campos[tipo_atividade][0][0]]);
        titulo.appendChild(text_titulo);
        //Título descrição
        let titulo_descricao = document.getElementById('titulo_descricao');
        titulo_descricao.innerHTML = campos[tipo_atividade][0][1] + ':';
        //Subtítulo
        let subtitulo = document.getElementById('subtitulo');
        let text_subtitulo = document.createTextNode(' ' + atividade[campos[tipo_atividade][1][0]]);
        subtitulo.appendChild(text_subtitulo);
        //Subtítulo descrição
        let subtitulo_descricao = document.getElementById('subtitulo_descricao');
        subtitulo_descricao.innerHTML = campos[tipo_atividade][1][1] + ':';
        //Data
        let data = document.getElementById('data');
        let [ano, mes, dia] = atividade['data'].split('-');
        data.innerHTML = `${dia}/${mes}/${ano}`;
        //Hora
        let hora = document.getElementById('hora');
        hora.innerHTML = atividade['hora'].substr(0, 5);
        //Define a variável que será usada para definir o countdown até a hora da atividade
        targetData = new Date(`${atividade['data']}T${atividade['hora']}-03:00`);
        //Criador
        let criador = document.getElementById('criador');
        criador.innerHTML = atividade['criador_id'];
        //Criador href
        let criador_href = document.getElementById('criador_href');
        criador_href.setAttribute('href', 'perfil.html?usuario=' + atividade['criador_id']);
        //Adicionais
        let adicionais_toggle = document.getElementById('adicionais_toggle');
        if (atividade['adicionais'] != '') {
            adicionais_toggle.hidden = false;
            let adicionais = document.getElementById('adicionais');
            adicionais.innerHTML = atividade['adicionais'];
        }
        //Vagas
        let vagas = document.getElementById('vagas');
        vagas.innerHTML = atividade['vagas'];
        //Participantes
        let area_participantes = document.getElementById('area_participantes');
        let nomes_participantes = [];
        if (participantes.length > 0) {
            for (let participante of participantes) {
                nomes_participantes.push(participante['usuario']);
                let nome_usuario = document.createTextNode(' ' + participante['usuario'] + ' ');
                area_participantes.appendChild(nome_usuario);
                let editar_atividade = document.createElement('a');
                editar_atividade.setAttribute('type', 'button');
                editar_atividade.className = 'btn btn-info';
                editar_atividade.setAttribute('href', 'perfil.html?usuario=' + participante['usuario']);
                let icone_usuario = document.createElement('i');
                icone_usuario.className = 'fa fa-user-circle';
                icone_usuario.setAttribute('aria-hidden', 'true');
                editar_atividade.appendChild(icone_usuario);
                area_participantes.appendChild(editar_atividade);
            }
        }
        else {
            let nao_ha_participantes = document.createElement('h6');
            nao_ha_participantes.innerHTML = 'Ainda não há participantes cadastrados nessa atividade';
            area_participantes.appendChild(nao_ha_participantes);
        }
        // Verifica se o usuário está logado
        const token = localStorage.getItem('token');
        fetch(backendAddress + 'accounts/token-auth/', {
            method: 'GET',
            headers: {
                'Authorization': tokenKeyword + token
            }
        })
            .then(response => {
            response.json().then(data => {
                const usuario = data.username;
                if (response.ok) { // LOGADO
                    let botoes_dinamicos = document.getElementById('botoes_dinamicos');
                    if (usuario == atividade['criador_id']) { // USUARIO É O CRIADOR DA ATIVIDADE
                        let espaco = document.createElement('br');
                        let editar_atividade = document.createElement('a');
                        editar_atividade.setAttribute('type', 'button');
                        editar_atividade.className = 'btn btn-warning ml-3';
                        editar_atividade.setAttribute('href', 'update.html?id_atividade=' + id_atividade);
                        editar_atividade.innerHTML = 'Editar atividade';
                        let remove_atividade = document.createElement('a');
                        remove_atividade.setAttribute('type', 'button');
                        remove_atividade.className = 'btn btn-danger ml-3';
                        remove_atividade.setAttribute('href', 'remove.html?id_atividade=' + id_atividade);
                        remove_atividade.innerHTML = 'Remover atividade';
                        botoes_dinamicos.appendChild(espaco);
                        botoes_dinamicos.appendChild(editar_atividade);
                        botoes_dinamicos.appendChild(remove_atividade);
                    }
                    else { // USUARIO NÃO É O CRIADOR DA ATIVIDADE
                        if (nomes_participantes.includes(usuario)) { //Se o usuário já participa da atividade
                            let cancelar_participar = document.createElement('a');
                            cancelar_participar.setAttribute('type', 'button');
                            cancelar_participar.className = 'btn btn-danger ml-3';
                            cancelar_participar.innerHTML = 'Cancelar Participação';
                            cancelar_participar.setAttribute('id', 'btnParticipar');
                            cancelar_participar.setAttribute('onclick', 'participar_atividade(' + id_atividade + ')');
                            botoes_dinamicos.appendChild(cancelar_participar);
                        }
                        else { // Se usuário ainda não participa da atividade
                            if (atividade['vagas'] > 0) { //Se ainda existem vagas na atividade
                                console.log("Pode participar");
                                let participar = document.createElement('a');
                                participar.setAttribute('type', 'button');
                                participar.className = 'btn btn-primary ml-3';
                                participar.innerHTML = 'Participar';
                                participar.setAttribute('id', 'btnParticipar');
                                participar.setAttribute('onclick', 'participar_atividade(' + id_atividade + ')');
                                botoes_dinamicos.appendChild(participar);
                            }
                        }
                    }
                }
            });
        })
            .catch(erro => {
            console.log('[setLoggedUser] deu erro: ' + erro);
        });
    });
};
/**
 * Função que permite que o usuário participe/cancela a participação em uma atividade.
 *
 * @param {number} id_atividade Identificador numérico da atividade
 *
 */
function participar_atividade(id_atividade) {
    const token = localStorage.getItem('token');
    fetch(backendAddress + 'psiuApiApp/participa_atividade/', {
        method: 'POST',
        body: JSON.stringify({
            'atividade': id_atividade
        }),
        headers: {
            'Authorization': tokenKeyword + token,
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
        if (response.ok) {
            location.reload();
            return response.json();
        }
        else {
            console.log(response.json());
            throw new Error('Falha na autenticação');
        }
    })
        .catch(erro => { console.log(erro); });
}
var x = setInterval(function () {
    // Hora atual e hora do countdown
    var now = new Date().getTime();
    var countDownDate = targetData;
    // Quanto tempo falta
    var distance = countDownDate - now;
    // Cálculo do tempo
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    //Mostra o tempo restante
    let dias = document.getElementById("dias");
    dias.innerHTML = days.toString();
    let horas = document.getElementById("horas");
    horas.innerHTML = hours.toString();
    let mins = document.getElementById("mins");
    mins.innerHTML = minutes.toString();
    let segundos = document.getElementById("segundos");
    segundos.innerHTML = seconds.toString();
    // If the count down is finished, write some text
    if (distance < 0) {
        clearInterval(x);
        dias.innerHTML = '0';
        horas.innerHTML = '0';
        mins.innerHTML = '0';
        segundos.innerHTML = '0';
    }
}, 1000);
