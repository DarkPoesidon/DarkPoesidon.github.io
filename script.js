/**
 * Dark Poseidon Portfolio Scripts
 * - 3D Interactive Three.js Background
 * - Pinned Repositories Telemetry & Rendering
 * - 3D Card Tilt & Interactive Spotlight
 * - Interactive Terminal Console
 */

// Pinned Repositories Configuration for DarkPoesidon
const PINNED_REPOSITORIES = [
    {
        fullName: 'WhiteDNS/WhiteVPN-Desktop',
        name: 'WhiteVPN-Desktop',
        org: 'WhiteDNS',
        defaultDesc: 'WhiteVPN Desktop — Wails app running the same mihomo engine as WhiteVPN for Android.',
        defaultLang: 'Go',
        defaultStars: 244,
        defaultForks: 11,
        tags: ['Wails', 'Mihomo', 'Go', 'Desktop-GUI', 'VPN']
    },
    {
        fullName: 'WhiteDNS/WhiteAesther',
        name: 'WhiteAesther',
        org: 'WhiteDNS',
        defaultDesc: 'Cross-platform desktop client for the Aether connection core and encrypted routes.',
        defaultLang: 'Rust',
        defaultStars: 150,
        defaultForks: 6,
        tags: ['Rust', 'Aether-Core', 'Cross-Platform', 'Crypto-Route']
    },
    {
        fullName: 'WhiteDNS/WhiteAestherMobile',
        name: 'WhiteAestherMobile',
        org: 'WhiteDNS',
        defaultDesc: 'Native Android client for the Aether encrypted route engine with high throughput.',
        defaultLang: 'Rust',
        defaultStars: 128,
        defaultForks: 5,
        tags: ['Android', 'Rust-NDK', 'Mobile-Core', 'Networking']
    },
    {
        fullName: 'WhiteDNS/WhiteDNS-Desktop',
        name: 'WhiteDNS-Desktop',
        org: 'WhiteDNS',
        defaultDesc: 'Ultra-fast and secure desktop DNS client and encrypted management utility.',
        defaultLang: 'Go',
        defaultStars: 71,
        defaultForks: 2,
        tags: ['Go', 'DNS-Over-HTTPS', 'Security', 'Desktop']
    }
];

const LANGUAGE_COLORS = {
    'Go': '#00ADD8',
    'Rust': '#dea584',
    'JavaScript': '#f1e05a',
    'TypeScript': '#3178c6',
    'Python': '#3572A5',
    'C++': '#f34b7d',
    'Kotlin': '#A97BFF',
    'Java': '#b07219'
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // 2. Initialize Three.js 3D Background
    initThreeBackground();

    // 3. Initialize Cursor Spotlight
    initCursorSpotlight();

    // 4. Fetch & Render Pinned Repositories
    loadPinnedRepositories();

    // 5. Initialize Interactive Terminal
    initTerminal();
});

/* ==========================================================================
   Three.js 3D Interactive Background
   ========================================================================== */
function initThreeBackground() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 80;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particle Starfield
    const particlesCount = 700;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    const color1 = new THREE.Color(0x38bdf8); // Cyan
    const color2 = new THREE.Color(0x818cf8); // Indigo
    const color3 = new THREE.Color(0x050811); // Dark

    for (let i = 0; i < particlesCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 220;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 220;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 180;

        const mixedColor = Math.random() > 0.5 ? color1 : color2;
        colors[i * 3] = mixedColor.r;
        colors[i * 3 + 1] = mixedColor.g;
        colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 1.6,
        vertexColors: true,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(geometry, material);
    scene.add(particlesMesh);

    // Floating 3D Geometric Cyber Icosahedron
    const icoGeometry = new THREE.IcosahedronGeometry(22, 1);
    const icoMaterial = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.12
    });
    const icosahedron = new THREE.Mesh(icoGeometry, icoMaterial);
    icosahedron.position.set(40, -10, -20);
    scene.add(icosahedron);

    // Secondary Torus Ring
    const torusGeometry = new THREE.TorusGeometry(18, 0.4, 8, 50);
    const torusMaterial = new THREE.MeshBasicMaterial({
        color: 0x818cf8,
        wireframe: true,
        transparent: true,
        opacity: 0.15
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(-45, 15, -30);
    scene.add(torus);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) * 0.05;
        mouseY = (e.clientY - window.innerHeight / 2) * 0.05;
    });

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);

        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        particlesMesh.rotation.y += 0.0008;
        particlesMesh.rotation.x += 0.0004;

        icosahedron.rotation.x += 0.003;
        icosahedron.rotation.y += 0.004;

        torus.rotation.x -= 0.002;
        torus.rotation.y += 0.003;

        camera.position.x = targetX * 0.4;
        camera.position.y = -targetY * 0.4;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    animate();

    // Resize Handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

