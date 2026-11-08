import { useEffect, useState } from 'react';

export interface Topic {
  title: string;
  deepDive: string;
}

export interface Part {
  title: string;
  topics: Topic[];
}

interface Props {
  parts: Part[];
  /** Key used to remember progress in this browser. */
  storageKey: string;
}

const id = (p: number, t: number) => `${p}.${t}`;

export default function Curriculum({ parts, storageKey }: Props) {
  const [done, setDone] = useState<Set<string>>(new Set());
  const [open, setOpen] = useState<number | null>(0);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) ?? '[]');
      if (Array.isArray(saved)) setDone(new Set(saved));
    } catch {}
  }, [storageKey]);

  const toggle = (key: string) => {
    setDone((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      try {
        localStorage.setItem(storageKey, JSON.stringify([...next]));
      } catch {}
      return next;
    });
  };

  const total = parts.reduce((n, p) => n + p.topics.length, 0);
  const pct = total ? Math.round((done.size / total) * 100) : 0;

  return (
    <div className="curriculum not-prose">
      <div className="cur-progress">
        <div className="cur-progress-label">
          <span>Your progress</span>
          <span>
            {done.size}/{total} topics · {pct}%
          </span>
        </div>
        <div className="cur-bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
          <div style={{ width: `${pct}%` }} />
        </div>
        {done.size > 0 && (
          <button type="button" className="cur-reset" onClick={() => { setDone(new Set()); try { localStorage.removeItem(storageKey); } catch {} }}>
            Reset
          </button>
        )}
      </div>

      <ol className="cur-parts">
        {parts.map((part, p) => {
          const partDone = part.topics.filter((_, t) => done.has(id(p, t))).length;
          const isOpen = open === p;
          return (
            <li key={part.title} className={`cur-part${isOpen ? ' open' : ''}`}>
              <button
                type="button"
                className="cur-head"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : p)}
              >
                <span className="cur-num">{p + 1}</span>
                <span className="cur-title">{part.title}</span>
                <span className="cur-count">
                  {partDone}/{part.topics.length}
                </span>
                <svg className="cur-chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              {isOpen && (
                <ul className="cur-topics">
                  {part.topics.map((topic, t) => {
                    const key = id(p, t);
                    return (
                      <li key={key}>
                        <label className={done.has(key) ? 'checked' : undefined}>
                          <input type="checkbox" checked={done.has(key)} onChange={() => toggle(key)} />
                          <span>
                            <strong>{topic.title}</strong>
                            <em>Deep dive · {topic.deepDive}</em>
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
