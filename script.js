const API_KEY = '5bc7f38e833ac2cdaf4f69c82d4fb2a5';
const container = document.getElementById('movies-grid');

async function get80sBlockbusters() {
  
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&primary_release_date.gte=1980-01-01&primary_release_date.lte=1989-12-31&page=1`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        container.innerHTML = '';

        data.results.slice(0, 4).forEach(movie => {
            const posterPath = movie.poster_path 
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
                : 'imgs/no-image.png';

            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card');
            
            movieCard.innerHTML = `
                <img src="${posterPath}" alt="${movie.original_title}">
                <div class="movie-info">
                    <h3>${movie.original_title}</h3>
                </div>
            `;

            container.appendChild(movieCard);
        });

    } catch (error) {
        console.error("Erro ao carregar os filmes dos anos 80:", error);
    }
}

get80sBlockbusters();