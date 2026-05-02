// ─── CUSTOM CURSOR ───
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
}
animateRing();

// ─── NAVBAR SCROLL ───
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ─── SCROLL REVEAL ───
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
reveals.forEach(el => observer.observe(el));

// ─── SMOOTH SCROLL ───
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
});

// ─── IMPACT COUNTER ───
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.5 });
document.querySelectorAll('.impact-number').forEach(c => counterObserver.observe(c));

// ─── BOT BUBBLE ROTATION ───
const messages = [
    "👋 Hola, ¿te ayudo?",
    "🍋 Conoce VitaCitrus",
    "🔥 Oferta disponible hoy",
    "💬 Escríbenos por WhatsApp"
];
const botBubble = document.getElementById('botBubble');
setInterval(() => {
    if (botBubble && !document.getElementById('vcChatWindow').classList.contains('open')) {
        const msg = messages[Math.floor(Math.random() * messages.length)];
        botBubble.textContent = msg;
        botBubble.style.animation = 'none';
        void botBubble.offsetWidth;
        botBubble.style.animation = 'showMessage 5s ease forwards';
    }
}, 12000);

const botImg = document.querySelector('.botvita img');
if (botImg) {
    setInterval(() => {
        botImg.style.animation = 'floatBot 3s ease-in-out infinite, pulse 2s infinite';
        setTimeout(() => { botImg.style.animation = 'floatBot 3s ease-in-out infinite'; }, 4000);
    }, 10000);
}

// ═══════════════════════════════════════════
// FAQ ACCORDION
// ═══════════════════════════════════════════
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const answer = btn.nextElementSibling;
        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        // Cerrar todos
        document.querySelectorAll('.faq-question').forEach(other => {
            other.setAttribute('aria-expanded', 'false');
            other.nextElementSibling.classList.remove('open');
        });
        // Toggle actual
        if (!isOpen) {
            btn.setAttribute('aria-expanded', 'true');
            answer.classList.add('open');
        }
    });
});

