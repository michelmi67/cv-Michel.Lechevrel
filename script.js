// script.js

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('main section');
  const links = document.querySelectorAll('nav a');

  // Générer un offset X en fonction de l'écran
  sections.forEach(sec => {
    let randX = 0;
    if (window.matchMedia('(orientation: portrait) and (max-width: 768px)').matches) {
      randX = 0;
    } else if (window.matchMedia('(orientation: landscape) and (max-width: 768px)').matches) {
      randX = Math.random() * 300 + 100; // 100px à 400px
    } else {
      randX = Math.random() * 500 + 100; // 100px à 600px
    }
    sec.dataset.offsetX = randX;
  });

  function showSection(id) {
    sections.forEach(sec => {
      if (sec.id === id) {
        sec.style.display = 'block';
        sec.style.transform = `translateX(${sec.dataset.offsetX}px) translateY(-30px)`;
      } else {
        sec.style.display = 'none';
      }
    });
    links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + id));
  }

  const initial = location.hash.substring(1) || 'accueil';
  showSection(initial);
  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id = link.getAttribute('href').slice(1);
      showSection(id);
      history.replaceState(null, '', '#' + id);
    });
  });
});
