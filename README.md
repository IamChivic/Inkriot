# INKRIOT

A free web-novel site, in the neubrutalist reader-app style, ready for
GitHub Pages. No build tools, no Jekyll -- just HTML files you copy and edit.

## 1. Put this on GitHub

1. Create a new **public** repository on GitHub named exactly
   `yourusername.github.io` (swap in your real username). That exact name
   makes it your main site.
   - A different name works too -- your site just lives at
     `yourusername.github.io/reponame` instead.
2. Upload every file here to that repository, keeping the folder structure.
   Drag-and-drop into GitHub's web interface works -- no git required.
3. In the repo: **Settings -> Pages** -> Source: `Deploy from a branch` ->
   Branch: `main`, folder `/ (root)`.
4. Visit `https://yourusername.github.io` after a minute or two.

## 2. Structure

```
index.html            Homepage: hero, featured novel, latest chapters, genre grid
archive.html           Every novel, filterable by status and sortable
about.html             About the site
contact.html           Contact form (preview only -- wire up a form backend to send it)
add-a-novel.html       Step-by-step guide to adding a novel or chapter
privacy.html
terms.html
assets/
  style.css            All visual styling -- colors, borders, shadows live here
  theme.js             Dark/light toggle + mobile menu, remembers your choice
  filter.js            Genre filter (home) and status filter/sort (archive)
  reader.js            Chapter-jump dropdown + A-/A+ text size, remembers your choice
novels/
  _template/           Duplicate this to start a new novel -- see add-a-novel.html
  <novel-slug>/
    index.html         Cover, synopsis, chapter list
    chapter-1.html
    chapter-2.html
    ...
```

## 3. Adding content

See **add-a-novel.html** in the site itself (or open it locally) for the
full walkthrough on adding a new novel or a new chapter to an existing one.
Short version: duplicate a folder, edit the text, add a homepage card,
commit.

## 4. No database, on purpose

Every page here is static HTML. Reader-facing interactivity (dark mode,
genre filtering, chapter navigation, text size) is handled by the small
JavaScript files in `assets/`, which read `data-*` attributes already baked
into the HTML rather than a separate data source -- so there's never two
copies of your novel data to keep in sync.

The dark/light toggle and text-size buttons use `localStorage` to remember
each visitor's choice in their own browser. This only works once the site
is actually deployed (e.g. on GitHub Pages) or opened as a local file --
it will not persist inside a sandboxed preview panel.

**No comment section.** Static files can't store comments without a
separate backend. A service like [giscus](https://giscus.app) (backed by
GitHub Discussions, free) is a common way to add one later.

## 5. Customizing the look

Everything visual lives in `assets/style.css`:

- `--yellow` / `--red` / `--blue` -- the three accent colors used everywhere
- `--bg` / `--bg-alt` / `--surface` / `--text` -- light-mode colors (and their
  `html[data-theme="dark"]` counterparts, if you want to adjust dark mode too)
- `--border-width`, `--shadow-off` -- the neubrutalist border/shadow sizing

Book covers are flat CSS color blocks with a single big letter, not images --
so there's nothing to source or license. Swap any `.cover` block's
`background` for a `background-image: url(...)` if you'd rather use real
cover art later.
