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
          msg.innerHTML = 'Temporário erro.' 
          throw new Error('Falha na autenticação'); 
        } 
    }) 
    .then((data: { token: string }) => { 
        const token: string = data.token; 
        localStorage.setItem('token', token); 
        window.location.replace('index.html'); 
    }) 
    .catch(erro => { console.log(erro) }) 
}); 
}; 