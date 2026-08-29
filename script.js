/**
 * Dark Poseidon — ThreeUI Editorial Engine
 * Solar Ember / Crimson / Gold / White Warm Palette
 * - Three.js Emberline Wave Vortex Engine
 * - Interactive Studio Project Explorer (Tabs + Spotlight + Grid)
 * - Real-time GitHub Pinned Telemetry
 * - Interactive Terminal Console
 */

const PINNED_PROJECTS = [
    {
        id: 'whitevpn',
        fullName: 'WhiteDNS/WhiteVPN-Desktop',
        name: 'WhiteVPN-Desktop',
        org: 'WhiteDNS',
        desc: 'Cross-platform desktop application powered by Wails and Mihomo high-throughput routing engine.',
        lang: 'Go',
        langColor: '#fbbf24',
        stars: 244,
        forks: 11,
        tags: ['Wails', 'Mihomo', 'Go', 'Desktop-GUI', 'VPN'],
        snippet: `// Go / Wails Mihomo Engine Integration
func (a *App) StartCore(configPath string) (*CoreHandle, error) {
    hub, err := mihomo.NewHub(configPath)
    if err != nil { return nil, err }
    go hub.ServeTraffic() // Non-blocking sub-ms routing
    return &CoreHandle{Status: "CONNECTED", Port: 7890}, nil
}`
    },
    {
        id: 'whiteaesther',
        fullName: 'WhiteDNS/WhiteAesther',
        name: 'WhiteAesther',
        org: 'WhiteDNS',
        desc: 'Memory-safe cross-platform desktop client for the Aether connection core and encrypted routes.',
        lang: 'Rust',
        langColor: '#ef4444',
        stars: 150,
        forks: 6,
        tags: ['Rust', 'Aether-Core', 'Cross-Platform', 'Crypto-Route'],
        snippet: `// Rust Zero-Copy Route Pipe
pub async fn establish_tunnel(endpoint: &str) -> Result<TunHandle, RouteError> {
    let mut session = AetherCore::handshake(endpoint).await?;
    let (mut tx, mut rx) = session.split_zero_copy();
    tokio::spawn(async move { tx.stream_packets().await });
    Ok(TunHandle { active: true, mtu: 1500 })
}`
    },
    {
        id: 'whiteaesthermobile',
        fullName: 'WhiteDNS/WhiteAestherMobile',
        name: 'WhiteAestherMobile',
        org: 'WhiteDNS',
        desc: 'Native Android client with Rust NDK integration for the Aether encrypted route engine.',
        lang: 'Rust',
        langColor: '#ef4444',
        stars: 128,
        forks: 5,
        tags: ['Android', 'Rust-NDK', 'VpnService', 'Networking'],
        snippet: `// JNI Rust NDK Tunnel Bridge
#[no_mangle]
pub extern "C" fn Java_org_whitedns_AetherService_initCore(
    mut env: JNIEnv, _class: JClass, fd: jint
) -> jboolean {
    let tun_fd = unsafe { OwnedFd::from_raw_fd(fd) };
    AetherMobileEngine::attach_tun(tun_fd);
    JNI_TRUE
}`
    },
    {
        id: 'whitedns',
        fullName: 'WhiteDNS/WhiteDNS-Desktop',
        name: 'WhiteDNS-Desktop',
        org: 'WhiteDNS',
        desc: 'Ultra-fast and secure desktop DNS client and encrypted routing management utility.',
        lang: 'Go',
        langColor: '#fbbf24',
        stars: 71,
        forks: 2,
        tags: ['Go', 'DNS-Over-HTTPS', 'Security', 'Desktop'],
        snippet: `// Encrypted DoH Upstream Dispatcher
func ResolveFastest(domain string, upstreams []string) (*DNSResponse, error) {
    ctx, cancel := context.WithTimeout(context.Background(), 250*time.Millisecond)
    defer cancel()
    return dns.RaceUpstreams(ctx, domain, upstreams)
}`
    }
];

