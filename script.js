// ============================================
// FUNCIONALIDAD DE FORMULARIOS
// ============================================

/**
 * Envía un formulario y muestra un mensaje de confirmación
 * @param {string} tipo - Tipo de formulario (visita, contacto, servicios, agenda)
 */
function enviarFormulario(tipo) {
    let formData = {};
    let modalId = '';

    switch(tipo) {
        case 'visita':
            formData = {
                nombre: document.getElementById('nombre').value,
                email: document.getElementById('email').value,
                telefono: document.getElementById('telefono').value,
                organizacion: document.getElementById('organizacion').value,
                mensaje: document.getElementById('mensaje').value,
                tipo: 'Solicitud de Visita Técnica'
            };
            modalId = 'modalVisita';
            break;

        case 'contacto':
            formData = {
                nombre: document.getElementById('nombre2').value,
                email: document.getElementById('email2').value,
                mensaje: document.getElementById('mensaje2').value,
                tipo: 'Mensaje de Contacto'
            };
            modalId = 'modalContacto';
            break;

        case 'servicios':
            formData = {
                nombre: document.getElementById('nombre3').value,
                email: document.getElementById('email3').value,
                servicio: document.getElementById('servicio').value,
                tipo: 'Solicitud de Información de Servicios'
            };
            modalId = 'modalServicios';
            break;

        case 'agenda':
            formData = {
                nombre: document.getElementById('nombre4').value,
                email: document.getElementById('email4').value,
                fecha: document.getElementById('fecha').value,
                hora: document.getElementById('hora').value,
                tipo: 'Solicitud de Agenda'
            };
            modalId = 'modalAgenda';
            break;
    }

    // Validar que los campos requeridos estén llenos
    if (!validarFormulario(formData)) {
        mostrarAlerta('Por favor completa todos los campos requeridos.', 'warning');
        return;
    }

    // Simular envío del formulario
    console.log('Formulario enviado:', formData);
    
    // Mostrar mensaje de éxito
    mostrarAlerta('¡Gracias! Tu solicitud ha sido recibida. Nos pondremos en contacto pronto.', 'success');
    
    // Cerrar modal después de 2 segundos
    setTimeout(() => {
        const modal = bootstrap.Modal.getInstance(document.getElementById(modalId));
        if (modal) {
            modal.hide();
        }
        // Limpiar formulario
        limpiarFormulario(tipo);
    }, 2000);
}

/**
 * Valida que los campos requeridos del formulario estén llenos
 * @param {object} formData - Objeto con datos del formulario
 * @returns {boolean} - True si es válido, false si no
 */
function validarFormulario(formData) {
    for (let key in formData) {
        if (formData[key] === '' || formData[key] === null) {
            return false;
        }
    }
    return true;
}

/**
 * Limpia los campos de un formulario específico
 * @param {string} tipo - Tipo de formulario a limpiar
 */
function limpiarFormulario(tipo) {
    switch(tipo) {
        case 'visita':
            document.getElementById('formVisita').reset();
            break;
        case 'contacto':
            document.getElementById('formContacto').reset();
            break;
        case 'servicios':
            document.getElementById('formServicios').reset();
            break;
        case 'agenda':
            document.getElementById('formAgenda').reset();
            break;
    }
}

/**
 * Muestra una alerta en la pantalla
 * @param {string} mensaje - Mensaje a mostrar
 * @param {string} tipo - Tipo de alerta (success, warning, danger, info)
 */
function mostrarAlerta(mensaje, tipo = 'info') {
    // Crear elemento de alerta
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${tipo} alert-dismissible fade show`;
    alertDiv.setAttribute('role', 'alert');
    alertDiv.innerHTML = `
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    // Insertar alerta al inicio del body
    document.body.insertBefore(alertDiv, document.body.firstChild);

    // Auto-cerrar después de 5 segundos
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// ============================================
// ANIMACIONES AL SCROLL
// ============================================

/**
 * Observa elementos y aplica animaciones cuando entran en vista
 */
function inicializarAnimacionesScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar todas las tarjetas y elementos con clase animable
    document.querySelectorAll('.service-card, .benefit-card, .result-card, .testimonial-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

// ============================================
// SMOOTH SCROLL PARA LINKS
// ============================================

/**
 * Configura smooth scroll para links internos
 */
function configurarSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // No prevenir comportamiento por defecto para links que abren modales
            if (href === '#' || this.hasAttribute('data-bs-toggle')) {
                return;
            }
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================
// NAVBAR STICKY
// ============================================

/**
 * Agrega efecto de sombra al navbar cuando hace scroll
 */
function configurarNavbarSticky() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-sm');
        } else {
            navbar.classList.remove('shadow-sm');
        }
    });
}

// ============================================
// CONTADOR DE ESTADÍSTICAS
// ============================================

/**
 * Anima números cuando entran en vista
 */
