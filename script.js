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

      // Fonction pour gérer le changement de mode (entrée/sortie du portrait mobile)
  function handleMobilePortraitChange(mq) {
    console.log('handleMobilePortraitChange appelée. Match:', mq.matches);

    // Fonction pour gérer le changement de mode (entrée/sortie du portrait mobile)
  function handleMobilePortraitChange(mq) {
    console.log('handleMobilePortraitChange appelée. Match:', mq.matches);

    // Assurez-vous que les éléments critiques pour le déplacement existent avant de tenter de manipuler l'image
    if (!profileImage || !header || !mainElement || !originalParent) {
      console.error('Erreur: Éléments essentiels (profile, header, main) non trouvés au chargement.');
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

        // Logs pour vérifier l'ajout des classes (laissez-les pour l'instant)
        console.log('profileImage.classList APRES ADD :', profileImage.classList);
        console.log('mainElement.classList APRES ADD :', mainElement.classList);


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

    } else { // <--- Correct else pour le if (mq.matches)
      // On n'est PAS en mode portrait mobile
      console.log('Mode portrait mobile inactif.');

      // Si l'image a été déplacée hors du header par le script
      if (profileImage.parentNode !== originalParent) { // Si l'image est hors de son parent d'origine
        console.log('Image actuellement hors du header. Tentative de remise en place...');

        // Retirer les classes de style mobile
        profileImage.classList.remove('profile--mobile-portrait');
        mainElement.classList.remove('main--after-profile-mobile'); // <-- CORRECTION: mainElement ici

            // Logs pour vérifier le retrait des classes (laissez-les pour l'instant)
        console.log('profileImage.classList APRES REMOVE :', profileImage.classList);
        console.log('mainElement.classList APRES REMOVE :', mainElement.classList); // <-- CORRECTION: mainElement ici


        // Remettre l'image à son emplacement d'origine dans le header
        try {
                // Assurez-vous que originalParent existe avant d'essayer d'y insérer l'image
                if (originalParent) {
                    if (originalNextSibling) { // <-- CORRECT: Ouvre un bloc {
                        // Si l'image n'était pas le dernier enfant, on l'insère avant son frère d'origine
                        originalParent.insertBefore(profileImage, originalNextSibling);
                        console.log('Image remise dans header avant nextSibling.');
                        } else { // <-- CORRECT: Ouvre un bloc {
                        // Si l'image était le dernier enfant, on l'ajoute simplement à la fin
                        originalParent.appendChild(profileImage);
                        console.log('Image remise dans header (appendChild).');
                        } // <-- CORRECT: Ferme le bloc { else
                    console.log('Nouveau parent de profileImage JUSTE APRES RETOUR :', profileImage.parentNode); // Log après retour
                    } // <-- CORRECT: Ferme le bloc { if (originalNextSibling)

                } else { // <-- CORRECT: Ouvre un bloc {
                 console.error('Erreur : originalParent non défini pour le retour.');
                } // <-- CORRECT: Ferme le bloc { else (originalParent)


        } catch (e) {
          console.error('Erreur lors de l\'exécution du retour de l\'image :', e);
        }

      } // <-- CORRECT: Ferme le bloc { if (profileImage.parentNode !== originalParent)

    } // <-- CORRECT: Ferme le bloc { else pour if (mq.matches)
  }

  // --- Logique d'affichage des sections existante ---
  // ... (cette partie reste inchangée)

  // Calcul des offsets aléatoires au chargement
  sections.forEach(sec => {
    let randX = 0;
    const currentIsMobile = window.matchMedia('(max-width: 768px)').matches;
    const currentIsLandscape = window.matchMedia('(orientation: landscape) and (max-width: 768px)').matches;

    if (!currentIsMobile) {
      randX = Math.random() * 600 - 300;
    } else if (currentIsLandscape) {
      randX = Math.random() * 400 - 200;
    } else {
        randX = 0;
    }
    sec.dataset.offsetX = randX;
  });

  // Fonction pour afficher une section spécifique
  function showSection(id) {
    sections.forEach(sec => {
      sec.style.display = sec.id === id ? 'block' : 'none';
      if (sec.id === id) {
        const offsetX = sec.dataset.offsetX || 0;
        sec.style.transform = `translateX(${offsetX}px) translateY(-30px)`;
      } // else { sec.style.transform = ''; }
    });
    links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + id));
  }

  // --- Fin logique d'affichage des sections existante ---


  // Déclencher la fonction de gestion de l'image et écouter les changements de la media query
  console.log('Appel initial de handleMobilePortraitChange...');
  handleMobilePortraitChange(mobilePortraitMediaQuery);
  mobilePortraitMediaQuery.addListener(handleMobilePortraitChange);


  // Gérer l'affichage de la section initiale au chargement
  const initial = location.hash.substring(1) || 'accueil';
  showSection(initial);

  // Ajouter les écouteurs de clics sur les liens de navigation
  links.forEach(link => link.addEventListener('click', e => {
    e.preventDefault();
    const id = link.getAttribute('href').slice(1);
    showSection(id);
    history.replaceState(null, '', '#' + id);
  }));

});
