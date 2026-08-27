(function () {
  var cfg = window.LIGFLOW_CONFIG || {};
  var number = (cfg.whatsappNumber || "").replace(/\D/g, "");

  function waLink(message) {
    var base = "https://wa.me/" + number;
    return base + (message ? "?text=" + encodeURIComponent(message) : "");
  }

  document.querySelectorAll("[data-wa='teste']").forEach(function (el) {
    el.setAttribute("href", waLink(cfg.whatsappMessageTeste));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });

  document.querySelectorAll("[data-wa='geral']").forEach(function (el) {
    el.setAttribute("href", waLink(cfg.whatsappMessageGeral));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });

  // Mobile menu
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.querySelector(".mobile-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", menu.classList.contains("open") ? "true" : "false");
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { menu.classList.remove("open"); });
    });
  }

  // FAQ accordion
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var q = item.querySelector(".faq-q");
    var a = item.querySelector(".faq-a");
    q.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(function (other) {
        if (other !== item) {
          other.classList.remove("open");
          other.querySelector(".faq-a").style.maxHeight = null;
        }
      });
      if (isOpen) {
        item.classList.remove("open");
        a.style.maxHeight = null;
      } else {
        item.classList.add("open");
        a.style.maxHeight = a.scrollHeight + "px";
      }
    });
  });

  // Recording player waveform (decorative)
  var wave = document.getElementById("wave");
  if (wave) {
    var heights = [6, 14, 22, 10, 18, 26, 12, 20, 8, 16, 24, 14, 10, 20, 6, 18, 12, 22, 9, 15];
    heights.forEach(function (h) {
      var bar = document.createElement("span");
      bar.style.height = h + "px";
      wave.appendChild(bar);
    });
  }

  // Cookie consent banner
  (function () {
    var STORAGE_KEY = "ligflow_cookie_consent";
    var banner = document.getElementById("cookieBanner");
    if (!banner) return;

    var stored = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) {}

    if (!stored) {
      setTimeout(function () { banner.classList.add("show"); }, 50);
    }

    function setConsent(value) {
      try { localStorage.setItem(STORAGE_KEY, value); } catch (e) {}
      banner.classList.remove("show");
    }

    var acceptBtn = document.getElementById("cookieAccept");
    var declineBtn = document.getElementById("cookieDecline");
    if (acceptBtn) acceptBtn.addEventListener("click", function () { setConsent("accepted"); });
    if (declineBtn) declineBtn.addEventListener("click", function () { setConsent("declined"); });
  })();

  // Header shadow on scroll
  var header = document.querySelector(".site-header");
  if (header) {
    window.addEventListener("scroll", function () {
      header.style.boxShadow = window.scrollY > 8 ? "0 8px 24px rgba(0,0,0,.28)" : "none";
    });
  }
})();
