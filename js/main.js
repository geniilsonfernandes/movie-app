// DOMelements //
const formulario = document.querySelector('#formulario')
const termo = document.querySelector('#termoDaBusca')
const output = document.querySelector('.movie__output')

// api //
const apikey = 'api_key=c8ef0b0b4be9eea2fd38600b56a29bb6'









// Transform 
function moviesTransform(movies) {
    // ORGIZANDO E CORRGINDO DADOS 
    movieItems = movies.map(info => {
        return {
            id: info.id,
            poster: (info.poster_path === null) ? `img/error_img.png` : `https://image.tmdb.org/t/p/w300${info.poster_path}`,
            title: info.title,
            date: (info.release_date===undefined)? `Sem data`: info.release_date.substring(0, 4),
            vote: info.vote_average,
            back:  (info.backdrop_path===null)? `img/error_img.png` :`https://image.tmdb.org/t/p/w533_and_h300_bestv2${info.backdrop_path}`,
            overview: (info.overview==='')? `Filme sem descrição :(`: info.overview,
        };
    });

    movieList = movieItems
    // array para formato html
    htmlMovies = movieItems.map((key,index,array) => 
            `<div class="movie__block">
                <div class="movie__img">
                    <img src="${key.poster}" alt="">
                </div>
                <div>
                    <div class="movie__title">
                        <h3>${key.title}</h3>
                    </div>
                    <div class="movie__info">
                        <div class="movie__info--data__note">
                            <div class="data">
                                <img src="svg/brazil.png" alt=""><p>${key.date}</p>
                            </div>
                            <div class="bar"></div>
                            <div class="note">
                                <h3>${key.vote}</h3>
                            </div>
                        </div>
                        <button class="btn_style__um" onclick="modalCreate.modalSearch(${index})">
                            <p>ver mais </p>
                        </button>
                    </div>
                </div>
    </div>`).join('');

// innerhtml
    DOMfunctions.insertTOpage(htmlMovies);
    const moviesDate = document.querySelectorAll('.movie__info');
};

// Modal

let movieList; //VARIAVEL COM o array 

// objeto com as funcoes do modal
let scrollpage = 0;
const modalCreate = {
    modalSearch(value){
        modalCreate.modalinsertDate(movieList[value])
    },
    modalinsertDate(movie) {
        // PEGANDO O HTML
        const release = document.querySelector('.modal__movie__Subtitle h3').innerHTML = `Lançado em ${movie.date}`;
        const title = document.querySelector('.modal__movie__title h2').innerHTML = movie.title;
        const overview = document.querySelector('.modal__movie__overview p').innerHTML = movie.overview;
        const background = document.querySelector('.modal__header').style.backgroundImage = 'url(' + movie.back + ')';
		heightP = document.querySelector('.modal__movie__overview P').clientHeight;
        // ABRI MODAL
        modalCreate.modalOpen();
    },
    modalOpen() {
		console.log(window.scrollY);
		scrollpage = window.scrollY;
        //dom elementos
		const modalBackground = document.querySelector('.modal__background');
		const main__container = document.querySelector('.main__container');
        const modal = document.querySelector('.modal');
        
		
		main__container.style.position = `fixed`;
        main__container.style.top = `-${scrollpage}px`;
		console.log(scrollpage);
		modalBackground.classList.add('modal__bg--on');
        modal.classList.add('modal__active');
		window.scrollTo(0,0)
    },
    closerModal() {
        //FECHA MODAL
		//dom elementos
		const modalBackground = document.querySelector('.modal__background');
        const modal = document.querySelector('.modal');
		const main__container = document.querySelector('.main__container');
        const closerBtn = document.querySelector('.modal__btn--closer');
		const text = document.querySelector('.modal__movie__overview').style.height = `100px`;
		
		main__container.style.top = `0px`;
        main__container.style.position = `static`;
		modalBackground.classList.remove('modal__bg--on');
        modal.classList.remove('modal__active');
		window.scrollTo(0,scrollpage)
    },
	showMore(){
		const heightP = document.querySelector('.modal__movie__overview P').clientHeight;
		const text = document.querySelector('.modal__movie__overview');
		const showmore = document.querySelector('.modal__showmore p');
		console.log(showmore,text.clientHeight)
			if(text.clientHeight==100 && heightP>100 ){
				text.style.height = `${heightP}px`;
				showmore.innerHTML = 'Fechar'
			}else{
				text.style.height = `100px`;
				showmore.innerHTML = 'Ler mais'
			}
	}
}
//ler mais




