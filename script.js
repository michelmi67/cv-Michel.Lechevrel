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
        console.error('Erreur: Éléments essentiels (profile, header, main) non trouvés au chargement. La logique de déplacement d\'image sera désactivée.');
        // Continuer l'exécution pour la navigation si possible
    }


  // Stocker l'emplacement d'origine de l'image dans le header si elle existe
  const originalParent = profileImage ? profileImage.parentNode : null;
  // Stocker l'élément qui venait juste après l'image dans le header, pour pouvoir la remettre au bon endroit
  const originalNextSibling = profileImage ? profileImage.nextElementSibling : null;


  // Media Query pour détecter le mode portrait mobile
  const mobilePortraitMediaQuery = window.matchMedia('(max-width: 768px) and (orientation: portrait)');


  // --- Définition de la fonction pour gérer le changement de mode (déplacement image) ---
  // CETTE FONCTION EST DÉFINIE UNE SEULE FOIS ET CONTIENT LES LOGIQUES POUR LES DEUX ÉTATS (portrait/autre)
  function handleMobilePortraitChange(mq) {
    console.log('handleMobilePortraitChange appelée. Match:', mq.matches);

    // Vérifiez que les éléments critiques pour le déplacement existent avant de tenter de manipuler l'image
    if (!profileImage || !header || !mainElement || !originalParent) {
      // Les éléments n'ont pas été trouvés au chargement, la logique de déplacement est désactivée
      return;
    }


    if (mq.matches) { // <--- Début du bloc si la media query correspond (portrait mobile)
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
        try { // <--- Début du bloc try
            // Assurez-vous que le parent du header existe (c'est le body) et que mainElement existe
            if (header.parentNode && mainElement) {
                header.parentNode.insertBefore(profileImage, mainElement);
                console.log('Image déplacée hors header.');
            } else {
                 console.error('Erreur: Impossible de déplacer l\'image, parent du header ou mainElement manquant.');
            }
        } catch (e) { // <--- CORRECT: Ajoutez le bloc catch ici
          console.error('Erreur lors de l\'exécution de insertBefore pour déplacer l\'image :', e);
        } // <--- Fin du bloc catch

      }
      // Si l'image n'est PAS dans le header, elle est déjà déplacée (état correct pour ce mode), ne rien faire.

    } else { // <--- Début du bloc si la media query ne correspond PAS (pas portrait mobile)
      // On n'est PAS en mode portrait mobile
      console.log('Mode portrait mobile inactif.');

      // Si l'image a été déplacée hors du header par le script
      if (profileImage.parentNode !== originalParent) { // Si l'image est hors de son parent d'origine
        console.log('Image actuellement hors du header. Tentative de remise en place...');

        // Retirer les classes de style mobile
        profileImage.classList.remove('profile--mobile-portrait');
        mainElement.classList.remove('main--after-profile-mobile');

            // Logs pour vérifier le retrait des classes (laissez-les pour l'instant)
        console.log('profileImage.classList APRES REMOVE :', profileImage.classList);
        console.log('mainElement.classList APRES REMOVE :', mainElement.classList);


        // Remettre l'image à son emplacement d'origine dans le header
        try { // <--- Début du bloc try
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

                 else { // <-- CORRECT: Ouvre un bloc {
                 console.error('Erreur : originalParent non défini pour le retour.');
                } // <-- CORRECT: Ferme le bloc { else (originalParent)

    } catch (e) { // <--- CORRECT: Ajoutez le bloc catch ici
        console.error('Erreur lors de l\'exécution du retour de l\'image :', e);
    } // <--- Fin du bloc catch


      } // <-- CORRECT: Ferme le bloc { if (profileImage.parentNode !== originalParent)

    } // <-- CORRECT: Ferme le bloc { else pour if (mq.matches)
  }
  // --- Fin de la définition de la fonction handleMobilePortraitChange ---


  // --- Logique d'affichage des sections existante ---
  // (Cette partie gère le display: none/block des sections et la transformation aléatoire)

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
    sec.dataset.offsetX = randX; // Stocke le décalage sur l'élément
  });

  // Fonction pour afficher une section spécifique
  function showSection(id) {
    sections.forEach(sec => {
      // Masque toutes les sections sauf celle qui correspond à l'id cible
      sec.style.display = sec.id === id ? 'block' : 'none';

      // Applique la transformation seulement à la section visible
      if (sec.id === id) {
        // Récupère le décalage stocké, utilise 0 par défaut si non défini
        const offsetX = sec.dataset.offsetX || 0;
        // Applique la transformation (décalage horizontal aléatoire + décalage vertical fixe de -30px)
        sec.style.transform = `translateX(${offsetX}px) translateY(-30px)`;
      } else {
           // Optionnel: réinitialiser la transformation des sections cachées pour éviter des surprises futures
           // sec.style.transform = '';
       }
    });

    // Gère la classe 'active' sur les liens de navigation
    links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + id));
  }

  // --- Fin logique d'affichage des sections existante ---


  // Déclencher la fonction de gestion de l'image au chargement de la page
  // et écouter les changements de la media query par la suite
  console.log('Appel initial de handleMobilePortraitChange...');
  handleMobilePortraitChange(mobilePortraitMediaQuery);
  mobilePortraitMediaQuery.addListener(handleMobilePortraitChange); // Écoute les changements


  // Gérer l'affichage de la section initiale au chargement
  const initial = location.hash.substring(1) || 'accueil'; // Récupère l'id de l'ancre dans l'URL, sinon utilise 'accueil'
  showSection(initial); // Affiche la section initiale

  // Ajouter les écouteurs de clics sur les liens de navigation
  links.forEach(link => link.addEventListener('click', e => {
    e.preventDefault(); // Empêche le comportement par défaut du lien (saut direct)
    const id = link.getAttribute('href').slice(1); // Récupère l'id cible (#accueil -> accueil)
    showSection(id); // Affiche la section correspondante
    history.replaceState(null, '', '#' + id); // Met à jour l'URL sans recharger la page
  }));

});
