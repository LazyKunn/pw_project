const API_KEY = '5bc7f38e833ac2cdaf4f69c82d4fb2a5';
const detailsContainer = document.getElementById('details-container');

async function fetchMovieDetails() {
    // 1. Ir buscar o ID do filme ao URL 
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');

    // Se alguém aceder à página sem ID, mandamos de volta para o catálogo
    if (!movieId) {
        window.location.href = 'movies.html';
        return;
    }

    try {
        // 2. Pedir os detalhes do filme e o elenco (credits) num só pedido à API
        const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=pt-PT&append_to_response=credits`;
        const response = await fetch(url);
        const movie = await response.json();

        // Tratamento do cartaz (corrigido para a pasta images/)
        const posterPath = movie.poster_path 
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
            : 'imgs/no-image.png';

        // Tratamento da data (Ano)
        const releaseYear = movie.release_date ? movie.release_date.substring(0, 4) : 'N/A';

        // Tratamento da duração (Tempo do filme)
        const runtime = movie.runtime ? `${movie.runtime} MIN` : 'DURAÇÃO DESCONHECIDA';

        // Tratamento dos géneros
        const genres = (movie.genres && movie.genres.length > 0) ? movie.genres.map(g => g.name).join(', ') : 'Desconhecido';

        // Tratamento do elenco (mostrar apenas os 5 primeiros atores)
        let cast = 'Elenco não disponível.';
        if (movie.credits && movie.credits.cast && movie.credits.cast.length > 0) {
            cast = movie.credits.cast.slice(0, 5).map(actor => actor.name).join(', ');
        }

        // NOVO: Tratamento da Tagline para as costas do VHS
        const tagline = movie.tagline ? `"${movie.tagline}"` : `"O clássico que marcou uma geração."`;
        
        // ==========================================
        // ÁREA PENDENTE DE IMPLEMENTAÇÃO (FASE 2)
        // ==========================================
        const stockText = '<i class="fa-solid fa-database"></i> A aguardar ligação à BD';
        const btnState = ''; 

        // 3. Injetar o HTML no ecrã
        detailsContainer.innerHTML = `
            <div class="details-poster" id="vhs-container">
                <div class="vhs-scene">
                    <div class="vhs-tape" id="vhs-tape">
                        <!-- Frente com o cartaz -->
                        <div class="vhs-face vhs-front">
                            <img src="${posterPath}" alt="${movie.title}">
                        </div>
                        
                        <!-- NOVO: Traseira Autêntica Anos 80 (Sem sinopse repetida) -->
                        <div class="vhs-face vhs-back">
                            <div class="vhs-cover-back">
                                <!-- O TEU TOPO ORIGINAL -->
                                <div class="vhs-back-header">
                                    <span class="vhs-logo">VHS</span>
                                    <span class="vhs-stereo">Hi-Fi STEREO</span>
                                </div>
                                
                                <!-- O NOVO MIOLO -->
                                <div class="vhs-middle-content">
                                    <p class="vhs-tagline">${tagline}</p>
                                    
                                    <div class="vhs-rules">
                                        <h5>AVISOS VIDEOMANIA</h5>
                                        <ul>
                                            <li>Rebobine a cassete.</li>
                                            <li>Multa de 500$00/dia.</li>
                                            <li>Afaste de campos magnéticos.</li>
                                        </ul>
                                    </div>

                                    <div class="vhs-tech-info">
                                        <p>DISTRIBUIÇÃO EXCLUSIVA VIDEOMANIA</p>
                                        <p>ÁUDIO: DOLBY SURROUND | FORMATO: 4:3</p>
                                        <p>A CÓPIA NÃO AUTORIZADA É CRIME.</p>
                                    </div>
                                </div>

                                <!-- O TEU RODAPÉ ORIGINAL -->
                                <div class="vhs-back-footer">
                                    <div class="vhs-barcode">
                                        <i class="fa-solid fa-barcode"></i>
                                    </div>
                                    <div class="vhs-warnings">
                                        <p class="age-rating">M/12</p>
                                        <p>${runtime} | COR</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Lados da cassete -->
                        <div class="vhs-face vhs-left"></div>
                        <div class="vhs-face vhs-right"></div>
                        
                        <!-- Topo e Base -->
                        <div class="vhs-face vhs-top"></div>
                        <div class="vhs-face vhs-bottom"></div>
                    </div>
                </div>
            </div>
            
            <div class="details-info">
                <h1>${movie.title}</h1>
                
                <div class="movie-meta">
                    <span class="meta-tag"><i class="fa-solid fa-calendar"></i> ${releaseYear}</span>
                    <span class="meta-tag"><i class="fa-solid fa-film"></i> ${genres}</span>
                    <span class="meta-tag"><i class="fa-solid fa-star"></i> ${movie.vote_average.toFixed(1)} / 10</span>
                </div>

                <p class="movie-synopsis" style="margin-top: 20px;">
                    ${movie.overview ? movie.overview : 'A sinopse deste clássico perdeu-se nos arquivos.'}
                </p>
                
                <div class="movie-cast" style="margin-top: 20px;">
                    <h3>ELENCO PRINCIPAL</h3>
                    <p>${cast}</p>
                </div>
                
                <div class="rent-action">
                    <span class="stock-info" style="color: var(--color-orange); font-size: 14px;">${stockText}</span>
                    <button class="btn" ${btnState} onclick="addToCart(${movie.id}, '${movie.title.replace(/'/g, "\\'")}')">
                        <i class="fa-solid fa-tape"></i> ALUGAR FILME
                    </button>
                </div>
            </div>
        `;

        setupVHSInteraction();
        document.title = `VideoMania | ${movie.title}`;

    } catch (error) {
        console.error("Erro ao carregar detalhes:", error);
        detailsContainer.innerHTML = '<p style="text-align: center; color: var(--color-red);">A cassete encravou. Erro ao carregar os detalhes do filme.</p>';
    }
}

// ==========================================
// FUNÇÃO PENDENTE DE IMPLEMENTAÇÃO (FASE 2)
// ==========================================
function addToCart(id, title) {
    console.warn(`[TODO - FASE 2] Fazer POST request para /api/rent com o movieId: ${id}`);
    alert(`🚧 Funcionalidade em desenvolvimento!\n\nNa Fase 2 do projeto, a ação de alugar o filme "${title}" vai comunicar com a nossa API REST para verificar o stock na base de dados MySQL e adicioná-lo ao carrinho.`);
}

function setupVHSInteraction() {
    const vhsContainer = document.getElementById('vhs-container');
    const vhsTape = document.getElementById('vhs-tape');
    
    let isDragging = false;
    let previousMousePosition = { x: 0 };
    let currentRotation = 0; 

    function autoSpin() {
        if (!isDragging) {
            currentRotation -= 0.4; 
            vhsTape.style.transform = `rotateY(${currentRotation}deg)`;
        }
        requestAnimationFrame(autoSpin);
    }
    
    autoSpin();

    vhsContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        previousMousePosition.x = e.clientX;
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const deltaMove = e.clientX - previousMousePosition.x;
            currentRotation += deltaMove * 0.5; 
            vhsTape.style.transform = `rotateY(${currentRotation}deg)`;
            previousMousePosition.x = e.clientX;
        }
    });
}

document.addEventListener('DOMContentLoaded', fetchMovieDetails);