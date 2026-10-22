# Explorador de Rick and Morty

Aplicación web que muestra personajes de Rick and Morty usando la API oficial.

## Integrantes
- Andre: estructura HTML (`index.html`), README y publicación en GitHub Pages
- Gabriel: conexión con la API (`fetch`), tarjetas y mensajes de carga, error y sin resultados
- Mariana: estilos y diseño adaptable (`style.css`), modo oscuro
- Isaac: buscador, filtros y favoritos con `localStorage`

## Descripción y uso
- Al abrir la página se cargan personajes desde https://rickandmortyapi.com
- Escribe en el buscador para filtrar por nombre.
- Usa los menús para filtrar por estado y género.
- Presiona "Agregar a favoritos" y los verás en la sección "Mis favoritos". Se guardan aunque cierres la página.
- El botón superior cambia entre modo claro y oscuro (funcionalidad extra).

## Enlaces
- Repositorio: https://github.com/AndreCN25/proyecto-web-ia
- Aplicación: https://andrecn25.github.io/proyecto-web-ia/

## Tres prompts importantes que usamos
1.Conexión de la API

Necesito que desarrolles la conexión de nuestra página web con la API de Rick and Morty utilizando JavaScript y la función fetch(). La aplicación debe obtener información real de los personajes y mostrar sus imágenes, nombres, estados, especies y ubicaciones. Utiliza los archivos index.html, style.css y script.js, y explica cómo funciona el código que implementes.

¿Para qué lo utilizamos?

Utilizamos este prompt para conectar nuestra página con la API y obtener información real de los personajes. De esta manera, los datos se cargan automáticamente y no es necesario escribir manualmente la información de cada personaje.

2. Buscador, filtros y favoritos

Implementa un buscador por nombre y filtros por estado y especie para nuestro explorador de Rick and Morty. También agrega una sección de favoritos que permita guardar y eliminar personajes, utilizando localStorage para conservar los favoritos después de recargar la página. Asegúrate de que las funciones trabajen correctamente y explica cómo podemos probarlas.

¿Para qué lo utilizamos?

Este prompt nos ayudó a agregar funciones interactivas para que los usuarios puedan encontrar personajes específicos, organizar los resultados y guardar sus personajes favoritos. También nos permitió comprender cómo JavaScript modifica la información que aparece en la página y cómo se utiliza localStorage para conservar datos en el navegador.

3. Manejo de errores y mejora de la interfaz

Revisa nuestro explorador de personajes y mejora el manejo de errores cuando la API no responda o no existan resultados. Agrega mensajes de carga, errores y búsquedas sin coincidencias. También revisa que la interfaz se adapte correctamente a celulares y computadoras. No elimines las funciones existentes y explica los cambios realizados.

¿Para qué lo utilizamos?

Utilizamos este prompt para mejorar la experiencia del usuario y evitar que la página quede vacía cuando ocurra un problema. También buscamos que la aplicación sea fácil de utilizar desde distintos dispositivos y que los mensajes informen claramente lo que está sucediendo.

## Respuesta de IA que requirió correcciones
Durante el proyecto la IA cometió o tuvo estas fallas, que corregimos:

1. Reparto de tareas. La IA propuso primero que los mensajes de carga, error
   y "sin resultados" fueran un commit separado. Al escribir el código se vio que
   esos mensajes dependen del `fetch()`, así que se integraron en el mismo
   commit y el trabajo se reasignó.
2. Enlace del repositorio. La URL tenía `.git` y corchetes, y la IA indicó
   que debía usarse la dirección normal de GitHub para abrirla.
3. Inspección del repositorio. La IA no pudo acceder a GitHub por un bloqueo
   de acceso automatizado. El equipo revisó el repositorio a mano y confirmó
   que estaba vacío, así que la IA no inventó el diagnóstico.

## Un error real y su solución
Un problema que se debe comprobar durante las pruebas es el manejo de errores al consultar la API. Por ejemplo, si la conexión a Internet falla, la aplicación podría no recibir los datos de los personajes.

Para resolver este tipo de problema, se puede utilizar try...catch en JavaScript y comprobar si la respuesta HTTP fue exitosa antes de procesar los datos. Si ocurre un error, la aplicación debe mostrar un mensaje que indique que no fue posible cargar la información.

Ejemplo de solución:

async function cargarPersonajes() {
    try {
        const respuesta = await fetch(
            "https://rickandmortyapi.com/api/character"
        );

        if (!respuesta.ok) {
            throw new Error("No se pudieron cargar los personajes");
        }

        const datos = await respuesta.json();
        console.log(datos.results);
    } catch (error) {
        console.error("Error al consultar la API:", error);
    }
}

Este código muestra cómo detectar un problema durante la consulta. En la aplicación final, el bloque catch debe mostrar un mensaje visible para el usuario, no solamente escribirlo en la consola.

## Una modificación que podemos explicar
Una modificación importante de nuestra aplicación es la implementación de la sección de favoritos utilizando localStorage.

Esta funcionalidad permite que los usuarios seleccionen personajes que les interesan y los consulten posteriormente sin tener que buscarlos nuevamente. Cuando se agrega un personaje a favoritos, su identificador se guarda en el almacenamiento local del navegador. Cuando el usuario vuelve a abrir o recargar la página, la aplicación puede recuperar esos identificadores y mostrar los personajes guardados.

Esta modificación mejora la experiencia del usuario porque conserva sus preferencias entre visitas. Además, nos permite comprender cómo JavaScript puede almacenar y recuperar información sin necesidad de crear una base de datos para esta función.

## Reflexión sobre lo aprendido usando IA
Durante el desarrollo de nuestro proyecto aprendimos que la inteligencia artificial puede ser una herramienta útil para crear páginas web, comprender código y resolver problemas de programación. Mediante los prompts, podemos explicar lo que necesitamos y recibir propuestas para implementar funciones como la conexión con una API, el buscador, los filtros y los favoritos.

También comprendimos que no basta con copiar y pegar el código generado. Es necesario revisarlo, probarlo y corregir los problemas que puedan aparecer. La inteligencia artificial puede cometer errores o proponer soluciones que necesitan adaptarse a las características de nuestro proyecto.

El uso de HTML, CSS y JavaScript nos permite entender cómo se estructura una página, cómo se diseña su apariencia y cómo se implementan las funciones interactivas. Además, trabajar con GitHub nos ayuda a organizar los archivos, registrar los cambios y documentar el desarrollo.

Como equipo, debemos asegurarnos de que Andre, Gabriel, Mariana e Isaac comprendamos las funciones principales de la aplicación y podamos explicar nuestras contribuciones. De esta manera, utilizamos la inteligencia artificial como una herramienta de apoyo para aprender y desarrollar una solución funcional, en lugar de depender completamente de ella.
