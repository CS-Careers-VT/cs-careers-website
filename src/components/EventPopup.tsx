import { useEffect, useRef, useState } from "react";

const EVENT_ID = "spring-career-kickoff-2026";
const DISMISSED_KEY = "cscareers:eventpop:dismissed";

function EventPopup() {
  const [hidden, setHidden] = useState(false);
  const [gone, setGone] = useState(false);
  const timerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      if (localStorage.getItem(DISMISSED_KEY) === EVENT_ID) {
        setGone(true);
      }
    } catch {
      // localStorage unavailable — leave popup visible
    }
  }, []);

  const dismiss = (remember: boolean) => {
    setHidden(true);
    setTimeout(() => setGone(true), 400);
    if (remember) {
      try {
        localStorage.setItem(DISMISSED_KEY, EVENT_ID);
      } catch {
        // ignore
      }
    }
  };

  if (gone) return null;

  return (
    <aside
      className={`eventpop${hidden ? " is-hidden" : ""}`}
      role="region"
      aria-label="Upcoming event"
      onMouseEnter={() => { if (timerRef.current) timerRef.current.style.animationPlayState = "paused"; }}
      onMouseLeave={() => { if (timerRef.current) timerRef.current.style.animationPlayState = "running"; }}
    >
      <div className="eventpop__border" aria-hidden="true"></div>
      <div className="eventpop__body">
        <div className="eventpop__head">
          <span className="eventpop__badge">
            <span className="eventpop__pulse" aria-hidden="true"></span>
            Next Event
          </span>
          <button className="eventpop__close" aria-label="Dismiss" onClick={() => dismiss(true)}>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <h3 className="eventpop__title">Spring Career Kickoff</h3>
        <ul className="eventpop__meta" role="list">
          <li>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M3 9h18M8 3v4M16 3v4" />
            </svg>
            April 22 &middot; 6:30 PM
          </li>
          <li>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M12 21s-7-6.5-7-12a7 7 0 1 1 14 0c0 5.5-7 12-7 12z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            Torgersen 1100
          </li>
        </ul>
        <a href="#" className="eventpop__cta">
          RSVP Now <span aria-hidden="true">→</span>
        </a>
        <div className="eventpop__timer" aria-hidden="true">
          <div
            ref={timerRef}
            className="eventpop__timer-fill"
            onAnimationEnd={(e) => {
              if (e.animationName === "timerShrink") dismiss(false);
            }}
          ></div>
        </div>
      </div>
    </aside>
  );
}

export default EventPopup;
