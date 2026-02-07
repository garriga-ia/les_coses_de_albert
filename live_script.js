const categories = {
    educacio: { title: "Aprenentatge i Repàs", icon: "🎓" },
    biblioteca: { title: "Biblioteca i Narrativa", icon: "📖" },
    ia: { title: "Eines d'IA i Creativitat", icon: "🤖" },
    familia: { title: "Gestió i Família", icon: "🏠" },
    jocs: { title: "Jocs i Oci", icon: "🎮" }
};

const hubData = [
    // IA
    {
        title: "Traductor",
        description: "Traducció intel·ligent multi-idioma.",
        url: "https://ai.studio/apps/drive/1pewDyRcZOwkYa4mZ1_ttiZoM7GojElLJ?fullscreenApplet=true",
        category: "ia",
        icon: "🗣️",
        tag: "IA Studio",
        tagColor: "blue"
    },
    // EDUCACIO
    {
        title: "Anàlisi Sintàctica",
        description: "Anàlisi interactiva de frases.",
        url: "https://ai.studio/apps/drive/1ATfh0NZxHA6k_46fcHbC1ik5wGt0ftnV?fullscreenApplet=true",
        category: "educacio",
        icon: "📊",
        tag: "IA Studio",
        tagColor: "blue"
    },
    {
        title: "Suma +-",
        description: "Pràctica de càlcul matemàtic.",
        url: "https://ai.studio/apps/drive/1733N6zj2tv-APmPc77ZwEl_GIXTDqKCj?fullscreenApplet=true",
        category: "educacio",
        icon: "➕",
        tag: "IA Studio",
        tagColor: "blue"
    },
    {
        title: "Problemes de Mates",
        description: "Exercicis i pràctica matemàtica.",
        url: "https://matematiques.vercel.app/",
        category: "educacio",
        icon: "➗",
        tag: "Vercel",
        tagColor: "gray"
    },
    {
        title: "Les Hores",
        description: "Aprèn les hores de forma divertida.",
        url: "https://horaapp.vercel.app/",
        category: "educacio",
        icon: "�",
        tag: "Vercel",
        tagColor: "gray"
    },
    {
        title: "Eina Temps Verbals",
        description: "Utilitat per a repassar conjugacions.",
        url: "html/Temps%20verbals.html",
        category: "educacio",
        icon: "📝",
        tag: "Local",
        tagColor: "orange"
    },
    // FAMILIA
    {
        title: "Creixement Personal",
        description: "Cursos de criança i recursos educatius.",
        url: "https://creixamentpersonal.vercel.app/",
        category: "familia",
        icon: "🌱",
        tag: "Vercel",
        tagColor: "gray"
    },
    {
        title: "Finances Familiars",
        description: "Gestió i control de l'economia domèstica.",
        url: "https://finances-lv17-beta.vercel.app/",
        category: "familia",
        icon: "💰",
        tag: "Vercel",
        tagColor: "gray"
    },
    {
        title: "Podcast Cleaner",
        description: "Neteja i gestió de feeds.",
        url: "html/Podcast%20feed.html",
        category: "familia",
        icon: "🎙️",
        tag: "Local",
        tagColor: "orange"
    },
    // JOCS
    {
        title: "L'Impostor",
        description: "Joc social per a tota la família.",
        url: "https://impostor-swart-kappa.vercel.app/",
        category: "jocs",
        icon: "�",
        tag: "Vercel",
        tagColor: "gray"
    },
    // BIBLIOTECA
    {
        title: "Conte Interactiu Emma",
        description: "Aventura digital personalitzada.",
        url: "https://llibre-emma2.vercel.app/",
        category: "biblioteca",
        icon: "👸",
        tag: "Vercel",
        tagColor: "gray"
    },
    {
        title: "Conte Interactiu Ivet",
        description: "Conte màgic i interactiu.",
        url: "https://llibre-ivet.vercel.app/",
        category: "biblioteca",
        icon: "🧚",
        tag: "Vercel",
        tagColor: "gray"
    },
    {
        title: "Conte Emma",
        description: "Versió local del conte.",
        url: "html/Conte%20Emma.html",
        category: "biblioteca",
        icon: "📖",
        tag: "Local",
        tagColor: "orange"
    },
    {
        title: "Conte Ivet",
        description: "Versió local del conte.",
        url: "html/Conte%20Ivet.html",
        category: "biblioteca",
        icon: "📖",
        tag: "Local",
        tagColor: "orange"
    },
    {
        title: "Conte Judit",
        description: "La història especial de la Judit.",
        url: "html/Conte%20Judit.html",
        category: "biblioteca",
        icon: "🧸",
        tag: "Local",
        tagColor: "orange"
    },
    {
        type: "telegraph",
        category: "biblioteca",
        title: "Contes per anar dormir",
        description: "Articles i aventures a Telegraph",
        icon: "📑",
        links: [
            { id: 1, title: "El conte de la Candela", url: "https://telegra.ph/El-conte-de-la-Candela-10-23" },
            { id: 2, title: "El Planeta Xuxes", url: "https://telegra.ph/El-Misteri-del-Rellotge-i-el-Planeta-Xuxes-07-23" },
            { id: 3, title: "Llamps i Trons", url: "https://telegra.ph/El-misteri-dels-llamps-i-els-trons-07-14" },
            { id: 4, title: "L'Edat Mitjana", url: "https://telegra.ph/LEDAT-MITJANA-03-18" },
            { id: 5, title: "El Mòbil Nou", url: "https://telegra.ph/La-m%C3%A0gia-i-el-misteri-del-m%C3%B2bil-nou-03-05" },
            { id: 6, title: "Tossa de Mar", url: "https://telegra.ph/Les-aventures-de-lEmma-lIvet-i-la-Judit-a-Tossa-de-Mar-02-10" },
            { id: 7, title: "Aventura a Vallter", url: "https://telegra.ph/Les-germanes-i-laventura-a-Vallter-02-10" },
            { id: 8, title: "Joc de Cartes", url: "https://telegra.ph/Joc-de-cartes--Especial-Germanes-02-10" },
            { id: 9, title: "Bosc Màgic", url: "https://telegra.ph/El-mapa-del-bosc-m%C3%A0gic-02-10" },
            { id: 10, title: "Rellotge espatllat", url: "https://telegra.ph/El-rellotge-que-no-va-b%C3%A9-02-10" },
            { id: 11, title: "Càmping Cypsela", url: "https://telegra.ph/LEstiu-M%C3%A0gic-al-C%C3%A0mping-Cypsela-02-10" },
            { id: 12, title: "El Campionat del Gimnàs", url: "https://telegra.ph/El-Campionat-del-Gimn%C3%A0s-de-les-Paraules-01-21-2" }
        ]
    }
];

