onload = () => {

     // Verifica o username e coloca no cabeçalho da página 
     const token = localStorage.getItem('token') as string;
     fetch(backendAddress + 'accounts/token-auth/', { 
     method: 'GET', 
     headers: { 
     'Authorization': tokenKeyword + token 
     } 
     }) 
     .then(response => { 
         response.json().then(data => { 
             const usuario = data; 
             if(response.ok) { // LOGADO
                atualizaInfoUsuario(usuario.username)
             } else {
                window.location.assign('login.html');
             }
        })
     })
     .catch(erro => { 
        console.log('[setLoggedUser] deu erro: ' + erro); 
    }); 

        (document.getElementById('btnConfirmar') as HTMLButtonElement) 
        .addEventListener('click', (evento) => { 
        evento.preventDefault(); 
        const form = document.getElementById('meuFormulario') as HTMLFormElement; 
        const elements = form.elements; 
        let data: Record<string, string> = {}; 
        for (let i = 0; i < elements.length; i++) { 
            const element = elements[i] as HTMLInputElement; 
            data[element.name] = element.value; 
        }

        const token = localStorage.getItem('token') as string;
        fetch(backendAddress + "accounts/perfil/", { 
            method: 'PUT', 
            body: JSON.stringify(data), 
            headers: { 'Authorization': tokenKeyword + token, 'Content-Type': 'application/json' }, 
        }) 
        .then(response => { 
            if(response.ok) { 
                window.location.assign('index.html'); 
            } else { 
            (document.getElementById('mensagem') as HTMLDivElement).innerHTML = 'Erro: '  
            + response.status + " " + response.statusText 
            } 
        }) 
        .catch(erro => { console.log('Deu erro: ' + erro) })
    });

} 

function atualizaInfoUsuario(username: string) {
    fetch(backendAddress + 'accounts/perfil/' + username + '/') 
    .then(response => response.json()) 
    .then(info_usuario => { 

        let campos_perfil = ['first_name', 'last_name', 'email']
        for(let i=0; i< campos_perfil.length; i++) {
            (document.getElementById(campos_perfil[i]) as HTMLInputElement).value = info_usuario[campos_perfil[i]]; 
        } 
    }) 
    .catch(erro => { 
        console.log('Deu erro: ' + erro); 
    }); 
};