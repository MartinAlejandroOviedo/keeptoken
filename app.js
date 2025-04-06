// Verificar si GSAP está disponible antes de registrar el plugin
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
} else {
    console.warn('GSAP no está disponible. Las animaciones podrían no funcionar.');
}

// Función para cargar datos JSON
async function loadData() {
    try {
        const response = await fetch('db/data.json');
        if (!response.ok) {
            throw new Error('Error al cargar los datos');
        }
        return await response.json();
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
                <a href="blog.html?id=${post.id}" class="block">
                    <h3 class="text-xl font-bold mb-2 neon-text hover:text-neon-blue transition-colors">${post.title}</h3>
                </a>
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
    const heroSection = document.querySelector('#inicio');
    const heroContent = document.querySelector('.hero-content');
    
    // Eliminar estilos inline que puedan afectar la visibilidad y posición
    if (heroSection) {
        console.log('Eliminando estilos inline de heroSection');
        heroSection.removeAttribute('style');
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'none';
    }
    
    if (heroContent) {
        console.log('Eliminando estilos inline de heroContent');
        heroContent.removeAttribute('style');
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'none';
        
        gsap.from(heroContent, {
            duration: 1.5,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        });
    }

    // Animación de las secciones al hacer scroll
    const sections = document.querySelectorAll('section');
    console.log(`Encontradas ${sections.length} secciones para animación`);
    sections.forEach(section => {
        // Eliminar estilos inline
        section.removeAttribute('style');
        section.style.opacity = '1';
        section.style.transform = 'none';

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

// Base de datos de blogs, categorías y tags
const blogData = {
    categories: {
        1: {
            id: 1,
            name: "Criptomonedas",
            description: "Información y análisis sobre el mundo de las criptomonedas",
            icon: "bx-coin-stack"
        },
        2: {
            id: 2,
            name: "Blockchain",
            description: "Tecnología blockchain y sus aplicaciones revolucionarias",
            icon: "bx-network-chart"
        },
        3: {
            id: 3,
            name: "Finanzas Descentralizadas",
            description: "Explorando el futuro de las finanzas digitales",
            icon: "bx-dollar-circle"
        }
    },
    tags: {
        1: {
            id: 1,
            name: "Estable",
            color: "blue"
        },
        2: {
            id: 2,
            name: "Seguridad",
            color: "green"
        },
        3: {
            id: 3,
            name: "Innovación",
            color: "purple"
        },
        4: {
            id: 4,
            name: "Democracia",
            color: "cyan"
        }
    },
    posts: {
        1: {
            title: "¿Qué es KeepToken?",
            content: `...`, // contenido existente
            imageUrl: "https://picsum.photos/800/400?random=1",
            categoryId: 1,
            tags: [1, 2]
        },
        // ... otros posts con categoryId y tags
    }
};

// Función para cargar categorías
function loadCategories() {
    const categoriesContainer = document.querySelector('#categories-container');
    if (!categoriesContainer) return;

    categoriesContainer.innerHTML = Object.values(blogData.categories).map(category => `
        <a href="category.html?id=${category.id}" class="block bg-gray-800 rounded-lg p-6 neon-border hover:bg-gray-700 transition-colors">
            <div class="flex items-center mb-4">
                <i class='bx ${category.icon} text-3xl mr-3 neon-text'></i>
                <h3 class="text-xl font-bold neon-text">${category.name}</h3>
            </div>
            <p class="text-gray-300">${category.description}</p>
        </a>
    `).join('');
}

// Función para cargar tags
function loadTags() {
    const tagsContainer = document.querySelector('#tags-container');
    if (!tagsContainer) return;

    tagsContainer.innerHTML = Object.values(blogData.tags).map(tag => `
        <a href="tag.html?id=${tag.id}" class="inline-block px-3 py-1 m-1 rounded-full 
            text-sm font-medium 
            bg-gray-800 
            hover:bg-neon-${tag.color} 
            hover:text-gray-900 
            transition-colors 
            neon-text">
            ${tag.name}
        </a>
    `).join('');
}

// Función para cargar posts de una categoría específica
function loadCategoryPosts(categoryId) {
    const postsContainer = document.querySelector('#category-posts');
    if (!postsContainer) return;

    const categoryPosts = Object.values(blogData.posts)
        .filter(post => post.categoryId === parseInt(categoryId));

    if (categoryPosts.length === 0) {
        postsContainer.innerHTML = `
            <div class="text-center text-gray-400">
                No hay posts en esta categoría.
            </div>
        `;
        return;
    }

    postsContainer.innerHTML = categoryPosts.map(post => `
        <div class="bg-gray-800 rounded-lg overflow-hidden neon-border">
            <img src="${post.imageUrl}" alt="${post.title}" class="w-full h-48 object-cover">
            <div class="p-6">
                <a href="blog.html?id=${Object.keys(blogData.posts).find(key => blogData.posts[key] === post)}" class="block">
                    <h3 class="text-xl font-bold mb-2 neon-text hover:text-neon-blue transition-colors">${post.title}</h3>
                </a>
                <div class="flex flex-wrap gap-2 mb-4">
                    ${post.tags.map(tagId => {
                        const tag = blogData.tags[tagId];
                        return tag ? `
                            <span class="px-2 py-1 text-xs bg-gray-700 rounded-full neon-text">
                                ${tag.name}
                            </span>
                        ` : '';
                    }).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// Función para cargar posts de un tag específico
function loadTagPosts(tagId) {
    const postsContainer = document.querySelector('#tag-posts');
    if (!postsContainer) return;

    const tagPosts = Object.values(blogData.posts)
        .filter(post => post.tags.includes(parseInt(tagId)));

    if (tagPosts.length === 0) {
        postsContainer.innerHTML = `
            <div class="text-center text-gray-400">
                No hay posts con este tag.
            </div>
        `;
        return;
    }

    postsContainer.innerHTML = tagPosts.map(post => `
        <div class="bg-gray-800 rounded-lg overflow-hidden neon-border">
            <img src="${post.imageUrl}" alt="${post.title}" class="w-full h-48 object-cover">
            <div class="p-6">
                <a href="blog.html?id=${Object.keys(blogData.posts).find(key => blogData.posts[key] === post)}" class="block">
                    <h3 class="text-xl font-bold mb-2 neon-text hover:text-neon-blue transition-colors">${post.title}</h3>
                </a>
                <div class="flex flex-wrap gap-2 mb-4">
                    ${post.tags.map(tagId => {
                        const tag = blogData.tags[tagId];
                        return tag ? `
                            <span class="px-2 py-1 text-xs bg-gray-700 rounded-full neon-text">
                                ${tag.name}
                            </span>
                        ` : '';
                    }).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// Inicialización de funciones según la página
document.addEventListener('DOMContentLoaded', () => {
    // Cargar categorías en la página de categorías
    if (document.querySelector('#categories-container')) {
        loadCategories();
    }

    // Cargar tags en la página de tags
    if (document.querySelector('#tags-container')) {
        loadTags();
    }

    // Cargar posts de categoría
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('id');
    if (document.querySelector('#category-posts') && categoryId) {
        loadCategoryPosts(categoryId);
    }

    // Cargar posts de tag
    const tagId = urlParams.get('id');
    if (document.querySelector('#tag-posts') && tagId) {
        loadTagPosts(tagId);
    }
}); 
