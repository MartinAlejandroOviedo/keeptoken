// Función para actualizar head dinámicamente
function updateHead(options) {
    // Actualizar título
    if (options.title) {
        document.title = options.title;
    }

    // Función auxiliar para crear o actualizar meta tags
    const upsertMetaTag = (attributes) => {
        let metaTag = document.querySelector(`meta[${Object.keys(attributes)[0]}="${Object.values(attributes)[0]}"]`);
        
        if (!metaTag) {
            metaTag = document.createElement('meta');
            document.head.appendChild(metaTag);
        }

        // Establecer todos los atributos
        Object.entries(attributes).forEach(([key, value]) => {
            metaTag.setAttribute(key, value);
        });

        return metaTag;
    };

    // Descripción
    if (options.description) {
        upsertMetaTag({
            'name': 'description', 
            'content': options.description
        });
    }

    // Open Graph
    if (options.og) {
        const ogOptions = options.og;
        const ogMappings = [
            { prop: 'og:title', value: ogOptions.title },
            { prop: 'og:description', value: ogOptions.description },
            { prop: 'og:image', value: ogOptions.image },
            { prop: 'og:url', value: ogOptions.url },
            { prop: 'og:type', value: ogOptions.type || 'website' }
        ];

        ogMappings.forEach(mapping => {
            if (mapping.value) {
                upsertMetaTag({
                    'property': mapping.prop, 
                    'content': mapping.value
                });
            }
        });
    }

    // Twitter Card
    if (options.twitter) {
        const twitterOptions = options.twitter;
        const twitterMappings = [
            { name: 'twitter:title', value: twitterOptions.title },
            { name: 'twitter:description', value: twitterOptions.description },
            { name: 'twitter:image', value: twitterOptions.image },
            { name: 'twitter:card', value: twitterOptions.card || 'summary_large_image' }
        ];

        twitterMappings.forEach(mapping => {
            if (mapping.value) {
                upsertMetaTag({
                    'name': mapping.name, 
                    'content': mapping.value
                });
            }
        });
    }
}

// Ejemplo de uso
function setDefaultPageMeta() {
    updateHead({
        title: 'KeepToken - Solución Blockchain para Tokenización',
        description: 'KeepToken: Plataforma innovadora de tokenización blockchain que transforma activos digitales y reales.',
        og: {
            title: 'KeepToken - Tokenización Blockchain',
            description: 'Transforma activos con nuestra solución blockchain segura y eficiente.',
            image: 'assets/img/og-image.png',
            url: window.location.href,
            type: 'website'
        },
        twitter: {
            title: 'KeepToken - Tokenización Blockchain',
            description: 'Solución blockchain para tokenización de activos',
            image: 'assets/img/twitter-card.png',
            card: 'summary_large_image'
        }
    });
}

// Ejecutar meta por defecto al cargar
document.addEventListener('DOMContentLoaded', setDefaultPageMeta); 