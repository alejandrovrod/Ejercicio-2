# Ejercicio 2 - Buscador Interactivo con Flip Cards

## 📝 Descripción
Mini aplicación web que permite buscar Pokémon por nombre o ID, mostrar sus datos principales en una card interactiva, y permitir hacer flip (rotar) para mostrar información adicional.

## ✨ Características Implementadas

### Requisitos Funcionales ✅
1. **Input de búsqueda con botón "Buscar"**
   - Campo de entrada con validación
   - Búsqueda mediante botón o tecla Enter
   - Validación de campos vacíos

2. **Consumo de API**
   - Integración con PokéAPI: `https://pokeapi.co/api/v2/pokemon/{nameOrId}`
   - Datos mostrados:
     * Nombre del Pokémon
     * Número/ID
     * Imagen frontal (sprite)
     * Tipo(s)
     * Peso (en kg)
     * Altura (en metros)
   - Mensajes de error amigables para Pokémon no encontrados

3. **Card con dos caras**
   - **Frontal**: Imagen + Nombre + Tipos + Peso + Altura
   - **Reverso**: Estadísticas base completas:
     * HP
     * Attack
     * Defense
     * Special Attack
     * Special Defense
     * Speed
   - Barras visuales de progreso para cada estadística

4. **Animación Flip**
   - Clic en la card activa animación de rotación 3D
   - Transición suave con CSS transform
   - Efecto de perspectiva 3D

### Requisitos Técnicos ✅
- **HTML5**: Estructura semántica y moderna
- **CSS3**: 
  - Estilos personalizados sin frameworks
  - Variables CSS para temas
  - Animaciones y transiciones suaves
  - Grid y Flexbox para layouts
  - Diseño responsivo
- **JavaScript Puro**: Sin frameworks
- **Fetch con async/await**: Peticiones asíncronas modernas
- **Sistema de Caché**:
  - Caché en variable global (`pokemonCache`)
  - Persistencia en localStorage
  - Evita llamadas repetidas a la API
- **Estado de "Cargando"**: Spinner animado durante peticiones
- **Validación**: No se aceptan búsquedas vacías

## 🚀 Cómo Usar

1. **Abrir la aplicación**
   - Abre `index.html` en tu navegador

2. **Buscar un Pokémon**
   - Escribe un nombre (ej: "pikachu", "charizard")
   - O escribe un ID (ej: "25", "1", "150")
   - Presiona el botón "Buscar" o Enter

3. **Interactuar con la Card**
   - Haz clic en la tarjeta para voltearla
   - Cara frontal: información básica
   - Cara trasera: estadísticas detalladas

## 🎨 Características de Diseño

- **UI Moderna**: Gradientes y sombras elegantes
- **Colores por Tipo**: Cada tipo de Pokémon tiene su color distintivo
- **Responsive**: Adaptable a móviles y tablets
- **Animaciones Fluidas**: Transiciones suaves en todos los elementos
- **Feedback Visual**: Estados de hover, active y focus

## 📊 Tipos de Pokémon Soportados

La aplicación reconoce y colorea los 18 tipos de Pokémon:
- Normal, Fire, Water, Electric, Grass, Ice
- Fighting, Poison, Ground, Flying, Psychic
- Bug, Rock, Ghost, Dragon, Dark, Steel, Fairy

## 🔧 Tecnologías Utilizadas

- **HTML5**
- **CSS3** (Grid, Flexbox, Animations, Transform 3D)
- **JavaScript ES6+** (async/await, fetch, localStorage)
- **PokéAPI** (https://pokeapi.co/)

## 💾 Sistema de Caché

La aplicación implementa un sistema de caché multinivel:
1. **Caché en memoria**: Variable global para sesión actual
2. **localStorage**: Persistencia entre sesiones
3. **Indexación múltiple**: Por nombre, ID y nombre normalizado

## 🎯 Ejemplos de Búsqueda

- Por nombre: `pikachu`, `charizard`, `mewtwo`
- Por ID: `1`, `25`, `150`
- Variaciones: `PIKACHU`, `PiKaChU` (case-insensitive)

## ⚡ Optimizaciones

- Caché para evitar llamadas duplicadas a la API
- Persistencia en localStorage
- Validación de entrada
- Manejo de errores robusto
- Carga diferida de imágenes
- Animaciones CSS hardware-accelerated

## 📱 Compatibilidad

- Chrome, Firefox, Safari, Edge (versiones modernas)
- Responsive: Desktop, Tablet, Mobile

---

**Powered by [PokéAPI](https://pokeapi.co/)**



