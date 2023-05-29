var spanDiaMesAno = document.getElementById('dia-mes-ano');
var spanDiaSemana = document.getElementById('dia-semana');
var tempo = new Date();

switch (tempo.getDay()) {
    case 0:
        spanDiaSemana.innerHTML = "Domingo";
        break;
    
    case 1:
        spanDiaSemana.innerHTML = "Segunda-Feira";
        break;
    
    case 2:
        spanDiaSemana.innerHTML = "Terça-Feira";
        break;
    
    case 3:
        spanDiaSemana.innerHTML = "Quarta-Feira";
        break;
    
    case 4:
        spanDiaSemana.innerHTML = "Quinta-Feira";
        break;
    
    case 5:
        spanDiaSemana.innerHTML = "Sexta-Feira";
        break;
    
    case 6:
        spanDiaSemana.innerHTML = "Sábado";
        break;

    default:
        break;
}

spanDiaMesAno.innerHTML = tempo.getDate()+"/"+tempo.getMonth()+"/"+tempo.getFullYear();
