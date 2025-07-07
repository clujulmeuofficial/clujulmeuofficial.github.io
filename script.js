document.addEventListener("DOMContentLoaded", () => {
  // Ajustare responsive height
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        const yearEl = entry.target.querySelector(".year");
        const targetYear = parseInt(yearEl.dataset.year, 10);
        let current = 2000;

        const animate = () => {
          const diff = targetYear - current;
          if (diff > 0) {
            current += Math.ceil(diff / 12);
            if (current > targetYear) current = targetYear;
            yearEl.textContent = current;
            requestAnimationFrame(animate);
          } else {
            yearEl.textContent = targetYear;
          }
        };

        yearEl.textContent = current;
        animate();
      }
    });
  }, {
    threshold: 0.3
  });

  document.querySelectorAll(".year-block").forEach(block => observer.observe(block));

  // Optimizare pentru ecrane Retina
  if (window.devicePixelRatio > 1) {
    document.body.classList.add("high-dpi");
  }
});
