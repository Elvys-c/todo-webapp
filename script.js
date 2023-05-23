var itemTarefa = {
    descricaoAtividade : '',
    idTarefa: '',
    status: ''
};

var tarefasDoUsuario = {
    login: 'teste',
    senha: '',
    todasTarefas: []
};

function novaTarefa() {
    var novaTarefa = document.querySelector('#novaTarefa');
       
    itemTarefa = {};
    itemTarefa.descricaoAtividade = novaTarefa.value;
    itemTarefa.idTarefa = Date.now();
    itemTarefa.status = true;
    
    tarefasDoUsuario.todasTarefas.push(itemTarefa);
    localStorage.setItem("teste", JSON.stringify(tarefasDoUsuario));
    
    tarefasAtivas();
}

function tarefasTodas() {
    var usuario = JSON.parse(localStorage.getItem("teste"));
    var lista = document.querySelector('#listaTarefas');
    var itemLista = null;
    var tarefas = usuario.todasTarefas;   
    
    lista.replaceChildren([])

    for(let i = 0; i < tarefas.length; i++){
        itemLista = document.createElement('li');
        itemLista.innerHTML = tarefas[i].descricaoAtividade;
        itemLista.onclick = function(){mostraDiv(this)};
        lista.appendChild(itemLista);
    }
    
}

function tarefasAtivas() {
    var usuario = JSON.parse(localStorage.getItem("teste"));
    var lista = document.querySelector('#listaTarefas');
    var itemLista = null;
    var tarefas = usuario.todasTarefas;
    
    lista.replaceChildren([])

    for(let i = 0; i < tarefas.length; i++){
        if (tarefas[i].status) {
            itemLista = document.createElement('li');
            itemLista.innerHTML = tarefas[i].descricaoAtividade;
            itemLista.id = tarefas[i].idTarefa;
            itemLista.onclick = function(){mostraDiv(this)};
            lista.appendChild(itemLista);
        }
    }
}

function tarefasCompletas() {
    var lista = document.querySelector('#listaTarefas');
    lista.replaceChildren([])
}


function mostraDiv(itemLista) {
    var inputNovaDescricao = document.querySelector('#novaDescricao');

    inputNovaDescricao.setAttribute('idLista', itemLista.id);
    inputNovaDescricao.value = itemLista.innerHTML;

    document.getElementById("popup").style.display = "block";
    
}

function atualizaLi() {
    var inputNovaDescricao = document.querySelector('#novaDescricao');
    var idDoItemDaLista = inputNovaDescricao.getAttributeNode("idLista").value;
    var itemLista = document.getElementById(idDoItemDaLista);
    var usuario = JSON.parse(localStorage.getItem("teste"));
    
    if (!inputNovaDescricao.value == '') {

        itemLista.innerHTML = inputNovaDescricao.value;
        
        for(let i = 0; i < usuario.todasTarefas.length; i++) {
            if (usuario.todasTarefas[i].idTarefa == idDoItemDaLista) {
                
                usuario.todasTarefas[i].descricaoAtividade = inputNovaDescricao.value;
                
                localStorage.setItem("teste", JSON.stringify(usuario));
                
                console.log(usuario.todasTarefas[i]);
            }
        }

        escondeDiv();
    }
}    

function escondeDiv() {
    document.getElementById("popup").style.display = "none";
}