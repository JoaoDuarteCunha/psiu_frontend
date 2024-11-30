onload = () => { 
    (document.getElementById('insere') as HTMLButtonElement).addEventListener('click', evento => { 
      evento.preventDefault(); 
      const elements = (document.getElementById('meuFormulario') as HTMLFormElement).elements; 
      let data: Record<string, string> = {}; 
      for (let i = 0; i < elements.length; i++) { 
        const element = elements[i] as HTMLInputElement; 
        data[element.name] = element.value; 
      } 
      data['tipo_atividade'] = 'carona';
      data['criador_id'] = '1';
      const token = localStorage.getItem('token') as string;
      
      fetch(backendAddress + "psiuApiApp/uma_atividade/", { 
        method: 'POST', body: JSON.stringify(data), 
        headers: {
          'Authorization': token, 
          'Content-Type': 'application/json' 
        } 
      }) 
      .then(response => { 
        if(response.ok) { 
          (document.getElementById('mensagem') as HTMLDivElement).innerHTML = 'Dados inseridos com sucesso'
        } else { 
          (document.getElementById('mensagem') as HTMLDivElement).innerHTML = 'Dados inseridos com erro' 
        } 
      }) 
      .catch(error => { console.log(error) }) 
    }); 
  } 