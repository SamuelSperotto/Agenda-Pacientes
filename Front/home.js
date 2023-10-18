var apiUrl = "http://localhost:8080/patient/all"
fetch(apiUrl)
    .then(response => response.json())
    .then(dados => {
        displayData(dados)
    })
    .catch(error => console.error('Erro na requisição:', error));

function displayData(dados) {
    const table = document.getElementById('agenda')
    const tbody = table.querySelector('tbody')

    dados.forEach(item => {
        const row = document.createElement('tr')
        row.innerHTML = `<td><input type="checkbox" class="check"></td>
                         <td id="idPacienteTd">${item.idPaciente}</td>
                         <td>${item.nome}</td>
                         <td>${item.horario}</td>
                         <td>${item.procedimento}</td>
                         <td>${item.dia}</td>`
        tbody.appendChild(row)
        table.appendChild(tbody)
    });

}
var button1 = document.querySelector("#add")
button1.addEventListener('click', (event) => {
    event.preventDefault()
    var form = document.querySelector("#formulario")
    var paciente = getPaciente(form)

    apiUrl = "http://localhost:8080/patient"
    fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paciente)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Resposta do backend:', data);
            location.reload()

        })
        .catch(error => console.error('Erro na requisição:', error));
})
function getPaciente(form) {
    var paciente = {
        idPaciente: " ",
        nome: form.nome.value,
        dia: form.descricao.value,
        horario: form.prazo.value,
        procedimento: form.tag.value
    }
    return paciente
}

var button2 = document.querySelector("#del")
button2.addEventListener('click', (event) => {
    event.preventDefault()
    var tables = document.querySelectorAll("#table");
    apiUrl = "http://localhost:8080/patient/delete/"

    for (let i = 0; i < tables.length; i++) {
        const table = tables[i];
        var checkboxes = table.querySelectorAll('input[type="checkbox"]');

        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                var row = checkbox.closest('tr')
                var idElement = row.querySelector('#idPacienteTd')
                var id = idElement.textContent

                checkbox.parentElement.parentElement.remove();

                fetch(apiUrl + id, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Erro na requisição da API')
                        }
                    })
                    .then(data => {
                        console.log('Resposta do backend:', data);
                        location.reload()

                    })
            }
        });
    }
});

const edit = document.querySelector("#modal")
var button3 = document.querySelector("#edt")
var idPaciente =""
button3.addEventListener('click', (event) => {
    event.preventDefault()
    var tables = document.querySelectorAll("#table");
    apiUrl = "http://localhost:8080/patient"

    for (let i = 0; i < tables.length; i++) {
        const table = tables[i];
        var checkboxes = table.querySelectorAll('input[type="checkbox"]');

        checkboxes.forEach((checkbox) => {

            if (checkbox.checked) {
                var row = checkbox.closest('tr')
                var idElement = row.querySelector('#idPacienteTd')
                idPaciente = idElement.textContent//pega o id da checkbox        
                edit.showModal()
            }
        })
    }
})
var button4 = document.querySelector("#send-edit")
button4.addEventListener('click',(event)=>{
    var formDialog = edit.querySelector("#formulario")//pega as informações do dialog
    var pacienteEdit = getDialogData(formDialog,idPaciente) //cria um objeta para enviar no body da requisição
    fetch(apiUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pacienteEdit)
    })
    .then(response => response.json())
    .then(dados => {
        location.reload()
    })
    .catch(error => console.error('Erro na requisição:', error));
    
})                    
function getDialogData(formDialog , idPaciente) {
    var pacienteDialog ={
        idPaciente: idPaciente, 
        nome: formDialog.nome.value,
        dia: formDialog.descricao.value,
        horario: formDialog.prazo.value,
        procedimento: formDialog.tag.value
    }
    return pacienteDialog
}
var button5 = document.querySelector("#cancel-edit")
button5.addEventListener('click', (event) => {
    edit.close()
})




var modal2 = document.querySelector("#modal2")
var button6 = document.querySelector("#bus")
button6.addEventListener('click',(event)=>{
    modal2.showModal()
})
var button7 = document.querySelector("#close")
button7.addEventListener('click',(event)=>{
    modal2.close()
    const corpoDaTabela = modal2.querySelector("tbody");
        while (corpoDaTabela.firstChild) {
        corpoDaTabela.removeChild(corpoDaTabela.firstChild);
    }
})
modal2 = document.querySelector("#modal2");
const idDialog = modal2.querySelector("#formulario");
const inputField = idDialog.querySelector("#ID");

var valorDoCampo = inputField.value;


apiUrl = "http://localhost:8080/patient/searchById/"
var button8 = document.querySelector("#send-id")
button8.addEventListener('click',(event)=>{
    fetch(apiUrl + inputField.value,{
        method:'GET',
        headers:{ 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(dados => {
        displayDataDialog(dados)
    })
    .catch(error => console.error('Erro na requisição:', error));
})

function displayDataDialog(dados){
    const table = modal2.querySelector("#agenda")
    const tbody = table.querySelector("#table")

    dados.forEach(item => {
        const row = document.createElement('tr')
        row.innerHTML = `<td><input type="checkbox" class="check"></td>
                         <td id="idPacienteTd">${item.idPaciente}</td>
                         <td>${item.nome}</td>
                         <td>${item.horario}</td>
                         <td>${item.procedimento}</td>
                         <td>${item.dia}</td>`
        tbody.appendChild(row)
        table.appendChild(tbody)
    });
            
}
