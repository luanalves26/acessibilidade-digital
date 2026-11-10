let currentFontSize = 18;
let hoverSpeechActive = false;
let recognition = null;
let isListening = false;

document.addEventListener('DOMContentLoaded', () => {
    loadPreferences();
    setupHoverSpeech();
    updateProgress();
    initSpeechRecognition();
});

function scrollToSection(id) {
    const target = document.getElementById(id);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        playFeedback();
    }
}

function initSpeechRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.lang = 'pt-BR';
        recognition.continuous = false;
        recognition.interimResults = true;

        recognition.onresult = (event) => {
            const transcript = Array.from(event.results)
                .map(result => result[0].transcript)
                .join('');
            
            const output = document.getElementById('dictation-output');
            if (output) output.textContent = transcript;
        };

        recognition.onend = () => {
            isListening = false;
            const btn = document.getElementById('btn-dictate');
            if (btn) btn.textContent = '🎤 Falar / Ditar';
        };

        recognition.onerror = () => {
            isListening = false;
            const btn = document.getElementById('btn-dictate');
            if (btn) btn.textContent = '🎤 Falar / Ditar';
        };
    }
}

function toggleDictation() {
    if (!recognition) {
        alert("O seu navegador não suporta o reconhecimento de voz.");
        return;
    }

    const btn = document.getElementById('btn-dictate');
    const output = document.getElementById('dictation-output');

    if (!isListening) {
        recognition.start();
        isListening = true;
        btn.textContent = '🛑 A escutar... (Fale agora)';
        output.textContent = 'A escutar...';
        playFeedback();
    } else {
        recognition.stop();
        isListening = false;
        btn.textContent = '🎤 Falar / Ditar';
        playFeedback();
    }
}

function adjustFontSize(delta) {
    currentFontSize += delta;
    if (currentFontSize < 14) currentFontSize = 14;
    if (currentFontSize > 30) currentFontSize = 30;
    
    document.documentElement.style.setProperty('--font-size', currentFontSize + 'px');
    savePreferences();
    playFeedback();
}

function toggleContrast() {
    document.body.classList.toggle('high-contrast');
    savePreferences();
    playFeedback();
}

function toggleBlueFilter() {
    document.body.classList.toggle('blue-filter');
    savePreferences();
    playFeedback();
}

function toggleDyslexicFont() {
    document.body.classList.toggle('dyslexic-font');
    savePreferences();
    playFeedback();
}

function toggleSimplified() {
    const extraElements = document.querySelectorAll('.extra-info');
    extraElements.forEach(element => {
        element.classList.toggle('simplified-hidden');
    });
    playFeedback();
}

function toggleHoverSpeech() {
    hoverSpeechActive = !hoverSpeechActive;
    const btn = document.getElementById('btn-hover-speech');
    btn.textContent = `🔊 Leitura por Hover: ${hoverSpeechActive ? 'ON' : 'OFF'}`;
    playFeedback();
}

function setupHoverSpeech() {
    const readableCards = document.querySelectorAll('.readable-content');
    readableCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (hoverSpeechActive) {
                speakText(card.innerText);
            }
        });
    });
}

function updateChecklist() {
    updateProgress();
    savePreferences();
    playFeedback();
}

function updateProgress() {
    const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
    const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
    
    // Cálculo proporcional: 6 caixas ativas equivalem a exatamente 100%
    const percentage = Math.round((checkedCount / checkboxes.length) * 100);
    
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    
    progressBar.style.width = percentage + '%';
    progressText.textContent = percentage === 100 ? '100% Concluído 🎉' : percentage + '% Concluído';
}

function resetAccessibility() {
    currentFontSize = 18;
    document.documentElement.style.setProperty('--font-size', '18px');
    document.body.classList.remove('high-contrast', 'blue-filter', 'dyslexic-font');
    
    const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
    checkboxes.forEach(cb => cb.checked = false);
    
    localStorage.clear();
    updateProgress();
    playFeedback();
}

function speakText(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'pt-BR';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    }
}

function playFeedback() {
    if (navigator.vibrate) {
        navigator.vibrate(40);
    }
}

function savePreferences() {
    const preferences = {
        fontSize: currentFontSize,
        highContrast: document.body.classList.contains('high-contrast'),
        blueFilter: document.body.classList.contains('blue-filter'),
        dyslexicFont: document.body.classList.contains('dyslexic-font'),
        checklist: Array.from(document.querySelectorAll('.checklist-item input')).map(cb => cb.checked)
    };
    localStorage.setItem('accessibilityPrefs', JSON.stringify(preferences));
}

function loadPreferences() {
    const saved = localStorage.getItem('accessibilityPrefs');
    if (saved) {
        const prefs = JSON.parse(saved);
        if (prefs.fontSize) {
            currentFontSize = prefs.fontSize;
            document.documentElement.style.setProperty('--font-size', currentFontSize + 'px');
        }
        if (prefs.highContrast) document.body.classList.add('high-contrast');
        if (prefs.blueFilter) document.body.classList.add('blue-filter');
        if (prefs.dyslexicFont) document.body.classList.add('dyslexic-font');
        
        if (prefs.checklist) {
            const checkboxes = document.querySelectorAll('.checklist-item input');
            prefs.checklist.forEach((checked, index) => {
                if (checkboxes[index]) checkboxes[index].checked = checked;
            });
        }
    }
}

document.addEventListener('keydown', (event) => {
    if (event.altKey && event.key === '1') {
        event.preventDefault();
        adjustFontSize(2);
    }
    if (event.altKey && event.key === '2') {
        event.preventDefault();
        adjustFontSize(-2);
    }
    if (event.altKey && (event.key === 'c' || event.key === 'C')) {
        event.preventDefault();
        toggleContrast();
    }
});

function handleFormSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('student-name').value;
    document.getElementById('form-status').textContent = `Obrigado, ${name}! Sua mensagem foi enviada.`;
    document.getElementById('feedback-form').reset();
    playFeedback();
}