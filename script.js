// ===== 1. Referencias a elementos del HTML =====
const URL_API = "https://rickandmortyapi.com/api/character";

const buscador = document.getElementById("buscador");
const filtroEstado = document.getElementById("filtro-estado");
const filtroGenero = document.getElementById("filtro-genero");
const listaPersonajes = document.getElementById("lista-personajes");
const mensajeCarga = document.getElementById("mensaje-carga");
const mensajeError = document.getElementById("mensaje-error");
const mensajeVacio = document.getElementById("mensaje-vacio");

// ===== 2. Variables compartidas =====
// "favoritos" se llenará más adelante con localStorage.
let favoritos = [];
// Guarda los personajes que se están mostrando ahora.
let personajesActuales = [];

// Traducciones para mostrar los datos en español
const estados = { Alive: "Vivo", Dead: "Muerto", unknown: "Desconocido" };
const generos = {
  Female: "Femenino",
  Male: "Masculino",
  Genderless: "Sin género",
  unknown: "Desconocido"
};

// ===== 3. Crear una tarjeta con los datos de un personaje =====
function crearTarjeta(personaje) {
  const esFavorito = favoritos.some((f) => f.id === personaje.id);

  const tarjeta = document.createElement("article");
  tarjeta.className = "tarjeta";
  tarjeta.innerHTML = `
    <img src="${personaje.image}" alt="Imagen de ${personaje.name}" loading="lazy">
    <div class="tarjeta-info">
      <h3>${personaje.name}</h3>
      <p>Estado: ${estados[personaje.status] || personaje.status}</p>
      <p>Especie: ${personaje.species}</p>
      <p>Género: ${generos[personaje.gender] || personaje.gender}</p>
      <p>Origen: ${personaje.origin.name}</p>
      <p>Ubicación: ${personaje.location.name}</p>
      <button class="btn-favorito" data-id="${personaje.id}">
        ${esFavorito ? "❤️ Quitar de favoritos" : "🤍 Agregar a favoritos"}
      </button>
    </div>
  `;
  return tarjeta;
}

// ===== 4. Mostrar una lista de personajes en pantalla =====
function mostrarPersonajes(lista) {
  listaPersonajes.innerHTML = "";
  mensajeVacio.classList.toggle("oculto", lista.length > 0);
  lista.forEach((personaje) => {
    listaPersonajes.appendChild(crearTarjeta(personaje));
  });
}

// ===== 5. Pedir los personajes a la API =====
async function cargarPersonajes() {
  // Preparar pantalla: mostrar "Cargando" y ocultar los otros mensajes
  mensajeCarga.classList.remove("oculto");
  mensajeError.classList.add("oculto");
  mensajeVacio.classList.add("oculto");
  listaPersonajes.innerHTML = "";

  // Armar los parámetros de búsqueda (nombre, estado, género)
  const parametros = new URLSearchParams();
  if (buscador.value.trim() !== "") {
    parametros.set("name", buscador.value.trim());
  }
  if (filtroEstado.value !== "") {
    parametros.set("status", filtroEstado.value);
  }
  if (filtroGenero.value !== "") {
    parametros.set("gender", filtroGenero.value);
  }

  try {
    const respuesta = await fetch(`${URL_API}?${parametros}`);

    // La API responde 404 cuando no hay resultados
    if (respuesta.status === 404) {
      personajesActuales = [];
      mostrarPersonajes([]);
      return;
    }

    if (!respuesta.ok) {
      throw new Error("Respuesta con error: " + respuesta.status);
    }

    const datos = await respuesta.json();
    personajesActuales = datos.results;
    mostrarPersonajes(personajesActuales);
  } catch (error) {
    console.error(error);
    mensajeError.textContent =
      "No se pudieron cargar los personajes. Revisa tu conexión e inténtalo de nuevo.";
    mensajeError.classList.remove("oculto");
  } finally {
    // Pase lo que pase, se oculta el mensaje "Cargando"
    mensajeCarga.classList.add("oculto");
  }
}

// ===== 6. Cargar personajes al abrir la página =====
cargarPersonajes();
