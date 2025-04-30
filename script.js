// script.js

document.addEventListener('DOMContentLoaded', () => {
  // Sélectionner les éléments pour le changement de section
  const sections = document.querySelectorAll('main section');
  const links = document.querySelectorAll('nav a');

  // Sélectionner les éléments pour le déplacement de l'image
  const profileImage = document.querySelector('.profile');
  const header = document.querySelector('.site-header');
  const mainElement = document.querySelector('main');

  // Vérification initiale que les éléments nécessaires à l'image sont trouvés au chargement
  if (!profileImage || !header || !mainElement) {
        console.error('Erreur: Éléments essentiels (profile, header, main) non trouvés au chargement.');
        // Continuer l'exécution pour la navigation si possible, mais la logique d'image ne fonctionnera pas
    }


  // Stocker l'emplacement d'origine de l'image dans le header si elle existe
  const originalParent = profileImage ? profileImage.parentNode : null;
  // Stocker l'élément qui venait juste après l'image dans le header, pour pouvoir la remettre au bon endroit
  const originalNextSibling = profileImage ? profileImage.nextElementSibling : null;


  // Media Query pour détecter le mode portrait mobile
  const mobilePortraitMediaQuery = window.matchMedia('(max-width: 768px) and (orientation: portrait)');


  // Fonction pour gérer le changement de mode (entrée/sortie du portrait mobile)
  function handleMobilePortraitChange(mq) {
    console.log('handleMobilePortraitChange appelée. Match:', mq.matches);

    // Vérifiez que les éléments critiques pour le déplacement existent avant de tenter de manipuler l'image
    if (!profileImage || !header || !mainElement || !originalParent) {
      // Les éléments n'ont pas été trouvés au chargement, la logique de déplacement est désactivée
      return;
    }


    if (mq.matches) {
      // On est en mode portrait mobile

      // Si l'image est actuellement dans le header (son emplacement d'origine)
      if (profileImage.parentNode === originalParent) { // Comparer avec l'originalParent stocké
        console.log('Mode portrait actif. Image dans header. Tentative de déplacement hors header...');

        // Ajouter les classes pour appliquer les styles mobiles spécifiques
        profileImage.classList.add('profile--mobile-portrait');
        mainElement.classList.add('main--after-profile-mobile');

        // Déplacer l'image hors du header, juste avant main dans le DOM
        try {
            // Assurez-vous que le parent du header existe (c'est le body) et que mainElement existe
            if (header.parentNode && mainElement) {
                header.parentNode.insertBefore(profileImage, mainElement);
                console.log('Image déplacée hors header.');
            } else {
                 console.error('Erreur: Impossible de déplacer l\'image, parent du header ou mainElement manquant.');
            }
        } catch (e) {
          console.error('Erreur lors de l\'exécution de insertBefore pour déplacer l\'image :', e);
        }

      }
      // Si l'image n'est PAS dans le header, elle est déjà déplacée (état correct pour ce mode), ne rien faire.

    } else {
      // On n'est PAS en mode portrait mobile

      // Si l'image a été déplacée hors du header par le script
      if (profileImage.parentNode !== originalParent) {
        console.log('Mode portrait inactif. Image hors header. Tentative de remise en place...');

        // Retirer les classes de style mobile
        profileImage.classList.remove('profile--mobile-portrait');
