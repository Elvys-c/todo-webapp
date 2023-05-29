const temperatura = document.querySelector('#temperatura');
const clima = document.querySelector('#clima');

function pesquisaClima(){
  var input = document.querySelector('#nomeCidade');
  var input = "Campo Grande";

//   if (!input.value) {
//     const div = document.querySelector('#aviso');
//     div.style.display = 'block';
//     return 
//   }

//   buscaDadosDoClima(input.value);
  buscaDadosDoClima(input);

}


async function buscaDadosDoClima(nomeCidade) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(nomeCidade)}&units=metric&appid=795b1dcdec46078dd3dfb567d089110b`;

  try {
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data?.cod && data.cod === "404") {
          console.log("Local não encontrado!");
        }

        mostraDadosDoClima(data);
      });
  } catch (error) {
    alert(error);
  }
}

function mostraDadosDoClima(data) {
  // console.log(data);
  temperatura.innerHTML = Math.floor(data.main.temp)+"° C";
  clima.innerHTML = data.weather[0].main;
}