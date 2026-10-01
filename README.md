# Hook Mastery

A hands-on React playground for practising and demonstrating core React hooks. The project is built with **React 19** and **Vite**, and implements a GitHub Repository Explorer that showcases several hooks working together in a real-world scenario.

---

## Features

- 🔍 **Search GitHub repositories** in real time via the GitHub Search API
- ⭐ **Filter results by minimum star count** with live `useMemo`-powered filtering
- 🌙 **Dark / Light theme toggle** powered by React Context
- 💾 **Persisted search query** — the last search term survives page reloads via `localStorage`
- 🔖 **Bookmark manager** for saving repositories using `useReducer` and `useRef`

---

## Hooks Demonstrated

| Hook | Where | Purpose |
|---|---|---|
| `useState` | `App.jsx`, `ThemeContext.jsx` | Local UI state (results, loading, minStars, theme) |
| `useEffect` | `App.jsx`, `useLocalStorage.js`, `useDebounce.js` | Side effects — API fetching, localStorage sync, debounce timers |
| `useContext` | `ThemeContext.jsx` / `App.jsx` | Propagate theme state without prop-drilling |
| `useMemo` | `App.jsx` | Memoised, filtered & sorted repository list |
| `useCallback` | `App.jsx` | Stable `handleStarAlert` reference to avoid unnecessary re-renders |
| `useReducer` | `BookmarkManager.jsx` | Complex bookmark list state (ADD / REMOVE actions) |
| `useRef` | `BookmarkManager.jsx` | Imperatively focus the quick-note input |

---

## Custom Hooks

### `useDebounce(value, delay?)`
> `src/hooks/useDebounce.js`

Delays propagating a value until the user has stopped changing it for `delay` milliseconds (default **500 ms**). Used in `RepoExplorer` with a 600 ms delay to avoid firing a GitHub API request on every keystroke.

```js
const debouncedQuery = useDebounce(query, 600);
```

### `useLocalStorage(key, initialValue)`
> `src/hooks/useLocalStorage.js`

A `useState`-compatible hook that reads from and writes to `localStorage` automatically. The search query is stored under the key `"last_search"` so it is restored on every page load.

```js
const [query, setQuery] = useLocalStorage('last_search', 'react');
```

---

## Project Structure

```
src/
├── App.jsx                  # RepoExplorer UI — wires all hooks together
├── App.css
├── index.css
├── main.jsx
├── context/
│   └── ThemeContext.jsx     # ThemeProvider + useTheme (useContext)
├── hooks/
│   ├── useDebounce.js       # Custom debounce hook
│   └── useLocalStorage.js   # Custom localStorage hook
└── components/
    └── BookmarkManager.jsx  # Bookmark list (useReducer + useRef)
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 18

### Install & Run

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173` by default.

### Other Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server with HMR |
| `npm run build` | Build the production bundle |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

---

## Tech Stack

- [React 19](https://react.dev/)
- [Vite 8](https://vite.dev/)
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) — using Oxc for fast transforms
- [GitHub Search API](https://docs.github.com/en/rest/search/search#search-repositories)
