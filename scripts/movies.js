const API_KEY = '5bc7f38e833ac2cdaf4f69c82d4fb2a5';
const moviesContainer = document.getElementById('movies-grid');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const genreFilter = document.getElementById('genre-filter');
const sortFilter = document.getElementById('sort-filter');

/**
 * Pede os filmes à API do TMDB com base nos filtros selecionados ou texto de pesquisa.
 * O TMDB devolve sempre 20 filmes por página (5 filas de 4 filmes).
 * 
 * @async
 * @function fetchMovies
 * @returns {Promise<void>}
 */
async function fetchMovies() {
    moviesContainer.innerHTML = '<p style="grid-column: span 4; text-align: center;">A carregar clássicos...</p>';

    const query = searchInput.value.trim();
    const genre = genreFilter.value;
    const sortBy = sortFilter.value;

    let url = '';

    if (query !== '') {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=pt-PT&query=${encodeURIComponent(query)}&page=1`;
    } else {
        // Removido o ".gte=1980-01-01" para ir buscar filmes desde o início do cinema até ao final de 1989
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=pt-PT&sort_by=${sortBy}&primary_release_date.lte=1989-12-31&page=1`;
        if (genre !== '') {
            url += `&with_genres=${genre}`;
        }
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        moviesContainer.innerHTML = '';

        let moviesToDisplay = data.results;

        // Filtro manual atualizado para pesquisa por texto
        if (query !== '') {
            moviesToDisplay = moviesToDisplay.filter(movie => {
                if (!movie.release_date) return false;
                
                const year = parseInt(movie.release_date.substring(0, 4));
                
                // Agora aceita qualquer filme lançado até 1989 (inclusive)
                return year <= 1989;
            });
        }

        if (moviesToDisplay.length === 0) {
            moviesContainer.innerHTML = '<p style="grid-column: span 4; text-align: center;">Nenhum clássico encontrado com esses critérios antes de 1990.</p>';
            return;
        }

        moviesToDisplay.forEach(movie => {
            const posterPath = movie.poster_path 
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
                : 'images/no-image.png';

            const movieCard = document.createElement('a');
            movieCard.href = `details.html?id=${movie.id}`;
            movieCard.classList.add('movie-card');
            
            const releaseYear = movie.release_date ? movie.release_date.substring(0, 4) : 'N/A';

            movieCard.innerHTML = `
                <img src="${posterPath}" alt="${movie.title}">
                <div class="movie-info">
                    <h3>${movie.title} (${releaseYear})</h3>
                </div>
            `;

            moviesContainer.appendChild(movieCard);
        });

    } catch (error) {
        console.error("Erro ao carregar os filmes:", error);
        moviesContainer.innerHTML = '<p style="grid-column: span 4; text-align: center; color: var(--color-red);">Erro ao tentar carregar o catálogo. Tenta novamente mais tarde.</p>';
    }
}

/**
 * Configura os Event Listeners para atualizar os filmes automaticamente
 * quando os filtros ou a pesquisa são alterados.
 */
function setupEventListeners() {
    // Quando o formulário de pesquisa é submetido (ao carregar no Enter ou na Lupa)
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede a página de fazer reload
        
        // Opcional: Quando pesquisamos por texto, ignoramos os dropdowns para não confundir a API
        genreFilter.value = ''; 
        
        fetchMovies();
    });

    // Quando o utilizador muda o género no dropdown
    genreFilter.addEventListener('change', () => {
        searchInput.value = ''; // Limpa a barra de pesquisa para os filtros funcionarem bem
        fetchMovies();
    });

    // Quando o utilizador muda a ordenação no dropdown
    sortFilter.addEventListener('change', () => {
        searchInput.value = ''; // Limpa a barra de pesquisa
        fetchMovies();
    });
}

// 5. Inicializar a página: preparar os eventos e carregar a lista inicial
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    fetchMovies(); 
});