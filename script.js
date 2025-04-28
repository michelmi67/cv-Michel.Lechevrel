// script.js

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('main section');
  const links = document.querySelectorAll('nav a');

  // Générer un offset X aléatoire très important pour chaque section
  sections.forEach(sec => {
    const randX = Math.random() * 500 - 250; // entre -250px et +250px // entre -400px et +400px // entre -700px et +700px // entre -250px et +250px
    sec.dataset.offsetX = randX;
  });

  function showSection(id) {
    sections.forEach(sec => {
      if (sec.id === id) {
        sec.style.display = 'block';
        // décalage horizontal et vertical plus marqués
        sec.style.transform = `translateX(${sec.dataset.offsetX}px) translateY(-30px)`;
      } else {
        sec.style.display = 'none';
      }
    });
    links.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + id);
    });
  }

  // Afficher la section initiale (hash ou accueil)
  const initial = location.hash.substring(1) || 'accueil';
  showSection(initial);

  // Gérer les clics
  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id = link.getAttribute('href').slice(1);
      showSection(id);
      history.replaceState(null, '', '#' + id);
    });
  });
});
