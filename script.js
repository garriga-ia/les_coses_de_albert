// =========================================================================
// ⚙️ GESTIÓ DINÀMICA DE DESTACATS (PERSISTÈNCIA LOCALSTORAGE)
// =========================================================================
const DEFAULT_HERO_ID = "conte-emma";
const DEFAULT_CAROUSEL_IDS = ["impostor", "conte-ivet", "la-pasta", "creixement-personal", "biblioteca-webapp"];
const DEFAULT_DOCK_IDS = ["conte-emma", "la-pasta", "traductor-ia", "impostor"];

// Carrega de localStorage o valors per defecte
let currentHeroId = localStorage.getItem('hub_hero_id') || DEFAULT_HERO_ID;

let currentCarouselIds = [];
try {
    const savedCarousel = localStorage.getItem('hub_carousel_ids');
    currentCarouselIds = savedCarousel ? JSON.parse(savedCarousel) : DEFAULT_CAROUSEL_IDS;
} catch (e) {
    currentCarouselIds = DEFAULT_CAROUSEL_IDS;
}

let currentDockIds = [];
try {
    const savedDock = localStorage.getItem('hub_dock_ids');
    currentDockIds = savedDock ? JSON.parse(savedDock) : DEFAULT_DOCK_IDS;
} catch (e) {
    currentDockIds = DEFAULT_DOCK_IDS;
}

// Estat del mode d'edició / personalització
let isEditMode = false;

// Gestió de temes de color (5 ambients visuals)
let currentTheme = localStorage.getItem('hub_theme') || 'midnight';
document.documentElement.setAttribute('data-theme', currentTheme);

// =========================================================================
// 🎨 DICCIONARI D'ICONES VECTORIALS MINIMALISTES (SVG D'ALTA DEFINICIÓ)
// =========================================================================
const appIcons = {
    // Contes i Narrativa
    "story-emma": `<svg class="w-6 h-6 text-white drop-shadow-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="m14 8 1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z"/></svg>`,
    "story-ivet": `<svg class="w-6 h-6 text-white drop-shadow-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m19 11-8-8-8.5 8.5a2.12 2.12 0 1 0 3 3L14 6"/><path d="m15 2 1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z"/><path d="M20 13l.5 1 1 .5-1 .5-.5 1-.5-1-1-.5 1-.5.5-1z"/></svg>`,
    "story-judit": `<svg class="w-6 h-6 text-white drop-shadow-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 5v3"/></svg>`,
    "library": `<svg class="w-6 h-6 text-white drop-shadow-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/><path d="M2 20h20"/></svg>`,

    // Jocs
    "impostor": `<svg class="w-6 h-6 text-white drop-shadow-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12c1 4 4 7 10 7s9-3 10-7c-1-4-4-7-10-7S3 8 2 12Z"/><circle cx="8" cy="12" r="2.2"/><circle cx="16" cy="12" r="2.2"/></svg>`,

    // Finances i Família
    "wallet": `<svg class="w-6 h-6 text-white drop-shadow-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="3"/><path d="M16 12h.01"/><path d="M2 10h20"/></svg>`,
    "trending": `<svg class="w-6 h-6 text-white drop-shadow-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`,
    "journal": `<svg class="w-6 h-6 text-white drop-shadow-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 6h4"/><path d="M2 10h4"/><path d="M2 14h4"/><path d="M2 18h4"/><rect width="16" height="20" x="4" y="2" rx="2"/><path d="M16 2v20"/></svg>`,
    "sprout": `<svg class="w-6 h-6 text-white drop-shadow-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-13"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/></svg>`,
    "mic": `<svg class="w-6 h-6 text-white drop-shadow-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>`,

    // IA
    "translate": `<svg class="w-6 h-6 text-white drop-shadow-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>`,
    "syntax": `<svg class="w-6 h-6 text-white drop-shadow-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="2.5"/><circle cx="6" cy="19" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="M12 7.5v4"/><path d="M6 16.5v-2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/></svg>`,
    "math-sum": `<svg class="w-6 h-6 text-white drop-shadow-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>`,
    "steps": `<svg class="w-6 h-6 text-white drop-shadow-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,

    // Educació
    "calculator": `<svg class="w-6 h-6 text-white drop-shadow-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>`,
    "clock": `<svg class="w-6 h-6 text-white drop-shadow-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    "fractions": `<svg class="w-6 h-6 text-white drop-shadow-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>`,
    "verbs": `<svg class="w-6 h-6 text-white drop-shadow-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>`
};

