/* pierredopa.com — mode « chaos » (dessin libre sur canvas) + année footer
   Issu du design handoff, adapté pour le repo.
   Chargé uniquement sur la page d'accueil. */
(function () {
  // Année dans le footer
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // ---------- Canvas de gribouillage ----------
  var canvas = document.getElementById("chaosCanvas");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");
  var dpr = Math.max(1, window.devicePixelRatio || 1);
  var color = "#FE8A8A";
  var chaos = false;
  var drawing = false;
  var last = null;
  var strokes = []; // [{color, size, pts:[{x,y}]}] en coordonnées document

  function sizeCanvas() {
    var w = document.documentElement.scrollWidth;
    var h = Math.max(document.documentElement.scrollHeight, window.innerHeight);
    canvas.style.width  = w + "px";
    canvas.style.height = h + "px";
    canvas.width  = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    redraw();
  }
  function redraw() {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineJoin = "round";
    ctx.lineCap  = "round";
    strokes.forEach(function (s) {
      if (s.pts.length < 2) return;
      ctx.strokeStyle = s.color;
      ctx.lineWidth   = s.size;
      ctx.beginPath();
      ctx.moveTo(s.pts[0].x, s.pts[0].y);
      for (var i = 1; i < s.pts.length; i++) ctx.lineTo(s.pts[i].x, s.pts[i].y);
      ctx.stroke();
    });
  }
  function pt(e) {
    var x  = e.touches ? e.touches[0].pageX : e.pageX;
    var yy = e.touches ? e.touches[0].pageY : e.pageY;
    return { x: x, y: yy };
  }
  function ignore(target) {
    return !!(target.closest && target.closest("#paintBoard, .nav, a, button, .switch, input, label"));
  }

  function start(e) {
    if (!chaos) return;
    if (ignore(e.target)) return;
    drawing = true;
    var p = pt(e);
    strokes.push({ color: color, size: 6, pts: [p] });
    last = p;
    e.preventDefault();
  }
  function move(e) {
    if (!chaos || !drawing) return;
    var p = pt(e);
    var s = strokes[strokes.length - 1];
    s.pts.push(p);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.strokeStyle = s.color;
    ctx.lineWidth   = s.size;
    ctx.lineJoin = ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(last.x, last.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    last = p;
    e.preventDefault();
  }
  function end() { drawing = false; }

  window.addEventListener("mousedown",  start);
  window.addEventListener("mousemove",  move);
  window.addEventListener("mouseup",    end);
  window.addEventListener("touchstart", start, { passive: false });
  window.addEventListener("touchmove",  move,  { passive: false });
  window.addEventListener("touchend",   end);

  // ---------- Toggle chaos ----------
  var toggle = document.getElementById("chaosToggle");
  if (toggle) {
    toggle.addEventListener("change", function () {
      chaos = toggle.checked;
      document.body.classList.toggle("chaos-on", chaos);
    });
  }

  // ---------- Palette ----------
  var dots = document.querySelectorAll("#paintBoard button");
  function setActive(btn) {
    dots.forEach(function (d) { d.classList.remove("active"); d.style.color = "transparent"; });
    btn.classList.add("active");
    btn.style.color = btn.dataset.color;
  }
  dots.forEach(function (btn) {
    btn.addEventListener("click", function () {
      color = btn.dataset.color;
      setActive(btn);
      if (!chaos && toggle) { toggle.checked = true; chaos = true; document.body.classList.add("chaos-on"); }
    });
  });
  if (dots.length) setActive(dots[0]);

  // ---------- Dimensionnement ----------
  window.addEventListener("resize", sizeCanvas);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(sizeCanvas);
  window.addEventListener("load", sizeCanvas);
  sizeCanvas();
  setTimeout(sizeCanvas, 600);
})();
