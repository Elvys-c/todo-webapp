class ItemTarefa {
    constructor(descricaoAtividade, status){
        this.descricaoAtividade = descricaoAtividade;
        this.idTarefa = Date.now();
        this.status = status;
    }
}

class Usuario {
    login = '';
    senha = '';
    todasTarefas = [];
    
    constructor (log, senha){
        this.login = log;
        this.senha = senha;
    }
}

var listaAtual = 'ativas';

function buscaUsuario(usuarioLogin){
    return JSON.parse((localStorage.getItem(usuarioLogin)));
}

function pagCadastro(){
    location.href="cadastro.html"
}

function cadastrar(){
    let log=document.getElementById("enterLogin").value;
    let senha=document.getElementById("enterPass").value;
    let user = new Usuario(log, senha);

    localStorage.setItem(user.login, JSON.stringify(user));

    location.href="login.html"
}

function login(){
    let loginVal=document.getElementById("login").value;
    let passVal=document.getElementById("password").value;
    let tmpUser = JSON.parse(localStorage.getItem(loginVal));
    
    if (tmpUser && tmpUser.senha === passVal) {
        sessionStorage.user = loginVal;
        location.href = "index.html";
    }else{
        alert("Falha de login.");
    }
}

function novaTarefa() {
    var novaTarefa = document.querySelector('#novaTarefa');       
    var itemTarefa = new ItemTarefa(novaTarefa.value, 'ativa');
    var tmpUserario = JSON.parse(localStorage.getItem(sessionStorage.user));
    
    tmpUserario.todasTarefas.push(itemTarefa);
    console.log(tmpUserario);
    localStorage.setItem(tmpUserario.login, JSON.stringify(tmpUserario));
    
    tarefasAtivas();
}

function tarefasTodas() {
    var lista = document.querySelector('#listaTarefas');
    var itemLista = null;
    var tarefas = JSON.parse(localStorage.getItem(sessionStorage.user)).todasTarefas;

    lista.replaceChildren();

    for(let i = 0; i < tarefas.length; i++){
        
        itemLista = document.createElement('li');
        itemLista.innerHTML = tarefas[i].descricaoAtividade;
        itemLista.style.textDecoration = (tarefas[i].status == 'ativa') ? 'none' : 'line-through';
        itemLista.id = tarefas[i].idTarefa;
        itemLista.dataset.status = tarefas[i].status;

        iconeEditar = document.createElement('span');
        iconeEditar.innerHTML = "edit";
        iconeEditar.onclick = function(){mostraDiv(tarefas[i].idTarefa)};
        iconeEditar.className  = "material-symbols-outlined span-icone-editar";

        iconeRemove = document.createElement('span');
        iconeRemove.innerHTML = "delete";
        iconeRemove.onclick = function(){ removeItemLi(tarefas[i].idTarefa)};
        iconeRemove.className = "material-symbols-outlined span-icone-cocluida";
        
        itemLista.appendChild(iconeEditar);
        itemLista.appendChild(iconeRemove);

        lista.appendChild(itemLista);
    }

    listaAtual = 'todas';

}

function tarefasAtivas() {
    var lista = document.querySelector('#listaTarefas');
    var itemLista = null;
    var tarefas = JSON.parse(localStorage.getItem(sessionStorage.user)).todasTarefas;

    lista.replaceChildren();

    for(let i = 0; i < tarefas.length; i++){
        if (tarefas[i].status === 'ativa') {
            
            itemLista = document.createElement('li');
            itemLista.innerHTML = tarefas[i].descricaoAtividade;
            itemLista.id = tarefas[i].idTarefa;
            itemLista.dataset.status = tarefas[i].status;
            
            iconeEditar = document.createElement('span');
            iconeEditar.innerHTML = "edit";
            iconeEditar.onclick = function(){mostraDiv(tarefas[i].idTarefa)};
            iconeEditar.className  = "material-symbols-outlined span-icone-editar";

            iconeRemove = document.createElement('span');
            iconeRemove.innerHTML = "delete";
            iconeRemove.onclick = function(){ removeItemLi(tarefas[i].idTarefa)};
            iconeRemove.className = "material-symbols-outlined span-icone-cocluida";
            
            itemLista.appendChild(iconeEditar);
            itemLista.appendChild(iconeRemove)
            
            lista.appendChild(itemLista);
        }
    }

    listaAtual = 'ativas';
}