// DOM functions //
const DOMfunctions = {
    insertTOpage(value) {
        output.innerHTML = value
    },
    setSkeleton() {
        const skeletonCard = htmlFromPage.skeletonCard;
        DOMfunctions.insertTOpage(`${[...new Array(8)].map(() => skeletonCard)}`);
    }
};

// CRIANDO HTML  HTML //
const htmlFromPage = {
    invalidValue: '<h1>valor de bucar invalido</h1>',
    returnInvalid(value) {
        return `<h1>Nenhum filme <span>${value}</span> encontrado</h1>`
    },
    skeletonCard: `
            <div class="loading">
                 <div class="loading__img"> </div>
                 <div class="loading__text"> </div>
                 <div class="loading__text"> </div>
             </div>`,

};









// captura de Evento do formulario
formulario.addEventListener('submit', event => {
    event.preventDefault();
    term = termo.value.trim();
    (!term) ? output.innerHTML = htmlFromPage.invalidValue : searchMovie(term);
});

// buscando na api
async function searchMovie(value) {
    DOMfunctions.setSkeleton();
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?${apikey}&language=pt-BR&query=${value}&page=1&include_adult=false`);
    const dados = await response.json()
    if (dados.total_results === 0) {
        output.innerHTML = htmlFromPage.returnInvalid(value)
    } else {
        moviesTransform(dados.results);
    };
  
};









//get param
/*

paginaFilme/index.html?filme=UHNCFD3


var myParam = location.search.split('filme=')[1]

window.location.href.split('.com')[1]

https://api.themoviedb.org/3/movie/284053?api_key=c8ef0b0b4be9eea2fd38600b56a29bb6&language=pt-BR


https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/import


https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/export

module import export

*/


  // METODO COM THAM > recebe os dados da api 1than transforma em json 2than da log com os dados
    /*
         console.log(value)
         fetch(`${apiURL}query=${value}${apiURL_After}`)
         .then(response=> response.json())
         .then(dados=>{console.log(dados.results);
         })*/







//--------------------TESTES----------------//

const nomes = [{
    nome: 'maria',
    idade: 18,
    local: 'sp'
},
{
    nome: 'manuel',
    idade: 13,
    local: 'pb'
},
{
    nome: 'paula',
    idade: 16,
    local: 'es'
},
{
    nome: 'vitoria',
    idade: 16,
    local: 'rio'
},
{
    nome: 'jose',
    idade: 34,
    local: 'portugal'
}
]

// ------ usando for para criar o html
/*   const divNames = document.createElement('div')
     divNames.classList.add('nomes__box')

     nomes.forEach((item,indice)=>{
          const nomeH2 = document.createElement('h2');
          nomeH2.innerHTML = `nome é ${nomes[indice].idade}`;
          divNames.appendChild(nomeH2)
     })

     function createAndInsertDiv(){
         console.log(nomes.map( tick => `<h1>${tick.nome}</h1>` ).join(''));
          DivInser(divNames)
     }

     function DivInser(value){
          outputProvisorio.appendChild(value)
     }
*/

/*
// ------ usando map para criar o html
const divNames = document.createElement('div')
divNames.classList.add('nomes__box')

function createAndInsertDiv(value) {
     // caso queira usar uma condcional, talvez possa usar um if, se valor recebido = valor  se nao, valor nao encontrado;

     divNames.innerHTML = nomes.map(names => `<h2>${names.nome}</h2>`).join('')
     DivInsert(divNames)
}

function DivInsert(value) {
     outputProvisorio.appendChild(value)
}
*/