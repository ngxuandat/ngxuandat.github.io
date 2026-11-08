import { useEffect, useMemo, useRef, useState } from 'react';

export interface SearchItem {
  title: string;
  description: string;
  url: string;
  date: string;
  tags: string[];
  text: string;
}

function highlight(text: string, q: string) {
  if (!q) return text;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark>{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  );
}

function snippet(text: string, q: string) {
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (!q || i < 0) return '';
  const start = Math.max(0, i - 60);
  const end = Math.min(text.length, i + q.length + 100);
  return (start > 0 ? '…' : '') + text.slice(start, end) + (end < text.length ? '…' : '');
}

export default function Search({ items }: { items: SearchItem[] }) {
  const [query, setQuery] = useState('');
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const q = new URLSearchParams(location.search).get('q');
    if (q) setQuery(q);
    input.current?.focus();
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    const words = q.split(/\s+/);
    return items
      .map((item) => {
        const hay = `${item.title} ${item.description} ${item.tags.join(' ')} ${item.text}`.toLowerCase();
        if (!words.every((w) => hay.includes(w))) return null;
        const score = words.reduce(
          (s, w) => s + (item.title.toLowerCase().includes(w) ? 10 : 0) + (item.tags.some((t) => t.includes(w)) ? 5 : 0) + 1,
          0,
        );
        return { item, score };
      })
      .filter((r): r is { item: SearchItem; score: number } => r !== null)
      .sort((a, b) => b.score - a.score)
      .map((r) => r.item);
  }, [query, items]);

  const q = query.trim();

  return (
    <div className="search">
      <label className="visually-hidden" htmlFor="search-input">Search posts</label>
      <input
        id="search-input"
        ref={input}
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search posts, tags, ideas…"
        autoComplete="off"
      />
      <p className="search-count" aria-live="polite">
        {q ? `${results.length} result${results.length === 1 ? '' : 's'} for “${q}”` : `${items.length} posts`}
      </p>
      <ul className="search-results">
        {results.map((r) => (
          <li key={r.url}>
            <a href={r.url}>
              <span className="search-title">{highlight(r.title, q)}</span>
              <span className="search-meta">{r.date}{r.tags.length ? ` · ${r.tags.join(', ')}` : ''}</span>
              <span className="search-snippet">{highlight(snippet(r.text, q) || r.description, q)}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