// ═══════════════════════════════════════════
// CHATBOT VITACITRUS
// ═══════════════════════════════════════════
const KB = [
    {
        keys: ['precio', 'cuesta', 'vale', 'valor', 'comprar', 'compra', 'pedir', 'pedido', 'como compro', 'donde compro'],
        answer: '¡Genial que quieras probarlo! 🍋 El precio lo manejamos directamente por WhatsApp para darte la info más actualizada. Escríbenos 👉 <a href="https://wa.me/3177461057?text=Hola%20quiero%20comprar%20VitaCitrus" target="_blank">+57 317 746 1057</a>'
    },
    {
        keys: ['ingredientes', 'conservantes', 'azucar', 'azúcar', 'natural', 'organico', 'orgánico', 'artificial', 'aditivos', 'quimicos', 'químicos'],
        answer: 'VitaCitrus es 100% extracto puro de limón Tahití 🌿 Sin azúcares, sin conservantes artificiales, sin colorantes. Vegano y libre de gluten. Lo que ves en la etiqueta es lo que tomas.'
    },
    {
        keys: ['usar', 'uso', 'como se usa', 'cuanto', 'cuánto', 'cantidad', 'dosis', 'receta', 'recetas', 'preparar', 'mezclar'],
        answer: 'Para bebidas: 1–2 cucharadas por vaso 🥤 Para cocinar (ceviches, marinados): 1–3 cdas. Para repostería: 2–4 cdas. Al ser concentrado, ¡un poco va muy lejos!'
    },
    {
        keys: ['envio', 'envío', 'envios', 'envíos', 'domicilio', 'despacho', 'llega', 'colombia', 'ciudad', 'entrega'],
        answer: 'Sí, enviamos a todo Colombia 🇨🇴 El costo varía según tu ciudad. Escríbenos por <a href="https://wa.me/3177461057?text=Hola%20quiero%20saber%20el%20costo%20de%20envío" target="_blank">WhatsApp</a> con tu dirección y te cotizamos al instante.'
    },
    {
        keys: ['dura', 'vence', 'vencimiento', 'conservar', 'conservacion', 'refrigerar', 'nevera', 'caducidad', 'abierto'],
        answer: 'Sin abrir: hasta 12 meses en lugar fresco ❄️ Una vez abierto: refrigerar y consumir en 30 días. La botella de 250ml rinde unas 40–50 porciones individuales.'
    },
    {
        keys: ['que es', 'qué es', 'vitacitrus', 'producto', 'extracto', 'lima', 'limon', 'limón', 'tahiti', 'tahití'],
        answer: 'VitaCitrus es extracto concentrado de limón Tahití colombiano por extracción en frío 🧪 No es jugo: es la esencia pura de la lima. 1 cucharada = exprimir 3–4 limas frescas.'
    },
    {
        keys: ['beneficio', 'beneficios', 'vitamina', 'salud', 'sirve', 'propiedades', 'antioxidante', 'inmune', 'defensas'],
        answer: 'Rico en vitamina C y antioxidantes 💊 Refuerza el sistema inmune, mejora la digestión y tiene propiedades antiinflamatorias. Todo natural, sin procesar.'
    },
    {
        keys: ['whatsapp', 'contacto', 'numero', 'número', 'telefono', 'teléfono', 'hablar', 'comunicar', 'atencion', 'atención'],
        answer: 'Nuestro WhatsApp es <a href="https://wa.me/3177461057" target="_blank">+57 317 746 1057</a> 📱 ¡Respondemos rápido!'
    },
    {
        keys: ['instagram', 'redes', 'social', 'facebook', 'youtube', 'seguir'],
        answer: 'Síguenos en Instagram como <a href="https://www.instagram.com/vita.citrus" target="_blank">@vita.citrus</a> 📸 También en Facebook y YouTube con novedades y recetas.'
    },
    {
        keys: ['tamano', 'tamaño', 'presentacion', 'presentación', '250', 'ml', 'botella', 'litro', 'mayor', 'mayoreo'],
        answer: 'Por ahora manejamos presentación de 250ml 🍶 ¿Necesitas cantidad mayor o al por mayor? Escríbenos por <a href="https://wa.me/3177461057" target="_blank">WhatsApp</a> y lo coordinamos.'
    },
];

const FALLBACK = [
    'Mmm, no tengo esa info exacta 🤔 Pero el equipo en WhatsApp sí puede ayudarte: <a href="https://wa.me/3177461057?text=Hola%20tengo%20una%20pregunta" target="_blank">+57 317 746 1057</a>',
    'Esa pregunta es para los expertos 😄 <a href="https://wa.me/3177461057" target="_blank">Escríbenos directo por WhatsApp</a> y te respondemos.',
    'No estoy 100% seguro, ¡pero nuestro equipo sí! <a href="https://wa.me/3177461057" target="_blank">Contáctanos aquí 🍋</a>',
];

const SUGGESTIONS = [
    '¿Qué es VitaCitrus?',
    '¿Cómo se usa?',
    '¿Cuánto cuesta?',
    '¿Hacen envíos?',
    '¿Tiene conservantes?',
    '¿Cuánto dura?',
];

const chatWindow  = document.getElementById('vcChatWindow');
const chatToggle  = document.getElementById('vcChatToggle');
const chatClose   = document.getElementById('vcChatClose');
const messagesDiv = document.getElementById('vcMessages');
const suggestDiv  = document.getElementById('vcSuggestions');
const inputEl     = document.getElementById('vcInput');
const sendBtn     = document.getElementById('vcSend');

let chatOpened = false;

function openChat() {
    chatWindow.classList.add('open');
    chatWindow.setAttribute('aria-hidden', 'false');
    if (botBubble) botBubble.style.display = 'none';
    inputEl.focus();
    if (!chatOpened) {
        chatOpened = true;
        setTimeout(() => addBotMsg('¡Hola! Soy BotVita 🍋 Pregúntame lo que quieras sobre VitaCitrus.'), 350);
        setTimeout(() => renderSuggestions(), 900);
    }
}

