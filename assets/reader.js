// reader.js -- chapter-jump dropdown + A-/A+ text size, used on chapter pages only.
// Text size is remembered per-visitor via localStorage, same as the theme.
(function(){
  var SIZES = ['1rem', '1.15rem', '1.3rem', '1.5rem', '1.7rem'];

  document.addEventListener('DOMContentLoaded', function(){
    var body = document.getElementById('readerBody');
    if (!body) return;

    var idx = 2;
    try {
      var saved = localStorage.getItem('inkriot-font-step');
      if (saved !== null) idx = Math.min(SIZES.length - 1, Math.max(0, parseInt(saved, 10)));
    } catch(e) {}
    body.style.fontSize = SIZES[idx];

    function persist(){ try { localStorage.setItem('inkriot-font-step', String(idx)); } catch(e) {} }

    var smaller = document.getElementById('fontSmaller');
    var larger = document.getElementById('fontLarger');
    if (smaller) smaller.addEventListener('click', function(){
      idx = Math.max(0, idx - 1); body.style.fontSize = SIZES[idx]; persist();
    });
    if (larger) larger.addEventListener('click', function(){
      idx = Math.min(SIZES.length - 1, idx + 1); body.style.fontSize = SIZES[idx]; persist();
    });

    var jump = document.getElementById('chapterJump');
    if (jump) jump.addEventListener('change', function(){
      window.location.href = jump.value;
    });
  });
})();
