import { useCallback, useEffect, useState, useMemo } from 'react';
import './App.css'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { useLocalStorage } from './hooks/useLocalStorage';
import { useDebounce } from './hooks/useDebounce';

function RepoExplorer() {
  const { isDark, toggleTheme } = useTheme();
  const [query, setQuery] = useLocalStorage('last_search', 'react');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [minStars, setMinStars] = useState(0);

  const debouncedQuery = useDebounce(query, 600);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      return;
    }

    const controller = new AbortController();
    setLoading(true);

    fetch(`https://api.github.com/search/repositories?q=${debouncedQuery}&per_page=10`, {
      signal: controller.signal
    })
      .then(res => res.json())
      .then(data => {
        setResults(data.items || []);
        setLoading(false);
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          console.error(err);
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [debouncedQuery]);

  const filteredRepos = useMemo(() => {
    return results
      .filter(repo => repo.stargazers_count >= minStars)
      .sort((a, b) => b.stargazers_count - a.stargazers_count);
  }, [results, minStars]);

  const handleStarAlert = useCallback((name, stars) => {
    alert(`Repo: ${name}\nStars: ${stars}`);
  }, []);

  return (
    <div style={{ maxWidth: '650px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ color: isDark ? 'white' : 'black' }}>Repo Explorer</h2>
        <button onClick={toggleTheme}>
          {isDark ? '☀️️ Light' : '🌙 Dark'} Mode
        </button>
      </header>

      <div style={{ margin: '15px 0' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search GitHub repositories..."
          style={{ width: '60%', padding: '8px' }}
        />
        <label style={{ marginLeft: '10px' }}>
          Min Stars: 
          <input
            type="number"
            value={minStars}
            onChange={(e) => setMinStars(Number(e.target.value))}
            style={{ width: '70px', marginLeft: '5px' }}
          />
        </label>
      </div>

      {loading && <p>Searching repositories...</p>}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredRepos.map(repo => (
          <li 
            key={repo.id} 
            style={{ 
              padding: '10px', 
              margin: '8px 0', 
              border: '1px solid #444', 
              borderRadius: '4px',
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <span>
              <strong>{repo.name}</strong> (⭐ {repo.stargazers_count})
            </span>
            <button onClick={() => handleStarAlert(repo.name, repo.stargazers_count)}>
              Details
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

function App() {
  return (
    <>
      <ThemeProvider>
        <RepoExplorer />
      </ThemeProvider>
    </>
  )
}

export default App
