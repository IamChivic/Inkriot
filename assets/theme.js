// theme.js -- dark/light toggle + mobile menu.
// Runs on every page. Reads/writes localStorage so a visitor's theme choice
// is remembered on their next visit (this is a real static file served by
// GitHub Pages, so localStorage works normally here).
(function(){
  var root = document.documentElement;
  try {
    if (localStorage.getItem('inkriot-theme') === 'dark') {
      root.setAttribute('data-theme', 'dark');
    }
  } catch(e) { /* localStorage unavailable (e.g. private browsing) -- fall back to light */ }

  document.addEventListener('DOMContentLoaded', function(){
    var btn = document.getElementById('themeToggle');
    var sun = document.getElementById('toggleIconSun');
    var moon = document.getElementById('toggleIconMoon');

    function sync(){
      var isDark = root.getAttribute('data-theme') === 'dark';
      if (sun) sun.style.display = isDark ? 'none' : 'block';
      if (moon) moon.style.display = isDark ? 'block' : 'none';
    }
    sync();

    if (btn){
      btn.addEventListener('click', function(){
        var isDark = root.getAttribute('data-theme') === 'dark';
        if (isDark) { root.removeAttribute('data-theme'); }
        else { root.setAttribute('data-theme', 'dark'); }
        try { localStorage.setItem('inkriot-theme', isDark ? 'light' : 'dark'); } catch(e) {}
        sync();
      });
    }

    var hamburgerBtn = document.getElementById('hamburgerBtn');
    var mobileMenu = document.getElementById('mobileMenu');
    if (hamburgerBtn && mobileMenu){
      hamburgerBtn.addEventListener('click', function(){ mobileMenu.classList.toggle('hidden'); });
      mobileMenu.addEventListener('click', function(e){
        if (e.target.tagName === 'A') mobileMenu.classList.add('hidden');
      });
    }
  });
})();