// =========================================================================
// 📦 DADES DE TOTES LES APLICACIONS DEL HUB
// =========================================================================
const hubData = [
    // BIBLIOTECA I CONTES
    {
        id: "conte-emma",
        title: "Conte de l'Emma",
        description: "Aventura interactiva personalitzada amb capítols, decisions i il·lustracions generades per IA.",
        category: "biblioteca",
        icon: appIcons["story-emma"],
        tag: "Vercel",
        gradient: "from-purple-600 to-indigo-600",
        url: "https://llibre-emma2.vercel.app/",
        localUrl: "html/Conte%20Emma.html",
        badge: "Narrativa Infantil",
        actionText: "OBRIR"
    },
    {
        id: "conte-ivet",
        title: "Conte de l'Ivet",
        description: "Història màgica de fades i bosc encantat, dissenyada per a lectura a la tauleta.",
        category: "biblioteca",
        icon: appIcons["story-ivet"],
        tag: "Vercel",
        gradient: "from-pink-600 to-rose-500",
        url: "https://llibre-ivet.vercel.app/",
        localUrl: "html/Conte%20Ivet.html",
        badge: "Conte Màgic",
        actionText: "LLEGIR"
    },
    {
        id: "conte-judit",
        title: "Conte de la Judit",
        description: "Aventura d'aprenentatge i tendresa creada exclusivament per a la Judit.",
        category: "biblioteca",
        icon: appIcons["story-judit"],
        tag: "Local",
        gradient: "from-amber-500 to-orange-500",
        url: "html/Conte%20Judit.html",
        badge: "Local",
        actionText: "LLEGIR"
    },
    {
        id: "biblioteca-webapp",
        title: "La Meva Biblioteca",
        description: "Catàleg i registre de llibres, lectures familiars i ressenyes.",
        category: "biblioteca",
        icon: appIcons["library"],
        tag: "Vercel",
        gradient: "from-indigo-600 to-violet-600",
        url: "https://llibres-webapp.vercel.app/",
        badge: "WebApp",
        actionText: "EXPLORAR"
    },

    // JOCS I OCI
    {
        id: "impostor",
        title: "L'Impostor",
        description: "Joc social multijugador per a mòbil ideal per a sopars amb amics i família.",
        category: "jocs",
        icon: appIcons["impostor"],
        tag: "Vercel",
        gradient: "from-violet-800 to-purple-900",
        url: "https://impostor-swart-kappa.vercel.app/",
        badge: "Joc Social",
        actionText: "JUGAR"
    },

    // GESTIÓ I FINANCES
    {
        id: "la-pasta",
        title: "La Pasta",
        description: "Quadre de comandament i control d'estalvi de l'economia domèstica.",
        category: "familia",
        icon: appIcons["wallet"],
        tag: "Vercel",
        gradient: "from-emerald-600 to-teal-500",
        url: "https://finances-lv17-beta.vercel.app/",
        badge: "Finances",
        actionText: "OBRIR"
    },
    {
        id: "finances-joves",
        title: "Finances per a Joves",
        description: "Guia interactiva i eina didàctica d'educació financera pràctica.",
        category: "familia",
        icon: appIcons["trending"],
        tag: "Vercel",
        gradient: "from-teal-600 to-emerald-400",
        url: "https://showmethemoney-lovat.vercel.app/",
        badge: "Educació Financera",
        actionText: "OBRIR"
    },
    {
        id: "daily-journal",
        title: "Daily Journal",
        description: "Diari personal per a reflexions, idees de projectes i seguiment d'hàbits.",
        category: "familia",
        icon: appIcons["journal"],
        tag: "Vercel",
        gradient: "from-amber-600 to-yellow-500",
        url: "https://daily-journal-two-rho.vercel.app/",
        badge: "Diari",
        actionText: "OBRIR"
    },
    {
        id: "creixement-personal",
        title: "Creixement Personal",
        description: "Recursos de criança conscient, formació i creixement familiar.",
        category: "familia",
        icon: appIcons["sprout"],
        tag: "Vercel",
        gradient: "from-green-600 to-emerald-500",
        url: "https://creixamentpersonal.vercel.app/",
        badge: "Família",
        actionText: "OBRIR"
    },
    {
        id: "podcast-cleaner",
        title: "Podcast Cleaner",
        description: "Utilitat per netejar i gestionar feeds i capítols d'àudio.",
        category: "familia",
        icon: appIcons["mic"],
        tag: "Local",
        gradient: "from-rose-600 to-red-500",
        url: "html/Podcast%20feed.html",
        badge: "Àudio",
        actionText: "OBRIR"
    },

    // EINES D'IA
    {
        id: "traductor-ia",
        title: "Traductor Intel·ligent",
        description: "Assistent de traducció contextual d'alta precisió multi-idioma.",
        category: "ia",
        icon: appIcons["translate"],
        tag: "IA Studio",
        gradient: "from-blue-600 to-cyan-500",
        url: "https://ai.studio/apps/drive/1pewDyRcZOwkYa4mZ1_ttiZoM7GojElLJ?fullscreenApplet=true",
        badge: "Google AI",
        actionText: "PROVAR"
    },
    {
        id: "analisi-sintactica",
        title: "Anàlisi Sintàctica",
        description: "Desglossament interactiu d'oracions i funcions gramaticals amb IA.",
        category: "ia",
        icon: appIcons["syntax"],
        tag: "IA Studio",
        gradient: "from-indigo-600 to-violet-500",
        url: "https://ai.studio/apps/drive/1ATfh0NZxHA6k_46fcHbC1ik5wGt0ftnV?fullscreenApplet=true",
        badge: "Llengua & IA",
        actionText: "PROVAR"
    },
    {
        id: "suma-ia",
        title: "Suma +-",
        description: "Pràctica i generació dinàmica d'operacions matemàtiques bàsiques.",
        category: "ia",
        icon: appIcons["math-sum"],
        tag: "IA Studio",
        gradient: "from-sky-600 to-blue-500",
        url: "https://ai.studio/apps/drive/1733N6zj2tv-APmPc77ZwEl_GIXTDqKCj?fullscreenApplet=true",
        badge: "Càlcul IA",
        actionText: "PROVAR"
    },
    {
        id: "mates-pas-pas",
        title: "Matemàtiques Pas a Pas",
        description: "Resolució guiada i explicada al detall de problemes matemàtics.",
        category: "ia",
        icon: appIcons["steps"],
        tag: "IA Studio",
        gradient: "from-cyan-600 to-teal-500",
        url: "https://ai.studio/apps/drive/1iR6ejez5lo8AcJ2cB9ESe1Ui3HGA3yxf?fullscreenApplet=true",
        badge: "Google AI",
        actionText: "PROVAR"
    },

    // EDUCACIÓ I MATES
    {
        id: "problemes-mates",
        title: "Problemes de Mates",
        description: "Banc interactiu d'exercicis matemàtics per a primària i repàs.",
        category: "educacio",
        icon: appIcons["calculator"],
        tag: "Vercel",
        gradient: "from-blue-700 to-indigo-600",
        url: "https://matematiques.vercel.app/",
        badge: "Educació",
        actionText: "OBRIR"
    },
    {
        id: "les-hores",
        title: "Les Hores",
        description: "Joc educatiu i visual per aprendre el rellotge de forma divertida.",
        category: "educacio",
        icon: appIcons["clock"],
        tag: "Vercel",
        gradient: "from-sky-600 to-indigo-500",
        url: "https://horaapp.vercel.app/",
        badge: "Joc Educatiu",
        actionText: "OBRIR"
    },
    {
        id: "fraccions-emma",
        title: "Fraccions amb l'Emma",
        description: "Reptes i operacions de fraccions dissenyades per a 6è de primària.",
        category: "educacio",
        icon: appIcons["fractions"],
        tag: "Local",
        gradient: "from-amber-600 to-orange-500",
        url: "html/Fraccions.html",
        badge: "Local",
        actionText: "OBRIR"
    },
    {
        id: "temps-verbals",
        title: "Eina Temps Verbals",
        description: "Utilitat didàctica per practicar i repassar conjugacions catalanes.",
        category: "educacio",
        icon: appIcons["verbs"],
        tag: "Local",
        gradient: "from-orange-600 to-red-500",
        url: "html/Temps%20verbals.html",
        badge: "Gramàtica",
        actionText: "OBRIR"
    },
    {
        id: "cos-huma",
        title: "El Cos Humà",
        description: "Recurs interactiu sobre l'anatomia humana i biologia.",
        category: "educacio",
        icon: '<svg class="w-6 h-6 text-white drop-shadow-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.28"/></svg>',
        tag: "Vercel",
        gradient: "from-rose-600 to-indigo-600",
        url: "https://cos-huma.vercel.app/",
        badge: "Ciències",
        actionText: "OBRIR"
    }
];

