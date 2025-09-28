
 Proyecto: Aplicación Web Modularizada - Repostería ARI-ANA

Este proyecto es una aplicación web para una repostería, desarrollada como parte de una actividad académica para demostrar los principios de **modularización, componentización y buenas prácticas** en el desarrollo frontend con HTML, CSS y JavaScript.


## 1. Estructura y Modularización del Proyecto

La aplicación sigue una estructura de carpetas clara y organizada para separar las responsabilidades, facilitando el mantenimiento y la escalabilidad.

-   `README.md`: Este documento.
-   `index.html`: Página principal de la aplicación.
-   `login.html`: Página de inicio de sesión.
-   `/components`: Contiene fragmentos de HTML reutilizables.
    -   `header.html`: Encabezado del sitio.
    -   `footer.html`: Pie de página del sitio.
    -   `sidebar.html`: Barra de navegación lateral.
-   `/css`: Contiene las hojas de estilo.
    -   `styles.css`: Estilos visuales para toda la aplicación.
-   `/data`: Contiene los datos de la aplicación en formato JSON.
    -   `productos.json`: Un listado de los pasteles que ofrece la repostería.
-   `/js`: Contiene la lógica de la aplicación.
    -   `login.js`: Lógica para el formulario de inicio de sesión.
    -   `main.js`: Lógica principal de la aplicación, incluyendo la carga de componentes y productos.

Esta separación es fundamental en el desarrollo web moderno, ya que permite que el código sea más legible, reutilizable y fácil de depurar.

## 2. Características Implementadas

### a. Formulario de Inicio de Sesión
Se implementó un formulario de inicio de sesión (`login.html`) con validación del lado del cliente (`js/login.js`).

-   **Implementación:** El script intercepta el envío del formulario, valida las credenciales contra valores predefinidos (`admin`/`password`) y gestiona la sesión del usuario.
-   **Manejo de Sesión:** Si el login es exitoso, se utiliza `sessionStorage` para guardar un indicador de que el usuario está autenticado. La página principal (`index.html`) verifica este indicador; si no existe, redirige al usuario de vuelta a la página de login, protegiendo así el contenido.
-   **Aviso de Seguridad:** **Este método de validación es puramente educativo y NO es seguro En una aplicación real.** 


### b. Componentes Reutilizables (Fragmentos)
El `header`, `footer` y `sidebar` se crearon como archivos HTML separados en `/components`. Son cargados dinámicamente en `index.html` mediante la función `loadComponent` en `js/main.js`, que utiliza la API `fetch`. Esta técnica, a menudo llamada "HTML Imports" a través de JS, reduce la duplicación de código y centraliza los componentes para facilitar su actualización.

### c. Renderizado de Productos (Demostración Dual)
Para cumplir con todos los requisitos, la aplicación demuestra dos métodos diferentes para renderizar dinámicamente la lista de productos a partir de `data/productos.json`.

#### 1. Uso de Plantillas (`<template>`)
-   En `index.html` se define una etiqueta `<template>` que contiene la estructura HTML de una tarjeta de producto.
-   El script `js/main.js` toma esta plantilla, la clona para cada uno de los primeros productos del JSON, llena los datos correspondientes (nombre, imagen, precio) y la añade al DOM. Este método es muy eficiente porque el contenido de la plantilla no se renderiza hasta que es explícitamente clonado y añadido a la página.

#### 2. Uso de Web Components Personalizados
-   Se creó un Web Component personalizado llamado `<product-card>` para encapsular completamente la lógica, estructura (HTML) y estilos (CSS) de una tarjeta de producto.
-   **Encapsulación:** Utiliza el **Shadow DOM** para aislar sus estilos y estructura, evitando conflictos con el CSS global de la página.
-   **Reutilización y Declaratividad:** El componente se puede usar de forma declarativa en el HTML. Los datos del producto se le pasan a través de atributos (`<product-card name="..." image="..." ...>`), haciendo el código más limpio y semántico. El resto de los productos del JSON se renderizan utilizando este componente.

### d. Carga de Datos con `fetch`
Todos los datos de los productos se almacenan en un archivo `productos.json` externo. La aplicación utiliza la API `fetch` para cargar estos datos de forma asíncrona, desacoplando así los datos de la presentación y permitiendo que se actualicen fácilmente sin tocar el código HTML o JavaScript.

## 3. Buenas Prácticas Aplicadas

-   **Separación de Responsabilidades (SoC):** El HTML se encarga de la estructura, el CSS del estilo y el JavaScript del comportamiento, cada uno en sus archivos correspondientes.
-   **Convenciones de Nomenclatura:** Se utilizó `camelCase` para variables y funciones en JavaScript, y `kebab-case` para clases CSS, siguiendo las convenciones estándar de la comunidad.
-   **Código Limpio y Comentado:** El código, especialmente en JavaScript, está debidamente indentado y comentado para explicar las partes clave de la lógica, mejorando su legibilidad.
-   **Modularidad:** La lógica se separó en `login.js` y `main.js`, asignando a cada archivo una responsabilidad única.

## 4. Evidencia de Trabajo Colaborativo

Para evidenciar nuestro trabajo en equipo, gestionamos el desarrollo de este proyecto a través de este repositorio en GitHub, utilizando las siguientes prácticas colaborativas:

-   **Estrategia de Ramas (Branches):**


    -   `main`: Rama principal que contiene la versión estable y funcional de la aplicación, utilizada también como rama de integración donde se fusionaron secuencialmente todas las nuevas características.
    
    -   `feature/login`, `feature/components`, etc.: Creamos ramas de características para desarrollar nuevas funcionalidades de forma aislada. Por ejemplo, un miembro del equipo trabajó en la funcionalidad de login en `feature/login` mientras otro desarrollaba la visualización de productos en `feature/components`.

-   **Commits:**

    -   Realizamos commits donde cada uno de ellos representa un cambio pequeño y lógico.
    
-   **Pull Requests (PRs):**
    -   Todas las nuevas características se fusionaron a `main` a través de Pull Requests.
    -   Los PRs se utilizaron para la revisión de código por pares.
    -   *Ejemplo de Pull Request:* `Pull Request #5: feat: implementa lógica JavaScript completa con Web Components`.


