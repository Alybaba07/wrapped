const translations = {
    en: {
        generalStats: "General Retrospective",
        personalStats: "Personal Retrospective",
        welcome: "Welcome to the 2024 Retrospective of the Friskies server!",
        login: "Login with Discord",
        wrapped: "2024 is almost over. What better way to end the year than by reviewing the server?",
        tradInfo:"Only text channels accessible to everyone, and not dedicated to commands (e.g., bots), have been included in the general statistics.",
        tradInfoBis:"The data was recorded from January 1 2024, to December 8 2024, inclusive. Voice data could only be collected from November 8 to December 8."
    },
    fr: {
        generalStats: "Rétrospective Générale",
        personalStats: "Rétrospective Personnelle",
        welcome: "Bienvenue dans la Rétrospective 2024 du serveur Friskies !",
        login: "Se connecter avec Discord",
        wrapped: "2024 touche bientôt à sa fin. Quel meilleur moyen de finir l'année qu'en faisant le bilan du serveur ?",
        tradInfo:"Seuls les salons textuels accessibles à tout le monde, et non dédiés aux commandes (ex : bots) ont été pris en compte dans les statistiques générales.",
        tradInfoBis:"Les donnés ont été enregistrées du 1er janvier 2024 au 8 décembre 2024 inclus. Les données vocales n'ont pu être collectées que du 8 novembre au 8 décembre.",
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

// Animation avec GSAP (merci chatGPT mdr)
gsap.to(".flower", {
    rotation: 360,
    duration: 10,
    repeat: -1,  // Répète l'animation indéfiniment
    ease: "linear"  // Effet de rotation fluide
});