/* ==========================================================================
   Cursor Glow Spotlight & Micro-dot
   ========================================================================== */
function initCursorSpotlight() {
    const glow = document.getElementById('cursor-glow');
    const dot = document.getElementById('cursor-dot');

    if (!glow && !dot) return;

    window.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        if (glow) {
            glow.style.left = `${clientX}px`;
            glow.style.top = `${clientY}px`;
        }
        if (dot) {
            dot.style.left = `${clientX}px`;
            dot.style.top = `${clientY}px`;
        }
    });
}

/* ==========================================================================
   Load & Render Pinned Repositories
   ========================================================================== */
async function loadPinnedRepositories() {
    const container = document.getElementById('pinned-grid');
    if (!container) return;

    // Fetch live stats for each pinned repository from GitHub API in parallel
    const promises = PINNED_REPOSITORIES.map(async (repoInfo) => {
        try {
            const res = await fetch(`https://api.github.com/repos/${repoInfo.fullName}`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            return {
                ...repoInfo,
                stars: data.stargazers_count,
                forks: data.forks_count,
                desc: data.description || repoInfo.defaultDesc,
                lang: data.language || repoInfo.defaultLang,
                url: data.html_url
            };
        } catch (err) {
            console.warn(`Fallback for ${repoInfo.fullName}:`, err);
            return {
                ...repoInfo,
                stars: repoInfo.defaultStars,
                forks: repoInfo.defaultForks,
                desc: repoInfo.defaultDesc,
                lang: repoInfo.defaultLang,
                url: `https://github.com/${repoInfo.fullName}`
            };
        }
    });

    const results = await Promise.all(promises);

    // Calculate total stars
    const totalStars = results.reduce((acc, curr) => acc + curr.stars, 0);
    const totalStarsEl = document.getElementById('total-stars');
    if (totalStarsEl) {
        totalStarsEl.textContent = `${totalStars}+`;
    }

    // Render Cards
    container.innerHTML = '';
    results.forEach((repo) => {
        const langColor = LANGUAGE_COLORS[repo.lang] || '#38bdf8';
        const card = document.createElement('div');
        card.className = 'pinned-card';
        card.setAttribute('data-tilt', '');

        const tagsHtml = repo.tags.map(t => `<span class="card-tag">${t}</span>`).join('');

        card.innerHTML = `
            <div class="card-top">
                <span class="card-pin-badge"><i class="fas fa-thumbtack"></i> Pinned</span>
                <span class="card-org"><i class="fas fa-cube"></i> ${repo.org}</span>
            </div>

            <h3 class="card-title">
                <a href="${repo.url}" target="_blank" rel="noopener noreferrer">
                    ${repo.name} <i class="fas fa-arrow-up-right-from-square" style="font-size: 0.85rem; opacity: 0.7;"></i>
                </a>
            </h3>

            <p class="card-desc">${repo.desc}</p>

            <div class="card-tags">
                ${tagsHtml}
            </div>

            <div class="card-footer">
                <div class="card-lang">
                    <span class="lang-dot" style="background-color: ${langColor}; box-shadow: 0 0 8px ${langColor};"></span>
                    <span>${repo.lang}</span>
                </div>

                <div class="card-metrics">
                    <span title="Stars"><i class="fas fa-star"></i> ${repo.stars}</span>
                    <span title="Forks"><i class="fas fa-code-branch"></i> ${repo.forks}</span>
                </div>
            </div>

            <div class="card-actions">
                <a href="${repo.url}" target="_blank" rel="noopener noreferrer" class="btn-card">
                    <i class="fab fa-github"></i> Repository
                </a>
                <button class="btn-copy-clone" title="Copy git clone command" onclick="copyCloneCommand('${repo.url}', this)">
                    <i class="far fa-copy"></i>
                </button>
            </div>
        `;

        container.appendChild(card);
    });

    // Attach 3D Tilt handler to generated cards
    applyTiltEffect();
}

/* ==========================================================================
   Interactive 3D Card Tilt Effect
   ========================================================================== */
function applyTiltEffect() {
    const tiltElements = document.querySelectorAll('[data-tilt]');

    tiltElements.forEach((el) => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            el.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px) scale3d(1.01, 1.01, 1.01)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale3d(1, 1, 1)';
        });
    });
}