let activeProjectIndex = 0;
let projectsData = [...PINNED_PROJECTS];

document.addEventListener('DOMContentLoaded', () => {
    // 1. Year
    const yr = document.getElementById('footer-year');
    if (yr) yr.textContent = new Date().getFullYear();

    // 2. Initialize Three.js Emberline Wave Vortex
    initEmberlineWebGL();

    // 3. Ambient Glow Spotlight
    initAmbientSpotlight();

    // 4. Fetch Live GitHub Telemetry & Render Studio Explorer
    initStudioExplorer();

    // 5. Initialize Terminal
    initTerminal();
});

/* ==========================================================================
   1. Three.js Emberline Wave Vortex Engine (WebGL)
   ========================================================================== */
function initEmberlineWebGL() {
    const canvas = document.getElementById('three-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 15, 75);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // Create 3D Parametric Wave Grid (Emberline Flow Ribbon)
    const rows = 40;
    const cols = 90;
    const count = rows * cols;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorWarmGold = new THREE.Color(0xfbbf24);
    const colorWarmOrange = new THREE.Color(0xf97316);
    const colorCrimson = new THREE.Color(0xef4444);

    let idx = 0;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const u = (j / (cols - 1) - 0.5) * 160;
            const v = (i / (rows - 1) - 0.5) * 80;

            positions[idx * 3] = u;
            positions[idx * 3 + 1] = 0;
            positions[idx * 3 + 2] = v;

            // Color gradient from center to edge
            const dist = Math.sqrt(u * u + v * v) / 90;
            const mixedColor = dist < 0.4 ? colorWarmGold : (dist < 0.7 ? colorWarmOrange : colorCrimson);

            colors[idx * 3] = mixedColor.r;
            colors[idx * 3 + 1] = mixedColor.g;
            colors[idx * 3 + 2] = mixedColor.b;

            idx++;
        }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 1.7,
        vertexColors: true,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending
    });

    const wavePoints = new THREE.Points(geometry, material);
    scene.add(wavePoints);

    // Floating Ember Starfield
    const starCount = 200;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let s = 0; s < starCount; s++) {
        starPos[s * 3] = (Math.random() - 0.5) * 200;
        starPos[s * 3 + 1] = (Math.random() - 0.5) * 100 + 10;
        starPos[s * 3 + 2] = (Math.random() - 0.5) * 120;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
        size: 2.2,
        color: 0xfacc15,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // Mouse Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    let clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);

        const time = clock.getElapsedTime() * 1.2;

        targetX += (mouseX * 15 - targetX) * 0.04;
        targetY += (mouseY * 8 - targetY) * 0.04;

        const posArray = geometry.attributes.position.array;
        let pIdx = 0;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const u = posArray[pIdx * 3];
                const v = posArray[pIdx * 3 + 2];

                // Emberline dual-wave vortex equation
                const waveY = Math.sin(u * 0.05 + time) * 4.5 +
                              Math.cos(v * 0.08 + time * 0.8) * 3.5 +
                              Math.sin((u + v) * 0.03 + time * 0.5) * 2.0;

                posArray[pIdx * 3 + 1] = waveY;
                pIdx++;
            }
        }
        geometry.attributes.position.needsUpdate = true;

        wavePoints.rotation.y = time * 0.04;
        stars.rotation.y = -time * 0.02;

        camera.position.x = targetX;
        camera.position.y = 15 - targetY;
        camera.lookAt(0, 0, 0);

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
   2. Ambient Mouse Spotlight
   ========================================================================== */
function initAmbientSpotlight() {
    const glow = document.getElementById('vortex-glow');
    if (!glow) return;

    window.addEventListener('mousemove', (e) => {
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
    });
}

/* ==========================================================================
   3. Studio Project Explorer (Tabs, Spotlight & Live Telemetry)
   ========================================================================== */
