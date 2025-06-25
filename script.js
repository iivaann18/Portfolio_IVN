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
      const lang = li.dataset.lang;
      loadLang(lang);
      langBtn.innerHTML = li.innerHTML;
      langList.style.display = "none";
      // Cambia el atributo lang del <html>
      document.documentElement.lang = lang;
    });
  });
  document.addEventListener("click", e => {
    if (!langBtn.contains(e.target)) langList.style.display = "none";
  });
  // Carga idioma por defecto
  const defaultLang = "es";
  loadLang(defaultLang);
  langBtn.innerHTML = langList.querySelector(`[data-lang="${defaultLang}"]`).innerHTML;
  document.documentElement.lang = defaultLang;

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
    // Cambia todos los textos con data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (data[key]) el.textContent = data[key];
    });

    // Cambia textos estáticos fuera de data-i18n (proyectos, idiomas, etc)
    // Proyectos
    const proyectos = [
      {
        selector: ".card-proyecto:nth-child(1) h3",
        key: "project1Title"
      },
      {
        selector: ".card-proyecto:nth-child(1) p",
        key: "project1Desc"
      },
      {
        selector: ".card-proyecto:nth-child(2) h3",
        key: "project2Title"
      },
      {
        selector: ".card-proyecto:nth-child(2) p",
        key: "project2Desc"
      },
      {
        selector: ".card-proyecto:nth-child(3) h3",
        key: "project3Title"
      },
      {
        selector: ".card-proyecto:nth-child(3) p",
        key: "project3Desc"
      }
    ];
    proyectos.forEach(p => {
      const el = document.querySelector(p.selector);
      if (el && data[p.key]) el.textContent = data[p.key];
    });

    // Idiomas
    const idiomas = [
      {
        selector: "#idiomas .tecnologias-animadas li:nth-child(1) span:last-child",
        key: "langSpanish"
      },
      {
        selector: "#idiomas .tecnologias-animadas li:nth-child(2) span:last-child",
        key: "langEnglish"
      },
      {
        selector: "#idiomas .tecnologias-animadas li:nth-child(3) span:last-child",
        key: "langGerman"
      }
    ];
    idiomas.forEach(l => {
      const el = document.querySelector(l.selector);
      if (el && data[l.key]) el.innerHTML = data[l.key];
    });

    // Timeline estudios (incluye "Próximamente")
    const timeline = [
      {
        selector: ".timeline-item:nth-child(1) .timeline-date",
        key: "timeline1Date"
      },
      {
        selector: ".timeline-item:nth-child(1) h3",
        key: "timeline1Title"
      },
      {
        selector: ".timeline-item:nth-child(1) p",
        key: "timeline1Desc"
      },
      {
        selector: ".timeline-item:nth-child(2) .timeline-date",
        key: "timeline2Date"
      },
      {
        selector: ".timeline-item:nth-child(2) h3",
        key: "timeline2Title"
      },
      {
        selector: ".timeline-item:nth-child(2) p",
        key: "timeline2Desc"
      },
      {
        selector: ".timeline-item:nth-child(3) .timeline-date",
        key: "timeline3Date"
      },
      {
        selector: ".timeline-item:nth-child(3) h3",
        key: "timeline3Title"
      },
      {
        selector: ".timeline-item:nth-child(3) p",
        key: "timeline3Desc"
      }
    ];
    timeline.forEach(t => {
      const el = document.querySelector(t.selector);
      if (el && data[t.key]) el.textContent = data[t.key];
    });

    // Scrum/metodologías
    const scrum = [
      { selector: ".scrum-product div", key: "scrumProduct" },
      { selector: ".scrum-sprint div", key: "scrumSprint" },
      { selector: ".scrum-board div", key: "scrumBoard" },
      { selector: ".scrum-daily div", key: "scrumDaily" },
      { selector: ".scrum-increment div", key: "scrumIncrement" },
      { selector: ".scrum-desc span:last-child", key: "scrumDesc" }
    ];
    scrum.forEach(s => {
      const el = document.querySelector(s.selector);
      if (el && data[s.key]) el.innerHTML = data[s.key];
    });

    // Contacto descripción
    const contactoDesc = document.querySelector(".contacto-desc");
    if (contactoDesc && data.contactDesc) contactoDesc.textContent = data.contactDesc;

    // Footer
    const footerLove = document.querySelector("footer .footer-love, footer div[style*='font-size:1.05rem']");
    if (footerLove && data.footerLove) footerLove.innerHTML = data.footerLove;

    // Placeholder inputs contacto
    const inputNombre = document.querySelector("input[name='nombre']");
    const inputEmail = document.querySelector("input[name='email']");
    const inputMensaje = document.querySelector("textarea[name='mensaje']");
    if (inputNombre && data.inputNombre) inputNombre.placeholder = data.inputNombre;
    if (inputEmail && data.inputEmail) inputEmail.placeholder = data.inputEmail;
    if (inputMensaje && data.inputMensaje) inputMensaje.placeholder = data.inputMensaje;

    // Botón enviar
    const btnEnviar = document.querySelector("button[type='submit'].btn-minimal");
    if (btnEnviar && data.btnEnviar) btnEnviar.childNodes[1].textContent = data.btnEnviar;

    // Cambia el título de la página
    if (data.pageTitle) document.title = data.pageTitle;

  } catch (err) {
    console.error("No se pudo cargar el idioma:", err);
  }
}
