// script.js

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('main section');
  const links = document.querySelectorAll('nav a');
  // const isMobile = window.matchMedia('(max-width: 768px)').matches; // Plus nécessaire ici

  // Sélectionner les éléments pour le déplacement de l'image
  const profileImage = document.querySelector('.profile');
  const header = document.querySelector('.site-header');
  const mainElement = document.querySelector('main');

  // Stocker l'emplacement d'origine de l'image dans le header
  const originalParent = profileImage.parentNode; // Devrait être le header
  const originalNextSibling = profileImage.nextElementSibling; // L'élément qui venait après l'image, peut être null

  // Media Query pour détecter le mode portrait mobile
  const mobilePortraitMediaQuery = window.matchMedia('(max-width: 768px) and (orientation: portrait)');

  // Fonction pour gérer le changement de mode (entrée/sortie du portrait mobile)
  function handleMobilePortraitChange(mq) {
    if (mq.matches) {
      // On est en mode portrait mobile
      if (profileImage.parentNode === header) { // Si l'image est toujours dans le header (son emplacement d'origine)
        // Ajouter les classes pour appliquer les styles mobiles spécifiques
        profileImage.classList.add('profile--mobile-portrait');
        mainElement.classList.add('main--after-profile-mobile');

        // Déplacer l'image hors du header, juste avant main dans le DOM
        // On l'insère avant l'élément main, qui est un frère du header
        header.parentNode.insertBefore(profileImage, mainElement);
      }
    } else {
      // On n'est PAS en mode portrait mobile
      if (profileImage.parentNode !== header) { // Si l'image a été déplacée hors du header par le script
        // Retirer les classes de style mobile
        profileImage.classList.remove('profile--mobile-portrait');
        mainElement.classList.remove('main--after-profile-mobile');

        // Remettre l'image à son emplacement d'origine dans le header
        if (originalNextSibling) {
          // Si l'image n'était pas le dernier enfant, on l'insère avant son frère d'origine
          originalParent.insertBefore(profileImage, originalNextSibling);
        } else {
          // Si l'image était le dernier enfant, on l'ajoute simplement à la fin
          originalParent.appendChild(profileImage);
        }
      }
    }
  }

  // --- Logique d'affichage des sections existante ---

  sections.forEach(sec => {
    // La logique de décalage aléatoire peut rester, elle s'appliquera au main section.
    // La variable isMobile doit être re-définie ou passée si elle est utilisée ici,
    // mais le code JS original ne l'utilise que pour le randX, qui peut être calculé ici.
    let randX = 0;
    // Recalculer isMobile et isLandscape si randX dépend de l'état mobile/landscape
    const currentIsMobile = window.matchMedia('(max-width: 768px)').matches;
    const currentIsLandscape = window.matchMedia('(orientation: landscape) and (max-width: 768px)').matches;

    if (!currentIsMobile) {
      randX = Math.random() * 600 - 300;
    } else if (currentIsLandscape) {
      randX = Math.random() * 400 - 200;
    }
    sec.dataset.offsetX = randX;
  });


  function showSection(id) {
    sections.forEach(sec => {
      sec.style.display = sec.id === id ? 'block' : 'none';
      // Applique la transformation seulement à la section visible
      if (sec.id === id) {
        // Assurez-vous que dataset.offsetX est bien défini (il l'est au chargement)
        const offsetX = sec.dataset.offsetX || 0; // Utilise 0 si non défini pour une raison X
        sec.style.transform = `translateX(${offsetX}px) translateY(-30px)`;
      } else {
            // Réinitialiser la transformation des sections masquées si nécessaire
            // sec.style.transform = ''; // Optionnel : réinitialiser la transform des sections cachées
        }
    });
    links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + id));
  }

  // --- Fin logique d'affichage des sections existante ---


  // Déclencher la fonction au chargement de la page
  handleMobilePortraitChange(mobilePortraitMediaQuery);

  // Écouter les changements de la media query
  mobilePortraitMediaQuery.addListener(handleMobilePortraitChange); // Utilise addListener pour la compatibilité

  // Écouteurs de clics sur les liens de navigation existants
  const initial = location.hash.substring(1) || 'accueil';
  showSection(initial); // Affiche la section initiale au chargement
  links.forEach(link => link.addEventListener('click', e => {
    e.preventDefault();
    const id = link.getAttribute('href').slice(1);
    showSection(id);
    history.replaceState(null, '', '#' + id);
  }));
});