async function initStudioExplorer() {
    // 1. Fetch live telemetry from GitHub
    const promises = PINNED_PROJECTS.map(async (project) => {
        try {
            const res = await fetch(`https://api.github.com/repos/${project.fullName}`);
            if (!res.ok) throw new Error(`Status ${res.status}`);
            const data = await res.json();
            return {
                ...project,
                stars: data.stargazers_count,
                forks: data.forks_count,
                desc: data.description || project.desc,
                lang: data.language || project.lang,
                url: data.html_url
            };
        } catch (e) {
            return {
                ...project,
                url: `https://github.com/${project.fullName}`
            };
        }
    });

    projectsData = await Promise.all(promises);

    // Update global total stars
    const totalStars = projectsData.reduce((acc, curr) => acc + curr.stars, 0);
    const starValEl = document.getElementById('total-stars-val');
    if (starValEl) starValEl.textContent = `${totalStars}+`;

    // Render Tabs
    renderTabs();

    // Render Active Spotlight Box
    renderSpotlight(activeProjectIndex);

    // Render 4 Mini Grid Cards
    renderGridCards();
}

function renderTabs() {
    const tabsContainer = document.getElementById('project-tabs');
    if (!tabsContainer) return;

    tabsContainer.innerHTML = '';
    projectsData.forEach((project, idx) => {
        const btn = document.createElement('button');
        btn.className = `tab-btn ${idx === activeProjectIndex ? 'active' : ''}`;
        btn.innerHTML = `
            <span class="tab-dot" style="background: ${project.langColor}; box-shadow: 0 0 8px ${project.langColor};"></span>
            <span>${project.name}</span>
            <span style="opacity: 0.7; font-size: 0.75rem;">⭐${project.stars}</span>
        `;
        btn.addEventListener('click', () => {
            activeProjectIndex = idx;
            renderTabs();
            renderSpotlight(idx);
        });
        tabsContainer.appendChild(btn);
    });
}

function renderSpotlight(index) {
    const container = document.getElementById('spotlight-display');
    if (!container) return;

    const project = projectsData[index];
    const tagsHtml = project.tags.map(t => `<span class="spot-tag">${t}</span>`).join('');

    container.innerHTML = `
        <div class="spotlight-layout">
            <div class="spotlight-info-col">
                <div class="spotlight-badge-row">
                    <span class="spotlight-lang-pill" style="color: ${project.langColor}; border-color: ${project.langColor}44;">
                        <i class="fas fa-circle" style="font-size: 8px;"></i> ${project.lang}
                    </span>
                    <span class="spotlight-org"><i class="fas fa-cube"></i> ${project.org}</span>
                </div>

                <h3 class="spotlight-title">
                    <a href="${project.url}" target="_blank" rel="noopener noreferrer">
                        ${project.name} <i class="fas fa-arrow-up-right-from-square" style="font-size: 1rem; opacity: 0.6;"></i>
                    </a>
                </h3>

                <p class="spotlight-desc">${project.desc}</p>

                <div class="spotlight-tags">
                    ${tagsHtml}
                </div>

                <div class="spotlight-btn-row">
                    <a href="${project.url}" target="_blank" rel="noopener noreferrer" class="btn-spot-repo">
                        <i class="fab fa-github"></i> View Repository
                    </a>
                    <button class="btn-spot-clone" onclick="copyRepoClone('${project.url}', this)">
                        <i class="far fa-copy"></i> Copy Clone
                    </button>
                </div>
            </div>

            <div class="spotlight-telemetry-col">
                <div class="telemetry-meta-row">
                    <span>LIVE METRICS</span>
                    <span class="telemetry-stars"><i class="fas fa-star"></i> ${project.stars} Stars &bull; <i class="fas fa-code-branch"></i> ${project.forks} Forks</span>
                </div>
                <pre class="telemetry-code-snippet"><code>${highlightCode(project.snippet)}</code></pre>
            </div>
        </div>
    `;
}

