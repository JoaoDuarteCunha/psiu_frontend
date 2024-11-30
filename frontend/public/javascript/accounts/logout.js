"use strict";
function click_logout() {
    const token = localStorage.getItem('token');
    console.log(token);
    fetch(backendAddress + 'accounts/token-auth/', {
        method: 'DELETE',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
        if (response.ok)
            window.location.assign('/');
    })
        .catch(erro => { console.log(erro); });
}
