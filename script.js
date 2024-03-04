const characterId = document.getElementById('characterId');
const btnReset = document.getElementById('btn-reset');
const btnGo = document.getElementById('btn-go');
const content = document.getElementById('content');
const containerResult = document.getElementById('result-style');
const image = document.getElementById('img');

const fetchApi = (value) => {
    return fetch(`https://rickandmortyapi.com/api/character/${value}`)
        .then((res) => res.json())
        .then((data) => { 
            return data; 
        });
}

const keys = ['name', 'status', 'species', 'gender', 'origin', 'episode'];
const newKeys = {
    name: 'Nome',
    status: 'Status',
    species: 'Espécie',
    gender: 'Gênero',
    origin: 'Planeta de origem',
    episode: 'Episodios', 
}

const buildResult = (result) => {
    return keys.map((key) => document.getElementById(key))
        .map((elem) => {
            if (elem.checked === true && (Array.isArray(result[elem.name])) ===  true) {
                const arrayResult = result[elem.name].join('r\n');
                console.log(arrayResult);
                const newElem = document.createElement('p');
                newElem.innerHTML = `${newKeys[elem.name]}: ${arrayResult}`;
                content.appendChild(newElem);
            }else if (elem.checked === true && (elem.name === 'origin')) {
                const newElem = document.createElement('p');
                newElem.innerHTML = `${newKeys[elem.name]}: ${result[elem.name].name}`;
                content.appendChild(newElem);
            } else if (elem.checked === true && typeof(result[elem.name]) !== 'object') {
                const newElem = document.createElement('p');
                newElem.innerHTML = `${newKeys[elem.name]}: ${result[elem.name]}`;
                content.appendChild(newElem);
            }
            });
}

btnGo.addEventListener('click', async (event) =>{
    event.preventDefault();

   
    if(characterId.value ===''){
        
        return content.innerHTML ='É necessário fazer um filtro.';
    }
      
   
    const result = await fetchApi(characterId.value);
   
   if(content.firstChild === null){
    containerResult.className ='result-style';
    image.src = `${result.image}`; 
    buildResult(result);
    }else {
        content.innerHTML = '';
        containerResult.className ='result-style';
        image.src = `${result.image}`; 
        buildResult(result);
    }

});

btnReset.addEventListener('click', () => location.reload());

// Botão para alternar tema
const themeToggle = document.getElementById('theme-toggle');

// Evento de clique no botão
themeToggle.addEventListener('click', () => {
    // Verifica se o tema atual é claro
    if (document.body.classList.contains('light-theme')) {
        // Muda para o tema escuro
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
    } else {
        // Muda para o tema claro
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
    }
});
