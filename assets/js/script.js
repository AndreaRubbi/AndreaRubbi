'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
if (modalCloseBtn && overlay) {
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  overlay.addEventListener("click", testimonialsModalFunc);
}



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    const target = this.innerHTML.toLowerCase();

    for (let j = 0; j < pages.length; j++) {
      pages[j].classList.toggle("active", pages[j].dataset.page === target);
    }

    for (let k = 0; k < navigationLinks.length; k++) {
      navigationLinks[k].classList.toggle("active", navigationLinks[k] === this);
    }

    window.scrollTo(0, 0);

  });
}



/*-----------------------------------*\
  #DYNAMIC ENHANCEMENTS
\*-----------------------------------*/

// respect reduced-motion
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;


// typewriter role rotator
(function () {
  const rotator = document.querySelector("[data-role-rotator]");
  if (!rotator) return;

  /* ============================================================
     EDIT ME: the phrases that type out under your name.
     Add, remove or reorder lines freely. The first one shows
     for visitors who prefer reduced motion.
     ============================================================ */
  const roles = [
    "PhD Researcher",
    "Generative AI",
    "Active Discovery",
    "Molecular Modelling",
  ];

  if (prefersReducedMotion) {
    rotator.textContent = roles[0];
    return;
  }

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const tick = function () {
    const word = roles[roleIndex];
    rotator.textContent = word.substring(0, charIndex);

    if (!deleting) {
      if (charIndex < word.length) {
        charIndex++;
        setTimeout(tick, 70);
      } else {
        deleting = true;
        setTimeout(tick, 1600);
      }
    } else {
      if (charIndex > 0) {
        charIndex--;
        setTimeout(tick, 35);
      } else {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(tick, 350);
      }
    }
  };

  tick();
})();


// scroll reveal + animated skill bars on page switch
(function () {
  const revealArticle = function (article) {
    if (!article || prefersReducedMotion) return;
    const blocks = article.querySelectorAll(":scope > header, :scope > section");
    blocks.forEach(function (el, i) {
      el.classList.remove("reveal-in");
      el.classList.add("reveal-init");
      void el.offsetWidth; // force reflow so the transition runs
      el.style.transitionDelay = (i * 80) + "ms";
      el.classList.add("reveal-in");
    });
  };

  const animateSkills = function (article) {
    if (!article) return;
    const fills = article.querySelectorAll(".skill-progress-fill");
    fills.forEach(function (fill) {
      const target = fill.dataset.width || fill.style.width;
      if (!target) return;
      fill.dataset.width = target;
      if (prefersReducedMotion) { fill.style.width = target; return; }
      fill.style.width = "0";
      void fill.offsetWidth;
      fill.style.width = target;
    });
  };

  // initial active page
  const initial = document.querySelector("article.active");
  revealArticle(initial);
  animateSkills(initial);

  // on every nav click, re-run for the newly active page
  document.querySelectorAll("[data-nav-link]").forEach(function (link) {
    link.addEventListener("click", function () {
      const active = document.querySelector("article.active");
      revealArticle(active);
      animateSkills(active);
    });
  });
})();


// resume experience category filter
(function () {
  const filterWrap = document.querySelector("[data-exp-filters]");
  const list = document.querySelector("[data-exp-list]");
  if (!filterWrap || !list) return;

  const buttons = filterWrap.querySelectorAll(".filter-chip");
  const items = list.querySelectorAll(".timeline-item");

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const filter = btn.dataset.filter;

      buttons.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");

      let shown = 0;
      items.forEach(function (item) {
        const cats = (item.dataset.cat || "").split(/\s+/);
        const match = filter === "all" || cats.indexOf(filter) !== -1;

        item.classList.toggle("is-hidden", !match);

        if (match && !prefersReducedMotion) {
          item.classList.remove("filter-in");
          void item.offsetWidth; // restart animation
          item.style.animationDelay = (shown * 60) + "ms";
          item.classList.add("filter-in");
        }
        if (match) shown++;
      });
    });
  });
})();




// photo gallery lightbox
const galleryItems = document.querySelectorAll("[data-gallery-item]");
const lightbox = document.querySelector("[data-lightbox]");

