const translations = {
    en: {
        generalStats: "General Retrospective",
        personalStats: "Personal Retrospective",
        welcome: "Welcome to the 2024 Retrospective of the Friskies server!",
        login: "Login with Discord",
    },
    fr: {
        generalStats: "Rétrospective Générale",
        personalStats: "Rétrospective Personnelle",
        welcome: "Bienvenue dans la Rétrospective 2024 du serveur Friskies !",
        login: "Se connecter avec Discord",
    },
};

function switchLanguage(lang) {
    // Récup tous les éléments avec l'att data-translate
    const elements = document.querySelectorAll("[data-translate]");

    // Parcourir les éléments et mettre à jour leur contenu
    elements.forEach((element) => {
        const key = element.getAttribute("data-translate");
        element.textContent = translations[lang][key];
    });

    console.log(`Language switched to ${lang}`);
}

