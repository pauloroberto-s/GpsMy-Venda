// script.js - comportamento interativo do site
document.addEventListener("DOMContentLoaded", () => {
  // Inicializa icons
  if (typeof feather !== "undefined") feather.replace();

  /* ===== Mobile Menu ===== */
  const menuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      const isHidden = mobileMenu.classList.toggle("hidden");
      // animação
      if (!isHidden) mobileMenu.classList.add("animate-slide-down");
      else mobileMenu.classList.remove("animate-slide-down");
      // troca ícone
      const icon = menuBtn.querySelector("i");
      if (icon) {
        icon.setAttribute("data-feather", isHidden ? "menu" : "x");
        if (typeof feather !== "undefined") feather.replace();
      }
      // accessibility
      mobileMenu.setAttribute("aria-hidden", String(isHidden));
    });

    // fechar ao clicar em link mobile
    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        mobileMenu.setAttribute("aria-hidden", "true");
        const icon = menuBtn.querySelector("i");
        if (icon) {
          icon.setAttribute("data-feather", "menu");
          if (typeof feather !== "undefined") feather.replace();
        }
      });
    });
  }

  /* ===== FAQ Accordion ===== */
  const faqQuestions = document.querySelectorAll(".faq-question");
  faqQuestions.forEach(question => {
    question.addEventListener("click", () => {
      const faqId = question.getAttribute("data-faq");
      const answer = document.querySelector(`[data-answer="${faqId}"]`);
      const icon = question.querySelector(".faq-icon") || question.querySelector("i");
      if (!answer) return;

      // Toggle max-height approach + aria
      const expanded = !answer.classList.contains("active");
      // close all others
      document.querySelectorAll(".faq-answer").forEach(a => {
        a.classList.remove("active");
      });
      document.querySelectorAll(".faq-icon").forEach(i => { i.classList.remove("rotate"); });

      if (expanded) {
        answer.classList.add("active");
        if (icon) icon.classList.add("rotate");
      } else {
        answer.classList.remove("active");
        if (icon) icon.classList.remove("rotate");
      }

      if (typeof feather !== "undefined") feather.replace();
    });
  });

  /* ===== Scroll animations (IntersectionObserver) ===== */
  const scrollers = document.querySelectorAll(".scroll-animate");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("scroll-animate-show");
          // optionally unobserve for perf
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });
    scrollers.forEach(el => observer.observe(el));
  } else {
    // fallback: reveal all
    scrollers.forEach(el => el.classList.add("scroll-animate-show"));
  }

  /* ===== Back to top button ===== */
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) backToTop.classList.remove("hidden");
      else backToTop.classList.add("hidden");
    });
    backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  /* ===== Formulário: validação simples + envio fake ===== */
  const form = document.getElementById("form-contato");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nome = (document.getElementById("nome") || {}).value || "";
      const telefone = (document.getElementById("telefone") || {}).value || "";
      const email = (document.getElementById("email") || {}).value || "";
      const mensagem = (document.getElementById("mensagem") || {}).value || "";

      if (!nome.trim() || !telefone.trim() || !email.trim() || !mensagem.trim()) {
        alert("⚠️ Por favor, preencha todos os campos antes de enviar.");
        return;
      }

      // Simulação de envio: aqui você integra com backend / EmailJS / Formspree etc.
      alert("✅ Mensagem enviada com sucesso! Entraremos em contato em breve.");
      form.reset();
    });
  }
});