// Contes curts de Telegraph
const telegraphStories = [
    { id: 1, title: "El conte de la Candela", icon: "🕯️", url: "https://telegra.ph/El-conte-de-la-Candela-10-23" },
    { id: 2, title: "El Planeta Xuxes", icon: "🍬", url: "https://telegra.ph/El-Misteri-del-Rellotge-i-el-Planeta-Xuxes-07-23" },
    { id: 3, title: "Llamps i Trons", icon: "⚡", url: "https://telegra.ph/El-misteri-dels-llamps-i-els-trons-07-14" },
    { id: 4, title: "L'Edat Mitjana", icon: "🏰", url: "https://telegra.ph/LEDAT-MITJANA-03-18" },
    { id: 5, title: "El Mòbil Nou", icon: "📱", url: "https://telegra.ph/La-m%C3%A0gia-i-el-misteri-del-m%C3%B2bil-nou-03-05" },
    { id: 6, title: "Tossa de Mar", icon: "🌊", url: "https://telegra.ph/Les-aventures-de-lEmma-lIvet-i-la-Judit-a-Tossa-de-Mar-02-10" },
    { id: 7, title: "Aventura a Vallter", icon: "❄️", url: "https://telegra.ph/Les-germanes-i-laventura-a-Vallter-02-10" },
    { id: 8, title: "Joc de Cartes", icon: "🃏", url: "https://telegra.ph/Joc-de-cartes--Especial-Germanes-02-10" },
    { id: 9, title: "Bosc Màgic", icon: "🌲", url: "https://telegra.ph/El-mapa-del-bosc-m%C3%A0gic-02-10" },
    { id: 10, title: "Rellotge espatllat", icon: "🕰️", url: "https://telegra.ph/El-rellotge-que-no-va-b%C3%A9-02-10" },
    { id: 11, title: "Càmping Cypsela", icon: "⛺", url: "https://telegra.ph/LEstiu-M%C3%A0gic-al-C%C3%A0mping-Cypsela-02-10" },
    { id: 12, title: "Campionat del Gimnàs", icon: "🥇", url: "https://telegra.ph/El-Campionat-del-Gimn%C3%A0s-de-les-Paraules-01-21-2" }
];

