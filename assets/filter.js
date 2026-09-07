// filter.js -- homepage genre filter + archive status filter/sort.
// Reads plain data-* attributes already baked into the static HTML;
// it never stores or duplicates the novel data itself.
(function(){
  document.addEventListener('DOMContentLoaded', function(){

    // ---- Genre filter (homepage) ----
    var rail = document.getElementById('genreRail');
    if (rail){
      var cards = document.querySelectorAll('#novelGrid .novel-card');
      var countEl = document.getElementById('resultCount');
      var emptyEl = document.getElementById('emptyState');
      function applyGenre(genre){
        var visible = 0;
        cards.forEach(function(card){
          var genres = (card.getAttribute('data-genres') || '').split(',');
          var show = genre === 'All' || genres.indexOf(genre) !== -1;
          card.classList.toggle('hidden-card', !show);
          if (show) visible++;
        });
        if (countEl) countEl.textContent = visible + (visible === 1 ? ' story' : ' stories');
        if (emptyEl) emptyEl.classList.toggle('hidden', visible !== 0);
      }
      rail.querySelectorAll('.chip').forEach(function(chip){
        chip.addEventListener('click', function(){
          rail.querySelectorAll('.chip').forEach(function(c){ c.classList.remove('active'); });
          chip.classList.add('active');
          applyGenre(chip.getAttribute('data-genre'));
        });
      });
    }

    // ---- Status filter + sort (archive) ----
    var statusRail = document.getElementById('statusFilters');
    if (statusRail){
      var rows = Array.prototype.slice.call(document.querySelectorAll('#archiveList .archive-row'));
      var list = document.getElementById('archiveList');
      var sortSelect = document.getElementById('sortSelect');

      function applyStatus(status){
        rows.forEach(function(row){
          var show = status === 'All' || row.getAttribute('data-status') === status;
          row.classList.toggle('hidden-card', !show);
        });
      }
      function applySort(mode){
        var sorted = rows.slice().sort(function(a, b){
          if (mode === 'rating') return parseFloat(b.getAttribute('data-rating')) - parseFloat(a.getAttribute('data-rating'));
          if (mode === 'title') return a.getAttribute('data-title').localeCompare(b.getAttribute('data-title'));
          return parseInt(a.getAttribute('data-days'), 10) - parseInt(b.getAttribute('data-days'), 10); // newest update first
        });
        sorted.forEach(function(row){ list.appendChild(row); });
      }
      statusRail.querySelectorAll('.toggle-pill').forEach(function(pill){
        pill.addEventListener('click', function(){
          statusRail.querySelectorAll('.toggle-pill').forEach(function(p){ p.classList.remove('on'); });
          pill.classList.add('on');
          applyStatus(pill.getAttribute('data-status'));
        });
      });
      if (sortSelect){
        sortSelect.addEventListener('change', function(){ applySort(sortSelect.value); });
        applySort(sortSelect.value);
      }
    }
  });
})();
