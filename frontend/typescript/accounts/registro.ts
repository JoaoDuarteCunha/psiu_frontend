onload = () => { 
    (document.getElementById('btnRegistro') as HTMLInputElement).addEventListener('click', evento => { 
      evento.preventDefault(); 
      const username: String = (document.getElementById('username') as HTMLInputElement).value; 
      const password1: String = (document.getElementById('password1') as HTMLInputElement).value;
      const password2: String = (document.getElementById('password2') as HTMLInputElement).value; 
      const msg =(document.getElementById('msg') as HTMLDivElement); 
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
      .then((response: Response)  => { 
        if(response.ok) { 
            return response.json(); 
        } else {
          lidarErrosRegistro(response)
        } 
    }) 
    .then((data: { token: string }) => { 
        const token: string = data.token; 
        localStorage.setItem('token', token); 
        window.location.replace('perfil_editar.html'); 
    }) 
    .catch(erro => { console.log(erro) }) 
}); 
};

/**
 * Função que adiciona as mensagens de erro em caso de formulário inválido.
 *
 * @param {Response} response Retorno do formulário
 *
 */
async function lidarErrosRegistro(response: Response) {
  const errorData = await response.json();
  console.log(errorData)
  for (let field in errorData) {
    let errors = errorData[field];
    for (let error of errors) {
      (document.getElementById(field + '-erro') as HTMLInputElement).innerHTML = error; 
    }
  }
}