/* ==========================================================================
   Copy Clone Command Utility
   ========================================================================== */
window.copyCloneCommand = function(url, btnElement) {
    const cmd = `git clone ${url}.git`;
    navigator.clipboard.writeText(cmd).then(() => {
        const icon = btnElement.querySelector('i');
        icon.className = 'fas fa-check';
        icon.style.color = '#10b981';

        setTimeout(() => {
            icon.className = 'far fa-copy';
            icon.style.color = '';
        }, 2000);
    });
};

/* ==========================================================================
   Interactive Developer Console / Terminal
   ========================================================================== */
function initTerminal() {
    const input = document.getElementById('terminal-input');
    const container = document.getElementById('terminal-interactive-lines');
    if (!input || !container) return;

    const commands = {
        help: 'Available commands:\n- pinned : View details of all pinned core repositories\n- skills : Show systems & language stack\n- whoami : Identity and bio\n- org    : Information about WhiteDNS\n- clear  : Reset console screen',
        pinned: 'Pinned Core Repositories:\n1. WhiteVPN-Desktop [Go/Wails]  - 240+ ⭐ (Desktop VPN GUI)\n2. WhiteAesther     [Rust]      - 150+ ⭐ (Aether Core client)\n3. WhiteAestherMobile [Rust]    - 128+ ⭐ (Android encrypted route client)\n4. WhiteDNS-Desktop [Go]        - 71+ ⭐ (DNS Desktop manager)',
        skills: 'Languages & Core Stack:\n- Rust (Low-level routing, encryption engines, Android NDK)\n- Go (Wails desktop clients, concurrency, daemons)\n- Networking Protocols (DNS, Mihomo, Packet routing)',
        whoami: 'Dark Poseidon - "Dark coder • Light Lover"\nSpecializing in high-performance networking & secure software.',
        org: 'WhiteDNS Foundation - Secure DNS, privacy routing, and censorship-resistant networking tools.',
        clear: '__CLEAR__'
    };

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const rawCmd = input.value.trim().toLowerCase();
            if (!rawCmd) return;

            if (rawCmd === 'clear') {
                container.innerHTML = '';
                input.value = '';
                return;
            }

            const response = commands[rawCmd] || `Command not found: "${rawCmd}". Type 'help' for supported commands.`;

            const cmdLine = document.createElement('div');
            cmdLine.className = 'terminal-line';
            cmdLine.innerHTML = `<span class="prompt-user">guest@darkposeidon</span>:<span class="prompt-path">~</span>$ <span class="cmd-text">${escapeHtml(rawCmd)}</span>`;

            const outputLine = document.createElement('div');
            outputLine.className = 'terminal-output';
            outputLine.textContent = response;

            container.appendChild(cmdLine);
            container.appendChild(outputLine);

            input.value = '';

            const terminalBody = document.getElementById('terminal-body');
            if (terminalBody) {
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }
        }
    });
}

function escapeHtml(str) {
    return str.replace(/[&<>"']/g, function(m) {
        return ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        })[m];
    });
}
