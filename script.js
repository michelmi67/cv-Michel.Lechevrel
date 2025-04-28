// script.js

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('main section');
  const links = document.querySelectorAll('nav a');

  // Générer un offset X aléatoire entre +100px et +900px
  sections.forEach(sec => {
    const randX = Math.random() * 800 + 100; // entre 100px et 900px
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
