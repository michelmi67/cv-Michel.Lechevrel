// script.js

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('main section');
  const links = document.querySelectorAll('nav a');

  // Définition des conditions
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const isLandscapeMobile = window.matchMedia('(orientation: landscape) and (max-width: 768px)').matches;

  // Générer un offset X en fonction du format écran
  sections.forEach(sec => {
    let randX = 0;
    if (!isMobile) {
      // Desktop / tablette : -200 à +600 px
      randX = Math.random() * 800 - 200;
    } else if (isLandscapeMobile) {
      // Mobile paysage : -200 à +200 px
      randX = Math.random() * 400 - 200;
    }
    // Mobile portrait : randX reste à 0 (pas de décalage)
    sec.dataset.offsetX = randX;
  });

  function showSection(id) {
    sections.forEach(sec => {
      if (sec.id === id) {
        sec.style.display = 'block';
        const offsetX = sec.dataset.offsetX || 0;
        sec.style.transform = `translateX(${offsetX}px) translateY(-30px)`;
      } else {
        sec.style.display = 'none';
      }
    });
    links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + id));
  }

  // Initialisation
  const initial = location.hash.substring(1) || 'accueil';
  showSection(initial);

  // Gestion du menu
  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id = link.getAttribute('href').slice(1);
      showSection(id);
      history.replaceState(null, '', '#' + id);
    });
  });
});
