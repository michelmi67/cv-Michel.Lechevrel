// script.js

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('main section');
  const links = document.querySelectorAll('nav a');

  // Sélectionner les éléments pour le déplacement de l'image
  const profileImage = document.querySelector('.profile');
  const header = document.querySelector('.site-header');
  const mainElement = document.querySelector('main');

  // Vérification initiale que les éléments sont trouvés au chargement
  console.log('Elements trouvés au chargement :', { profileImage, header, mainElement });


  // Stocker l'emplacement d'origine de l'image dans le header
  const originalParent = profileImage ? profileImage.parentNode : null; // Vérifier si profileImage existe avant d'accéder à parentNode
  const originalNextSibling = profileImage ? profileImage.nextElementSibling : null; // Vérifier si profileImage existe


  // Media Query pour détecter le mode portrait mobile
  const mobilePortraitMediaQuery = window.matchMedia('(max-width: 768px) and (orientation: portrait)');


  // Fonction pour gérer le changement de mode (entrée/sortie du portrait mobile)
  function handleMobilePortraitChange(mq) {
    console.log('--- handleMobilePortraitChange appelée ---');
    console.log('Media Query (mq.matches) :', mq.matches);

    // Assurez-vous que les éléments critiques existent avant de continuer
    if (!profileImage || !header || !mainElement || !originalParent) {
      console.error('Erreur : Un ou plusieurs éléments nécessaires au déplacement ne sont pas trouvés.');
      return; // Arrêtez la fonction si les éléments ne sont pas là
    }


    if (mq.matches) {
      // On est en mode portrait mobile
      console.log('Mode portrait mobile actif.');
      console.log('Parent actuel de profileImage :', profileImage.parentNode);
      console.log('Header de référence :', header);


        if (profileImage.parentNode === header) {
        console.log('Condition : profileImage est bien un enfant direct de header. Tentative de déplacement...');

        // Ajouter les classes pour appliquer les styles mobiles spécifiques
        profileImage.classList.add('profile--mobile-portrait');
        mainElement.classList.add('main--after-profile-mobile');

        // AJOUTEZ CES DEUX NOUVELLES LIGNES :
        console.log('profileImage.classList APRES ADD :', profileImage.classList);
        console.log('mainElement.classList APRES ADD :', mainElement.classList);


        // Déplacer l'image hors du header, juste avant main dans le DOM
        try {
          header.parentNode.insertBefore(profileImage, mainElement);
          console.log('insertBefore exécuté. Vérifier l\'Inspecteur.');
          console.log('Nouveau parent de profileImage JUSTE APRES insertBefore :', profileImage.parentNode);
        } catch (e) {
          console.error('Erreur lors de l\'exécution de insertBefore :', e);
        }

      } else {
        console.log('Condition : profileImage N\'est PAS un enfant direct de header. Déplacement non nécessaire (ou déjà fait/dans un état inattendu).');
      }
        try {
          header.parentNode.insertBefore(profileImage, mainElement);
          console.log('insertBefore exécuté. Vérifier l\'Inspecteur.');
          console.log('Nouveau parent de profileImage JUSTE APRES insertBefore :', profileImage.parentNode); // AJOUTEZ CETTE LIGNE
        } catch (e) {
          console.error('Erreur lors de l\'exécution de insertBefore :', e);
        }


      } else {
        console.log('Condition : profileImage N\'est PAS un enfant direct de header. Déplacement non nécessaire (ou déjà fait/dans un état inattendu).');
      }

    } else {
      // On n'est PAS en mode portrait mobile
      console.log('Mode portrait mobile inactif.');

      if (profileImage.parentNode !== header) { // Si l'image a été déplacée hors du header par le script
        console.log('Image actuellement hors du header. Tentative de remise en place...');
        // Retirer les classes de style mobile
        profileImage.classList.remove('profile--mobile-portrait');
        mainElement.classList.remove('main--after-profile-mobile');

        // Remettre l'image à son emplacement d'origine dans le header
        try { // Ajout d'un try...catch
          if (originalNextSibling) {
            // Si l'image n'était pas le dernier enfant, on l'insère avant son frère d'origine
            originalParent.insertBefore(profileImage, originalNextSibling);
            console.log('insertBefore (retour) exécuté avec nextSibling. Vérifier l\'Inspecteur.');
          } else if (originalParent) { // Vérifier que originalParent existe
            // Si l'image était le dernier enfant (ou si originalNextSibling est null pour une autre raison), on l'ajoute à la fin
                originalParent.appendChild(profileImage);
                console.log('appendChild (retour) exécuté. Vérifier l\'Inspecteur.');
             } else {
                 console.error('Erreur : originalParent non défini pour le retour.');
             }
        } catch (e) {
          console.error('Erreur lors de l\'exécution du retour :', e);
        }

      } else {
        console.log('Image déjà dans le header.');
      }
    }
  }

  // --- Logique d'affichage des sections existante ---
  // (Cette partie n'a pas été modifiée ici, mais assurez-vous qu'elle est présente dans votre script.js)

  sections.forEach(sec => {
    let randX = 0;
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
      if (sec.id === id) {
        const offsetX = sec.dataset.offsetX || 0;
        sec.style.transform = `translateX(${offsetX}px) translateY(-30px)`;
      } // else { sec.style.transform = ''; } // Optionnel
    });
    links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + id));
  }
  // --- Fin logique d'affichage des sections existante ---


  // Déclencher la fonction au chargement de la page
  console.log('Appel initial de handleMobilePortraitChange...');
  handleMobilePortraitChange(mobilePortraitMediaQuery);

  // Écouter les changements de la media query
  mobilePortraitMediaQuery.addListener(handleMobilePortraitChange);

  // Écouteurs de clics sur les liens de navigation existants
  const initial = location.hash.substring(1) || 'accueil';
  showSection(initial);
  links.forEach(link => link.addEventListener('click', e => {
    e.preventDefault();
    const id = link.getAttribute('href').slice(1);
    showSection(id);
    history.replaceState(null, '', '#' + id);
  }));

  // Assurez-vous que les références sont correctes même après le déplacement si nécessaire (rarement un problème)
  // console.log('profileImage après setup initial:', profileImage);
});
