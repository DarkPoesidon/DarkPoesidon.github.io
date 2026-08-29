/**
 * Dark Poseidon — ThreeUI Aesthetic Engine & Telemetry
 * - WebGL Interactive 3D Energy Core (Inside Hero Box)
 * - Three.js Flow Field Background
 * - Real-time Pinned Repositories API Consumer
 * - Interactive Telemetry Console
 */

const PINNED_CONFIG = [
    {
        fullName: 'WhiteDNS/WhiteVPN-Desktop',
        name: 'WhiteVPN-Desktop',
        org: 'WhiteDNS',
        desc: 'Cross-platform desktop application powered by Wails and Mihomo high-throughput routing engine.',
        lang: 'Go',
        stars: 244,
        forks: 11,
        tags: ['Wails', 'Mihomo', 'Go', 'Desktop-GUI', 'VPN']
    },
    {
        fullName: 'WhiteDNS/WhiteAesther',
        name: 'WhiteAesther',
        org: 'WhiteDNS',
        desc: 'Memory-safe cross-platform desktop client for the Aether connection core and encrypted routes.',
        lang: 'Rust',
        stars: 150,
        forks: 6,
        tags: ['Rust', 'Aether-Core', 'Cross-Platform', 'Crypto-Route']
    },
    {
        fullName: 'WhiteDNS/WhiteAestherMobile',
        name: 'WhiteAestherMobile',
        org: 'WhiteDNS',
        desc: 'Native Android client with Rust NDK integration for the Aether encrypted route engine.',
        lang: 'Rust',
        stars: 128,
        forks: 5,
        tags: ['Android', 'Rust-NDK', 'VpnService', 'Networking']
    },
    {
        fullName: 'WhiteDNS/WhiteDNS-Desktop',
        name: 'WhiteDNS-Desktop',
        org: 'WhiteDNS',
        desc: 'Ultra-fast and secure desktop DNS client and encrypted routing management utility.',
        lang: 'Go',
        stars: 71,
        forks: 2,
        tags: ['Go', 'DNS-Over-HTTPS', 'Security', 'Desktop']
    }
];

const LANG_COLORS = {
    'Go': '#00ADD8',
    'Rust': '#dea584',
    'JavaScript': '#f1e05a',
    'TypeScript': '#3178c6',
    'Kotlin': '#A97BFF',
    'C++': '#f34b7d'
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Set current year
    const yearEl = document.getElementById('year-val');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // 2. Initialize ThreeUI Background & 3D Interactive Hero Box
    initBackgroundWebGL();
    initHero3DCore();

    // 3. Ambient cursor spotlight
    initAmbientSpotlight();

    // 4. Load Pinned Repositories
    loadPinnedRepos();

    // 5. Initialize CLI
    initTelemetryCLI();
});

/* ==========================================================================
   1. Three.js Background Ambient Particle Flow Field
   ========================================================================== */
