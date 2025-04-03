// Registrar el plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Función para cargar datos JSON
async function loadData() {
    try {
        const response = await fetch('db/data.json');
        if (!response.ok) {
            throw new Error('Error al cargar los datos');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

// Función para renderizar el menú
function renderMenu(menu) {
    const menuContainer = document.querySelector('nav .hidden.md\\:flex');
    if (!menuContainer) return;

    menuContainer.innerHTML = menu.map(item => `
        <a href="${item.url}" class="hover:text-neon-blue transition-colors">${item.title}</a>
    `).join('');
}

// Función para cargar características
async function loadFeatures() {
    const data = await loadData();
    if (!data) return;

    const featuresContainer = document.querySelector('#caracteristicas .grid');
    if (!featuresContainer) return;

    featuresContainer.innerHTML = data.blocks.map(block => `
        <div class="p-6 bg-gray-800 rounded-lg neon-border">
            <div class="flex items-center mb-4">
                <i class='bx ${block.icon} text-3xl mr-3 neon-text'></i>
                <h3 class="text-xl font-bold neon-text">${block.name}</h3>
            </div>
            <p class="text-gray-300">${block.content}</p>
            <div class="mt-4 flex flex-wrap gap-2">
                ${block.tags.map(tag => `
                    <span class="px-2 py-1 text-xs bg-gray-700 rounded-full neon-text">${tag}</span>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// Función para cargar posts del blog
async function loadBlogPosts() {
    const data = await loadData();
    if (!data) return;

    const blogContainer = document.querySelector('#blog .grid');
    if (!blogContainer) return;

    blogContainer.innerHTML = data.posts.map(post => `
        <div class="bg-gray-800 rounded-lg overflow-hidden neon-border">
            <img src="${post.image_url}" alt="${post.title}" class="w-full h-48 object-cover">
            <div class="p-6">
                <h3 class="text-xl font-bold mb-2 neon-text">${post.title}</h3>
                <p class="text-gray-300 mb-4">${post.content}</p>
                <div class="flex flex-wrap gap-2">
                    ${post.tags.map(tagId => {
                        const tag = data.tags.find(t => t.id === tagId);
                        return tag ? `<span class="px-2 py-1 text-xs bg-gray-700 rounded-full neon-text">${tag.name}</span>` : '';
                    }).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// Función para cargar gobernanza
async function loadGovernance() {
    const data = await loadData();
    if (!data || !data.governance) return;

    const governanceContainer = document.querySelector('#gobernanza .grid');
    if (!governanceContainer) return;

    // Actualizar título y descripción
    const titleElement = document.querySelector('#gobernanza .section-title');
    const descriptionElement = document.querySelector('#gobernanza p');
    if (titleElement) titleElement.textContent = data.governance.title;
    if (descriptionElement) descriptionElement.textContent = data.governance.description;

    // Renderizar características de gobernanza
    governanceContainer.innerHTML = data.governance.features.map(feature => `
        <div class="p-6 bg-gray-800 rounded-lg neon-border">
            <div class="flex items-center mb-4">
                <i class='bx ${feature.icon} text-3xl mr-3 neon-text'></i>
                <h3 class="text-xl font-bold neon-text">${feature.name}</h3>
            </div>
            <p class="text-gray-300">${feature.content}</p>
            <div class="mt-4 flex flex-wrap gap-2">
                ${feature.tags.map(tag => `
                    <span class="px-2 py-1 text-xs bg-gray-700 rounded-full neon-text">${tag}</span>
                `).join('')}
            </div>
        </div>
    `).join('');

    // Renderizar requisitos
    const requirementsContainer = document.querySelector('#gobernanza .requirements');
    if (requirementsContainer && data.governance.requirements) {
        const { requirements } = data.governance;
        requirementsContainer.innerHTML = `
            <div class="p-6 bg-gray-800 rounded-lg neon-border">
                <h3 class="text-xl font-bold mb-4 neon-text">Requisitos de Participación</h3>
                <ul class="space-y-2 text-gray-300">
                    <li>• Mínimo de tokens: ${requirements.minimum_tokens} KTK</li>
                    <li>• Mínimo de usuarios: ${requirements.minimum_users.toLocaleString()}</li>
                    <li>• Proceso de validación: ${requirements.validation_process}</li>
                    <li>• Período de votación: ${requirements.voting_period}</li>
                    <li>• Quórum requerido: ${requirements.quorum}</li>
                </ul>
            </div>
        `;
    }
}

// Función para inicializar las animaciones
function initAnimations() {
    // Animación del hero
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        gsap.from(heroContent, {
            duration: 1.5,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        });
    }

    // Animación de las secciones al hacer scroll
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        });
    });
}

// Función principal de inicialización
async function init() {
    const data = await loadData();
    if (!data) {
        console.error('No se pudieron cargar los datos');
        return;
    }

    renderMenu(data.menu);
    await loadFeatures();
    await loadBlogPosts();
    await loadGovernance();
    initAnimations();
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init); 
