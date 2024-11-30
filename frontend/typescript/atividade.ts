var targetData = new Date();

onload = function() {
    const urlParams = new URLSearchParams(window.location.search); 
    const id_atividade = urlParams.get('id_atividade') as string; 

    fetch(backendAddress + "psiuApiApp/uma_atividade/" + id_atividade + "/") 
    .then(response => response.json()) 
    .then(resp => { 
        console.log(resp)
        let atividade = resp['atividade']
        let participantes = resp['participantes']

        let tipo_atividade = atividade['tipo_atividade']

        //Imagem para o tipo da atividade
        let imagem = this.document.getElementById("imagem_atividade") as HTMLImageElement;
        imagem.setAttribute('src', 'images/' + tipo_atividade + '.png')

        //Texto para o tipo de atividade
        const nome_tipo_atividade = document.getElementById('nome_atividade') as HTMLElement;
        nome_tipo_atividade.innerText = nome_atividade[tipo_atividade]; 

        //Botão de voltar
        let botao_voltar = document.getElementById("voltar") as HTMLElement;
        botao_voltar.setAttribute('href', 'lista.html?tipo_atividade=' + tipo_atividade);

        //Título
        let titulo = document.getElementById('titulo') as HTMLElement;
        let text_titulo = document.createTextNode(' ' + atividade[campos[tipo_atividade][0][0]]);
        titulo.appendChild(text_titulo)

        //Título descrição
        let titulo_descricao = document.getElementById('titulo_descricao') as HTMLElement;
        titulo_descricao.innerHTML = campos[tipo_atividade][0][1] + ':'

        //Subtítulo
        let subtitulo = document.getElementById('subtitulo') as HTMLElement;
        let text_subtitulo = document.createTextNode(' ' + atividade[campos[tipo_atividade][1][0]]);
        subtitulo.appendChild(text_subtitulo)

        //Subtítulo descrição
        let subtitulo_descricao = document.getElementById('subtitulo_descricao') as HTMLElement;
        subtitulo_descricao.innerHTML = campos[tipo_atividade][1][1] + ':'
        
        //Data
        let data = document.getElementById('data') as HTMLSpanElement;
        let [ano, mes, dia] = atividade['data'].split('-');
        data.innerHTML = `${dia}/${mes}/${ano}`;
        
        //Hora
        let hora = document.getElementById('hora') as HTMLSpanElement;
        hora.innerHTML = atividade['hora'].substr(0, 5)

        //Define a variável que será usada para definir o countdown até a hora da atividade
        targetData = new Date(`${atividade['data']}T${atividade['hora']}-03:00`);

        //Criador
        let criador = document.getElementById('criador') as HTMLSpanElement;
        criador.innerHTML = atividade['criador_id']
        
        //Criador href
        let criador_href = document.getElementById('criador_href') as HTMLElement;
        criador_href.setAttribute('href', 'perfil.html?usuario=' + atividade['criador_id'])
        
        //Adicionais
        let adicionais_toggle = document.getElementById('adicionais_toggle') as HTMLElement;
        if (atividade['adicionais'] != '') {
            adicionais_toggle.hidden = false
            let adicionais = document.getElementById('adicionais') as HTMLParagraphElement;
            adicionais.innerHTML = atividade['adicionais']
        }

        //Vagas
        let vagas = document.getElementById('vagas') as HTMLSpanElement;
        vagas.innerHTML = atividade['vagas'];
        
        //Participantes
        let nomes_participantes = [] as Array<string>
        if (participantes.length > 0) {
            for (let participante of participantes) {
                nomes_participantes.push(participante['usuario'])
            }
        }
        
        // Verifica se o usuário está logado
        const token = localStorage.getItem('token') as string;
        fetch(backendAddress + 'accounts/token-auth/', { 
        method: 'GET', 
        headers: { 
        'Authorization': tokenKeyword + token 
        } 
        }) 
        .then(response => { 
            response.json().then(data => { 
                const usuario = data.username;
                if(response.ok) { // LOGADO
                    
                    let botoes_dinamicos = document.getElementById('botoes_dinamicos') as HTMLDivElement;
                    if (usuario == atividade['criador_id']) { // USUARIO É O CRIADOR DA ATIVIDADE
                        let espaco = document.createElement('br') as HTMLBRElement;
                        
                        let editar_atividade = document.createElement('a') as HTMLElement;
                        editar_atividade.setAttribute('type', 'button');
                        editar_atividade.className = 'btn btn-warning ml-3';
                        editar_atividade.setAttribute('href', 'update.html?id_atividade=' + id_atividade)
                        editar_atividade.innerHTML = 'Editar atividade'

                        let remove_atividade = document.createElement('a') as HTMLElement;
                        remove_atividade.setAttribute('type', 'button');
                        remove_atividade.className = 'btn btn-danger ml-3';
                        remove_atividade.setAttribute('href', 'remover.html?id_atividade=' + id_atividade)
                        remove_atividade.innerHTML = 'Remover atividade'

                        botoes_dinamicos.appendChild(espaco);
                        botoes_dinamicos.appendChild(editar_atividade);
                        botoes_dinamicos.appendChild(remove_atividade);
                    } else { // USUARIO NÃO É O CRIADOR DA ATIVIDADE
                        console.log("NAO SOU O CRIADOR")
                        if (nomes_participantes.includes(usuario)) { //Se o usuário já participa da atividade
                            console.log('Já participo')

                            let cancelar_participar = document.createElement('a') as HTMLElement;
                            cancelar_participar.setAttribute('type', 'button');
                            cancelar_participar.className = 'btn btn-danger ml-3';
                            cancelar_participar.innerHTML = 'Cancelar Participação'
                            cancelar_participar.setAttribute('id', 'btnParticipar')
                            cancelar_participar.setAttribute('onclick', 'participar_atividade(' + id_atividade + ')')

                            botoes_dinamicos.appendChild(cancelar_participar);

                        } else { // Se usuário ainda não participa da atividade
                            if (atividade['vagas'] > 0) { //Se ainda existem vagas na atividade
                                console.log("Pode participar")
                                
                                let participar = document.createElement('a') as HTMLElement;
                                participar.setAttribute('type', 'button');
                                participar.className = 'btn btn-primary ml-3';
                                participar.innerHTML = 'Participar'
                                participar.setAttribute('id', 'btnParticipar')
                                participar.setAttribute('onclick', 'participar_atividade(' + id_atividade + ')')
                                
                                botoes_dinamicos.appendChild(participar);
                            }
                        }

                    }
 


                }
            }) 
        }) 
        .catch(erro => { 
            console.log('[setLoggedUser] deu erro: ' + erro); 
        }); 
        

    });

}

function participar_atividade(id_atividade:number) {
    const token = localStorage.getItem('token') as string;
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
    .then((response: Response)  => { 
    if(response.ok) { 
        location.reload();
        return response.json(); 
    } else {
        console.log(response.json())
        throw new Error('Falha na autenticação'); 
    } 
})
.catch(erro => { console.log(erro) }) 
}



  var x = setInterval(function() {

    // Hora atual e hora do countdown
    var now = new Date().getTime();
    var countDownDate = targetData as any;

    // Quanto tempo falta
    var distance = countDownDate - now;
  
    // Cálculo do tempo
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
    //Mostra o tempo restante
    let dias = document.getElementById("dias") as HTMLElement
    dias.innerHTML = days.toString()
    let horas = document.getElementById("horas") as HTMLElement
    horas.innerHTML = hours.toString()
    let mins = document.getElementById("mins") as HTMLElement
    mins.innerHTML = minutes.toString()
    let segundos = document.getElementById("segundos") as HTMLElement
    segundos.innerHTML = seconds.toString()
  
    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      dias.innerHTML = '0'
      horas.innerHTML = '0'
      mins.innerHTML = '0'
      segundos.innerHTML = '0'
    }
  }, 1000);

  