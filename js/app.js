/* ═══════════════════════════════════════════════════
   NEMO v2.0 — App Controller
   🌊 Aquatic theme — Fish, coral, seaweed, bubbles
   ═══════════════════════════════════════════════════ */

(() => {
  'use strict';

  // ── Data ───────────────────────────────────────
  const MODULES = [
    { name: 'Système',         icon: '⚙️',  desc: 'Alimentation, MAJ, diagnostic, optimisation démarrage' },
    { name: 'Fichiers',        icon: '📁', desc: 'Arborescences, archives, doublons, chiffrement AES-256' },
    { name: 'Affichage',       icon: '🖥️',  desc: 'HDR, résolution, thèmes, bureaux virtuels' },
    { name: 'Applications',    icon: '🚀', desc: 'Lancer, fermer, profils d\'apps, détection zombies' },
    { name: 'Réseau',          icon: '🌐', desc: 'Wi-Fi, Bluetooth, scanner réseau, VPN, firewall' },
    { name: 'Audio',           icon: '🎵', desc: 'Volume par app, égaliseur, suppression bruit' },
    { name: 'Périphériques',   icon: '🎮', desc: 'RGB, remapping touches, calibration manette' },
    { name: 'Média',           icon: '🎬', desc: 'Capture, conversion, OCR, transcription Whisper' },
    { name: 'Dev',             icon: '💻', desc: 'Terminal, Git, Docker, debug assisté, WSL' },
    { name: 'Texte & Bureau',  icon: '📝', desc: 'Dictée, traduction, résumé IA, modèles' },
    { name: 'Web',             icon: '🔗', desc: 'Recherche, yt-dlp, scraping, surveillance pages' },
    { name: 'Infos Temps Réel',icon: '📊', desc: 'Météo, crypto, bourse, actualités, colis' },
    { name: 'Sécurité',        icon: '🛡️', desc: 'Antivirus, audit, mots de passe, keyloggers' },
    { name: 'Communication',   icon: '💬', desc: 'Emails, agenda, SMS, Slack, Teams' },
    { name: 'Domotique',       icon: '🏠', desc: 'Lumières, thermostat, caméras, Home Assistant' },
    { name: 'Divertissement',  icon: '🎲', desc: 'Jeux, quiz, ambiances sonores, Pomodoro' },
  ];

  const MODES = [
    { name: 'Rapide',     emoji: '⚡', desc: '1 action, exécution instantanée' },
    { name: 'Guidé',      emoji: '🧭', desc: 'Décompose les tâches complexes' },
    { name: 'Silencieux', emoji: '🤫', desc: 'Exécute sans réponse vocale' },
    { name: 'Expert',     emoji: '🔧', desc: 'Affiche les commandes PowerShell' },
    { name: 'Débutant',   emoji: '📖', desc: 'Explications simples et claires' },
    { name: 'Focus',      emoji: '🎯', desc: 'Bloque les distractions' },
    { name: 'Nuit',       emoji: '🌙', desc: 'Volume réduit, écran sombre' },
    { name: 'Urgence',    emoji: '🚨', desc: 'Traitement prioritaire immédiat' },
  ];

  const COMMANDS = {
    'aide':    { type: 'result', text: 'Commandes : aide, heure, date, cpu, ram, ip, météo, version, bonjour, modules, modes, clear' },
    'help':    { type: 'result', text: 'Commands: aide, heure, date, cpu, ram, ip, météo, version, bonjour, modules, modes, clear' },
    'heure':   { type: 'result', text: () => `Il est ${new Date().toLocaleTimeString('fr-FR')}.` },
    'date':    { type: 'result', text: () => `Nous sommes le ${new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.` },
    'cpu':     { type: 'result', text: () => `CPU : ${(20 + Math.random() * 30).toFixed(1)}% — ${(45 + Math.random() * 20).toFixed(0)}°C — Intel Core i7-13700K @ 5.4 GHz` },
    'ram':     { type: 'result', text: () => `RAM : ${(8 + Math.random() * 6).toFixed(1)} / 32.0 Go utilisés (${(25 + Math.random() * 20).toFixed(0)}%)` },
    'ip':      { type: 'result', text: '192.168.1.42 (local) — 86.234.xxx.xxx (publique)' },
    'météo':   { type: 'result', text: () => `Paris — ${(18 + Math.random() * 8).toFixed(0)}°C, partiellement nuageux, vent 12 km/h` },
    'meteo':   { type: 'result', text: () => `Paris — ${(18 + Math.random() * 8).toFixed(0)}°C, partiellement nuageux, vent 12 km/h` },
    'version': { type: 'result', text: 'NEMO v2.0 — Neuro-Enhanced Machine Operator — Build 2026.05.23' },
    'bonjour': { type: 'result', text: () => `Bonjour ! Il est ${new Date().toLocaleTimeString('fr-FR')}. Comment puis-je vous aider ?` },
    'hello':   { type: 'result', text: () => `Hello! It's ${new Date().toLocaleTimeString('en-US')}. How can I help you?` },
    'modules': { type: 'result', text: () => `${MODULES.length} modules actifs : ${MODULES.map(m => m.name).join(', ')}` },
    'modes':   { type: 'result', text: () => `${MODES.length} modes cognitifs : ${MODES.map(m => m.name).join(', ')}` },
  };

  // ── Fish SVGs ──────────────────────────────────
  const FISH_TYPES = [
    // Clownfish (Nemo!) — orange with white stripes
    (size) => `<svg viewBox="0 0 80 40" width="${size}" height="${size/2}" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="40" cy="20" rx="28" ry="14" fill="#ff6b2b"/>
      <path d="M12 20 Q6 10 2 20 Q6 30 12 20Z" fill="#ff6b2b"/>
      <path d="M66 8 Q72 2 68 10" fill="none" stroke="#ff6b2b" stroke-width="3"/>
      <path d="M66 32 Q72 38 68 30" fill="none" stroke="#ff6b2b" stroke-width="3"/>
      <ellipse cx="30" cy="20" rx="4" ry="14" fill="white" opacity="0.9"/>
      <ellipse cx="48" cy="20" rx="3" ry="12" fill="white" opacity="0.9"/>
      <circle cx="56" cy="16" r="4" fill="white"/>
      <circle cx="57" cy="15.5" r="2" fill="#1a1a2e"/>
      <ellipse cx="40" cy="7" rx="12" ry="4" fill="#ff6b2b"/>
      <path d="M38 7 Q40 2 42 7" fill="#ff8c42"/>
    </svg>`,
    // Blue tang (Dory) — blue with yellow tail
    (size) => `<svg viewBox="0 0 80 40" width="${size}" height="${size/2}" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="40" cy="20" rx="28" ry="14" fill="#1e90ff"/>
      <path d="M12 20 Q4 8 2 20 Q4 32 12 20Z" fill="#ffd700"/>
      <path d="M14 20 Q12 12 10 20 Q12 28 14 20Z" fill="#1a1a2e" opacity="0.5"/>
      <ellipse cx="40" cy="7" rx="14" ry="5" fill="#1e90ff"/>
      <ellipse cx="40" cy="33" rx="12" ry="4" fill="#1e90ff"/>
      <circle cx="58" cy="16" r="4.5" fill="white"/>
      <circle cx="59" cy="15.5" r="2.2" fill="#1a1a2e"/>
      <path d="M20 14 Q32 18 48 16" fill="none" stroke="#0a0a2e" stroke-width="2.5" opacity="0.4"/>
    </svg>`,
    // Tropical small fish — teal
    (size) => `<svg viewBox="0 0 60 30" width="${size*0.7}" height="${size*0.35}" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="30" cy="15" rx="20" ry="10" fill="#2dd4bf"/>
      <path d="M10 15 Q4 6 2 15 Q4 24 10 15Z" fill="#2dd4bf"/>
      <circle cx="42" cy="12" r="3" fill="white"/>
      <circle cx="43" cy="11.5" r="1.5" fill="#1a1a2e"/>
      <ellipse cx="30" cy="5" rx="10" ry="3" fill="#14b8a6"/>
      <path d="M20 10 Q28 12 38 10" fill="none" stroke="#0d9488" stroke-width="1.5" opacity="0.5"/>
    </svg>`,
    // Small yellow fish
    (size) => `<svg viewBox="0 0 50 28" width="${size*0.6}" height="${size*0.34}" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="25" cy="14" rx="17" ry="9" fill="#fbbf24"/>
      <path d="M8 14 Q3 6 1 14 Q3 22 8 14Z" fill="#f59e0b"/>
      <circle cx="35" cy="11" r="2.8" fill="white"/>
      <circle cx="36" cy="10.5" r="1.3" fill="#1a1a2e"/>
      <ellipse cx="25" cy="5" rx="8" ry="3" fill="#fbbf24"/>
      <path d="M18 10 Q24 12 32 10" fill="none" stroke="#d97706" stroke-width="1.2" opacity="0.4"/>
    </svg>`,
    // Purple angelfish
    (size) => `<svg viewBox="0 0 60 50" width="${size*0.7}" height="${size*0.58}" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="30" cy="25" rx="18" ry="16" fill="#a78bfa"/>
      <path d="M12 25 Q5 15 3 25 Q5 35 12 25Z" fill="#8b5cf6"/>
      <path d="M30 4 Q28 12 30 9" fill="none" stroke="#a78bfa" stroke-width="4" stroke-linecap="round"/>
      <path d="M30 46 Q28 38 30 41" fill="none" stroke="#a78bfa" stroke-width="4" stroke-linecap="round"/>
      <circle cx="40" cy="21" r="3.5" fill="white"/>
      <circle cx="41" cy="20.5" r="1.7" fill="#1a1a2e"/>
      <path d="M20 20 Q28 23 38 20" fill="none" stroke="#7c3aed" stroke-width="1.5" opacity="0.35"/>
      <path d="M20 28 Q28 31 38 28" fill="none" stroke="#7c3aed" stroke-width="1.5" opacity="0.25"/>
    </svg>`,
    // Axolotl-inspired little creature — cute translucent blue
    (size) => `<svg viewBox="0 0 70 50" width="${size*0.8}" height="${size*0.57}" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="35" cy="28" rx="22" ry="14" fill="rgba(147,197,253,0.6)"/>
      <ellipse cx="35" cy="28" rx="18" ry="11" fill="rgba(191,219,254,0.5)"/>
      <circle cx="26" cy="24" r="3" fill="white"/>
      <circle cx="25.5" cy="23.5" r="1.5" fill="#1e1e3a"/>
      <circle cx="44" cy="24" r="3" fill="white"/>
      <circle cx="43.5" cy="23.5" r="1.5" fill="#1e1e3a"/>
      <path d="M33 30 Q35 32 37 30" fill="none" stroke="#c084fc" stroke-width="1" stroke-linecap="round"/>
      <path d="M16 16 Q10 6 8 12 Q12 10 16 16Z" fill="rgba(196,167,255,0.5)"/>
      <path d="M20 14 Q16 4 14 10 Q18 8 20 14Z" fill="rgba(196,167,255,0.4)"/>
      <path d="M24 13 Q22 4 20 9 Q23 8 24 13Z" fill="rgba(196,167,255,0.3)"/>
      <path d="M54 16 Q60 6 62 12 Q58 10 54 16Z" fill="rgba(196,167,255,0.5)"/>
      <path d="M50 14 Q54 4 56 10 Q52 8 50 14Z" fill="rgba(196,167,255,0.4)"/>
      <path d="M46 13 Q48 4 50 9 Q47 8 46 13Z" fill="rgba(196,167,255,0.3)"/>
      <path d="M13 28 Q8 30 6 34 Q8 33 10 32" fill="none" stroke="rgba(147,197,253,0.4)" stroke-width="2" stroke-linecap="round"/>
      <path d="M57 28 Q62 30 64 34 Q62 33 60 32" fill="none" stroke="rgba(147,197,253,0.4)" stroke-width="2" stroke-linecap="round"/>
      <path d="M13 34 Q6 38 4 42" fill="none" stroke="rgba(147,197,253,0.3)" stroke-width="2" stroke-linecap="round"/>
      <path d="M57 34 Q64 38 66 42" fill="none" stroke="rgba(147,197,253,0.3)" stroke-width="2" stroke-linecap="round"/>
    </svg>`,
  ];

  // ── Seaweed SVG builder ────────────────────────
  function makeSeaweed(height, color, opacity) {
    const h = height;
    const w = 18;
    return `<svg class="seaweed" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg" style="opacity:${opacity}">
      <path d="M9 ${h} Q2 ${h*0.75} 12 ${h*0.6} Q4 ${h*0.45} 11 ${h*0.3} Q5 ${h*0.15} 9 0"
        fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
      <path d="M9 ${h*0.7} Q15 ${h*0.65} 14 ${h*0.55}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
      <path d="M10 ${h*0.4} Q3 ${h*0.35} 5 ${h*0.28}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
    </svg>`;
  }

  // ── Coral SVG builder ──────────────────────────
  function makeCoral(type, color, size) {
    const s = size;
    if (type === 'staghorn') {
      // Dense branching orange coral (Frediani style)
      return `<svg class="coral" viewBox="0 0 120 130" width="${s}" height="${s*1.08}" xmlns="http://www.w3.org/2000/svg">
        <!-- Main trunk -->
        <path d="M60 130 L60 90 Q58 80 55 70" fill="none" stroke="${color}" stroke-width="5" stroke-linecap="round"/>
        <path d="M60 130 L62 95 Q65 82 68 72" fill="none" stroke="${color}" stroke-width="4.5" stroke-linecap="round" opacity="0.9"/>
        <!-- Left branches -->
        <path d="M55 70 Q45 55 35 38 Q30 28 25 15" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round" opacity="0.85"/>
        <path d="M35 38 Q28 32 20 22" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
        <path d="M45 55 Q38 48 30 45 Q22 42 15 35" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
        <path d="M30 45 Q25 38 22 28" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
        <path d="M55 70 Q48 65 40 62 Q32 60 25 55" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" opacity="0.65"/>
        <path d="M40 62 Q35 55 32 45" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" opacity="0.55"/>
        <path d="M25 55 Q18 48 12 40" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
        <path d="M20 22 Q15 15 10 8" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
        <path d="M25 15 Q20 8 18 2" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
        <!-- Right branches -->
        <path d="M68 72 Q78 55 85 40 Q90 30 95 18" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round" opacity="0.85"/>
        <path d="M85 40 Q92 35 100 25" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
        <path d="M78 55 Q85 50 92 48 Q98 45 105 38" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
        <path d="M92 48 Q96 42 98 32" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
        <path d="M68 72 Q76 68 82 65 Q90 62 98 58" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" opacity="0.65"/>
        <path d="M82 65 Q88 58 90 48" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" opacity="0.55"/>
        <path d="M98 58 Q104 52 108 42" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
        <path d="M100 25 Q104 18 108 10" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
        <path d="M95 18 Q98 10 100 4" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
        <!-- Center branches -->
        <path d="M58 78 Q56 60 52 45 Q50 35 48 22" fill="none" stroke="${color}" stroke-width="3.5" stroke-linecap="round" opacity="0.75"/>
        <path d="M62 78 Q66 58 70 42 Q72 32 75 20" fill="none" stroke="${color}" stroke-width="3.5" stroke-linecap="round" opacity="0.75"/>
        <path d="M52 45 Q46 38 42 28" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" opacity="0.55"/>
        <path d="M70 42 Q76 35 80 25" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" opacity="0.55"/>
        <path d="M48 22 Q45 14 42 6" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
        <path d="M75 20 Q78 12 80 5" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
        <!-- Bumps/texture dots -->
        <circle cx="25" cy="15" r="2" fill="${color}" opacity="0.5"/>
        <circle cx="15" cy="35" r="1.8" fill="${color}" opacity="0.45"/>
        <circle cx="95" cy="18" r="2" fill="${color}" opacity="0.5"/>
        <circle cx="105" cy="38" r="1.8" fill="${color}" opacity="0.45"/>
        <circle cx="48" cy="22" r="1.5" fill="${color}" opacity="0.4"/>
        <circle cx="75" cy="20" r="1.5" fill="${color}" opacity="0.4"/>
        <circle cx="42" cy="6" r="1.5" fill="${color}" opacity="0.45"/>
        <circle cx="80" cy="5" r="1.5" fill="${color}" opacity="0.45"/>
        <circle cx="10" cy="8" r="1.5" fill="${color}" opacity="0.4"/>
        <circle cx="108" cy="10" r="1.5" fill="${color}" opacity="0.4"/>
      </svg>`;
    }
    if (type === 'brain') {
      return `<svg class="coral" viewBox="0 0 60 40" width="${s}" height="${s*0.67}" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="30" cy="28" rx="28" ry="12" fill="${color}" opacity="0.7"/>
        <ellipse cx="30" cy="22" rx="22" ry="16" fill="${color}" opacity="0.5"/>
        <path d="M14 20 Q18 16 22 20 Q26 16 30 20 Q34 16 38 20 Q42 16 46 20" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.6"/>
        <path d="M18 26 Q22 22 26 26 Q30 22 34 26 Q38 22 42 26" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.5"/>
      </svg>`;
    }
    if (type === 'branch') {
      return `<svg class="coral" viewBox="0 0 50 70" width="${s*0.7}" height="${s}" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 70 L25 40 Q25 35 20 28 Q18 22 15 12" fill="none" stroke="${color}" stroke-width="3.5" stroke-linecap="round" opacity="0.7"/>
        <path d="M25 45 Q28 38 32 30 Q34 24 35 15" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
        <path d="M25 55 Q20 50 18 42" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" opacity="0.5"/>
        <path d="M25 50 Q30 45 33 40" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" opacity="0.5"/>
        <circle cx="15" cy="12" r="3" fill="${color}" opacity="0.5"/>
        <circle cx="35" cy="15" r="2.5" fill="${color}" opacity="0.4"/>
        <circle cx="18" cy="42" r="2" fill="${color}" opacity="0.4"/>
      </svg>`;
    }
    if (type === 'tube') {
      return `<svg class="coral" viewBox="0 0 40 60" width="${s*0.57}" height="${s*0.86}" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 60 L10 25 Q10 18 12 15" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round" opacity="0.6"/>
        <path d="M20 60 L20 18 Q20 10 22 6" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round" opacity="0.7"/>
        <path d="M30 60 L30 22 Q30 15 28 10" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round" opacity="0.5"/>
        <circle cx="12" cy="14" r="3" fill="${color}" opacity="0.5"/>
        <circle cx="22" cy="5" r="3.5" fill="${color}" opacity="0.6"/>
        <circle cx="28" cy="9" r="2.8" fill="${color}" opacity="0.4"/>
      </svg>`;
    }
    // fan coral
    return `<svg class="coral" viewBox="0 0 70 60" width="${s}" height="${s*0.86}" xmlns="http://www.w3.org/2000/svg">
      <path d="M35 60 L35 40" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round" opacity="0.6"/>
      <path d="M35 40 Q15 25 10 8" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" opacity="0.4"/>
      <path d="M35 40 Q20 20 18 5" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" opacity="0.5"/>
      <path d="M35 40 Q30 18 28 4" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" opacity="0.5"/>
      <path d="M35 40 Q40 18 42 4" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" opacity="0.5"/>
      <path d="M35 40 Q50 20 52 5" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" opacity="0.5"/>
      <path d="M35 40 Q55 25 60 8" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" opacity="0.4"/>
    </svg>`;
  }

  // ── Create ocean floor ─────────────────────────
  function createOceanFloor() {
    const floor = document.createElement('div');
    floor.className = 'ocean-floor';
    floor.setAttribute('aria-hidden', 'true');

    // Seaweed
    const seaweedData = [
      { left: '3%',  h: 120, color: '#0d9488', opacity: 0.5, delay: 0 },
      { left: '7%',  h: 90,  color: '#14b8a6', opacity: 0.4, delay: 0.5 },
      { left: '12%', h: 140, color: '#0f766e', opacity: 0.45, delay: 1.2 },
      { left: '18%', h: 80,  color: '#2dd4bf', opacity: 0.3, delay: 0.8 },
      { left: '30%', h: 100, color: '#0d9488', opacity: 0.35, delay: 1.5 },
      { left: '45%', h: 110, color: '#14b8a6', opacity: 0.4, delay: 0.3 },
      { left: '55%', h: 70,  color: '#0f766e', opacity: 0.3, delay: 2.0 },
      { left: '65%', h: 130, color: '#2dd4bf', opacity: 0.45, delay: 0.7 },
      { left: '72%', h: 85,  color: '#0d9488', opacity: 0.35, delay: 1.8 },
      { left: '80%', h: 105, color: '#14b8a6', opacity: 0.4, delay: 1.0 },
      { left: '88%', h: 125, color: '#0f766e', opacity: 0.5, delay: 0.4 },
      { left: '94%', h: 75,  color: '#2dd4bf', opacity: 0.35, delay: 1.3 },
    ];

    seaweedData.forEach(s => {
      const wrapper = document.createElement('div');
      wrapper.className = 'seaweed-wrapper';
      wrapper.style.cssText = `left:${s.left}; animation-delay:${s.delay}s;`;
      wrapper.innerHTML = makeSeaweed(s.h, s.color, s.opacity);
      floor.appendChild(wrapper);
    });

    // Corals — including big orange staghorn corals
    const coralData = [
      { left: '2%',  type: 'staghorn', color: '#f97316', size: 100 },
      { left: '10%', type: 'brain',    color: '#c084fc', size: 60 },
      { left: '18%', type: 'tube',     color: '#f472b6', size: 55 },
      { left: '26%', type: 'staghorn', color: '#fb923c', size: 85 },
      { left: '35%', type: 'fan',      color: '#a78bfa', size: 60 },
      { left: '42%', type: 'branch',   color: '#fb923c', size: 65 },
      { left: '50%', type: 'staghorn', color: '#ea580c', size: 110 },
      { left: '60%', type: 'brain',    color: '#f9a8d4', size: 50 },
      { left: '67%', type: 'tube',     color: '#c084fc', size: 58 },
      { left: '74%', type: 'staghorn', color: '#f97316', size: 95 },
      { left: '82%', type: 'fan',      color: '#67e8f9', size: 55 },
      { left: '90%', type: 'staghorn', color: '#fb923c', size: 80 },
    ];

    coralData.forEach(c => {
      const wrapper = document.createElement('div');
      wrapper.className = 'coral-wrapper';
      wrapper.style.cssText = `left:${c.left};`;
      wrapper.innerHTML = makeCoral(c.type, c.color, c.size);
      floor.appendChild(wrapper);
    });

    document.body.appendChild(floor);
  }

  // ── Create swimming fish ───────────────────────
  function createFish() {
    const container = document.createElement('div');
    container.className = 'fish-container';
    container.setAttribute('aria-hidden', 'true');

    const fishConfig = [
      { type: 0, size: 110, y: '10%', dur: 18, delay: 0,   dir: 'right' },  // Big Nemo
      { type: 0, size: 80,  y: '25%', dur: 22, delay: 5,   dir: 'left' },   // Nemo 2
      { type: 1, size: 120, y: '32%', dur: 20, delay: 3,   dir: 'right' },  // Big Dory
      { type: 2, size: 90,  y: '50%', dur: 15, delay: 8,   dir: 'left' },   // Teal fish
      { type: 3, size: 70,  y: '16%', dur: 14, delay: 2,   dir: 'right' },  // Yellow fish
      { type: 3, size: 60,  y: '20%', dur: 13, delay: 3,   dir: 'right' },  // Yellow fish 2
      { type: 4, size: 100, y: '58%', dur: 25, delay: 6,   dir: 'left' },   // Angelfish
      { type: 2, size: 75,  y: '44%', dur: 16, delay: 10,  dir: 'right' },  // Teal fish 2
      { type: 5, size: 110, y: '68%', dur: 28, delay: 4,   dir: 'right' },  // Big Axolotl
      { type: 1, size: 90,  y: '53%', dur: 23, delay: 12,  dir: 'left' },   // Dory 2
      { type: 0, size: 95,  y: '75%', dur: 19, delay: 7,   dir: 'right' },  // Nemo 3
      { type: 4, size: 85,  y: '38%', dur: 21, delay: 15,  dir: 'left' },   // Angelfish 2
    ];

    fishConfig.forEach(f => {
      const fish = document.createElement('div');
      fish.className = `fish fish--${f.dir}`;
      fish.style.cssText = `
        top: ${f.y};
        animation-duration: ${f.dur}s;
        animation-delay: ${f.delay}s;
      `;
      fish.innerHTML = FISH_TYPES[f.type](f.size);
      container.appendChild(fish);
    });

    document.body.appendChild(container);
  }

  // ── Bubbles ────────────────────────────────────
  function initBubbles() {
    const canvas = document.getElementById('bubbles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let bubbles = [];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function createBubble() {
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 100,
        r: Math.random() * 3 + 1,
        speed: Math.random() * 0.6 + 0.15,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.015 + 0.005,
        wobbleAmp: Math.random() * 20 + 5,
        alpha: Math.random() * 0.2 + 0.05,
      };
    }

    function init() {
      resize();
      bubbles = Array.from({ length: 50 }, createBubble);
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const b of bubbles) {
        b.y -= b.speed;
        b.wobble += b.wobbleSpeed;
        const x = b.x + Math.sin(b.wobble) * b.wobbleAmp;
        if (b.y < -20) {
          b.y = canvas.height + 10;
          b.x = Math.random() * canvas.width;
        }
        ctx.beginPath();
        ctx.arc(x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${b.alpha})`;
        ctx.fill();
        if (b.r > 1.5) {
          ctx.beginPath();
          ctx.arc(x - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${b.alpha * 0.5})`;
          ctx.fill();
        }
      }
      requestAnimationFrame(draw);
    }

    init();
    draw();
    window.addEventListener('resize', resize);
  }

  // ── Render ─────────────────────────────────────
  function renderModules() {
    const grid = document.getElementById('modulesGrid');
    if (!grid) return;
    grid.innerHTML = MODULES.map((m, i) => `
      <div class="module-card reveal" style="transition-delay: ${i * 40}ms">
        <span class="module-card__icon">${m.icon}</span>
        <div class="module-card__name">${m.name}</div>
        <div class="module-card__desc">${m.desc}</div>
      </div>
    `).join('');
  }

  function renderModes() {
    const grid = document.getElementById('modesGrid');
    if (!grid) return;
    grid.innerHTML = MODES.map((m, i) => `
      <div class="mode-card reveal" style="transition-delay: ${i * 50}ms">
        <span class="mode-card__emoji">${m.emoji}</span>
        <div class="mode-card__name">${m.name}</div>
        <div class="mode-card__desc">${m.desc}</div>
      </div>
    `).join('');
  }

  // ── Terminal ───────────────────────────────────
  function initTerminal() {
    const input = document.getElementById('terminalInput');
    const body = document.getElementById('terminalBody');
    if (!input || !body) return;

    function addLine(text, type = 'result') {
      const line = document.createElement('div');
      line.className = `terminal__line terminal__line--${type}`;
      line.textContent = text;
      body.appendChild(line);
      body.scrollTop = body.scrollHeight;
    }

    input.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter') return;
      const raw = input.value.trim();
      const cmd = raw.toLowerCase();
      if (!cmd) return;
      addLine(raw, 'user');
      input.value = '';
      if (cmd === 'clear') {
        body.innerHTML = '<div class="terminal__line terminal__line--sys">Terminal vidé.</div>';
        return;
      }
      const match = COMMANDS[cmd];
      if (match) {
        const text = typeof match.text === 'function' ? match.text() : match.text;
        setTimeout(() => addLine(text, match.type), 180);
      } else {
        setTimeout(() => addLine(`Commande « ${raw} » non reconnue. Tapez "aide".`, 'error'), 180);
      }
    });
  }

  // ── Scroll Reveal ──────────────────────────────
  function initReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  function tagRevealElements() {
    ['.feature-card', '.stat-card', '.trust__bar', '.about .section-desc', '.terminal'].forEach(sel => {
      document.querySelectorAll(sel).forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${i * 60}ms`;
      });
    });
  }

  // ── Mobile burger ──────────────────────────────
  function initBurger() {
    const burger = document.getElementById('navBurger');
    const links = document.getElementById('navLinks');
    if (!burger || !links) return;
    let open = false;
    burger.addEventListener('click', () => {
      open = !open;
      if (open) {
        links.style.cssText = 'display:flex;flex-direction:column;position:absolute;top:64px;left:0;right:0;background:rgba(2,11,24,0.97);padding:20px 24px;gap:16px;border-bottom:1px solid rgba(56,189,248,0.08);';
      } else {
        links.removeAttribute('style');
      }
    });
  }

  // ── Init ───────────────────────────────────────
  function init() {
    initBubbles();
    createFish();
    createOceanFloor();
    renderModules();
    renderModes();
    tagRevealElements();
    initTerminal();
    initBurger();
    requestAnimationFrame(() => requestAnimationFrame(initReveal));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
