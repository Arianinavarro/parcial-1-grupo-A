// Espera a que el DOM esté completamente cargado para ejecutar el script.
document.addEventListener('DOMContentLoaded', () => {
    // Obtiene el formulario de login por su ID.
    const loginForm = document.getElementById('login-form');
    // Obtiene el elemento para mostrar mensajes de error.
    const errorMessage = document.getElementById('error-message');

    // Agrega un 'escuchador' de eventos para cuando el formulario se intente enviar.
    loginForm.addEventListener('submit', (event) => {
        // previene el comportamiento por defecto del formulario (que es recargar la página).
        event.preventDefault();

        // Obtiene los valores de los campos de usuario y contraseña.
        // El .trim() elimina espacios en blanco al inicio y al final.
        const username = event.target.username.value.trim();
        const password = event.target.password.value.trim();

        // Credenciales quemadas en el código (solo para fines educativos).
        const validUser = 'ana';
        const validPass = '123';

        // Comprueba si las credenciales ingresadas son correctas.
        if (username === validUser && password === validPass) {
            // Si son correctas, guarda un indicador de sesión en sessionStorage.
            // Esto sirve para que la página principal sepa que el usuario ha iniciado sesión.
            sessionStorage.setItem('isLoggedIn', 'true');
            // Redirige al usuario a la página principal.
            window.location.href = 'index.html';
        } else {
            // Si las credenciales son incorrectas, muestra el mensaje de error.
            errorMessage.style.display = 'block';
        }
    });
});
