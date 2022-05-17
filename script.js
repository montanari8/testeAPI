const showData = (result) => {
    for (let i = 0; i < result.results.length; i = i + 1) {
        //console.log(result.results[i].name)
        let imprimi = result.results[i].name;
        document.querySelector('#star-wars').innerHTML += `<p>${imprimi}</p>`;
    }
}
const vaiPegar = (url) => {
    const retornoDeChamadaInicial = (resolve, reject) => {
        fetch(url)
            .then((response) => {
                if (!response.ok) throw new Error("Erro ao executar requisição, status ' " + response.status);
                return response.json();
            })
            .then(resolve)
            .catch(reject);
    }
    return new Promise(retornoDeChamadaInicial);
}
vaiPegar('https://swapi.dev/api/people/').then(data => showData(data)).catch(console.error);


//https://servicodados.ibge.gov.br/api/v1/localidades/distritos


const estadoDados = (result) => {
    for (let i = 0; i < result.length - 1; i = i + 1) {
        let UF = result[i].sigla;
        goGET(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${UF}/municipios`).then(data => qtdMunicipios(data, UF)).catch(console.error);
    }
}
const qtdMunicipios = (result, UF) => {
    let quantidade = result.length
    document.querySelector('#ibge').innerHTML += `<strong style="font-size:18pt;">|</strong>${UF}:${quantidade}`;
}

const goGET = (url) => {
    const retornoDeChamadaInicial = (resolve, reject) => {
        fetch(url)
            .then((response) => {
                if (!response.ok) throw new Error("Erro ao executar requisição, status ' " + response.status);
                return response.json();
            })
            .then(resolve)
            .catch(reject);
    }
    return new Promise(retornoDeChamadaInicial);
}


goGET('https://servicodados.ibge.gov.br/api/v1/localidades/estados/').then(data => estadoDados(data)).catch(console.error);



/* Dog CEO https://dog.ceo/api/breeds/image/random */

const mostrarCao = (result) => {
    console.log(result.message)
    let elementoHTML = `
        <marquee direction="up" loop="1" behavior="slide">
           
            <img style="height:200px; margin:auto; margin-left:30px;" src="${result.message}">
         
        </marquee>
    `;

    document.querySelector('#img-cachorro').innerHTML = `${elementoHTML}`;

}
const enviaURL = (url) => {
    const retornoDeChamadaInicial = (resolve, reject) => {
        fetch(url)
            .then((response) => {
                if (!response.ok) throw new Error("Erro ao executar requisição, status ' " + response.status);
                return response.json();
            })
            .then(resolve)
            .catch(reject);
    }
    return new Promise(retornoDeChamadaInicial);
}



function random() {
    enviaURL('https://dog.ceo/api/breeds/image/random').then(
        data => mostrarCao(data)).catch(
            console.error);
}