let currentCategory = 'tots';
let searchQuery = '';

function createCard(item) {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    if (item.type === 'telegraph') {
        const linksHtml = item.links.map(link => `
            <a href="${link.url}" onclick="trackClick('${item.title}')" target="_blank"
                class="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors group">
                <span class="text-gray-400 group-hover:text-blue-500 font-mono">${link.id}.</span>
                <span class="text-ios-text-primary font-medium group-hover:text-ios-blue transition-colors">${link.title}</span>
            </a>
        `).join('');

        return `
            <div data-category="${item.category}"
                class="card-item col-span-1 sm:col-span-2 lg:col-span-3 bg-ios-card p-8 rounded-3xl shadow-soft border border-white/10 animate-in">
                <div class="flex items-center space-x-4 mb-6">
                    <div class="w-12 h-12 bg-slate-100/10 rounded-xl flex items-center justify-center text-2xl">
                        ${item.icon}
                    </div>
                    <div>
                        <h2 class="text-2xl font-bold text-ios-text-primary">${item.title}</h2>
                        <p class="text-ios-text-secondary">${item.description}</p>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-8">
                    ${linksHtml}
                </div>
            </div>
        `;
    }

    const tagColors = {
        blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
        gray: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
        orange: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
    };

    const iconBgColors = {
        ia: 'bg-blue-100 dark:bg-blue-900/20',
        educacio: 'bg-indigo-100 dark:bg-indigo-900/20',
        biblioteca: 'bg-pink-100 dark:bg-pink-900/20',
        familia: 'bg-green-100 dark:bg-green-900/20',
        jocs: 'bg-rose-100 dark:bg-rose-900/20'
    };

    const iconBg = iconBgColors[item.category] || 'bg-gray-100 dark:bg-gray-800';

    return `
        <a href="${item.url}" onclick="trackClick('${item.title}')" target="_blank" data-category="${item.category}"
            class="card-item group bg-ios-card p-6 rounded-3xl shadow-soft card-hover flex flex-col justify-between h-48 border border-white/10 animate-in">
            <div class="flex justify-between items-start">
                <div class="w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    ${item.icon}
                </div>
                <span class="${tagColors[item.tagColor] || tagColors.gray} text-xs font-semibold px-2.5 py-1 rounded-full">
                    ${item.tag}
                </span>
            </div>
            <div>
                <h3 class="text-xl font-bold text-ios-text-primary mb-1">${item.title}</h3>
                <p class="text-ios-text-secondary text-sm line-clamp-2">${item.description}</p>
            </div>
        </a>
    `;
}

