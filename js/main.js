// DOMelements //
const formulario = document.querySelector('#formulario')
const termo = document.querySelector('#termoDaBusca')
const output = document.querySelector('.movie__output')
// -- //

// api // 
const apikey = 'api_key=c8ef0b0b4be9eea2fd38600b56a29bb6'
// -- //

// Transform array //
function moviesTransform(movies) {
	console.log(movies);

	// cria novo array transfomando os resutados
	movieItems = movies.map(movie => {
		return {
			poster: (movie.poster_path === null) ? `img/error_img.png` : `https://image.tmdb.org/t/p/w300${movie.poster_path}`,
			title: movie.title,
			date: movie.release_date.substring(0, 4),
			vote: movie.vote_average,
			back: `https://image.tmdb.org/t/p/w533_and_h300_bestv2${movie.backdrop_path}`,
			overview: movie.overview.substring(0, 250)
		};
	});

	// array para formato html
	htmlMovies = movieItems.map(key => `
		<div class="movie__block">
    			<div class="movie__img">
    				<img src="${key.poster}" alt="">
    			</div>
				<div>
					<div class="movie__title">
						<h3>
							${key.title}
						</h3>
					</div>
					<div class="movie__info">
						<div class="movie__info--data__note">
							<div class="data">
								<img src="svg/brazil.png" alt=""> <p>${key.date}</p>
							</div>
							<div class="bar"></div>
							<div class="note">
								<h3>${key.vote}</h3>
							</div>
						</div>
						<button class="btn_style__um" onclick="modalCreate.movieDate('${key.title}','${key.date}','${key.back}','${key.overview}')">
							<p>ver mais <a>
						</button>
					</div>
				</div>
    		</div>
	`).join('');



	// inserir na pagina
	DOMfunctions.insertTOpage(htmlMovies);
	const moviesDate = document.querySelectorAll('.movie__info');
	console.log(moviesDate);

}

// -- // 

const modalCreate = {
	movieDate(title, date, bg, overview) {
		 movieDate = {
			title: title,
			date: date,
			overview: overview,
			back: bg,
		};
		
		modalCreate.modalinsertDate(movieDate)
	},
	modalinsertDate(movie) {
		const release = document.querySelector('.modal__movie__Subtitle h3');
		const title = document.querySelector('.modal__movie__title h2');
		const overview = document.querySelector('.modal__movie__overview p');
		const background = document.querySelector('.modal__header')
		
		
		
		release.innerHTML = `Lançado em ${movie.date}`;
		title.innerHTML = movie.title;
		overview.innerHTML = movie.overview;
		background.style.backgroundImage ='url('+ movie.back +')';
		
		modalCreate.modalOpen();
	},
	modalOpen() {
		const modal = document.querySelector('.modal');
		modal.classList.add('modal__active');
	},
	closerModal(){
		const modal = document.querySelector('.modal');
		const closerBtn = document.querySelector('.modal__btn--closer');
		modal.classList.remove('modal__active');
	}

}


const body = document.querySelector('body');

body.addEventListener('scroll',function(){
	console.log(body.scrollTop)
})




// DOM insert //
const DOMfunctions = {
	insertTOpage(value) {
		output.innerHTML = value
	},
	setSkeleton() {
		const skeletonCard = htmlFromPage.skeletonCard;
		DOMfunctions.insertTOpage(`${[...new Array(8)].map(()=>skeletonCard)}`);
	}
};

// items  HTML // 
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
	// METODO COM THAM > recebe os dados da api 1than transforma em json 2than da log com os dados
	/*
	    console.log(value)
	    fetch(`${apiURL}query=${value}${apiURL_After}`)
	    .then(response=> response.json())
	    .then(dados=>{console.log(dados.results);
	    })*/
};

// captura de Evento do formulario
formulario.addEventListener('submit', event => {
	event.preventDefault();
	term = termo.value.trim();
	(!term) ? output.innerHTML = htmlFromPage.invalidValue: searchMovie(term);
});








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