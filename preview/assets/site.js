(function () {
  // Tabs
  document.querySelectorAll(".tabs").forEach(function (tabs) {
    var btns = tabs.querySelectorAll(".tab-list button");
    var panes = tabs.querySelectorAll(".tab-pane");
    btns.forEach(function (b, i) {
      b.addEventListener("click", function () {
        btns.forEach(function (x, j) { x.setAttribute("aria-selected", String(i === j)); });
        panes.forEach(function (p, j) { p.hidden = i !== j; });
      });
    });
  });

  // Mobile nav
  var menu = document.querySelector(".menu-btn");
  if (menu) menu.addEventListener("click", function () { document.body.classList.toggle("nav-open"); });

  // Scroll-spy for "On this page"
  var links = Array.prototype.slice.call(document.querySelectorAll(".toc a"));
  if (links.length) {
    var heads = links.map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); });
    var spy = function () {
      var y = window.scrollY + 100, idx = 0;
      heads.forEach(function (h, i) { if (h && h.offsetTop <= y) idx = i; });
      links.forEach(function (a, i) { a.classList.toggle("active", i === idx); });
    };
    window.addEventListener("scroll", spy, { passive: true });
    spy();
  }

  // Search
  var modal = document.querySelector(".search-modal");
  var input = modal.querySelector("input");
  var list = modal.querySelector(".search-results");
  var data = window.__SEARCH || [];
  var base = window.__BASE || "";
  function open() { modal.hidden = false; input.value = ""; render(""); input.focus(); }
  function close() { modal.hidden = true; }
  function esc(s) { return s.replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function render(q) {
    q = q.trim().toLowerCase();
    var hits = data
      .map(function (p) {
        if (!q) return { p: p, s: 1, snip: p.d };
        var t = p.t.toLowerCase().indexOf(q), x = p.x.toLowerCase().indexOf(q);
        if (t < 0 && x < 0) return null;
        var snip = x >= 0 ? "…" + p.x.slice(Math.max(0, x - 40), x + 80) + "…" : p.d;
        return { p: p, s: t >= 0 ? 2 : 1, snip: snip };
      })
      .filter(Boolean)
      .sort(function (a, b) { return b.s - a.s; });
    list.innerHTML = hits.length
      ? hits.map(function (h) { return '<li><a href="' + base + h.p.u + '"><div class="r-t">' + esc(h.p.t) + '</div><div class="r-s">' + esc(h.snip || "") + "</div></a></li>"; }).join("")
      : '<li class="empty">No results</li>';
  }
  document.querySelector(".search-btn").addEventListener("click", open);
  input.addEventListener("input", function () { render(input.value); });
  modal.addEventListener("click", function (e) { if (e.target === modal) close(); });
  document.addEventListener("keydown", function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); modal.hidden ? open() : close(); }
    if (e.key === "Escape") close();
    if (e.key === "Enter" && !modal.hidden) { var a = list.querySelector("a"); if (a) location.href = a.href; }
  });
})();
