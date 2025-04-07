// Función para cargar un partial con promesa
function loadPartial(url) {
    return new Promise((resolve, reject) => {
        console.log(`Iniciando carga de: ${url}`);
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error al cargar ${url}: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                console.log(`Carga exitosa de: ${url}`);
                resolve(data);
            })
            .catch(error => {
                console.error(`Error en la carga de ${url}:`, error);
                reject(error);
            });
    });
}

// Función para insertar el contenido en el DOM
function insertContent(element, content) {
    return new Promise((resolve) => {
        console.log(`Insertando contenido en: ${element}`);
        const targetElement = document.querySelector(element);
        if (targetElement) {
            // Si es el header, preservar el drawer y overlay
            if (element === 'header') {
                const drawer = document.getElementById('mobile-drawer');
                const overlay = document.getElementById('mobile-drawer-overlay');
                const drawerContent = drawer ? drawer.outerHTML : '';
                const overlayContent = overlay ? overlay.outerHTML : '';
                
                targetElement.innerHTML = content;
                
                // Reinsertar el drawer y overlay si no existen
                if (!document.getElementById('mobile-drawer')) {
                    document.body.insertAdjacentHTML('beforeend', drawerContent);
                }
                if (!document.getElementById('mobile-drawer-overlay')) {
                    document.body.insertAdjacentHTML('beforeend', overlayContent);
                }
            } else {
                targetElement.innerHTML = content;
            }
            
            console.log(`Contenido insertado en: ${element}`);
            resolve();
        } else {
            console.error(`Elemento no encontrado: ${element}`);
            resolve();
        }
    });
}

// Función principal para cargar todos los partials
async function loadAllPartials() {
    console.log('Iniciando carga de todos los partials');
    
    try {
        // Cargar header
        const headerContent = await loadPartial('partials/header.html');
        await insertContent('header', headerContent);
        console.log('Header cargado y insertado');

        // Cargar footer
        const footerContent = await loadPartial('partials/footer.html');
        await insertContent('footer', footerContent);
        console.log('Footer cargado y insertado');

        // Inicializar el menú móvil después de cargar el header
        console.log('Inicializando menú móvil');
        initializeMobileMenu();
        
        console.log('Todos los partials cargados exitosamente');
    } catch (error) {
        console.error('Error en la carga de partials:', error);
    }
}

// Función para inicializar el menú móvil
function initializeMobileMenu() {
    console.log('Inicializando menú móvil');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const overlay = document.getElementById('mobile-drawer-overlay');
    const closeButton = document.getElementById('mobile-drawer-close');

    if (mobileMenuToggle && mobileDrawer && overlay && closeButton) {
        console.log('Elementos del menú móvil encontrados');
        
        // Evento para abrir el menú
        mobileMenuToggle.addEventListener('click', () => {
            console.log('Botón de menú móvil clickeado');
            toggleMobileMenu();
        });

        // Evento para cerrar el menú con el botón de cerrar
        closeButton.addEventListener('click', () => {
            console.log('Botón de cerrar clickeado');
            closeMobileMenu();
        });

        // Evento para cerrar el menú con el overlay
        overlay.addEventListener('click', () => {
            console.log('Overlay clickeado');
            closeMobileMenu();
        });

        // Evento para cerrar el menú con la tecla Escape
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && !mobileDrawer.classList.contains('-translate-x-full')) {
                console.log('Tecla Escape presionada');
                closeMobileMenu();
            }
        });
    } else {
        console.error('Elementos del menú móvil no encontrados:', {
            mobileMenuToggle: !!mobileMenuToggle,
            mobileDrawer: !!mobileDrawer,
            overlay: !!overlay,
            closeButton: !!closeButton
        });
    }
}

// Función para alternar el menú móvil
function toggleMobileMenu() {
    console.log('Alternando menú móvil');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const overlay = document.getElementById('mobile-drawer-overlay');
    
    if (mobileDrawer && overlay) {
        mobileDrawer.classList.toggle('-translate-x-full');
        mobileDrawer.classList.toggle('translate-x-0');
        overlay.classList.toggle('hidden');
        console.log('Estado del menú:', {
            drawerVisible: !mobileDrawer.classList.contains('-translate-x-full'),
            overlayVisible: !overlay.classList.contains('hidden')
        });
    }
}

// Función para cerrar el menú móvil
function closeMobileMenu() {
    console.log('Cerrando menú móvil');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const overlay = document.getElementById('mobile-drawer-overlay');
    
    if (mobileDrawer && overlay) {
        mobileDrawer.classList.add('-translate-x-full');
        mobileDrawer.classList.remove('translate-x-0');
        overlay.classList.add('hidden');
        console.log('Menú móvil cerrado');
    }
}

// Iniciar la carga cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM cargado, iniciando carga de partials');
    loadAllPartials();
}); 