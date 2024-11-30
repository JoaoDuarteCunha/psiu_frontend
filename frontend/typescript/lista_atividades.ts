function exibeListaDeAtividades(tipo_atividade: string) {
    fetch(backendAddress + "psiuApiApp/lista/" + tipo_atividade + "/") 
    .then(response => response.json()) 
    .then(atividades => { 
        
        if (atividades.length > 0) {
            let container_cards = document.getElementById('container_cards') as HTMLDivElement;
            container_cards.innerHTML = ""

            for (let atividade of atividades) { 
                
                const formatacao = document.createElement('div') as HTMLDivElement;
                formatacao.className = 'col-auto';
                
                const borda_carta = document.createElement('div') as HTMLDivElement;
                borda_carta.className = 'card border-dark mb-3';
                
                const corpo_carta = document.createElement('div') as HTMLDivElement;
                corpo_carta.className = 'card-body'
                
                const titulo = document.createElement('h5');
                titulo.className = 'card-title';
                titulo.textContent = campos[tipo_atividade][0][1] + ': ' + atividade[campos[tipo_atividade][0][0]];
                
                const subtitulo = document.createElement('h6');
                subtitulo.className = 'card-subtitle mb-2 text-muted';
                subtitulo.textContent = campos[tipo_atividade][1][1] + ': ' + atividade[campos[tipo_atividade][1][0]];
                
                //DATA
                const data = document.createElement('h6');
                data.className = 'card-subtitle mb-2 text-muted';
                let [ano, mes, dia] = atividade['data'].split('-');
                let data_formatada = `${dia}/${mes}/${ano}`;
                data.textContent = 'Data: ' + data_formatada;
                
                //HORA
                const hora = document.createElement('h6');
                hora.className = 'card-subtitle mb-2 text-muted';
                hora.textContent = 'Horário: ' + atividade['hora'].substr(0, 5) + 'h';
                
                const botao = document.createElement('a');
                botao.className = 'btn btn-primary';
                botao.setAttribute('href', 'atividade.html?id_atividade=' + atividade['id'])
                botao.innerHTML = 'Mais informações'

                corpo_carta.appendChild(titulo)
                corpo_carta.appendChild(subtitulo)
                corpo_carta.appendChild(data)
                corpo_carta.appendChild(hora)
                corpo_carta.appendChild(botao)

                borda_carta.appendChild(corpo_carta)
                formatacao.appendChild(borda_carta)

                container_cards.appendChild(formatacao);
            }
        } else {
            let sem_atividades = document.getElementById('sem_cadastradas') as HTMLElement;
            sem_atividades.hidden = false;
        }
    }) 
    .catch(error => { 
        let sem_atividades = document.getElementById('sem_cadastradas') as HTMLElement;
        sem_atividades.hidden = false;
    }); 
  } 

  
onload = function () { 
    const urlParams = new URLSearchParams(window.location.search); 
    const tipo_atividade = urlParams.get('tipo_atividade') as string; 
    
    //Imagem para o tipo da atividade
    let imagem = this.document.getElementById("imagem_atividade") as HTMLImageElement;
    imagem.setAttribute('src', 'images/' + tipo_atividade + '.png')

    //Texto para o tipo de atividade
    const nome_tipo_atividade = document.getElementById('nome_atividade') as HTMLElement;
    nome_tipo_atividade.innerText = nome_atividade[tipo_atividade]; 
    
    //Botão de criar atividade
    let botao_criar_atividade = this.document.getElementById("criar_atividade") as HTMLElement;
    botao_criar_atividade.setAttribute('href', 'insere.html?tipo_atividade=' + tipo_atividade)

    //Redireciona se o tipo de atividade é inválido
    if (tipos_atividade.includes(tipo_atividade) == false) {
        window.location.pathname = '/index.html'
    }

    exibeListaDeAtividades(tipo_atividade);
} 