function closeChat() {
    chatWindow.classList.remove('open');
    chatWindow.setAttribute('aria-hidden', 'true');
    if (botBubble) botBubble.style.display = '';
}

chatToggle.addEventListener('click', () => {
    chatWindow.classList.contains('open') ? closeChat() : openChat();
});
chatClose.addEventListener('click', closeChat);

function addBotMsg(html) {
    const div = document.createElement('div');
    div.className = 'vc-msg bot';
    div.innerHTML = html;
    messagesDiv.appendChild(div);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function addUserMsg(text) {
    const div = document.createElement('div');
    div.className = 'vc-msg user';
    div.textContent = text;
    messagesDiv.appendChild(div);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function showTyping() {
    const div = document.createElement('div');
    div.className = 'vc-typing'; div.id = 'vcTyping';
    div.innerHTML = '<span></span><span></span><span></span>';
    messagesDiv.appendChild(div);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function removeTyping() {
    const t = document.getElementById('vcTyping');
    if (t) t.remove();
}

function renderSuggestions(list = SUGGESTIONS) {
    suggestDiv.innerHTML = '';
    list.slice(0, 4).forEach(text => {
        const btn = document.createElement('button');
        btn.className = 'vc-chip';
        btn.textContent = text;
        btn.addEventListener('click', () => handleMessage(text));
        suggestDiv.appendChild(btn);
    });
}

function normalize(str) {
    return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function findAnswer(text) {
    const t = normalize(text);
    for (const item of KB) {
        for (const key of item.keys) {
            if (t.includes(normalize(key))) return item.answer;
        }
    }
    return FALLBACK[Math.floor(Math.random() * FALLBACK.length)];
}

function handleMessage(text) {
    if (!text.trim()) return;
    suggestDiv.innerHTML = '';
    addUserMsg(text);
    inputEl.value = '';
    showTyping();
    const delay = 600 + Math.random() * 700;
    setTimeout(() => {
        removeTyping();
        addBotMsg(findAnswer(text));
        const userCount = messagesDiv.querySelectorAll('.vc-msg.user').length;
        if (userCount % 2 === 0) renderSuggestions();
    }, delay);
}

sendBtn.addEventListener('click', () => handleMessage(inputEl.value));
inputEl.addEventListener('keydown', e => { if (e.key === 'Enter') handleMessage(inputEl.value); });


/* ═══════════════════════════════════════════
   TANDA 1 — JS
   Pega este bloque al final de main.js
   (reemplaza las secciones que ya existan
    con los mismos nombres)
═══════════════════════════════════════════ */

// ── PROMO BANNER ──
const promoBanner = document.getElementById('promoBanner');
const promoClose  = document.getElementById('promoClose');

if (promoBanner) {
    document.body.classList.add('banner-visible');
    promoClose.addEventListener('click', () => {
        promoBanner.classList.add('hidden');
        document.body.classList.remove('banner-visible');
        sessionStorage.setItem('promoClosed', '1');
    });
    if (sessionStorage.getItem('promoClosed')) {
        promoBanner.classList.add('hidden');
    }
}

// ── TOAST NOTIFICACIONES ──
const toastCities = [
    'Bucaramanga', 'Bogotá', 'Medellín', 'Cali',
    'Cúcuta', 'Barranquilla', 'San Gil', 'Barrancabermeja',
    'Girón', 'Floridablanca'
];
const toastActions = [
    'acaba de pedir VitaCitrus 🍋',
    'acaba de hacer su primer pedido 🛒',
    'le encantó y volvió a comprar ❤️',
    'recomendó VitaCitrus a un amigo 🤝',
];

function showToast() {
    const toast = document.getElementById('toast');
    const msg   = document.getElementById('toastMsg');
    if (!toast || !msg) return;

    const city   = toastCities[Math.floor(Math.random() * toastCities.length)];
    const action = toastActions[Math.floor(Math.random() * toastActions.length)];
    msg.textContent = `Alguien de ${city} ${action}`;

    // Barra de progreso
    toast.innerHTML = `
        <span class="toast-emoji">🍋</span>
        <span id="toastMsg">Alguien de ${city} ${action}</span>
        <div class="toast-bar"></div>
    `;

    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 5500);
}

// Primera vez a los 8s, luego cada 25–40s
setTimeout(() => {
    showToast();
    setInterval(showToast, 25000 + Math.random() * 15000);
}, 8000);

// ── IMPACT COUNTERS ──
function animateCounter(el, target, suffix, duration) {
    let start = null;
    el.classList.add('visible');
    function step(ts) {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3); // ease out cubic
        const val = Math.round(ease * target);
        el.innerHTML = val + '<span class="impact-suffix">' + suffix + '</span>';
        if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

const impactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el     = entry.target;
            const target = parseInt(el.dataset.target);
            const suffix = el.dataset.suffix || '';
            animateCounter(el, target, suffix, 1800);
            impactObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.impact-number[data-target]')
    .forEach(el => impactObserver.observe(el));

// ── RECIPE MODAL ──
const RECIPES = {
    limonada: {
        time: '⏱ 5 min · 4 porciones',
        title: 'Limonada Natural',
        img: './images/LimonadaNatural.png',
        ingredients: [
            '2 cdas VitaCitrus',
            '1 litro de agua fría',
            '3 cdas de azúcar o miel',
            'Hielo al gusto',
            'Hojas de menta (opcional)',
            'Sal de limón (toque)',
        ],
        steps: [
            'Disuelve el azúcar o miel en un poco de agua tibia.',
            'Mezcla VitaCitrus con el agua fría en una jarra.',
            'Añade la mezcla dulce y revuelve bien.',
            'Sirve sobre hielo abundante.',
            'Decora con menta y una rodaja de lima.',
        ],
    },
    ceviche: {
        time: '⏱ 20 min · 6 porciones',
        title: 'Ceviche Cítrico',
        img: './images/CevicheCítrico.png',
        ingredients: [
            '4 cdas VitaCitrus',
            '500g filete de pescado blanco',
            '1 cebolla morada en julianas',
            '1 ají o chile picado',
            'Cilantro fresco',
            'Sal y pimienta negra',
        ],
        steps: [
            'Corta el pescado en cubos de 2cm.',
            'Mezcla VitaCitrus, sal, pimienta y ají en un bol.',
            'Añade el pescado y la cebolla. Cubre con plástico.',
            'Refrigera 10–15 minutos hasta que el pescado "cocine".',
            'Sirve frío con cilantro fresco y tostadas.',
        ],
    },
    mojito: {
        time: '⏱ 10 min · 2 porciones',
        title: 'Mojito Verde',
        img: './images/MojitoVerde.png',
        ingredients: [
            '2 cdas VitaCitrus',
            '8 hojas de menta fresca',
            '2 cdas azúcar',
            'Hielo picado',
            '200ml agua con gas',
            '60ml ron blanco (opcional)',
        ],
        steps: [
            'Machaca la menta con el azúcar en el vaso.',
            'Añade VitaCitrus y mezcla bien.',
            'Llena el vaso con hielo picado.',
            'Vierte el ron si deseas y completa con soda.',
            'Remueve suavemente. Decora con menta.',
        ],
    },
    aderezo: {
        time: '⏱ 5 min · 8 porciones',
        title: 'Aderezo Cítrico',
        img: './images/AderezoCitrico.png',
        ingredients: [
            '1 cda VitaCitrus',
            '3 cdas aceite de oliva extra virgen',
            '1 cda miel',
            '1 cdita mostaza dijon',
            '1 diente ajo rallado',
            'Sal y pimienta al gusto',
        ],
        steps: [
            'Mezcla VitaCitrus, miel y mostaza en un bol pequeño.',
            'Añade el ajo rallado y salpimenta.',
            'Incorpora el aceite de oliva batiendo con un tenedor.',
            'Prueba y ajusta acidez y dulzor al gusto.',
            'Guarda en frasco. Dura 5 días refrigerado.',
        ],
    },
    marinado: {
        time: '⏱ 15 min · 4 porciones',
        title: 'Marinado Premium',
        img: './images/Marinado .png',
        ingredients: [
            '3 cdas VitaCitrus',
            '3 cdas aceite de oliva',
            '3 dientes de ajo picados',
            '1 cdita comino molido',
            '1 cdita orégano seco',
            'Sal gruesa y pimienta',
        ],
        steps: [
            'Mezcla todos los ingredientes en un bol.',
            'Baña la carne o pollo completamente con la marinada.',
            'Cubre y refrigera mínimo 30 min (ideal 2–4 horas).',
            'Retira el exceso antes de cocinar.',
            'Cocina a la plancha, horno o parrilla como de costumbre.',
        ],
    },
    tarta: {
        time: '⏱ 30 min + 2h reposo · 8 porciones',
        title: 'Tarta de Lima',
        img: './images/TartadeLima.png',
        ingredients: [
            '4 cdas VitaCitrus',
            '1 lata leche condensada (397g)',
            '200ml crema de leche',
            '200g galletas tipo María',
            '80g mantequilla derretida',
            'Ralladura de lima (opcional)',
        ],
        steps: [
            'Tritura las galletas y mézclalas con la mantequilla.',
            'Presiona en molde desmontable. Refrigera 15 min.',
            'Bate la crema hasta punto firme.',
            'Mezcla leche condensada con VitaCitrus. Incorpora la crema.',
            'Vierte sobre la base y refrigera mínimo 2 horas.',
            'Decora con ralladura de lima antes de servir.',
        ],
    },
};

const modalOverlay = document.getElementById('recipeModal');
const modalClose   = document.getElementById('recipeModalClose');

function openRecipeModal(key) {
    const r = RECIPES[key];
    if (!r) return;

    document.getElementById('modalImg').src        = r.img;
    document.getElementById('modalImg').alt        = r.title;
    document.getElementById('modalTime').textContent  = r.time;
    document.getElementById('modalTitle').textContent = r.title;

    document.getElementById('modalIngredients').innerHTML =
        r.ingredients.map(i => `<li>${i}</li>`).join('');
    document.getElementById('modalSteps').innerHTML =
        r.steps.map(s => `<li>${s}</li>`).join('');

    modalOverlay.classList.add('open');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeRecipeModal() {
    modalOverlay.classList.remove('open');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

if (modalClose)   modalClose.addEventListener('click', closeRecipeModal);
if (modalOverlay) modalOverlay.addEventListener('click', e => {
    if (e.target === modalOverlay) closeRecipeModal();
});

document.querySelectorAll('.recipe-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const key = btn.closest('[data-recipe]')?.dataset.recipe;
        if (key) openRecipeModal(key);
    });
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeRecipeModal();
});

/* ═══════════════════════════════════════════
   TANDA 2 — JS VISUALES
   Pega este bloque al final de main.js
   (después de la Tanda 1)
═══════════════════════════════════════════ */

// ── LOADER ──
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (!loader) return;
    // Esperar que la barra llegue al 100% (1.6s) + un pequeño delay
    setTimeout(() => {
        loader.classList.add('hidden');
        // Liberar después de la transición
        setTimeout(() => loader.remove(), 700);
    }, 1800);
});

// ── PARALLAX HERO ──
const heroVideo    = document.querySelector('.hero-video');
const heroLimeFloat = document.querySelector('.hero-lime-float');
const heroOrbs     = document.querySelectorAll('.orb');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > window.innerHeight) return; // solo en hero

    // Video se mueve más lento → efecto profundidad
    if (heroVideo) {
        heroVideo.style.transform = `translateY(${scrollY * 0.35}px) scale(1.08)`;
    }
    // Lima flota en sentido contrario
    if (heroLimeFloat) {
        heroLimeFloat.style.transform = `translateY(${scrollY * -0.2}px)`;
    }
    // Orbs se mueven a velocidades distintas
    heroOrbs.forEach((orb, i) => {
        const speed = 0.1 + i * 0.06;
        orb.style.transform = `translateY(${scrollY * speed}px)`;
    });
}, { passive: true });