function renderGridCards() {
    const gridContainer = document.getElementById('pinned-grid-container');
    if (!gridContainer) return;

    gridContainer.innerHTML = '';
    projectsData.forEach((project, idx) => {
        const card = document.createElement('div');
        card.className = 'mini-pinned-card';
        card.innerHTML = `
            <div class="mini-top">
                <span class="mini-lang" style="color: ${project.langColor};">
                    <i class="fas fa-circle" style="font-size: 6px;"></i> ${project.lang}
                </span>
                <span class="mini-stars"><i class="fas fa-star"></i> ${project.stars}</span>
            </div>
            <h4 class="mini-title">${project.name}</h4>
            <p class="mini-desc">${project.desc}</p>
        `;
        card.addEventListener('click', () => {
            activeProjectIndex = idx;
            renderTabs();
            renderSpotlight(idx);
            document.getElementById('spotlight-display')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
        gridContainer.appendChild(card);
    });
}

function highlightCode(code) {
    return code
        .replace(/(\/\/.*)/g, '<span style="color: #8e888a;">$1</span>')
        .replace(/\b(func|package|import|pub|fn|async|mut|unsafe|extern|return|go|defer)\b/g, '<span class="code-keyword">$1</span>')
        .replace(/\b(StartCore|NewHub|establish_tunnel|split_zero_copy|initCore|ResolveFastest)\b/g, '<span class="code-fn">$1</span>')
        .replace(/(".*?")/g, '<span class="code-str">$1</span>');
}

window.copyRepoClone = function(url, btn) {
    const cmd = `git clone ${url}.git`;
    navigator.clipboard.writeText(cmd).then(() => {
        const origText = btn.innerHTML;
        btn.innerHTML = `<i class="fas fa-check" style="color: #fbbf24;"></i> Copied!`;
        setTimeout(() => {
            btn.innerHTML = origText;
        }, 2000);
    });
};

/* ==========================================================================
   4. Terminal CLI
   ========================================================================== */
function initTerminal() {
    const input = document.getElementById('term-input-field');
    const container = document.getElementById('term-dynamic-content');
    if (!input || !container) return;

    const commands = {
        help: 'Supported commands:\n- repos   : List all 4 pinned repositories with live stars\n- rust    : Details on Rust-based routing engines (WhiteAesther & Mobile)\n- go      : Details on Go-based clients (WhiteVPN & WhiteDNS)\n- whoami  : Developer identity & philosophy\n- clear   : Clear terminal window',
        repos: 'Pinned Core Repositories:\n[1] WhiteVPN-Desktop      [Go/Wails]  ⭐ 244+ | Desktop client\n[2] WhiteAesther          [Rust]      ⭐ 150+ | Aether Core client\n[3] WhiteAestherMobile    [Rust]      ⭐ 128+ | Android routing\n[4] WhiteDNS-Desktop      [Go]        ⭐ 71+  | Fast DNS manager',
        rust: 'Rust Stack:\n- Zero-cost memory safety\n- Raw socket packet interception\n- Cross-compiled Android NDK binaries',
        go: 'Go Stack:\n- Mihomo / Clash routing integration\n- Wails desktop frontend bridges\n- Highly concurrent goroutines',
        whoami: 'Dark Poseidon\n"Dark coder, Light lover."\nBuilding open and decentralized internet infrastructure.',
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

            const response = commands[raw] || `Command not found: "${raw}". Type 'help' for available commands.`;

            const row = document.createElement('div');
            row.className = 'term-line';
            row.innerHTML = `<span class="t-prompt">darkposeidon@mesh:~$</span> <span class="t-cmd">${escapeHtml(raw)}</span>`;

            const resDiv = document.createElement('div');
            resDiv.className = 'term-response';
            resDiv.textContent = response;

            container.appendChild(row);
            container.appendChild(resDiv);

            input.value = '';
            const body = document.getElementById('term-body');
            if (body) body.scrollTop = body.scrollHeight;
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