function initBackgroundWebGL() {
    const canvas = document.getElementById('webgl-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 60;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // Particles
    const count = 450;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const c1 = new THREE.Color(0x38bdf8); // Cyan
    const c2 = new THREE.Color(0x818cf8); // Indigo

    for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 180;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 180;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 120;

        const col = Math.random() > 0.6 ? c1 : c2;
        colors[i * 3] = col.r;
        colors[i * 3 + 1] = col.g;
        colors[i * 3 + 2] = col.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 1.8,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    function animate() {
        requestAnimationFrame(animate);
        particles.rotation.y += 0.0005;
        particles.rotation.x += 0.0002;
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

/* ==========================================================================
   2. ThreeUI Hero Interactive 3D Energy Orb / Hologram
   ========================================================================== */
function initHero3DCore() {
    const container = document.getElementById('hero-3d-box');
    if (!container || typeof THREE === 'undefined') return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 42;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group to hold core objects
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Inner Wireframe Core (Icosahedron)
    const icoGeo = new THREE.IcosahedronGeometry(11, 2);
    const icoMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.35
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    coreGroup.add(icoMesh);

    // 2. Inner Glowing Octahedron
    const octGeo = new THREE.OctahedronGeometry(6, 0);
    const octMat = new THREE.MeshBasicMaterial({
        color: 0x00f2fe,
        wireframe: true,
        transparent: true,
        opacity: 0.8
    });
    const octMesh = new THREE.Mesh(octGeo, octMat);
    coreGroup.add(octMesh);

    // 3. Surrounding Particle Halo
    const haloCount = 300;
    const haloGeo = new THREE.BufferGeometry();
    const haloPos = new Float32Array(haloCount * 3);

    for (let i = 0; i < haloCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        const radius = 15 + Math.random() * 4;

        haloPos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        haloPos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        haloPos[i * 3 + 2] = radius * Math.cos(phi);
    }

    haloGeo.setAttribute('position', new THREE.BufferAttribute(haloPos, 3));
    const haloMat = new THREE.PointsMaterial({
        size: 1.4,
        color: 0x818cf8,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    const haloMesh = new THREE.Points(haloGeo, haloMat);
    coreGroup.add(haloMesh);

    // 4. Outer Celestial Orbit Ring
    const ringGeo = new THREE.TorusGeometry(18, 0.2, 8, 80);
    const ringMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.4
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    coreGroup.add(ringMesh);

    // Mouse Interaction / Drag State
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let rotSpeedX = 0;
    let rotSpeedY = 0;

    const coordsEl = document.getElementById('hud-coords');

    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const deltaX = e.clientX - prevMouseX;
            const deltaY = e.clientY - prevMouseY;
            rotSpeedY = deltaX * 0.005;
            rotSpeedX = deltaY * 0.005;
            prevMouseX = e.clientX;
            prevMouseY = e.clientY;
        }
    });

    // Touch Support
    container.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            isDragging = true;
            prevMouseX = e.touches[0].clientX;
            prevMouseY = e.touches[0].clientY;
        }
    });

    window.addEventListener('touchend', () => { isDragging = false; });

    window.addEventListener('touchmove', (e) => {
        if (isDragging && e.touches.length === 1) {
            const deltaX = e.touches[0].clientX - prevMouseX;
            const deltaY = e.touches[0].clientY - prevMouseY;
            rotSpeedY = deltaX * 0.005;
            rotSpeedX = deltaY * 0.005;
            prevMouseX = e.touches[0].clientX;
            prevMouseY = e.touches[0].clientY;
        }
    });

    // Animation Loop
    function animateCore() {
        requestAnimationFrame(animateCore);

        // Natural Idle Rotation
        coreGroup.rotation.y += 0.004 + rotSpeedY;
        coreGroup.rotation.x += 0.002 + rotSpeedX;

        octMesh.rotation.y -= 0.008;
        octMesh.rotation.x -= 0.005;

        ringMesh.rotation.z += 0.003;

        // Friction dampening
        rotSpeedX *= 0.94;
        rotSpeedY *= 0.94;

        if (coordsEl) {
            coordsEl.textContent = `ROT: ${coreGroup.rotation.x.toFixed(2)} / ${coreGroup.rotation.y.toFixed(2)}`;
        }

        renderer.render(scene, camera);
    }
    animateCore();

    window.addEventListener('resize', () => {
        if (!container) return;
        const newW = container.clientWidth;
        const newH = container.clientHeight;
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, newH);
    });
}

/* ==========================================================================
   3. Ambient Cursor Spotlight
   ========================================================================== */
function initAmbientSpotlight() {
    const glow = document.getElementById('ambient-glow');
    if (!glow) return;

    window.addEventListener('mousemove', (e) => {
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
    });
}

/* ==========================================================================
   4. Load & Render Pinned Repositories
   ========================================================================== */
