const API_KEY = '5bc7f38e833ac2cdaf4f69c82d4fb2a5';
const moviesContainer = document.getElementById('movies-grid');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const genreFilter = document.getElementById('genre-filter');
const sortFilter = document.getElementById('sort-filter');
const loadMoreBtn = document.getElementById('load-more-btn');

let currentMoviesList = []; 
let moviesDisplayed = 0; 

async function fetchMovies() {
    if (!moviesContainer) return; // Segurança: Se não houver grelha, pára aqui

    // Limpar o ecrã
    moviesContainer.innerHTML = '<p style="grid-column: span 4; text-align: center;">A carregar...</p>';
    
    // Segurança: Esconder o botão se ele existir
    if (loadMoreBtn) {
        loadMoreBtn.style.display = 'none';
    }

    // Ler os valores dos inputs com segurança
    const query = searchInput ? searchInput.value.trim() : '';
    const genre = genreFilter ? genreFilter.value : '';
    const sortBy = sortFilter ? sortFilter.value : 'popularity.desc';

    currentMoviesList = [];
    moviesDisplayed = 0;

    try {
        // Pedir as páginas 1, 2 e 3 (60 resultados no total)
        for (let page = 1; page <= 3; page++) {
            let url = '';

            if (query !== '') {
                url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=pt-PT&query=${encodeURIComponent(query)}&page=${page}`;
            } else {
                url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=pt-PT&sort_by=${sortBy}&primary_release_date.lte=1989-12-31&page=${page}`;
                if (genre !== '') {
                    url += `&with_genres=${genre}`;
                }
            }

            const response = await fetch(url);
            const data = await response.json();
            
            if (data.results) {
                currentMoviesList = currentMoviesList.concat(data.results);
            }
        }

        // Filtro para apagar filmes feitos depois de 1989
        currentMoviesList = currentMoviesList.filter(movie => {
            if (!movie.release_date) return false;
            const year = parseInt(movie.release_date.substring(0, 4));
            return year <= 1989;
        });

        // Ordenação manual para o caso da pesquisa por texto
        if (query !== '') {
            if (sortBy === 'popularity.desc') {
                currentMoviesList.sort((a, b) => b.popularity - a.popularity);
            } else if (sortBy === 'primary_release_date.desc') {
                currentMoviesList.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
            }
        }

        moviesContainer.innerHTML = '';

        if (currentMoviesList.length === 0) {
            moviesContainer.innerHTML = '<p style="grid-column: span 4; text-align: center;">Nenhum filme encontrado.</p>';
            return;
        }

        // Mostrar os primeiros 20 filmes
        displayMoreMovies(20);

    } catch (error) {
        console.error("Erro:", error);
        moviesContainer.innerHTML = '<p style="grid-column: span 4; text-align: center; color: var(--color-red);">Erro ao carregar os filmes.</p>';
    }
}

function displayMoreMovies(count) {
    if (!moviesContainer) return;

    // Cortar os próximos filmes da lista global
    const moviesToRender = currentMoviesList.slice(moviesDisplayed, moviesDisplayed + count);
    
    moviesToRender.forEach(movie => {
        const posterPath = movie.poster_path 
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
            : 'images/no-image.png';

        const releaseYear = movie.release_date ? movie.release_date.substring(0, 4) : 'N/A';

        const movieCard = document.createElement('a');
        movieCard.href = `details.html?id=${movie.id}`;
        movieCard.classList.add('movie-card');
        
        movieCard.innerHTML = `
            <img src="${posterPath}" alt="${movie.title}">
            <div class="movie-info">
                <h3>${movie.title} (${releaseYear})</h3>
            </div>
        `;

        moviesContainer.appendChild(movieCard);
    });

    moviesDisplayed += moviesToRender.length;

    // Mostrar ou esconder o botão dependendo se há mais filmes na lista
    if (loadMoreBtn) {
        if (moviesDisplayed < currentMoviesList.length) {
            loadMoreBtn.style.display = 'inline-block';
        } else {
            loadMoreBtn.style.display = 'none';
        }
    }
}

function setupEventListeners() {
    // Só ativa os eventos se os elementos existirem no HTML
    if (searchForm) {
        searchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            if (genreFilter) genreFilter.value = ''; 
            fetchMovies();
        });
    }

    if (genreFilter) {
        genreFilter.addEventListener('change', () => {
            if (searchInput) searchInput.value = ''; 
            fetchMovies();
        });
    }

    if (sortFilter) {
        sortFilter.addEventListener('change', () => {
            fetchMovies();
        });
    }

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            displayMoreMovies(8); // Adiciona 8 de cada vez
        });
    }
}

// Arranca o código quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    fetchMovies(); 
});