function animarContadores() {
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const finalValue = element.textContent;
                
                // Si es un número, animar
                if (/^\d+/.test(finalValue)) {
                    animarNumero(element, finalValue);
                }
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.sustainability-number').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Anima un número desde 0 hasta el valor final
 * @param {element} element - Elemento a animar
 * @param {string} finalValue - Valor final del número
 */
function animarNumero(element, finalValue) {
    const isPercentage = finalValue.includes('%');
    const numericValue = parseInt(finalValue);
    const duration = 2000; // 2 segundos
    const steps = 60;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const currentValue = Math.floor(numericValue * progress);
        
        element.textContent = isPercentage ? currentValue + '%' : currentValue;

        if (currentStep >= steps) {
            element.textContent = finalValue;
            clearInterval(interval);
        }
    }, stepDuration);
}

// ============================================
// VALIDACIÓN DE FORMULARIOS EN TIEMPO REAL
// ============================================

/**
 * Configura validación en tiempo real para formularios
 */
function configurarValidacionFormularios() {
    const formularios = document.querySelectorAll('form');
    
    formularios.forEach(formulario => {
        formulario.addEventListener('input', (e) => {
            const campo = e.target;
            
            if (campo.type === 'email') {
                validarEmail(campo);
            } else if (campo.type === 'tel') {
                validarTelefono(campo);
            } else if (campo.required) {
                validarCampoRequerido(campo);
            }
        });
    });
}

/**
 * Valida un email
 * @param {element} campo - Campo de email a validar
 */
function validarEmail(campo) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(campo.value)) {
        campo.classList.remove('is-invalid');
        campo.classList.add('is-valid');
    } else {
        campo.classList.remove('is-valid');
        campo.classList.add('is-invalid');
    }
}

/**
 * Valida un teléfono
 * @param {element} campo - Campo de teléfono a validar
 */
function validarTelefono(campo) {
    const regex = /^[\d\s\-\+\(\)]+$/;
    if (regex.test(campo.value) && campo.value.length >= 9) {
        campo.classList.remove('is-invalid');
        campo.classList.add('is-valid');
    } else if (campo.value.length > 0) {
        campo.classList.remove('is-valid');
        campo.classList.add('is-invalid');
    }
}

/**
 * Valida un campo requerido
 * @param {element} campo - Campo a validar
 */
function validarCampoRequerido(campo) {
    if (campo.value.trim() !== '') {
        campo.classList.remove('is-invalid');
        campo.classList.add('is-valid');
    } else {
        campo.classList.remove('is-valid');
        campo.classList.add('is-invalid');
    }
}

// ============================================
// DARK MODE TOGGLE (OPCIONAL)
// ============================================

/**
 * Alterna entre modo claro y oscuro
 */
function inicializarDarkMode() {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Verificar preferencia del sistema
    if (prefersDarkScheme.matches) {
        // Opcionalmente aplicar dark mode por defecto
        // document.body.classList.add('dark-mode');
    }
}

// ============================================
// INICIALIZACIÓN GENERAL
// ============================================

/**
 * Ejecuta todas las funciones de inicialización cuando el DOM está listo
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('Página cargada - Inicializando funcionalidades');
    
    // Inicializar todas las funcionalidades
    inicializarAnimacionesScroll();
    configurarSmoothScroll();
    configurarNavbarSticky();
    animarContadores();
    configurarValidacionFormularios();
    inicializarDarkMode();
    
    // Agregar efecto de carga
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// UTILIDADES ADICIONALES
// ============================================

/**
 * Obtiene parámetros de URL
 * @param {string} param - Nombre del parámetro
 * @returns {string} - Valor del parámetro
 */
function obtenerParametroURL(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

/**
 * Copia texto al portapapeles
 * @param {string} texto - Texto a copiar
 */
function copiarAlPortapapeles(texto) {
    navigator.clipboard.writeText(texto).then(() => {
        mostrarAlerta('¡Copiado al portapapeles!', 'success');
    }).catch(() => {
        mostrarAlerta('Error al copiar', 'danger');
    });
}

/**
 * Abre un enlace en una nueva ventana
 * @param {string} url - URL a abrir
 */
function abrirEnNuevaVentana(url) {
    window.open(url, '_blank', 'width=800,height=600');
}

// ============================================
// MANEJO DE ERRORES
// ============================================

/**
 * Maneja errores globales
 */
window.addEventListener('error', (event) => {
    console.error('Error:', event.error);
    mostrarAlerta('Ocurrió un error. Por favor, intenta de nuevo.', 'danger');
});

/**
 * Maneja promesas rechazadas no capturadas
 */
window.addEventListener('unhandledrejection', (event) => {
    console.error('Promise rejection:', event.reason);
    mostrarAlerta('Ocurrió un error. Por favor, intenta de nuevo.', 'danger');
});

// ============================================
// PERFORMANCE
// ============================================

/**
 * Lazy loading para imágenes
 */
function configurarLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Ejecutar lazy loading cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', configurarLazyLoading);

// ============================================
// ANALYTICS (OPCIONAL)
// ============================================

/**
 * Registra eventos de interacción
 */
function registrarEvento(categoria, accion, etiqueta) {
    if (typeof gtag !== 'undefined') {
        gtag('event', accion, {
            'event_category': categoria,
            'event_label': etiqueta
        });
    }
    console.log(`Evento registrado: ${categoria} - ${accion} - ${etiqueta}`);
}

// Registrar clics en CTAs
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-cta') || e.target.classList.contains('btn-primary')) {
        const texto = e.target.textContent;
        registrarEvento('CTA', 'click', texto);
    }
});