// ── CURSOR MEJORADO ──
// Detecta sobre qué elemento está el cursor y aplica clase al body
const cursorStates = [
    { selector: 'a, button, .nav-cta, .btn-primary, .btn-secondary', cls: 'cursor-cta' },
    { selector: '.recipe-card, .recipe-modal-btn',                    cls: 'cursor-recipe' },
    { selector: 'nav, .navbar, h1, h2',                               cls: 'cursor-hover' },
];

document.addEventListener('mouseover', e => {
    // Limpiar todos los estados
    cursorStates.forEach(s => document.body.classList.remove(s.cls));

    // Aplicar el que corresponda
    for (const state of cursorStates) {
        if (e.target.closest(state.selector)) {
            document.body.classList.add(state.cls);
            break;
        }
    }
});

document.addEventListener('mouseleave', () => {
    cursorStates.forEach(s => document.body.classList.remove(s.cls));
});

// ── SONIDO — WEB AUDIO API (sin archivos externos) ──
let audioCtx = null;
let soundEnabled = false;

function getAudioCtx() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    return audioCtx;
}

// Sonido tipo "gota cítrica" generado con osciladores
function playDropSound(freq = 880, duration = 0.18) {
    if (!soundEnabled) return;
    try {
        const ctx = getAudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        filter.type = 'bandpass';
        filter.frequency.value = freq;
        filter.Q.value = 2;

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.4, ctx.currentTime + duration);

        gain.gain.setValueAtTime(0.18, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + duration);
    } catch (e) { /* silent fail */ }
}