async function loadPinnedRepos() {
    const container = document.getElementById('pinned-container');
    if (!container) return;

    // Fetch live metrics in parallel
    const promises = PINNED_CONFIG.map(async (repo) => {
        try {
            const res = await fetch(`https://api.github.com/repos/${repo.fullName}`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            return {
                ...repo,
                stars: data.stargazers_count,
                forks: data.forks_count,
                desc: data.description || repo.desc,
                lang: data.language || repo.lang,
                url: data.html_url
            };
        } catch (e) {
            console.warn(`Fallback for ${repo.fullName}:`, e);
            return {
                ...repo,
                url: `https://github.com/${repo.fullName}`
            };
        }
    });

    const repos = await Promise.all(promises);

    // Update hero stars
    const totalStars = repos.reduce((sum, r) => sum + r.stars, 0);
    const heroStarsEl = document.getElementById('hero-stars');
    if (heroStarsEl) heroStarsEl.textContent = `${totalStars}+`;

    container.innerHTML = '';
    repos.forEach((repo) => {
        const langColor = LANG_COLORS[repo.lang] || '#38bdf8';
        const card = document.createElement('div');
        card.className = 'threeui-card';

        const tagsHtml = repo.tags.map(t => `<span class="card-tag-item">${t}</span>`).join('');

        card.innerHTML = `
            <div class="card-header-top">
                <span class="card-pill-tag"><i class="fas fa-thumbtack"></i> Pinned Core</span>
                <span class="card-org-tag"><i class="fas fa-cube"></i> ${repo.org}</span>
            </div>

            <h3 class="card-project-title">
                <a href="${repo.url}" target="_blank" rel="noopener noreferrer">
                    ${repo.name} <i class="fas fa-arrow-up-right-from-square" style="font-size: 0.8rem; opacity: 0.6;"></i>
                </a>
            </h3>

            <p class="card-project-desc">${repo.desc}</p>

            <div class="card-tags-list">
                ${tagsHtml}
            </div>

            <div class="card-footer-meta">
                <div class="card-language">
                    <span class="lang-circle" style="background-color: ${langColor}; box-shadow: 0 0 8px ${langColor};"></span>
                    <span>${repo.lang}</span>
                </div>

                <div class="card-stats-group">
                    <span title="Stars"><i class="fas fa-star"></i> ${repo.stars}</span>
                    <span title="Forks"><i class="fas fa-code-branch"></i> ${repo.forks}</span>
                </div>
            </div>

            <div class="card-cta-row">
                <a href="${repo.url}" target="_blank" rel="noopener noreferrer" class="btn-card-visit">
                    <i class="fab fa-github"></i> Repository
                </a>
                <button class="btn-card-clone" title="Copy git clone" onclick="copyGitClone('${repo.url}', this)">
                    <i class="far fa-copy"></i>
                </button>
            </div>
        `;

        container.appendChild(card);
    });
}

window.copyGitClone = function(url, btn) {
    const cmd = `git clone ${url}.git`;
    navigator.clipboard.writeText(cmd).then(() => {
        const icon = btn.querySelector('i');
        icon.className = 'fas fa-check';
        icon.style.color = '#10b981';

        setTimeout(() => {
            icon.className = 'far fa-copy';
            icon.style.color = '';
        }, 2000);
    });
};

/* ==========================================================================
   5. Telemetry CLI
   ========================================================================== */
function initTelemetryCLI() {
    const input = document.getElementById('cli-input');
    const container = document.getElementById('cli-dynamic');
    if (!input || !container) return;

    const commands = {
        help: 'Commands:\n- repos   : List live pinned core repositories\n- stack   : Show tech stack (Go, Rust, Wails, Android NDK)\n- whoami  : Developer identity and bio\n- white   : WhiteDNS organization details\n- clear   : Clear CLI display',
        repos: 'Pinned Core Repositories:\n[1] WhiteVPN-Desktop [Go/Wails]  ⭐ 244+ | Desktop client\n[2] WhiteAesther     [Rust]      ⭐ 150+ | Aether Core\n[3] WhiteAestherMobile [Rust]    ⭐ 128+ | Android routing\n[4] WhiteDNS-Desktop [Go]        ⭐ 71+  | DNS manager',
        stack: 'Core Stack:\n- Rust (High-throughput cryptography & tunneling)\n- Go (Wails desktop apps, daemons)\n- Network Protocols (Mihomo, Clash, DoH, Tun/Tap)',
        whoami: 'Dark Poseidon — Systems developer & open source author.\nIdentity: Dark coder • Light lover',
        white: 'WhiteDNS Foundation: Decentralized & secure censorship-resistant network infrastructure.',
        clear: '__CLEAR__'
    };

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const raw = input.value.trim().toLowerCase();
            if (!raw) return;

            if (raw === 'clear') {
                container.innerHTML = '';
                input.value = '';
                return;
            }

            const response = commands[raw] || `Unknown command: '${raw}'. Type 'help' for available commands.`;

            const row = document.createElement('div');
            row.className = 'cli-row';
            row.innerHTML = `<span class="cli-prompt">sys@poseidon:~$</span> <span class="cli-command">${escapeHtml(raw)}</span>`;

            const result = document.createElement('div');
            result.className = 'cli-result';
            result.innerHTML = `<pre class="cli-pre">${escapeHtml(response)}</pre>`;

            container.appendChild(row);
            container.appendChild(result);

            input.value = '';
            const box = document.getElementById('cli-output');
            if (box) box.scrollTop = box.scrollHeight;
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
