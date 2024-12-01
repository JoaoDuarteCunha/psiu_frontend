onload = () => {
    //Tipo da atividade
    const urlParams = new URLSearchParams(window.location.search); 
    const tipo_atividade = urlParams.get('tipo_atividade') as string; 

    //Imagem para o tipo da atividade
    let imagem = document.getElementById("imagem_atividade") as HTMLImageElement;
    imagem.setAttribute('src', 'images/' + tipo_atividade + '.png')

    //Texto para o tipo de atividade
    const nome_tipo_atividade = document.getElementById('nome_atividade') as HTMLElement;
    nome_tipo_atividade.innerText = nome_atividade[tipo_atividade]; 

    //Adiciona os campos específicos para cada tipo de atividade
    adicionaCamposDinamicos_insere(tipo_atividade);

    //Botão de cancelar
    let botao_cancelar = document.getElementById("cancelar") as HTMLElement;
    botao_cancelar.setAttribute('href', 'lista.html?tipo_atividade=' + tipo_atividade);

    //Insere 
    (document.getElementById('insere') as HTMLButtonElement).addEventListener('click', evento => { 
      evento.preventDefault(); 

      const elements = (document.getElementById('meuFormulario') as HTMLFormElement).elements; 
      
      let data: Record<string, string> = {}; 
      for (let i = 0; i < elements.length; i++) { 
        const element = elements[i] as HTMLInputElement; 
        data[element.name] = element.value; 
        console.log(element.name)
        console.log(element.value)
        
      }
      data['tipo_atividade'] = tipo_atividade;
      const token = localStorage.getItem('token') as string;
      fetch(backendAddress + "psiuApiApp/uma_atividade/", { 
        method: 'POST', body: JSON.stringify(data), 
        headers: {
          'Authorization': tokenKeyword + token, 
          'Content-Type': 'application/json' 
        } 
      }) 
      .then(response => { 
        if(response.ok) { 
          window.location.assign('lista.html?tipo_atividade=' + tipo_atividade); 
        } else { 
          (document.getElementById('mensagem') as HTMLDivElement).innerHTML = 'Dados inseridos com erro' 
        } 
      }) 
      .catch(error => { console.log(error) }) 
    }); 
  } 

function adicionaCamposDinamicos_insere(tipo_atividade: string) {
  let campos_atividade = campos[tipo_atividade];

  let campos_dinamicos = (document.getElementById('campos_dinamicos') as HTMLDivElement);

  for (let campo of campos_atividade) {
    let grupo_campo = document.createElement('div')
    grupo_campo.className = 'form-group'

    let label_campo = document.createElement('label')
    label_campo.setAttribute('for', 'input' + campo[0])
    label_campo.innerHTML = campo[1]
    grupo_campo.appendChild(label_campo)

    let formulario_campo = document.createElement('input')
    formulario_campo.className = 'form-control'
    formulario_campo.setAttribute('id', 'input' + campo[0])
    formulario_campo.setAttribute('name', campo[0])
    grupo_campo.appendChild(formulario_campo)

    campos_dinamicos.appendChild(grupo_campo)
  }


}