// Sonido de hover en botones
function playHoverSound() {
    playDropSound(1200, 0.08);
}

// Sonido de clic
function playClickSound() {
    playDropSound(660, 0.15);
    setTimeout(() => playDropSound(880, 0.12), 60);
}

// Sonido al abrir modal
function playOpenSound() {
    [440, 550, 660].forEach((f, i) => {
        setTimeout(() => playDropSound(f, 0.2), i * 60);
    });
}

// Botón de sonido
function createSoundToggle() {
    const btn = document.createElement('button');
    btn.className = 'sound-toggle muted';
    btn.id = 'soundToggle';
    btn.setAttribute('aria-label', 'Activar/desactivar sonido');
    btn.setAttribute('title', 'Sonido');
    btn.innerHTML = `
        <svg class="icon-sound-on" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:none">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/>
        </svg>
        <svg class="icon-sound-off" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
        </svg>
    `;
    document.body.appendChild(btn);

    btn.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        btn.classList.toggle('muted', !soundEnabled);
        btn.querySelector('.icon-sound-on').style.display  = soundEnabled ? 'block' : 'none';
        btn.querySelector('.icon-sound-off').style.display = soundEnabled ? 'none'  : 'block';
        if (soundEnabled) {
            getAudioCtx().resume();
            playOpenSound();
        }
    });
}

