function click_logout() {
      const token = localStorage.getItem('token') as string; 
      console.log(token)

      fetch(backendAddress + 'accounts/token-auth/', { 
        method: 'DELETE', 
        headers: { 
          'Authorization': tokenKeyword + token, 
          'Content-Type': 'application/json' 
          } 
      }) 
      .then(response => { 
        if(response.ok) window.location.assign('/'); 
      }) 
      .catch(erro => { console.log(erro); }) 
}