function renderContent() {
    const container = document.getElementById('grid-container');

    // Filter by search query first
    const searchFiltered = hubData.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (searchFiltered.length === 0) {
        container.innerHTML = `
            <div class="col-span-full py-20 text-center">
                <div class="text-5xl mb-4">🔍</div>
                <h3 class="text-xl font-medium text-ios-text-primary">No s'ha trobat res</h3>
                <p class="text-ios-text-secondary">Prova amb una altra paraula o categoria</p>
            </div>
        `;
        return;
    }

    if (currentCategory === 'tots' && searchQuery === '') {
        // Render by sections
        let html = '';
        const order = ['ia', 'educacio', 'familia', 'jocs', 'biblioteca'];

        order.forEach(catKey => {
            const sectionItems = searchFiltered.filter(item => item.category === catKey);

            if (sectionItems.length > 0) {
                // Sort within section: normal items first, telegraph items last
                const sortedItems = [...sectionItems].sort((a, b) => {
                    if (a.type === 'telegraph') return 1;
                    if (b.type === 'telegraph') return -1;
                    return 0;
                });

                const catInfo = categories[catKey];
                html += `
                    <div class="col-span-full mt-12 mb-6 flex items-center space-x-3">
                        <span class="text-3xl">${catInfo.icon}</span>
                        <h2 class="text-2xl font-bold text-ios-text-primary uppercase tracking-wider text-sm opacity-80">${catInfo.title}</h2>
                        <div class="flex-grow h-px bg-ios-text-secondary opacity-20 ml-4"></div>
                    </div>
                    ${sortedItems.map(item => createCard(item)).join('')}
                `;
            }
        });
        container.innerHTML = html;
    } else {
        // Render list (filtered by category if not 'tots')
        const finalFiltered = currentCategory === 'tots'
            ? searchFiltered
            : searchFiltered.filter(item => item.category === currentCategory);

        container.innerHTML = finalFiltered.map(item => createCard(item)).join('');
    }
}

function filterContent(category) {
    currentCategory = category;
    renderContent();

    // Update buttons ARIA and classes
    const buttons = ['tots', 'ia', 'educacio', 'biblioteca', 'familia', 'jocs'];
    buttons.forEach(cat => {
        const btn = document.getElementById('btn-' + cat);
        if (btn) {
            if (cat === category) {
                btn.classList.remove('tab-inactive');
                btn.classList.add('tab-active');
                btn.setAttribute('aria-pressed', 'true');
            } else {
                btn.classList.remove('tab-active');
                btn.classList.add('tab-inactive');
                btn.setAttribute('aria-pressed', 'false');
            }
        }
    });
}

function handleSearch(e) {
    searchQuery = e.target.value;
    renderContent();
}

function toggleDarkMode() {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const icon = document.getElementById('theme-icon');
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    icon.textContent = isDark ? '☀️' : '🌙';
}

function trackClick(title) {
    let recents = JSON.parse(localStorage.getItem('recents') || '[]');
    recents = [title, ...recents.filter(t => t !== title)].slice(0, 5);
    localStorage.setItem('recents', JSON.stringify(recents));
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
    // Load theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    updateThemeIcon();

    renderContent();
});