function tarefasCompletas() {
    var lista = document.querySelector('#listaTarefas');
    var itemLista = null;
    var tarefas = JSON.parse(localStorage.getItem(sessionStorage.user)).todasTarefas;

    lista.replaceChildren();

    for(let i = 0; i < tarefas.length; i++){
        
        if (tarefas[i].status === 'completa') {
            
            itemLista = document.createElement('li');
            itemLista.innerHTML = tarefas[i].descricaoAtividade;
            itemLista.style.textDecoration = 'line-through';
            itemLista.id = tarefas[i].idTarefa;
            itemLista.dataset.status = tarefas[i].status;
            
            iconeEditar = document.createElement('span');
            iconeEditar.innerHTML = "edit";
            iconeEditar.onclick = function(){mostraDiv(tarefas[i].idTarefa)};
            iconeEditar.className  = "material-symbols-outlined span-icone-editar";

            iconeRemove = document.createElement('span');
            iconeRemove.innerHTML = "delete";
            iconeRemove.onclick = function(){ removeItemLi(tarefas[i].idTarefa)};
            iconeRemove.className = "material-symbols-outlined span-icone-cocluida";
            
            itemLista.appendChild(iconeEditar);
            itemLista.appendChild(iconeRemove)
            
            lista.appendChild(itemLista);
        }
    }

    listaAtual = 'completas';
}

function mostraDiv(itemListaId) {
    var itemLista = document.getElementById(itemListaId);
    var inputsRadios = document.querySelectorAll('#inputRadioAtiva, #inputRadioCompleta');
    var inputNovaDescricao = document.querySelector('#novaDescricao');
        inputNovaDescricao.setAttribute('idLista', itemListaId);
        inputNovaDescricao.value = itemLista.firstChild.data;


    for (const inputRadio of inputsRadios) {
        if (itemLista.dataset.status === inputRadio.value) {
            inputRadio.checked = "checked";
            break;
        }
    }

    document.getElementById("popup").style.display = "block";
    
}

function removeItemLi(tarefaId) {
    var tarefaARemover = document.getElementById(tarefaId);
    var lista = document.getElementById('listaTarefas');
    var usuario = JSON.parse(localStorage.getItem(sessionStorage.user));
    var todasTarefas = usuario.todasTarefas;

    for(let i = 0; i < todasTarefas.length; i++){
        if (todasTarefas[i].idTarefa === tarefaId) {

            todasTarefas.splice(i, 1);
            break;
        }
    }

    lista.removeChild(tarefaARemover);
    localStorage.setItem(sessionStorage.user, JSON.stringify(usuario));
}

function atualizaLi() {
    var inputNovaDescricao = document.querySelector('#novaDescricao');
    var inputStatus = document.querySelectorAll('#inputRadioAtiva, #inputRadioCompleta');
    var idDoItemDaLista = inputNovaDescricao.getAttributeNode("idLista").value;
    var itemLista = document.getElementById(idDoItemDaLista);
    let usuario = JSON.parse(localStorage.getItem(sessionStorage.user));
    
    for (const input of inputStatus) {
        if(input.checked){
            inputStatus = input.value;
            break;
        }
    }
    
    if (!inputNovaDescricao.value == '') {

        itemLista.innerHTML = inputNovaDescricao.value;
        
        for(let i = 0; i < usuario.todasTarefas.length; i++) {
            if (usuario.todasTarefas[i].idTarefa == idDoItemDaLista) {
                
                usuario.todasTarefas[i].descricaoAtividade = inputNovaDescricao.value;
                usuario.todasTarefas[i].status = inputStatus;                
                localStorage.setItem(usuario.login, JSON.stringify(usuario));
            }
        }
    }
    
    escondeDiv();

    if (listaAtual === 'completas') {
        tarefasCompletas();
    }else if(listaAtual === 'ativas'){
        tarefasAtivas();
    }else if(listaAtual === 'todas'){
        tarefasTodas();
    }
}    

function escondeDiv() {
    document.getElementById("popup").style.display = "none";
}


function efeitoBtn(btnClicado){
    var todosBtn = document.querySelectorAll('#tarefasTodas, #tarefasAtivas, #tarefasCompletas');

    for (let index = 0; index < todosBtn.length; index++) {        
        if (todosBtn[index].id === btnClicado.id) {
            todosBtn[index].className = 'btn-div-ativo';
        }else{
            todosBtn[index].className = "btn-div";
        }
    }

}

function sair() {
    sessionStorage.clear();
    location.href = "login.html";
}