if (lightbox && galleryItems.length) {

  const lightboxImg = lightbox.querySelector("[data-lightbox-img]");
  const lightboxCloseEls = lightbox.querySelectorAll("[data-lightbox-close]");
  const lightboxPrev = lightbox.querySelector("[data-lightbox-prev]");
  const lightboxNext = lightbox.querySelector("[data-lightbox-next]");
  const lightboxType = lightbox.querySelector("[data-lightbox-type]");
  const lightboxDate = lightbox.querySelector("[data-lightbox-date]");
  const lightboxTitle = lightbox.querySelector("[data-lightbox-title]");
  const lightboxNote = lightbox.querySelector("[data-lightbox-note]");

  const galleryData = Array.from(galleryItems).map(function (item) {
    return {
      src: item.querySelector("img").getAttribute("src"),
      type: item.dataset.type || "",
      date: item.dataset.date || "",
      loc: item.dataset.loc || "",
      title: item.dataset.title || "",
      note: item.dataset.note || ""
    };
  });

  let currentIndex = 0;

  const showImage = function (index) {
    currentIndex = (index + galleryData.length) % galleryData.length;
    const photo = galleryData[currentIndex];
    lightboxImg.setAttribute("src", photo.src);
    lightboxImg.setAttribute("alt", (photo.type ? photo.type + " photograph" : "Photograph") + " by Andrea Rubbi" + (photo.date ? " — " + photo.date : ""));
    if (lightboxType) lightboxType.textContent = photo.type;
    if (lightboxDate) lightboxDate.textContent = [photo.loc, photo.date].filter(Boolean).join(" · ");
    if (lightboxTitle) lightboxTitle.textContent = photo.title;
    if (lightboxNote) lightboxNote.textContent = photo.note;
  };

  const openLightbox = function (index) {
    showImage(index);
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = function () {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  };

  galleryItems.forEach(function (item, index) {
    item.addEventListener("click", function () { openLightbox(index); });
  });

  lightboxCloseEls.forEach(function (el) {
    el.addEventListener("click", closeLightbox);
  });

  lightboxPrev.addEventListener("click", function () { showImage(currentIndex - 1); });
  lightboxNext.addEventListener("click", function () { showImage(currentIndex + 1); });

  document.addEventListener("keydown", function (event) {
    if (!lightbox.classList.contains("active")) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") showImage(currentIndex - 1);
    if (event.key === "ArrowRight") showImage(currentIndex + 1);
  });

}


// inject metadata captions onto the archive grid items
(function () {
  const gridItems = document.querySelectorAll(".gallery-list [data-gallery-item]");
  gridItems.forEach(function (item) {
    const figure = item.querySelector(".gallery-img");
    if (!figure || figure.querySelector(".gallery-caption")) return;
    const type = item.dataset.type || "";
    const date = item.dataset.date || "";
    if (!type && !date) return;
    const cap = document.createElement("figcaption");
    cap.className = "gallery-caption";
    if (type) {
      const t = document.createElement("span");
      t.className = "gallery-cap-type";
      t.textContent = type;
      cap.appendChild(t);
    }
    if (date) {
      const d = document.createElement("span");
      d.className = "gallery-cap-date";
      d.textContent = date;
      cap.appendChild(d);
    }
    figure.appendChild(cap);
  });
})();


// scroll-reveal for featured photographs
(function () {
  const reveals = document.querySelectorAll("[data-reveal]");
  if (!reveals.length) return;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });

  reveals.forEach(function (el) { observer.observe(el); });
})();


/**
 * PROJECT TAGS
 * Builds the little tag chips on each project card from its `data-tags`
 * attribute in index.html. To change a card's tags, just edit the
 * comma-separated `data-tags="…"` value on that .project-card — no JS needed.
 */
(function () {
  const cards = document.querySelectorAll(".project-card[data-tags]");
  cards.forEach(function (card) {
    const list = card.querySelector(".project-tags");
    if (!list) return;
    const tags = card.getAttribute("data-tags").split(",");
    tags.forEach(function (tag) {
      const label = tag.trim();
      if (!label) return;
      const li = document.createElement("li");
      li.className = "chip";
      li.textContent = label;
      list.appendChild(li);
    });
  });
})();