'use strict';

/* ============================================================================
   BLOG ENGINE  —  you normally don't need to edit this file.
   It reads the posts from blog-posts.js, renders the cards, and opens a
   reader overlay (rendering the Markdown body) when a card is clicked.

   To change WHAT is written, edit assets/js/blog-posts.js instead.
   ============================================================================ */

(function () {

  const grid = document.querySelector("[data-blog-grid]");
  const posts = Array.isArray(window.BLOG_POSTS) ? window.BLOG_POSTS.slice() : [];
  if (!grid || !posts.length) return;

  // newest first
  posts.sort(function (a, b) {
    return String(b.date).localeCompare(String(a.date));
  });

  // "2026-06-01" -> "Jun 2026"
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function prettyDate(iso) {
    const parts = String(iso).split("-");
    if (parts.length < 2) return iso || "";
    const m = MONTHS[parseInt(parts[1], 10) - 1] || "";
    return (m + " " + parts[0]).trim();
  }

  // Minimal Markdown fallback if marked.js failed to load.
  function basicMarkdown(md) {
    const esc = md
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    return esc
      .split(/\n{2,}/)
      .map(function (block) { return "<p>" + block.replace(/\n/g, "<br>") + "</p>"; })
      .join("");
  }

  function renderMarkdown(md) {
    if (window.marked && typeof window.marked.parse === "function") {
      return window.marked.parse(md);
    }
    return basicMarkdown(md || "");
  }

  // ---- build the cards ----
  posts.forEach(function (post, index) {
    const li = document.createElement("li");
    li.className = "blog-card";
    li.setAttribute("data-blog-index", index);

    li.innerHTML =
      '<a href="#" class="blog-card-link">' +
        '<div class="blog-card-banner"><ion-icon name="' + (post.icon || "document-text-outline") + '"></ion-icon></div>' +
        '<div class="blog-card-content">' +
          '<div class="blog-meta">' +
            '<span class="chip">' + (post.tag || "Notes") + '</span>' +
            '<time datetime="' + (post.date || "") + '">' + prettyDate(post.date) + '</time>' +
          '</div>' +
          '<h3 class="h3 blog-card-title">' + (post.title || "Untitled") + '</h3>' +
          '<p class="blog-card-text">' + (post.excerpt || "") + '</p>' +
          '<span class="blog-readmore">Read more <ion-icon name="arrow-forward-outline"></ion-icon></span>' +
        '</div>' +
      '</a>';

    li.querySelector(".blog-card-link").addEventListener("click", function (e) {
      e.preventDefault();
      openReader(post);
    });

    grid.appendChild(li);
  });

  // ---- reader overlay ----
  const reader = document.querySelector("[data-blog-reader]");
  if (!reader) return;

  const rBanner = reader.querySelector("[data-reader-banner]");
  const rTag = reader.querySelector("[data-reader-tag]");
  const rDate = reader.querySelector("[data-reader-date]");
  const rTitle = reader.querySelector("[data-reader-title]");
  const rContent = reader.querySelector("[data-reader-content]");
  const closeEls = reader.querySelectorAll("[data-reader-close]");

  function openReader(post) {
    if (rBanner) rBanner.innerHTML = '<ion-icon name="' + (post.icon || "document-text-outline") + '"></ion-icon>';
    if (rTag) rTag.textContent = post.tag || "Notes";
    if (rDate) {
      rDate.textContent = prettyDate(post.date);
      rDate.setAttribute("datetime", post.date || "");
    }
    if (rTitle) rTitle.textContent = post.title || "Untitled";
    if (rContent) rContent.innerHTML = renderMarkdown(post.body || "");
    reader.classList.add("active");
    document.body.style.overflow = "hidden";
    const panel = reader.querySelector(".blog-reader-panel");
    if (panel) panel.scrollTop = 0;
  }

  function closeReader() {
    reader.classList.remove("active");
    document.body.style.overflow = "";
  }

  closeEls.forEach(function (el) { el.addEventListener("click", closeReader); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && reader.classList.contains("active")) closeReader();
  });

})();
