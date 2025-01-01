const translations = {
    en: {
        generalStats: "General Retrospective",
        personalStats: "Personal Retrospective",
        welcome: "Welcome to the 2024 Retrospective of the Friskies server!",
        login: "Login with Discord",
        wrapped: "2024 is almost over. What better way to end the year than by reviewing the server?",
        tradInfo: "Only text channels accessible to everyone, and not dedicated to commands (e.g., bots), have been included in the general statistics.",
        tradInfoBis: "The data was recorded from January 1 2024, to December 8 2024, inclusive. Voice data could only be collected from November 8 to December 8.",
        msgTotal1: "This year, you have been real chatterboxes",
        msgTotal2: "Altogether, you have sent",
        msgTotal3:"But in which channels did you find the time to chat ?",
    },
    fr: {
        generalStats: "Rétrospective Générale",
        personalStats: "Rétrospective Personnelle",
        welcome: "Bienvenue dans la Rétrospective 2024 du serveur Friskies !",
        login: "Se connecter à Discord",
        wrapped: "2024 touche bientôt à sa fin. Quel meilleur moyen de finir l'année qu'en faisant le bilan du serveur ?",
        tradInfo: "Seuls les salons textuels accessibles à tout le monde, et non dédiés aux commandes (ex : bots) ont été pris en compte dans les statistiques générales.",
        tradInfoBis: "Les données ont été enregistrées du 1er janvier 2024 au 8 décembre 2024 inclus. Les données vocales n'ont pu être collectées que du 8 novembre au 8 décembre.",
        msgTotal1: "Cette année, vous avez été de vraies pipelettes",
        msgTotal2: "À vous tous vous avez envoyé",
        msgTotal3:"Mais dans quels salons avez vous donc trouvé le temps de discuter ?",
    },
};

function switchLanguage(lang) {
    localStorage.setItem("language", lang);

    // trad les elem de la page
    const elements = document.querySelectorAll("[data-translate]");
    elements.forEach((element) => {
        const key = element.getAttribute("data-translate");
        element.textContent = translations[lang][key];
    });

    const languageButton = document.querySelector(".language-btn");
    if (lang === "en") {
        languageButton.textContent = "\ud83c\uddec\ud83c\udde7 English";
    } else if (lang === "fr") {
        languageButton.textContent = "\ud83c\uddeb\ud83c\uddf7 Français";
    }

    console.log(`Language switched to ${lang}`);
}

function applySavedLanguage() {
    const savedLanguage = localStorage.getItem("language") || "fr";
    switchLanguage(savedLanguage);
}

document.addEventListener("DOMContentLoaded", applySavedLanguage);

let currentSlide = 0;
const slidesWrapper = document.querySelector(".slides-wrapper");
const slides = document.querySelectorAll(".slide");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

function updateButtons() {
    // désac btn précédent si première slide
    if (currentSlide === 0) {
        prevButton.style.display = "none";
    } else {
        prevButton.style.display = "block";
    }

    // désac btn suivant si dernière slide
    if (currentSlide === slides.length - 1) {
        nextButton.style.display = "none";
    } else {
        nextButton.style.display = "block";
    }
}

function changeSlide(direction) {
    const totalSlides = slides.length;
    const newSlide = currentSlide + direction;

    // Vérifier que la nouvelle position est dans les limites
    if (newSlide >= 0 && newSlide < totalSlides) {
        currentSlide = newSlide;
        slidesWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateButtons();

        resetTextOpacity();
        showTextWithDelay();
    }
}

function resetTextOpacity() {
    slides.forEach(slide => {
        const textElements = slide.querySelectorAll(".stats-content > *");
        textElements.forEach(element => {
            element.style.opacity = 0;;
        });
    });
}

function showTextWithDelay() {
    const currentSlideElement = slides[currentSlide];
    const textElements = currentSlideElement.querySelectorAll(".stats-content > *");

    textElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.transition = "opacity 0.5s";
            element.style.opacity = 1;
        }, index * 2000); 
    });
}

updateButtons();

function addSlideEffect() {
    slidesWrapper.style.transition = "transform 1s ease-in-out";
}

addSlideEffect();

document.addEventListener("DOMContentLoaded", () => {
    resetTextOpacity();
    showTextWithDelay();
});

fetch('stats.json')
  .then(response => response.json())
  .then(data => {
    // Nombre total de messages
    document.getElementById("total-messages").textContent = `${data.generalStats.totalMessages}`;

    // Temps vocal des 30 derniers jours
    document.getElementById("voice-time").textContent = `${data.generalStats.voiceTimeLast30Days}`;

    // Top 5 salons textuels
    const topTextChannels = data.generalStats.topTextChannels.map(channel => 
        `<li>${channel.channel}: ${channel.messages} messages</li>`
    ).join('');
    document.getElementById("top-text-channels").innerHTML = topTextChannels;

    // Top 5 membres les plus actifs msg
    const topMessageMembers = data.generalStats.topMessageMembers.map(member => 
        `<li>${member.member || "Anonyme"}: ${member.messages} messages</li>`
    ).join('');
    document.getElementById("top-message-members").innerHTML = topMessageMembers;

    // Top 5 salons textuels
    const topVoiceChannelsLast30Days = data.generalStats.topVoiceChannelsLast30Days.map(channel => 
        `<li>${channel.channel}: ${channel.time} heures </li>`
    ).join('');
    document.getElementById("top-voice-channels").innerHTML = topVoiceChannelsLast30Days;

    // Top 5 membres les plus actifs vocal
    const topVoiceMembersLast30Days = data.generalStats.topVoiceMembersLast30Days.map(member => 
        `<li>${member.member || "Anonyme"}: ${member.time} heures </li>`
    ).join('');
    document.getElementById("top-voice-members").innerHTML = topVoiceMembersLast30Days;

  })
  .catch(error => {
    console.error('Erreur lors du chargement des statistiques:', error);
  });
