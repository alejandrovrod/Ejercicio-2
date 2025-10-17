// Cache global para almacenar resultados
const pokemonCache = {};

// Elementos del DOM
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const errorMessage = document.getElementById('errorMessage');
const loadingSpinner = document.getElementById('loadingSpinner');
const cardContainer = document.getElementById('cardContainer');
const pokemonCard = document.getElementById('pokemonCard');

// Elementos de la tarjeta
const pokemonNumber = document.getElementById('pokemonNumber');
const pokemonImage = document.getElementById('pokemonImage');
const pokemonName = document.getElementById('pokemonName');
const pokemonTypes = document.getElementById('pokemonTypes');
const pokemonWeight = document.getElementById('pokemonWeight');
const pokemonHeight = document.getElementById('pokemonHeight');
const statsContainer = document.getElementById('statsContainer');

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

// Evento para el flip de la tarjeta
pokemonCard.addEventListener('click', () => {
    pokemonCard.classList.toggle('flipped');
});

/**
 * Maneja la búsqueda de Pokémon
 */
async function handleSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    // Validar que no esté vacío
    if (!searchTerm) {
        showError('Por favor, ingresa un nombre o ID de Pokémon.');
        return;
    }
    
    // Limpiar error previo
    hideError();
    
    // Verificar si está en caché
    if (pokemonCache[searchTerm]) {
        console.log('Cargando desde caché:', searchTerm);
        displayPokemon(pokemonCache[searchTerm]);
        return;
    }
    
    // Realizar búsqueda en la API
    await searchPokemon(searchTerm);
}

/**
 * Busca un Pokémon en la API
 * @param {string} nameOrId - Nombre o ID del Pokémon
 */
async function searchPokemon(nameOrId) {
    showLoading();
    hideCard();
    
    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${nameOrId}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Pokémon no encontrado. Verifica el nombre o ID.');
            }
            throw new Error('Error al buscar el Pokémon. Intenta nuevamente.');
        }
        
        const data = await response.json();
        
        // Guardar en caché
        pokemonCache[nameOrId] = data;
        pokemonCache[data.id] = data;
        pokemonCache[data.name] = data;
        
        // Guardar en localStorage
        saveToLocalStorage(data);
        
        // Mostrar datos
        displayPokemon(data);
        
    } catch (error) {
        showError(error.message);
    } finally {
        hideLoading();
    }
}

/**
 * Muestra los datos del Pokémon en la tarjeta
 * @param {Object} pokemon - Datos del Pokémon
 */
function displayPokemon(pokemon) {
    // Asegurar que la tarjeta no esté volteada
    pokemonCard.classList.remove('flipped');
    
    // Número del Pokémon
    pokemonNumber.textContent = `#${String(pokemon.id).padStart(3, '0')}`;
    
    // Imagen
    pokemonImage.src = pokemon.sprites.front_default || 'https://via.placeholder.com/180?text=No+Image';
    pokemonImage.alt = pokemon.name;
    
    // Nombre
    pokemonName.textContent = pokemon.name;
    
    // Tipos
    pokemonTypes.innerHTML = '';
    pokemon.types.forEach(typeInfo => {
        const typeBadge = document.createElement('span');
        typeBadge.className = `type-badge type-${typeInfo.type.name}`;
        typeBadge.textContent = typeInfo.type.name;
        pokemonTypes.appendChild(typeBadge);
    });
    
    // Peso (hectogramos a kg)
    const weightKg = (pokemon.weight / 10).toFixed(1);
    pokemonWeight.textContent = `${weightKg} kg`;
    
    // Altura (decímetros a metros)
    const heightM = (pokemon.height / 10).toFixed(1);
    pokemonHeight.textContent = `${heightM} m`;
    
    // Estadísticas
    displayStats(pokemon.stats);
    
    // Mostrar tarjeta
    showCard();
}

/**
 * Muestra las estadísticas del Pokémon
 * @param {Array} stats - Array de estadísticas
 */
function displayStats(stats) {
    statsContainer.innerHTML = '';
    
    // Mapeo de nombres de estadísticas
    const statNames = {
        'hp': 'HP',
        'attack': 'Attack',
        'defense': 'Defense',
        'special-attack': 'Sp. Attack',
        'special-defense': 'Sp. Defense',
        'speed': 'Speed'
    };
    
    stats.forEach(statInfo => {
        const statItem = document.createElement('div');
        statItem.className = 'stat-item';
        
        const statName = statNames[statInfo.stat.name] || statInfo.stat.name;
        const statValue = statInfo.base_stat;
        const statPercentage = Math.min((statValue / 200) * 100, 100);
        
        statItem.innerHTML = `
            <div class="stat-header">
                <span class="stat-name">${statName}</span>
                <span class="stat-value">${statValue}</span>
            </div>
            <div class="stat-bar-container">
                <div class="stat-bar" style="width: ${statPercentage}%"></div>
            </div>
        `;
        
        statsContainer.appendChild(statItem);
    });
}

/**
 * Guarda el Pokémon en localStorage
 * @param {Object} pokemon - Datos del Pokémon
 */
function saveToLocalStorage(pokemon) {
    try {
        const cached = JSON.parse(localStorage.getItem('pokemonCache') || '{}');
        cached[pokemon.name] = pokemon;
        cached[pokemon.id] = pokemon;
        localStorage.setItem('pokemonCache', JSON.stringify(cached));
    } catch (error) {
        console.warn('No se pudo guardar en localStorage:', error);
    }
}

/**
 * Carga la caché desde localStorage al iniciar
 */
function loadFromLocalStorage() {
    try {
        const cached = JSON.parse(localStorage.getItem('pokemonCache') || '{}');
        Object.assign(pokemonCache, cached);
        console.log('Caché cargada desde localStorage');
    } catch (error) {
        console.warn('No se pudo cargar la caché desde localStorage:', error);
    }
}

// UI Helper Functions
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

function hideError() {
    errorMessage.classList.add('hidden');
}

function showLoading() {
    loadingSpinner.classList.remove('hidden');
}

function hideLoading() {
    loadingSpinner.classList.add('hidden');
}

function showCard() {
    cardContainer.classList.remove('hidden');
}

function hideCard() {
    cardContainer.classList.add('hidden');
}

// Inicializar la aplicación
window.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    console.log('Aplicación de búsqueda de Pokémon iniciada');
});



