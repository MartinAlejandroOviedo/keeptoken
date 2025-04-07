// Archivo main.js para KeepToken
// Funciones generales y utilidades globales

// Función para manejar el menú móvil con mejor soporte para Tailwind
function toggleMobileMenu() {
    const mobileDrawer = document.getElementById('mobile-drawer');
    const overlay = document.getElementById('mobile-drawer-overlay');
    
    if (mobileDrawer && overlay) {
        // Alternar visibilidad del drawer
        mobileDrawer.classList.toggle('-translate-x-full');
        mobileDrawer.classList.toggle('translate-x-0');
        
        // Alternar visibilidad del overlay
        overlay.classList.toggle('hidden');
        overlay.classList.toggle('block');
    }
}

// Función para cerrar el menú móvil
function closeMobileMenu() {
    const mobileDrawer = document.getElementById('mobile-drawer');
    const overlay = document.getElementById('mobile-drawer-overlay');
    
    if (mobileDrawer && overlay) {
        // Ocultar drawer
        mobileDrawer.classList.add('-translate-x-full');
        mobileDrawer.classList.remove('translate-x-0');
        
        // Ocultar overlay
        overlay.classList.add('hidden');
        overlay.classList.remove('block');
    }
}

// Función para manejar el desplazamiento suave
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Función para añadir eventos a los enlaces de desplazamiento suave
function initSmoothScrollLinks() {
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target);
        });
    });
}

// Función para copiar texto al portapapeles
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log('Texto copiado al portapapeles');
        // Puedes agregar una notificación visual aquí
    }).catch(err => {
        console.error('Error al copiar texto: ', err);
    });
}

// Inicializar eventos cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar desplazamiento suave
    initSmoothScrollLinks();

    // Configurar eventos para botones de menú móvil
    const mobileMenuOpenButtons = document.querySelectorAll('[data-drawer-show="mobile-drawer"]');
    const mobileMenuCloseButtons = document.querySelectorAll('[data-drawer-hide="mobile-drawer"]');
    const mobileDrawerOverlay = document.getElementById('mobile-drawer-overlay');

    // Selector adicional para el botón por ID
    const mobileMenuToggleButton = document.getElementById('mobile-menu-toggle');
    if (mobileMenuToggleButton) {
        mobileMenuToggleButton.addEventListener('click', toggleMobileMenu);
    }

    // Botones para abrir el menú
    mobileMenuOpenButtons.forEach(button => {
        button.addEventListener('click', toggleMobileMenu);
    });

    // Botones para cerrar el menú
    mobileMenuCloseButtons.forEach(button => {
        button.addEventListener('click', closeMobileMenu);
    });

    // Cerrar menú al hacer clic fuera
    if (mobileDrawerOverlay) {
        mobileDrawerOverlay.addEventListener('click', closeMobileMenu);
    }

    // Cerrar menú al presionar la tecla Escape
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMobileMenu();
        }
    });
});

// Función de utilidad para mostrar notificaciones
function showNotification(message, type = 'info') {
    const notificationContainer = document.getElementById('notification-container');
    
    if (!notificationContainer) {
        const container = document.createElement('div');
        container.id = 'notification-container';
        container.style.position = 'fixed';
        container.style.top = '20px';
        container.style.right = '20px';
        container.style.zIndex = '1000';
        document.body.appendChild(container);
    }

    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.padding = '10px';
    notification.style.margin = '10px';
    notification.style.borderRadius = '5px';
    
    switch(type) {
        case 'success':
            notification.style.backgroundColor = '#4CAF50';
            notification.style.color = 'white';
            break;
        case 'error':
            notification.style.backgroundColor = '#F44336';
            notification.style.color = 'white';
            break;
        case 'warning':
            notification.style.backgroundColor = '#FF9800';
            notification.style.color = 'white';
            break;
        default:
            notification.style.backgroundColor = '#2196F3';
            notification.style.color = 'white';
    }

    document.getElementById('notification-container').appendChild(notification);

    // Eliminar la notificación después de 3 segundos
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Exportar funciones útiles globalmente si es necesario
window.copyToClipboard = copyToClipboard;
window.showNotification = showNotification; 