createSoundToggle();

// Añadir sonidos a interacciones
document.addEventListener('mouseover', e => {
    if (e.target.matches('a, button, .recipe-card')) playHoverSound();
});

document.addEventListener('click', e => {
    if (e.target.matches('a, button')) playClickSound();
});

// Sonido especial al abrir modal de receta
const _origOpen = window.openRecipeModal;
if (typeof openRecipeModal === 'function') {
    const __orig = openRecipeModal;
    window.openRecipeModal = function(key) {
        playOpenSound();
        __orig(key);
    };
}
/* ═══════════════════════════════════════════
   TANDA 3 — JS TÉCNICO
   Pega este bloque al final de main.js
   (después de las Tandas 1 y 2)
═══════════════════════════════════════════ */

// ── MODO CLARO / OSCURO ──
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('vcTheme', theme);
}

// Aplicar tema guardado o preferencia del sistema
const savedTheme = localStorage.getItem('vcTheme');
if (savedTheme) {
    applyTheme(savedTheme);
} else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    applyTheme('light');
} else {
    applyTheme('dark');
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const current = document.body.getAttribute('data-theme');
        applyTheme(current === 'dark' ? 'light' : 'dark');
    });
}

// ── PWA — SERVICE WORKER ──
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('SW registrado:', reg.scope))
            .catch(err => console.log('SW error:', err));
    });
}

