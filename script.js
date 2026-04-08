// Dark mode
function toggleDark() {
  document.documentElement.classList.toggle('dark');
}

// Cursor effect
const cursor = document.getElementById('cursor');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');

function revealOnScroll() {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    }
  });
}

reveals.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(50px)';
  el.style.transition = 'all 0.8s ease';
});

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// GSAP animation
gsap.from("h1", { opacity: 0, y: 50, duration: 1 });
gsap.from("p", { opacity: 0, delay: 0.5, duration: 1 });
