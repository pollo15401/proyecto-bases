document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginContainer = document.getElementById('login-container');
    const appContainer = document.getElementById('app-container');
    const loginMessage = document.getElementById('login-message');
    const logoutButton = document.getElementById('logout-button');
    const contentDiv = document.getElementById('content');
    const navLinks = document.querySelectorAll('nav ul li a');

    const API_URL = 'http://localhost:3000'; // Ajusta si tu backend corre en otro puerto

    // Función para mostrar el contenedor de la aplicación y ocultar el login
    function showApp() {
        loginContainer.style.display = 'none';
        appContainer.style.display = 'block';
    }

    // Función para mostrar el contenedor de login y ocultar la aplicación
    function showLogin() {
        loginContainer.style.display = 'block';
        appContainer.style.display = 'none';
        loginMessage.textContent = ''; // Limpiar mensajes de login
    }

    // Verificar si hay un token al cargar la página
    const token = localStorage.getItem('token');
    if (token) {
        // Aquí podrías añadir una verificación del token con el backend si es necesario
        showApp();
    } else {
        showLogin();
    }

    // Manejar el envío del formulario de login
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                showApp();
            } else {
                loginMessage.textContent = data.message || 'Error en el login';
            }
        } catch (error) {
            console.error('Error:', error);
            loginMessage.textContent = 'Error de conexión o del servidor.';
        }
    });

    // Manejar el click en el botón de cerrar sesión
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('token');
        showLogin();
    });

    // Manejar la navegación entre secciones
    navLinks.forEach(link => {
        link.addEventListener('click', async (event) => {
            event.preventDefault();
            const resource = event.target.dataset.resource;
            await loadContent(resource);
        });
    });

    // Función para cargar contenido dinámicamente
    async function loadContent(resource) {
        const token = localStorage.getItem('token');
        if (!token) {
            showLogin();
            return;
        }

        try {
            const response = await fetch(`${API_URL}/${resource}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                renderContent(resource, data);
            } else {
                contentDiv.innerHTML = `<p>Error al cargar ${resource}.</p>`;
                if (response.status === 401) {
                    // Token inválido o expirado
                    localStorage.removeItem('token');
                    showLogin();
                }
            }
        } catch (error) {
            console.error('Error:', error);
            contentDiv.innerHTML = `<p>Error de conexión al cargar ${resource}.</p>`;
        }
    }

    // Función para renderizar el contenido (esto es un placeholder)
    function renderContent(resource, data) {
        let html = `<h2>Lista de ${resource.charAt(0).toUpperCase() + resource.slice(1)}</h2>`;
        if (data.length > 0) {
            html += '<ul>';
            data.forEach(item => {
                html += `<li>${JSON.stringify(item)}</li>`; // Mostrar datos como JSON por ahora
            });
            html += '</ul>';
        } else {
            html += `<p>No hay ${resource} disponibles.</p>`;
        }
        contentDiv.innerHTML = html;
    }
});