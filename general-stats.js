const translations = {
    en: {
        generalStats: "General Retrospective",
        personalStats: "Personal Retrospective",
        welcome: "Welcome to the 2024 Retrospective of the Friskies server!",
    },
    fr: {
        generalStats: "Rétrospective Générale",
        personalStats: "Rétrospective Personnelle",
        welcome: "Bienvenue dans la Rétrospective 2024 du serveur Friskies !",
    },
};

// Fonction pour changer la langue
function switchLanguage(lang) {
    // Récupérer tous les éléments avec l'attribut data-translate
    const elements = document.querySelectorAll("[data-translate]");

    // Parcourir les éléments et mettre à jour leur contenu
    elements.forEach((element) => {
        const key = element.getAttribute("data-translate");
        element.textContent = translations[lang][key];
    });

    console.log(`Language switched to ${lang}`);
}

let currentSlide = 0;
const slidesWrapper = document.querySelector(".slides-wrapper");
const slides = document.querySelectorAll(".slide");

function changeSlide(direction) {
    const totalSlides = slides.length;
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    
    // Appliquer l'effet de transition
    slidesWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Fonction pour ajouter un effet à l'entrée ou sortie d'une diapositive
function addSlideEffect() {
    slidesWrapper.style.transition = "transform 1s ease-in-out";
}

addSlideEffect();

// Charger le fichier JSON
fetch('stats.json')
  .then(response => response.json())
  .then(data => {
    // Manipuler les données du fichier JSON ici
    document.getElementById("total-messages").textContent = `Messages Totaux : ${data.generalStats.totalMessages}`;
    document.getElementById("voice-time").textContent = `Temps vocal (14 derniers jours) : ${data.generalStats.voiceTimeLast14Days}`;

    // Top 5 salons textuels
    const topTextChannels = data.generalStats.topTextChannels.map(channel => 
        `<li>${channel.channel}: ${channel.messages} messages</li>`
    ).join('');
    document.getElementById("top-text-channels").innerHTML = topTextChannels;

    // Top 5 membres avec le plus de messages
    const topMessageMembers = data.generalStats.topMessageMembers.map(member => 
        `<li>${member.member}: ${member.messages} messages</li>`
    ).join('');
    document.getElementById("top-message-members").innerHTML = topMessageMembers;
  })
  .catch(error => {
    console.error('Erreur lors du chargement des statistiques:', error);
  });
