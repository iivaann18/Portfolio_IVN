document.addEventListener("DOMContentLoaded", () => {
  // Modo oscuro según preferencia
  const prefersDark = window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.body.classList.toggle("dark", prefersDark);

  const toggle = document.getElementById("toggle-dark");
  toggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    toggle.textContent = document.body.classList.contains("dark")
      ? "☀️" : "🌙";
  });

  // Selector de idioma
  const langBtn = document.getElementById("lang-btn");
  const langList = document.getElementById("lang-list");
  langBtn.addEventListener("click", e => {
    e.stopPropagation();
    langList.style.display =
      langList.style.display === "block" ? "none" : "block";
  });
  langList.querySelectorAll("li").forEach(li => {
    li.addEventListener("click", () => {
      loadLang(li.dataset.lang);
      langBtn.innerHTML = li.innerHTML;
      langList.style.display = "none";
    });
  });
  document.addEventListener("click", e => {
    if (!langBtn.contains(e.target)) langList.style.display = "none";
  });
  loadLang("es");
  langBtn.innerHTML = langList.querySelector('[data-lang="es"]').innerHTML;

  // Partículas moradas con tsParticles
  if (window.tsParticles) {
    window.tsParticles.load("particles-js", {
      fullScreen: { enable: false },
      particles: {
        number: { value: 80, density: { enable: true, area: 800 } },
        color: { value: ["#9b59b6", "#8e44ad", "#7f3a94"] },
        shape: { type: "circle" },
        opacity: { value: 0.6, random: true },
        size: { value: { min: 1, max: 3 } },
        links: {
          enable: true,
          distance: 100,
          color: "#8e44ad",
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 0.8,
          random: true,
          outModes: { default: "out" }
        }
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: "grab" },
          onClick: { enable: true, mode: "push" }
        },
        modes: {
          grab: { distance: 120, links: { opacity: 0.5 } },
          push: { quantity: 2 }
        }
      },
      detectRetina: true
    });
  }

  // Validación de formulario
  const form = document.getElementById("form-contacto");
  form.addEventListener("submit", e => {
    const nombre = form.nombre.value.trim();
    const email = form.email.value.trim();
    const mensaje = form.mensaje.value.trim();
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (nombre.length < 2) {
      alert("Por favor, escribe tu nombre (mínimo 2 caracteres).");
      e.preventDefault(); return;
    }
    if (!emailRegex.test(email)) {
      alert("Por favor, introduce un correo válido.");
      e.preventDefault(); return;
    }
    if (mensaje.length < 5) {
      alert("Por favor, escribe un mensaje más largo.");
      e.preventDefault(); return;
    }
  });

  // Scroll to top
  const scrollBtn = document.getElementById("scroll-top");
  window.addEventListener("scroll", () => {
    scrollBtn.classList.toggle("visible", window.scrollY > 200);
  });
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// Carga de idiomas desde JSON
async function loadLang(lang) {
  try {
    const res = await fetch(`lang/${lang}.json`);
    const data = await res.json();
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (data[key]) el.textContent = data[key];
    });
  } catch (err) {
    console.error("No se pudo cargar el idioma:", err);
  }
}