let activeFilter = 'tots';
let currentSearch = '';

// Seccions categoritzades
const sectionDefs = [
    { key: "ia", title: "Eines d'Intel·ligència Artificial", icon: "🤖" },
    { key: "biblioteca", title: "Contes & Narrativa Infantil", icon: "📖" },
    { key: "familia", title: "Finances & Gestió Personal", icon: "💰" },
    { key: "educacio", title: "Educació & Matemàtiques", icon: "🎓" },
    { key: "jocs", title: "Jocs & Oci Social", icon: "🎮" }
];

// Generació d'una fila d'aplicació
function createAppRow(app) {
    const isHero = (app.id === currentHeroId);
    const isCarousel = currentCarouselIds.includes(app.id);
    const isDock = currentDockIds.includes(app.id);

    return `
        <div class="app-row flex items-center justify-between py-3 px-2 rounded-2xl hover:bg-white/[0.04] transition-all">
            <a href="${app.url}" target="_blank" onclick="trackClick('${app.title}')" class="flex items-center space-x-3.5 flex-1 min-w-0 pr-2">
                <div class="w-12 h-12 squircle bg-gradient-to-tr ${app.gradient} flex items-center justify-center text-xl shrink-0">
                    ${app.icon}
                </div>
                <div class="min-w-0 flex-1">
                    <div class="flex items-center space-x-1.5 flex-wrap gap-y-1">
                        <h4 class="text-sm font-bold text-white truncate">${app.title}</h4>
                        ${isHero ? '<span class="text-[9px] font-black text-amber-300 bg-amber-500/20 border border-amber-500/40 px-1.5 py-0.5 rounded-md shrink-0">👑 Portada</span>' : ''}
                        ${!isHero && isCarousel ? '<span class="text-[9px] font-bold text-yellow-300 bg-yellow-500/10 border border-yellow-500/30 px-1.5 py-0.5 rounded-md shrink-0">⭐ Carrusel</span>' : ''}
                        ${isDock ? '<span class="text-[9px] font-bold text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-1.5 py-0.5 rounded-md shrink-0">📌 Dock</span>' : ''}
                        <span class="text-[9px] font-semibold text-slate-400 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded-md shrink-0">
                            ${app.badge}
                        </span>
                    </div>
                    <p class="text-[11px] text-slate-400 truncate mt-0.5">${app.description}</p>
                </div>
            </a>

            <!-- Controls d'edició o botó d'obertura -->
            <div class="flex items-center space-x-1 shrink-0">
                ${isEditMode ? `
                    <button onclick="setHeroApp('${app.id}')" title="Fer Portada (Destacat del dia)"
                        class="w-8 h-8 rounded-xl flex items-center justify-center text-sm transition-all ${isHero ? 'bg-amber-500/25 text-amber-300 border border-amber-500/50 scale-105 shadow-sm' : 'bg-white/5 text-slate-500 hover:text-amber-300'}">
                        👑
                    </button>
                    <button onclick="toggleCarouselApp('${app.id}')" title="Afegir/Treure del Carrusel"
                        class="w-8 h-8 rounded-xl flex items-center justify-center text-sm transition-all ${isCarousel ? 'bg-yellow-500/25 text-yellow-300 border border-yellow-500/50 scale-105 shadow-sm' : 'bg-white/5 text-slate-500 hover:text-yellow-300'}">
                        ⭐
                    </button>
                    <button onclick="toggleDockApp('${app.id}')" title="Afegir/Treure del Menú inferior (Dock)"
                        class="w-8 h-8 rounded-xl flex items-center justify-center text-sm transition-all ${isDock ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/50 scale-105 shadow-sm' : 'bg-white/5 text-slate-500 hover:text-emerald-300'}">
                        📌
                    </button>
                ` : `
                    <a href="${app.url}" target="_blank" onclick="trackClick('${app.title}')" 
                        class="px-3.5 py-1.5 rounded-full bg-white/10 text-indigo-300 hover:bg-white/20 hover:text-white text-xs font-bold transition-all shrink-0">
                        ${app.actionText}
                    </a>
                `}
            </div>
        </div>
    `;
}