// ── INSTAGRAM SECTION (HTML dinámico) ──
// Inserta la sección de Instagram antes del footer
// Las imágenes usan las tuyas propias ya que la API de IG requiere token
function insertInstagramSection() {
    const footer = document.querySelector('footer');
    if (!footer) return;

    // Usando las imágenes de recetas como galería visual de muestra
    // (Reemplaza con fotos reales de tu Instagram cuando tengas el token)
    const igPosts = [
        { img: './images/LimonadaNatural.png',  alt: 'Limonada Natural VitaCitrus' },
        { img: './images/CevicheCítrico.png',    alt: 'Ceviche Cítrico VitaCitrus' },
        { img: './images/MojitoVerde.png',       alt: 'Mojito Verde VitaCitrus' },
        { img: './images/AderezoCitrico.png',    alt: 'Aderezo Cítrico VitaCitrus' },
        { img: './images/Marinado .png',         alt: 'Marinado VitaCitrus' },
        { img: './images/TartadeLima.png',       alt: 'Tarta de Lima VitaCitrus' },
        { img: './images/Producto.jpg',          alt: 'Producto VitaCitrus' },
        { img: './images/natural.png',           alt: 'VitaCitrus Natural' },
    ];

    const section = document.createElement('section');
    section.className = 'ig-section';
    section.innerHTML = `
        <p class="section-label">07 — Instagram</p>
        <h2 class="section-title" style="margin-bottom:0.25rem">Síguenos</h2>
        <span class="ig-handle">@vita.citrus</span>
        <div class="ig-grid">
            ${igPosts.map(p => `
                <a href="https://www.instagram.com/vita.citrus" target="_blank" class="ig-card">
                    <img src="${p.img}" alt="${p.alt}" loading="lazy">
                    <div class="ig-card-overlay">📸</div>
                </a>
            `).join('')}
        </div>
        <a href="https://www.instagram.com/vita.citrus" target="_blank" class="ig-cta">
            Ver más en Instagram →
        </a>
    `;

    footer.insertAdjacentElement('beforebegin', section);
}

insertInstagramSection();


/* ═══════════════════════════════════════════
   ARCHIVO SEPARADO: manifest.json
   Crea este archivo en la raíz de tu proyecto
═══════════════════════════════════════════

Contenido de manifest.json:
{
  "name": "VitaCitrus",
  "short_name": "VitaCitrus",
  "description": "Extracto premium de limón Tahití colombiano. 100% natural.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#050d05",
  "theme_color": "#84cc16",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "./images/Producto.jpg",
      "sizes": "192x192",
      "type": "image/jpeg",
      "purpose": "any maskable"
    },
    {
      "src": "./images/Producto.jpg",
      "sizes": "512x512",
      "type": "image/jpeg",
      "purpose": "any maskable"
    }
  ]
}

═══════════════════════════════════════════
   ARCHIVO SEPARADO: sw.js
   Crea este archivo en la raíz de tu proyecto
═══════════════════════════════════════════

Contenido de sw.js:
const CACHE = 'vitacitrus-v1';
const ASSETS = [
  '/',
  './index.html',
  './css/stayls.css',
  './js/main.js',
  './images/Producto.jpg',
  './images/botvita.png',
  './images/LimonadaNatural.png',
  './images/CevicheCítrico.png',
  './images/MojitoVerde.png',
  './images/AderezoCitrico.png',
  './images/TartadeLima.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});

═══════════════════════════════════════════ */
