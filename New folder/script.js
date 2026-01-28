document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.experience-card');

  const showCards = () => {
    const triggerBottom = window.innerHeight * 0.85;
    cards.forEach(card => {
      const cardTop = card.getBoundingClientRect().top;
      if(cardTop < triggerBottom && !card.classList.contains('show')) {
        card.classList.add('show');
      }
    });
  }

  window.addEventListener('scroll', showCards);
  showCards(); // trigger on load
});


const toggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");

toggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});


// ui cards
const cards = document.querySelectorAll(".tilt-card");

cards.forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 15;
    const rotateY = (x - centerX) / 15;

    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
    `;

    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
    card.style.boxShadow = `
      ${-rotateY * 2}px ${rotateX * 2}px 30px rgba(0,255,255,0.35)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
    card.style.boxShadow = "0 20px 40px rgba(0,0,0,0.4)";
  });
});