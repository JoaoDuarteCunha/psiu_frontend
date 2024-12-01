"use strict";
onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id_atividade = urlParams.get('id_atividade');
    //Botão de cancelar
    let botao_cancelar = document.getElementById("cancelar");
    botao_cancelar.setAttribute('href', 'atividade.html?id_atividade=' + id_atividade);
    //Remover
    document.getElementById('btnRemover').addEventListener('click', evento => {
        const token = localStorage.getItem('token');
        fetch(backendAddress + "psiuApiApp/lista/", {
            method: 'DELETE',
            body: JSON.stringify(id_atividade),
            headers: { 'Authorization': tokenKeyword + token, 'Content-Type': 'application/json', }
        })
            .then(response => {
            if (response.ok) {
                window.location.assign('/');
            }
            else {
                alert('Não foi possível remover essa atividade');
            }
        })
            .catch(error => { console.log(error); });
    });
};
