// script.js

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('main section');
  const links = document.querySelectorAll('nav a');
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const isLandscape = window.matchMedia('(orientation: landscape) and (max-width: 768px)').matches;

  sections.forEach(sec => {
    let randX = 0;
    if (!isMobile) {
      randX = Math.random() * 600 - 300; // -300 à +300
    } else if (isLandscape) {
      randX = Math.random() * 400 - 200; // -200 à +200
    }
    sec.dataset.offsetX = randX;
  });

  function showSection(id) {
    sections.forEach(sec => {
      sec.style.display = sec.id === id ? 'block' : 'none';
      if (sec.id === id) {
        sec.style.transform = `translateX(${sec.dataset.offsetX}px) translateY(-30px)`;
      }
    });
    links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + id));
  }

  const initial = location.hash.substring(1) || 'accueil';
  showSection(initial);
  links.forEach(link => link.addEventListener('click', e => {
    e.preventDefault();
    const id = link.getAttribute('href').slice(1);
    showSection(id);
    history.replaceState(null, '', '#' + id);
  }));
});
