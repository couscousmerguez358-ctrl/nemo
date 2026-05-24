/* ═══════════════════════════════════════════════════
   NEMO v2.0 — SaaS App Controller
   🌑 Premium Dark Theme
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
    // ── Aide ──────────────────────────────────────
    'aide':    { type: 'result', text: 'Catégories : système, fichiers, affichage, apps, réseau, audio, périphériques, média, dev, texte, web, infos, sécurité, com, domotique, fun — Tapez une catégorie pour voir ses commandes.' },
    'help':    { type: 'result', text: 'Categories: système, fichiers, affichage, apps, réseau, audio, périphériques, média, dev, texte, web, infos, sécurité, com, domotique, fun — Type a category to see its commands.' },

    // ── Général ───────────────────────────────────
    'bonjour': { type: 'result', text: () => `Bonjour ! Il est ${new Date().toLocaleTimeString('fr-FR')}. Comment puis-je vous aider ?` },
    'hello':   { type: 'result', text: () => `Hello! It's ${new Date().toLocaleTimeString('en-US')}. How can I help you?` },
    'heure':   { type: 'result', text: () => `Il est ${new Date().toLocaleTimeString('fr-FR')}.` },
    'date':    { type: 'result', text: () => `Nous sommes le ${new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.` },
    'version': { type: 'result', text: 'NEMO v2.0 — Neuro-Enhanced Machine Operator — Build 2026.05.23' },
    'modules': { type: 'result', text: () => `${MODULES.length} modules actifs : ${MODULES.map(m => m.name).join(', ')}` },
    'modes':   { type: 'result', text: () => `${MODES.length} modes cognitifs : ${MODES.map(m => m.name).join(', ')}` },
    'nemo':    { type: 'result', text: '🐠 NEMO — Neuro-Enhanced Machine Operator — Votre assistant PC vocal intelligent pour Windows.' },
    'merci':   { type: 'result', text: 'De rien ! Je suis là pour ça. 🐠' },
    'salut':   { type: 'result', text: () => `Salut ! Il est ${new Date().toLocaleTimeString('fr-FR')}. Que puis-je faire pour vous ?` },

    // ── Catégorie : Système ───────────────────────
    'système': { type: 'result', text: 'Commandes système : cpu, ram, gpu, disque, batterie, uptime, temp, processus, maj, nettoyage, démarrage, restauration, bsod, éteindre, redémarrer, veille' },
    'cpu':     { type: 'result', text: () => `CPU : ${(20 + Math.random() * 30).toFixed(1)}% — ${(45 + Math.random() * 20).toFixed(0)}°C — Intel Core i7-13700K @ 5.4 GHz — 16 cœurs / 24 threads` },
    'ram':     { type: 'result', text: () => `RAM : ${(8 + Math.random() * 6).toFixed(1)} / 32.0 Go utilisés (${(25 + Math.random() * 20).toFixed(0)}%) — DDR5 5600 MHz — 2 barrettes Corsair` },
    'gpu':     { type: 'result', text: () => `GPU : NVIDIA RTX 4070 Ti — ${(30 + Math.random() * 40).toFixed(0)}°C — VRAM : ${(2 + Math.random() * 4).toFixed(1)} / 12.0 Go — Driver 556.12` },
    'disque':  { type: 'result', text: () => `C:\\ — SSD NVMe 1 To — ${(350 + Math.random() * 300).toFixed(0)} Go utilisés — Santé : Excellent (98%) — Lecture : 7000 Mo/s` },
    'batterie':{ type: 'result', text: 'Alimentation secteur — Pas de batterie détectée (PC fixe).' },
    'uptime':  { type: 'result', text: () => `Système démarré depuis ${Math.floor(Math.random() * 5) + 1} jours, ${Math.floor(Math.random() * 23)} heures, ${Math.floor(Math.random() * 59)} minutes.` },
    'temp':    { type: 'result', text: () => `Températures — CPU : ${(45 + Math.random() * 20).toFixed(0)}°C | GPU : ${(35 + Math.random() * 30).toFixed(0)}°C | SSD : ${(30 + Math.random() * 15).toFixed(0)}°C | Carte mère : ${(28 + Math.random() * 10).toFixed(0)}°C` },
    'processus': { type: 'result', text: () => `${(180 + Math.floor(Math.random() * 80))} processus actifs — Top CPU : chrome.exe (${(5 + Math.random() * 15).toFixed(1)}%), explorer.exe (${(1 + Math.random() * 3).toFixed(1)}%), Discord.exe (${(1 + Math.random() * 4).toFixed(1)}%)` },
    'maj':     { type: 'result', text: '✓ Windows 11 24H2 — Toutes les mises à jour sont installées. Dernière vérification : il y a 3 heures.' },
    'nettoyage': { type: 'result', text: () => `✓ Nettoyage terminé — ${(1.5 + Math.random() * 4).toFixed(1)} Go libérés (cache, temp, corbeille, logs obsolètes).` },
    'démarrage': { type: 'result', text: '✓ Programmes au démarrage : Discord (activé), Spotify (désactivé), Steam (activé), OneDrive (activé) — 4 éléments, temps de boot : 8.2s' },
    'restauration': { type: 'result', text: '✓ 3 points de restauration disponibles — Dernier : 21/05/2026 14:30 — Espace utilisé : 4.2 Go' },
    'bsod':    { type: 'result', text: '✓ Aucun écran bleu détecté ces 30 derniers jours. Système stable.' },
    'éteindre': { type: 'result', text: '⚠ Simulation — shutdown /s /t 60 — Extinction dans 60 secondes (annulable avec "annuler").' },
    'redémarrer': { type: 'result', text: '⚠ Simulation — shutdown /r /t 30 — Redémarrage dans 30 secondes.' },
    'veille':  { type: 'result', text: '⚠ Simulation — Mise en veille du système...' },

    // ── Catégorie : Fichiers ──────────────────────
    'fichiers': { type: 'result', text: 'Commandes fichiers : ls, rechercher, doublons, taille, zip, unzip, chiffrer, dechiffrer, corbeille, récent' },
    'ls':      { type: 'result', text: 'C:\\Users\\%USERNAME%\\Desktop — 📁 Projets (12 fichiers) | 📁 Documents (34) | 📁 Téléchargements (8) | 📄 notes.txt (2 Ko)' },
    'rechercher': { type: 'result', text: '🔍 Tapez "rechercher [nom]" — Recherche rapide dans tous les dossiers avec indexation Windows Search.' },
    'doublons': { type: 'result', text: () => `✓ Scan terminé — ${Math.floor(5 + Math.random() * 20)} doublons trouvés — ${(0.5 + Math.random() * 3).toFixed(1)} Go récupérables.` },
    'taille':  { type: 'result', text: 'C:\\Users\\%USERNAME% — 📁 AppData: 18.4 Go | 📁 Documents: 5.2 Go | 📁 Téléchargements: 12.7 Go | 📁 Bureau: 1.1 Go' },
    'zip':     { type: 'result', text: '✓ Compression disponible — Formats supportés : ZIP, 7Z, RAR, TAR.GZ — Chiffrement AES-256 disponible.' },
    'corbeille': { type: 'result', text: () => `🗑️ Corbeille : ${Math.floor(3 + Math.random() * 15)} éléments — ${(0.2 + Math.random() * 2).toFixed(1)} Go — Tapez "vider corbeille" pour supprimer.` },
    'récent':  { type: 'result', text: () => `📄 Derniers fichiers : rapport.docx (${Math.floor(1 + Math.random() * 30)} min), screenshot.png (2h), projet_v3.zip (hier)` },

    // ── Catégorie : Affichage ─────────────────────
    'affichage': { type: 'result', text: 'Commandes affichage : résolution, hdr, luminosité, thème, fond, écrans, nuit, rotation' },
    'résolution': { type: 'result', text: '🖥️ Écran principal : 2560×1440 @ 165 Hz — Écran 2 : 1920×1080 @ 60 Hz' },
    'hdr':     { type: 'result', text: '🖥️ HDR : Supporté — Actuellement désactivé. Tapez "hdr on" pour activer.' },
    'luminosité': { type: 'result', text: () => `☀️ Luminosité : ${50 + Math.floor(Math.random() * 50)}% — Mode adaptatif activé.` },
    'thème':   { type: 'result', text: '🎨 Thème Windows : Sombre — Accent : Bleu — Transparence : Activée' },
    'fond':    { type: 'result', text: '🖼️ Fond d\'écran : Bing quotidien (activé) — Dernier changement : ce matin.' },
    'écrans':  { type: 'result', text: '🖥️ 2 écrans connectés — Principal : ASUS VG27AQ (1440p) — Secondaire : Dell P2419H (1080p)' },

    // ── Catégorie : Applications ──────────────────
    'apps':    { type: 'result', text: 'Commandes apps : ouvrir, fermer, installer, désinstaller, liste, zombies, startup' },
    'ouvrir':  { type: 'result', text: '🚀 Tapez "ouvrir [app]" — Apps disponibles : chrome, discord, spotify, vscode, steam, explorer, notepad, calc...' },
    'fermer':  { type: 'result', text: '🛑 Tapez "fermer [app]" — Ferme proprement l\'application ciblée.' },
    'liste':   { type: 'result', text: () => `📦 ${120 + Math.floor(Math.random() * 40)} applications installées — 12 apps système — 8 apps au démarrage.` },
    'zombies': { type: 'result', text: () => `👻 ${Math.floor(Math.random() * 5)} processus zombies détectés — Mémoire gaspillée : ${(50 + Math.random() * 200).toFixed(0)} Mo` },

    // ── Catégorie : Réseau ────────────────────────
    'réseau':  { type: 'result', text: 'Commandes réseau : ip, ping, wifi, speedtest, dns, ports, vpn, firewall, bluetooth, scan' },
    'ip':      { type: 'result', text: '192.168.1.42 (local) — 86.234.xxx.xxx (publique) — FAI : Free — IPv6 : activé' },
    'ping':    { type: 'result', text: () => `📡 Ping google.com — ${(8 + Math.random() * 25).toFixed(0)} ms (${Math.random() > 0.3 ? 'excellent' : 'bon'}) — 0% perte` },
    'wifi':    { type: 'result', text: () => `📶 WiFi : "Livebox-A3F2" — Signal : ${(60 + Math.random() * 35).toFixed(0)}% — Bande : 5 GHz — Sécurité : WPA3` },
    'speedtest': { type: 'result', text: () => `⚡ Débit — ↓ ${(200 + Math.random() * 300).toFixed(0)} Mbps | ↑ ${(50 + Math.random() * 150).toFixed(0)} Mbps | Ping : ${(5 + Math.random() * 15).toFixed(0)} ms` },
    'dns':     { type: 'result', text: 'DNS : 1.1.1.1 (Cloudflare) — Résolution : 12ms — DNSSEC : activé' },
    'ports':   { type: 'result', text: 'Ports ouverts : 80 (HTTP), 443 (HTTPS), 3000 (dev), 22 (SSH) — 4 ports en écoute.' },
    'vpn':     { type: 'result', text: '🔒 VPN : Déconnecté — Dernière connexion : NordVPN (Amsterdam) — Tapez "vpn on" pour activer.' },
    'firewall': { type: 'result', text: '🛡️ Pare-feu Windows : Activé — 23 règles entrantes — 12 règles sortantes — Dernière alerte : aucune.' },
    'bluetooth': { type: 'result', text: '📱 Bluetooth : Activé — Appareils : AirPods Pro (connecté), Clavier MX Keys (connecté), Manette Xbox (déconnecté)' },
    'scan':    { type: 'result', text: () => `🔍 Scan réseau — ${3 + Math.floor(Math.random() * 8)} appareils sur le réseau — .42 (ce PC), .1 (routeur), .15 (iPhone), .23 (PS5)` },

    // ── Catégorie : Audio ─────────────────────────
    'audio':   { type: 'result', text: 'Commandes audio : volume, mute, sortie, micro, equalizer, bruit, test' },
    'volume':  { type: 'result', text: () => `🔊 Volume système : ${40 + Math.floor(Math.random() * 50)}% — Chrome : 80% | Discord : 65% | Spotify : 90%` },
    'mute':    { type: 'result', text: '🔇 Simulation — Son coupé. Tapez "unmute" pour réactiver.' },
    'sortie':  { type: 'result', text: '🎧 Sortie active : AirPods Pro — Alternatives : Haut-parleurs (Realtek), HDMI (ASUS Monitor)' },
    'micro':   { type: 'result', text: () => `🎙️ Micro : Blue Yeti — Niveau : ${40 + Math.floor(Math.random() * 40)}% — Suppression bruit : activée` },
    'equalizer': { type: 'result', text: '🎛️ Égaliseur : Profil "Musique" actif — Bass boost +3dB — Profils : Musique, Film, Voix, Gaming, Plat' },

    // ── Catégorie : Périphériques ──────────────────
    'périphériques': { type: 'result', text: 'Commandes périphériques : clavier, souris, manette, rgb, usb, imprimante, webcam' },
    'clavier': { type: 'result', text: '⌨️ Logitech MX Keys — Batterie : 78% — Rétroéclairage : Auto — Disposition : AZERTY FR' },
    'souris':  { type: 'result', text: '🖱️ Logitech G502 — DPI : 1600 — Polling : 1000 Hz — 5 boutons programmés' },
    'manette': { type: 'result', text: '🎮 Xbox Wireless Controller — État : Déconnecté — Dernière utilisation : hier — Batterie : 45%' },
    'rgb':     { type: 'result', text: '💡 RGB : Profil "Ocean Wave" actif — Vitesse : Moyenne — Appareils : Clavier, Souris, RAM, Ventilateurs' },
    'usb':     { type: 'result', text: '🔌 Ports USB — 3 appareils connectés : Clavier (USB3), Webcam (USB2), Hub (USB-C) — 5 ports libres' },
    'webcam':  { type: 'result', text: '📷 Logitech C920 — Résolution : 1080p @ 30fps — Autofocus : activé — Privacité : volet ouvert' },

    // ── Catégorie : Média ─────────────────────────
    'média':   { type: 'result', text: 'Commandes média : screenshot, screenrec, ocr, convertir, transcrire, photo' },
    'screenrec': { type: 'result', text: '🎬 Enregistrement écran — Prêt. Tapez "rec start" pour commencer (H.264, 60fps).' },
    'ocr':     { type: 'result', text: '📝 OCR — Pointez vers une image ou zone d\'écran pour extraire le texte. Langues : FR, EN, ES, DE.' },
    'transcrire': { type: 'result', text: '🎤 Transcription Whisper — Formats supportés : MP3, WAV, M4A, MP4 — Langues : auto-détection.' },

    // ── Catégorie : Dev ───────────────────────────
    'dev':     { type: 'result', text: 'Commandes dev : git, docker, node, python, terminal, wsl, debug, serveur' },
    'git':     { type: 'result', text: () => `📦 Git v2.54.0 — Branche : main — ${Math.floor(Math.random() * 5)} modifications non commitées — Remote : github.com` },
    'docker':  { type: 'result', text: () => `🐳 Docker Desktop — ${2 + Math.floor(Math.random() * 5)} conteneurs actifs — Images : 8 — Espace : 4.2 Go` },
    'node':    { type: 'result', text: 'Node.js v22.3.0 — npm v10.8.1 — nvm installé — Projets actifs : 3' },
    'python':  { type: 'result', text: 'Python 3.12.4 — pip 24.0 — venv actif : aucun — Packages installés : 47' },
    'serveur': { type: 'result', text: () => `🌐 Serveur local actif sur http://localhost:3000 — PID : ${1000 + Math.floor(Math.random() * 9000)} — Uptime : ${Math.floor(Math.random() * 120)} min` },
    'wsl':     { type: 'result', text: '🐧 WSL 2 — Distribution : Ubuntu 24.04 — État : En cours d\'exécution — Mémoire : 2.1 Go' },

    // ── Catégorie : Texte & Bureau ────────────────
    'texte':   { type: 'result', text: 'Commandes texte : dictée, traduire, résumer, corriger, modèle, presse-papier' },
    'dictée':  { type: 'result', text: '🎤 Dictée vocale — Prête. Parlez après le bip... (Whisper FR, précision 97%)' },
    'traduire': { type: 'result', text: '🌍 Tapez "traduire [texte] en [langue]" — Langues : FR, EN, ES, DE, IT, PT, AR, ZH, JA, KO...' },
    'résumer': { type: 'result', text: '📋 Tapez "résumer [fichier/texte]" — Résumé IA en 2-3 phrases. Supporte PDF, DOCX, TXT.' },
    'corriger': { type: 'result', text: '✏️ Tapez "corriger [texte]" — Correction orthographique et grammaticale avec suggestions.' },
    'presse-papier': { type: 'result', text: '📋 Historique presse-papier : 15 éléments — Dernier : "https://github.com/..." — Tapez "coller [n]" pour récupérer.' },

    // ── Catégorie : Web ───────────────────────────
    'web':     { type: 'result', text: 'Commandes web : google, youtube, télécharger, scraper, surveiller, qr' },
    'google':  { type: 'result', text: '🔍 Tapez "google [recherche]" — Ouvre la recherche dans le navigateur par défaut.' },
    'youtube': { type: 'result', text: '▶️ Tapez "youtube [recherche]" — Recherche YouTube ou "yt-dlp [url]" pour télécharger.' },
    'télécharger': { type: 'result', text: '⬇️ Tapez "télécharger [url]" — Téléchargement avec barre de progression, reprise auto.' },
    'qr':      { type: 'result', text: '📱 Tapez "qr [texte/url]" — Génère un QR code instantanément.' },

    // ── Catégorie : Infos Temps Réel ──────────────
    'infos':   { type: 'result', text: 'Commandes infos : météo, crypto, bourse, actu, colis, heure-monde' },
    'météo':   { type: 'result', text: () => `🌤️ Paris — ${(18 + Math.random() * 8).toFixed(0)}°C, partiellement nuageux — Vent : ${(8 + Math.random() * 20).toFixed(0)} km/h — Humidité : ${(40 + Math.random() * 30).toFixed(0)}% — Demain : ${(16 + Math.random() * 10).toFixed(0)}°C ☀️` },
    'meteo':   { type: 'result', text: () => `🌤️ Paris — ${(18 + Math.random() * 8).toFixed(0)}°C, partiellement nuageux — Vent : ${(8 + Math.random() * 20).toFixed(0)} km/h` },
    'crypto':  { type: 'result', text: () => `₿ BTC : $${(65000 + Math.random() * 5000).toFixed(0)} (${Math.random() > 0.5 ? '+' : '-'}${(Math.random() * 3).toFixed(1)}%) | Ξ ETH : $${(3200 + Math.random() * 400).toFixed(0)} | SOL : $${(140 + Math.random() * 30).toFixed(0)}` },
    'bourse':  { type: 'result', text: () => `📈 CAC 40 : ${(7500 + Math.random() * 300).toFixed(0)} pts (${Math.random() > 0.4 ? '+' : '-'}${(Math.random() * 1.5).toFixed(2)}%) | S&P 500 : ${(5300 + Math.random() * 200).toFixed(0)} | NASDAQ : ${(16800 + Math.random() * 500).toFixed(0)}` },
    'actu':    { type: 'result', text: '📰 Top actus : 1) Tech — Apple annonce iOS 20 | 2) Sport — Roland-Garros : résultats | 3) Monde — Sommet G7 en Italie' },
    'colis':   { type: 'result', text: '📦 Tapez "colis [numéro]" — Suivi : La Poste, Chronopost, UPS, DHL, Amazon, AliExpress.' },

    // ── Catégorie : Sécurité ──────────────────────
    'sécurité': { type: 'result', text: 'Commandes sécurité : antivirus, audit, mdp, chiffrer, malware, permissions' },
    'antivirus': { type: 'result', text: '🛡️ Windows Defender — Dernière analyse : il y a 6h — Menaces : 0 — Base virale : à jour (23/05/2026)' },
    'audit':   { type: 'result', text: () => `🔍 Audit sécurité — Score : ${75 + Math.floor(Math.random() * 20)}/100 — MFA : ✓ | Firewall : ✓ | Chiffrement : ✓ | MAJ : ✓` },
    'mdp':     { type: 'result', text: '🔑 Gestionnaire de mots de passe — 42 entrées — 3 mots de passe faibles détectés — 2 réutilisés.' },
    'malware': { type: 'result', text: '✓ Scan rapide terminé — Aucun malware, adware ou keylogger détecté. Système propre.' },

    // ── Catégorie : Communication ─────────────────
    'com':     { type: 'result', text: 'Commandes com : email, agenda, rappel, sms, slack, teams' },
    'email':   { type: 'result', text: () => `📧 Boîte mail — ${3 + Math.floor(Math.random() * 10)} non lus — Dernier : "Re: Projet NEMO" de contact@dev.fr (il y a 2h)` },
    'agenda':  { type: 'result', text: () => `📅 Aujourd'hui — ${1 + Math.floor(Math.random() * 3)} événements — 14h: Réunion projet | 17h: Call client | 20h: Sport` },
    'rappel':  { type: 'result', text: '⏰ Tapez "rappel [heure] [message]" — Ex: "rappel 18h appeler le dentiste"' },

    // ── Catégorie : Domotique ─────────────────────
    'domotique': { type: 'result', text: 'Commandes domotique : lumières, thermostat, caméra, volets, alarme, scène' },
    'lumières': { type: 'result', text: '💡 Salon : 80% (blanc chaud) | Chambre : OFF | Bureau : 100% (lumière du jour) — 6 ampoules connectées.' },
    'thermostat': { type: 'result', text: () => `🌡️ Température intérieure : ${(20 + Math.random() * 3).toFixed(1)}°C — Consigne : 21°C — Mode : Auto — Chauffage : OFF` },
    'caméra':  { type: 'result', text: '📹 2 caméras actives — Entrée : ✅ RAS | Jardin : ✅ RAS — Dernière détection : chat (il y a 45 min)' },
    'alarme':  { type: 'result', text: '🔔 Alarme : Désarmée (mode maison) — Capteurs : 4 portes, 2 mouvements — Tous OK.' },

    // ── Catégorie : Divertissement ────────────────
    'fun':     { type: 'result', text: 'Commandes fun : musique, pause, jeu, quiz, pomodoro, ambiance, blague' },
    'musique': { type: 'result', text: '🎵 Spotify — En pause — Dernier titre : "Blinding Lights" — Playlist : Chill Vibes (142 titres)' },
    'pause':   { type: 'result', text: '⏸️ Simulation — Lecture en pause. Tapez "play" pour reprendre.' },
    'play':    { type: 'result', text: '▶️ Simulation — Lecture reprise.' },
    'pomodoro': { type: 'result', text: '🍅 Pomodoro — Tapez "pomo start" — 25 min focus + 5 min pause. Sessions aujourd\'hui : 3.' },
    'blague':  { type: 'result', text: () => {
      const blagues = [
        'Pourquoi les plongeurs plongent-ils toujours en arrière ? Parce que sinon ils tomberaient dans le bateau. 🐠',
        'C\'est un poisson qui rencontre un mur. Il dit : "Mur !" 🐟',
        'Que dit un informaticien quand il s\'ennuie ? "Je vais sur mon octet." 💻',
        'Comment appelle-t-on un chat tombé dans un pot de peinture le jour de Noël ? Un chat-peint de Noël ! 🎄',
        'Qu\'est-ce qu\'un canif ? Un petit fien. 🔪',
        'Que fait un geek quand il a peur ? Il URL. 😱',
      ];
      return blagues[Math.floor(Math.random() * blagues.length)];
    }},
    'quiz':    { type: 'result', text: '🧠 Quiz — Quelle est la plus grande structure vivante sur Terre ? Tapez "réponse [texte]" — Indice : c\'est sous l\'eau 🌊' },
    'ambiance': { type: 'result', text: '🌊 Ambiance sonore — Profils : Pluie, Océan, Forêt, Café, Espace, Feu de cheminée — Tapez "ambiance [nom]"' },
  };

  // ── Particles Background ──────────────────────
  function initParticles() {
    const canvas = document.getElementById('particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function createParticle() {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: (Math.random() - 0.5) * 0.15,
        alpha: Math.random() * 0.3 + 0.05,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.01 + 0.003,
      };
    }

    function init() {
      resize();
      particles = Array.from({ length: 60 }, createParticle);
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulse += p.pulseSpeed;

        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        const alpha = p.alpha * (0.7 + Math.sin(p.pulse) * 0.3);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167, 139, 250, ${alpha})`;
        ctx.fill();
      }
      requestAnimationFrame(draw);
    }

    init();
    draw();
    window.addEventListener('resize', resize);
  }

  // ── Cursor Glow ───────────────────────────────
  function initCursorGlow() {
    const glow = document.getElementById('cursorGlow');
    if (!glow || window.innerWidth < 768) return;

    document.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  }

  // ── Animated Counters ─────────────────────────
  function initCounters() {
    const counters = document.querySelectorAll('.trust__num[data-count]');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const isLatency = el.closest('.trust__item')?.querySelector('.trust__label')?.textContent.includes('latence');
        const duration = 1800;
        const start = performance.now();

        function animate(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
          const current = Math.round(target * eased);

          if (isLatency) {
            el.textContent = `<${current}`;
          } else {
            el.textContent = current + '+';
          }

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        }

        requestAnimationFrame(animate);
        observer.unobserve(el);
      });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
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

      if (type !== 'user' && window.speakLine) {
        window.speakLine(text);
      }
    }

    input.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter') return;
      const raw = input.value.trim();
      if (!raw) return;
      processCommand(raw);
    });

    function processCommand(raw) {
      const cmd = raw.toLowerCase();
      addLine(raw, 'user');
      input.value = '';
      if (cmd === 'clear') {
        body.innerHTML = '<div class="terminal__line terminal__line--sys">Terminal vidé.</div>';
        return;
      }

      // Screenshot — capture pleine page
      if (cmd === 'screenshot') {
        addLine('📸 Capture pleine page en cours...', 'info');
        setTimeout(() => {
          if (typeof html2canvas !== 'undefined') {
            const prevScroll = window.scrollY;
            window.scrollTo(0, 0);

            html2canvas(document.body, {
              backgroundColor: '#06060e',
              scale: 2,
              useCORS: true,
              logging: false,
              width: document.documentElement.scrollWidth,
              height: document.documentElement.scrollHeight,
              windowWidth: document.documentElement.scrollWidth,
              windowHeight: document.documentElement.scrollHeight,
              x: 0,
              y: 0,
            }).then(canvas => {
              window.scrollTo(0, prevScroll);

              const now = new Date();
              const filename = `nemo_screenshot_${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}_${String(now.getHours()).padStart(2,'0')}h${String(now.getMinutes()).padStart(2,'0')}.png`;
              const link = document.createElement('a');
              link.download = filename;
              link.href = canvas.toDataURL('image/png');
              link.click();
              addLine(`✓ Capture pleine page sauvegardée → ${filename}`, 'result');
            }).catch(() => {
              window.scrollTo(0, prevScroll);
              addLine('✗ Erreur lors de la capture.', 'error');
            });
          } else {
            addLine('✗ Module de capture non chargé.', 'error');
          }
        }, 300);
        return;
      }

      const match = COMMANDS[cmd];
      if (match) {
        const text = typeof match.text === 'function' ? match.text() : match.text;
        setTimeout(() => addLine(text, match.type), 180);
      } else if (window.nemoAPI) {
        // Exécution réelle via Electron
        addLine(`Exécution système : ${raw}...`, 'sys');
        window.nemoAPI.runCommand(raw).then(res => {
          if (res.error) {
            addLine(`Erreur: ${res.error}\n${res.stderr || ''}`, 'error');
          } else {
            addLine(res.stdout || 'Commande exécutée sans retour.', 'result');
          }
        }).catch(err => {
          addLine(`Erreur d'exécution: ${err}`, 'error');
        });
      } else {
        setTimeout(() => addLine(`Commande « ${raw} » non reconnue en mode web. Tapez "aide".`, 'error'), 180);
      }
    }

    // ── Voice System ──────────────────────────────
    const micBtn = document.getElementById('micBtn');
    if (micBtn && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'fr-FR';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      let isListening = false;

      micBtn.addEventListener('click', () => {
        if (isListening) {
          recognition.stop();
          return;
        }
        recognition.start();
      });

      recognition.addEventListener('start', () => {
        isListening = true;
        micBtn.classList.add('listening');
        input.placeholder = 'NEMO écoute...';
      });

      recognition.addEventListener('end', () => {
        isListening = false;
        micBtn.classList.remove('listening');
        input.placeholder = 'Tapez une commande…';
      });

      recognition.addEventListener('result', (e) => {
        const transcript = e.results[0][0].transcript;
        input.value = transcript;
        processCommand(transcript);
      });

      recognition.addEventListener('error', (e) => {
        addLine(`Erreur vocale : ${e.error}`, 'error');
      });
    }

    // ── Text To Speech & Settings ─────────────────
    let selectedVoice = null;
    let ttsEnabled = true;

    window.speakLine = function(text) {
      if (!ttsEnabled || !('speechSynthesis' in window)) return;
      const cleanText = text.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '').replace(/[^\w\sàâäéèêëîïôöùûüç'.-]/gi, ' ').trim();
      if (!cleanText) return;

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'fr-FR';
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    };

    // Settings Modal UI
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsModal = document.getElementById('settingsModal');
    const closeSettingsBtn = document.getElementById('closeSettingsBtn');
    const ttsToggle = document.getElementById('ttsToggle');
    const voiceSelect = document.getElementById('voiceSelect');
    const micList = document.getElementById('micList');

    if (settingsBtn && settingsModal) {
      settingsBtn.addEventListener('click', () => {
        settingsModal.classList.add('active');
        populateVoices();
        populateMics();
      });

      closeSettingsBtn.addEventListener('click', () => settingsModal.classList.remove('active'));
      settingsModal.addEventListener('click', (e) => {
        if (e.target === settingsModal) settingsModal.classList.remove('active');
      });

      ttsToggle.addEventListener('change', (e) => {
        ttsEnabled = e.target.checked;
        if (!ttsEnabled) window.speechSynthesis.cancel();
      });

      voiceSelect.addEventListener('change', (e) => {
        const voices = window.speechSynthesis.getVoices();
        selectedVoice = voices.find(v => v.name === e.target.value) || null;
      });
    }

    function populateVoices() {
      if (!('speechSynthesis' in window)) return;
      let voices = window.speechSynthesis.getVoices();
      if (!voices.length) {
        window.speechSynthesis.onvoiceschanged = populateVoices;
        return;
      }

      let frVoices = voices.filter(v => v.lang.startsWith('fr'));
      if (!frVoices.length) frVoices = voices;

      voiceSelect.innerHTML = '';
      frVoices.forEach(voice => {
        const option = document.createElement('option');
        option.value = voice.name;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
      });

      if (!selectedVoice) {
        const female = frVoices.find(v => v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('hortense') || v.name.toLowerCase().includes('julie'));
        if (female) {
          selectedVoice = female;
          voiceSelect.value = female.name;
        } else {
          selectedVoice = frVoices[0];
        }
      } else {
        voiceSelect.value = selectedVoice.name;
      }
    }

    async function populateMics() {
      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        micList.innerHTML = '<li class="settings-list-item">Impossible de lister les micros.</li>';
        return;
      }
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        const devices = await navigator.mediaDevices.enumerateDevices();
        const mics = devices.filter(d => d.kind === 'audioinput');

        micList.innerHTML = '';
        if (mics.length === 0) {
          micList.innerHTML = '<li class="settings-list-item">Aucun microphone détecté.</li>';
          return;
        }

        mics.forEach((mic, index) => {
          const li = document.createElement('li');
          li.className = 'settings-list-item';
          const name = mic.label || `Microphone ${index + 1}`;
          li.textContent = name;
          if (mic.deviceId === 'default' || (index === 0 && !mics.some(m => m.deviceId === 'default'))) {
            li.classList.add('settings-list-item--default');
            li.textContent += ' (Actif)';
          }
          micList.appendChild(li);
        });
      } catch (err) {
        micList.innerHTML = `<li class="settings-list-item">Permission refusée ou erreur.</li>`;
      }
    }
  }

  // ── Scroll Reveal ──────────────────────────────
  function initReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  function tagRevealElements() {
    ['.feature-card', '.stat-card', '.about__grid', '.terminal', '.price-card'].forEach(sel => {
      document.querySelectorAll(sel).forEach((el, i) => {
        if (!el.classList.contains('reveal')) {
          el.classList.add('reveal');
          el.style.transitionDelay = `${i * 80}ms`;
        }
      });
    });
  }

  // ── Navigation ─────────────────────────────────
  function initNav() {
    const nav = document.getElementById('siteNav');
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');

    // Scroll state
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }, { passive: true });

    // Mobile toggle
    if (toggle && links) {
      toggle.addEventListener('click', () => {
        links.classList.toggle('open');
      });

      // Close on link click
      links.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => links.classList.remove('open'));
      });
    }

    // Active link tracking
    const navAnchors = links ? links.querySelectorAll('a[href^="#"]') : [];
    const sections = [];
    navAnchors.forEach(a => {
      const id = a.getAttribute('href').slice(1);
      const sec = document.getElementById(id);
      if (sec) sections.push({ el: sec, link: a });
    });

    function updateActive() {
      const scrollY = window.scrollY + window.innerHeight / 3;
      let active = sections[0]?.link;
      for (const s of sections) {
        if (s.el.offsetTop <= scrollY) active = s.link;
      }
      navAnchors.forEach(a => a.classList.remove('active'));
      if (active) active.classList.add('active');
    }

    window.addEventListener('scroll', updateActive, { passive: true });
    updateActive();
  }

  // ── Init ───────────────────────────────────────
  function init() {
    initParticles();
    initCursorGlow();
    initNav();
    renderModules();
    renderModes();
    tagRevealElements();
    initTerminal();
    initCounters();
    requestAnimationFrame(() => requestAnimationFrame(initReveal));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