// Renderització de la llista d'aplicacions
function renderApps() {
    const container = document.getElementById('apps-container');
    if (!container) return;

    // Filtre de cerca
    const filtered = hubData.filter(app => {
        const matchesCategory = (activeFilter === 'tots') || (app.category === activeFilter);
        const matchesSearch = !currentSearch || 
            app.title.toLowerCase().includes(currentSearch.toLowerCase()) ||
            app.description.toLowerCase().includes(currentSearch.toLowerCase()) ||
            app.category.toLowerCase().includes(currentSearch.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12 bg-white/[0.02] border border-white/5 rounded-3xl">
                <span class="text-4xl">🔍</span>
                <h3 class="text-base font-bold text-white mt-3">No s'ha trobat cap aplicació</h3>
                <p class="text-xs text-slate-400 mt-1">Prova amb una altra paraula o treu el filtre</p>
                <button onclick="clearFilters()" class="mt-4 px-4 py-1.5 rounded-full bg-white/10 text-xs text-white font-semibold">
                    Veure-les totes
                </button>
            </div>
        `;
        return;
    }

    // Si hi ha cerca o s'ha triat una categoria específica, mostrem llista plana
    if (activeFilter !== 'tots' || currentSearch !== '') {
        container.innerHTML = `
            <div class="rounded-3xl p-3 sm:p-4 theme-surface border border-white/10 shadow-xl divide-y divide-white/5 animate-fade-in">
                ${filtered.map(app => createAppRow(app)).join('')}
            </div>
        `;
        return;
    }

    // Si estem a 'tots' sense cerca, agrupem per seccions
    let html = '';
    sectionDefs.forEach(sec => {
        const secApps = filtered.filter(app => app.category === sec.key);
        if (secApps.length > 0) {
            html += `
                <div class="rounded-3xl p-3 sm:p-4 theme-surface border border-white/10 shadow-lg mb-4 animate-fade-in">
                    <div class="flex items-center justify-between mb-2 px-2 pt-1">
                        <span class="text-xs font-bold text-slate-200 flex items-center space-x-2">
                            <span>${sec.icon}</span>
                            <span>${sec.title}</span>
                        </span>
                        <span class="text-[10px] text-slate-500 font-bold bg-white/5 px-2 py-0.5 rounded-full">
                            ${secApps.length} Apps
                        </span>
                    </div>
                    <div class="divide-y divide-white/5">
                        ${secApps.map(app => createAppRow(app)).join('')}
                    </div>
                </div>
            `;
        }
    });

    container.innerHTML = html;
}

// Renderització dels 12 contes de Telegraph
function renderTelegraph() {
    const container = document.getElementById('telegraph-grid');
    if (!container) return;

    container.innerHTML = telegraphStories.map(story => `
        <a href="${story.url}" target="_blank" onclick="trackClick('${story.title}')" 
            class="flex items-center space-x-2.5 p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/5 transition-colors group">
            <svg class="w-4 h-4 text-indigo-400 shrink-0 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
            </svg>
            <span class="text-xs font-semibold text-slate-300 group-hover:text-white truncate">${story.title}</span>
        </a>
    `).join('');
}

// Filtre per categories
function filterContent(category) {
    activeFilter = category;
    
    // Actualitza les pills visuals
    const buttons = document.querySelectorAll('.filter-pill');
    buttons.forEach(btn => {
        if (btn.dataset.category === category) {
            btn.className = 'filter-pill pill-active px-3.5 py-1.5 rounded-xl text-xs whitespace-nowrap cursor-pointer transition-all shadow-sm';
        } else {
            btn.className = 'filter-pill pill-inactive px-3.5 py-1.5 rounded-xl text-xs whitespace-nowrap cursor-pointer transition-all';
        }
    });

    renderApps();

    // Scroll suau cap a les apps si s'ha premut una categoria
    if (category !== 'tots') {
        const appsAnchor = document.getElementById('apps-section');
        if (appsAnchor) {
            appsAnchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

// Cerca en temps real
function handleSearch(e) {
    currentSearch = e.target.value;
    renderApps();
}

function clearFilters() {
    activeFilter = 'tots';
    currentSearch = '';
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.value = '';
    filterContent('tots');
}

// Gestió del modal de cerca ràpida
function openSearchModal() {
    const modal = document.getElementById('search-modal');
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    setTimeout(() => {
        const input = document.getElementById('modal-search-input');
        if (input) input.focus();
    }, 50);
}

function closeSearchModal() {
    const modal = document.getElementById('search-modal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

function handleModalSearch(e) {
    const query = e.target.value.toLowerCase();
    const resultsContainer = document.getElementById('modal-search-results');
    if (!resultsContainer) return;

    if (!query) {
        resultsContainer.innerHTML = '<p class="text-xs text-slate-500 text-center py-6">Escriu per cercar una eina o conte...</p>';
        return;
    }

    const matches = hubData.filter(a => 
        a.title.toLowerCase().includes(query) || 
        a.description.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
        resultsContainer.innerHTML = '<p class="text-xs text-slate-500 text-center py-6">No s\'ha trobat res.</p>';
        return;
    }

    resultsContainer.innerHTML = matches.map(app => `
        <a href="${app.url}" target="_blank" onclick="closeSearchModal()" class="flex items-center space-x-3 p-2.5 rounded-xl hover:bg-white/10 transition-colors">
            <div class="w-9 h-9 squircle bg-gradient-to-tr ${app.gradient} flex items-center justify-center text-lg shrink-0">
                ${app.icon}
            </div>
            <div class="flex-1 min-w-0">
                <p class="text-xs font-bold text-white truncate">${app.title}</p>
                <p class="text-[10px] text-slate-400 truncate">${app.description}</p>
            </div>
            <span class="text-xs text-indigo-400">↗</span>
        </a>
    `).join('');
}

// Registre de clics recents (local)
function trackClick(title) {
    try {
        let recents = JSON.parse(localStorage.getItem('recents') || '[]');
        recents = [title, ...recents.filter(t => t !== title)].slice(0, 5);
        localStorage.setItem('recents', JSON.stringify(recents));
    } catch (e) {
        // Silenci en mode privat
    }
}

// Alternar mode de personalització / edició
function toggleEditMode() {
    isEditMode = !isEditMode;
    
    const banner = document.getElementById('edit-banner');
    const btnLabel = document.getElementById('edit-label');
    const btnIcon = document.getElementById('edit-icon');

    if (banner) {
        if (isEditMode) {
            banner.classList.remove('hidden');
        } else {
            banner.classList.add('hidden');
        }
    }

    if (btnLabel) btnLabel.innerText = isEditMode ? 'Fet ✓' : 'Personalitzar';
    if (btnIcon) btnIcon.innerText = isEditMode ? '✅' : '⚙️';

    renderApps();
}

// Establir l'app Portada / Destacat del Dia (👑)
function setHeroApp(id) {
    currentHeroId = id;
    try {
        localStorage.setItem('hub_hero_id', id);
    } catch (e) {}

    renderHeroStory();
    renderApps();

    // Scroll suau cap a dalt per veure el resultat
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Afegir / Treure del Carrusel de Projectes Seleccionats (⭐)
function toggleCarouselApp(id) {
    const index = currentCarouselIds.indexOf(id);
    if (index > -1) {
        currentCarouselIds.splice(index, 1);
    } else {
        currentCarouselIds.push(id);
    }

    try {
        localStorage.setItem('hub_carousel_ids', JSON.stringify(currentCarouselIds));
    } catch (e) {}

    renderCarousel();
    renderApps();
}

// Afegir / Treure del Menú inferior Dock (📌)
function toggleDockApp(id) {
    const index = currentDockIds.indexOf(id);
    if (index > -1) {
        currentDockIds.splice(index, 1);
    } else {
        if (currentDockIds.length >= 4) {
            // Si ja n'hi ha 4, traiem la primera per fer lloc a la nova (màxim 4)
            currentDockIds.shift();
        }
        currentDockIds.push(id);
    }

    try {
        localStorage.setItem('hub_dock_ids', JSON.stringify(currentDockIds));
    } catch (e) {}

    renderDock();
    renderApps();
}

// Renderització del Dock inferior
function renderDock() {
    const container = document.getElementById('dock-apps-container');
    if (!container) return;

    const dockApps = currentDockIds
        .map(id => hubData.find(a => a.id === id))
        .filter(Boolean);

    container.innerHTML = dockApps.map(app => `
        <a href="${app.url}" target="_blank" onclick="trackClick('${app.title}')" title="${app.title}" 
            class="squircle w-11 h-11 bg-gradient-to-tr ${app.gradient} flex items-center justify-center text-xl shadow hover:scale-105 active:scale-90 transition-transform">
            ${app.icon}
        </a>
    `).join('');
}

// Renderització del Destacat del Dia (Hero Story)
function renderHeroStory() {
    const container = document.getElementById('hero-story-container');
    if (!container) return;

    const heroApp = hubData.find(a => a.id === currentHeroId) || hubData[0];
    if (!heroApp) return;

    container.innerHTML = `
        <article class="hero-story rounded-[32px] overflow-hidden relative" style="background: linear-gradient(to bottom, var(--hero-from), var(--hero-via), var(--hero-to));">
            <!-- Efecte radiant de fons adaptat al color d'accent -->
            <div class="absolute -right-12 -top-12 w-48 h-48 rounded-full blur-3xl pointer-events-none" style="background: var(--accent); opacity: 0.25;"></div>

            <div class="p-6 pb-20">
                <div class="inline-flex items-center space-x-1.5 border border-white/20 px-2.5 py-1 rounded-full mb-3" style="background: rgba(255, 255, 255, 0.1);">
                    <span class="text-[10px] font-extrabold uppercase tracking-widest text-white">${heroApp.badge}</span>
                </div>
                <h2 class="text-2xl font-black text-white leading-tight">${heroApp.title}</h2>
                <p class="text-xs text-slate-200 mt-2 leading-relaxed opacity-90">
                    ${heroApp.description}
                </p>
            </div>

            <!-- Banda inferior d'acció ràpida -->
            <div class="absolute bottom-0 inset-x-0 p-3.5 bg-black/45 backdrop-blur-md border-t border-white/10 flex items-center justify-between">
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 squircle bg-gradient-to-tr ${heroApp.gradient} flex items-center justify-center text-xl shrink-0">
                        ${heroApp.icon}
                    </div>
                    <div>
                        <h4 class="text-xs font-bold text-white">${heroApp.title}</h4>
                        <p class="text-[10px] text-slate-400">${heroApp.tag}</p>
                    </div>
                </div>
                <a href="${heroApp.url}" target="_blank" onclick="trackClick('${heroApp.title}')" 
                    class="px-5 py-2 rounded-full bg-white text-slate-950 text-xs font-black tracking-wide uppercase hover:bg-slate-200 active:scale-95 transition-all shadow-md">
                    ${heroApp.actionText || 'OBRIR'}
                </a>
            </div>
        </article>
    `;
}

// Renderització del carrusel horitzontal
function renderCarousel() {
    const container = document.getElementById('carousel-container');
    if (!container) return;

    const carouselApps = currentCarouselIds
        .map(id => hubData.find(a => a.id === id))
        .filter(Boolean);

    if (carouselApps.length === 0) {
        container.innerHTML = `
            <div class="w-full text-center py-6 px-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                <p class="text-xs text-slate-400">Cap projecte marcat amb ⭐ encara.</p>
                <button onclick="toggleEditMode()" class="mt-2 text-xs text-indigo-400 font-semibold underline">
                    Tocar ⭐ per afegir-ne
                </button>
            </div>
        `;
        return;
    }

    container.innerHTML = carouselApps.map(app => `
        <div class="carousel-card w-56 shrink-0 rounded-3xl p-4 theme-surface border border-white/10 relative overflow-hidden flex flex-col justify-between">
            <div>
                <div class="w-11 h-11 squircle bg-gradient-to-tr ${app.gradient} flex items-center justify-center text-xl mb-3 shadow">
                    ${app.icon}
                </div>
                <span class="text-[9px] font-extrabold uppercase tracking-wider" style="color: var(--accent);">${app.badge}</span>
                <h3 class="text-sm font-bold text-white mt-0.5">${app.title}</h3>
                <p class="text-[11px] text-slate-400 mt-1 leading-snug line-clamp-2">${app.description}</p>
            </div>
            <div class="mt-4 pt-2 border-t border-white/5 flex items-center justify-between">
                <span class="text-[10px] text-slate-400">${app.tag}</span>
                <a href="${app.url}" target="_blank" onclick="trackClick('${app.title}')" 
                    class="px-3.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors">
                    ${app.actionText || 'OBRIR'}
                </a>
            </div>
        </div>
    `).join('');
}

// =========================================================================
// 🎨 GESTIÓ DELS 5 TEMES DE COLOR
// =========================================================================
function applyTheme(themeName) {
    currentTheme = themeName;
    document.documentElement.setAttribute('data-theme', themeName);
    try {
        localStorage.setItem('hub_theme', themeName);
    } catch (e) {}

    // Actualitza els 'checks' actius al modal de temes
    document.querySelectorAll('.theme-option').forEach(btn => {
        const check = btn.querySelector('.theme-check');
        if (btn.dataset.themeTarget === themeName) {
            btn.classList.add('border-indigo-400', 'bg-white/10');
            if (check) check.classList.remove('hidden');
        } else {
            btn.classList.remove('border-indigo-400', 'bg-white/10');
            if (check) check.classList.add('hidden');
        }
    });

    renderHeroStory();
}

function setTheme(themeName) {
    applyTheme(themeName);
    closeThemeModal();
}

function openThemeModal() {
    const modal = document.getElementById('theme-modal');
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    applyTheme(currentTheme);
}

function closeThemeModal() {
    const modal = document.getElementById('theme-modal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

// Inicialització al carregar
document.addEventListener('DOMContentLoaded', () => {
    applyTheme(currentTheme);
    renderHeroStory();
    renderCarousel();
    renderDock();
    renderApps();
    renderTelegraph();

    // Tancar modals amb tecla Esc
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSearchModal();
            closeThemeModal();
        }
    });
});
