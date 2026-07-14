import "../styles/coffee-chat-concepts.css";

// TODO(intern): pick one of these concepts (or combine them) and build the real
// Coffee Chats request flow. This is a 4-option design deck — nothing is wired up yet.
// Delete this whole file's contents and replace with the real feature once built.

function CoffeeChats() {
    return (
        <div className="coffee-concepts">
            <div className="concepts-header">
                <h1>Coffee Chats · Design Concepts</h1>
                <p>4 layout options — nothing is live yet. Pick one (or mix) and build it for real.</p>
            </div>

            {/* CONCEPT 1 — text left · image right · button under image */}
            <div className="concept">
                <div className="concept-label">
                    <span className="dot"></span>
                    Option 1 &nbsp;·&nbsp; Text left · Image right · Button under image
                    <span className="tag">Your idea</span>
                </div>
                <div className="c1-card">
                    <div className="c1-text">
                        <span className="cc-eyebrow"><span className="cc-eyebrow__dot"></span>Coffee Chats</span>
                        <h2>Let's grab a<br /><span>coffee</span> together.</h2>
                        <p>
                            Have questions about recruiting, résumés, internships, or just
                            want to talk to someone who's been there? Our board members are
                            happy to chat — no agenda required.
                        </p>
                        <ul>
                            <li>30-minute casual conversations</li>
                            <li>Any topic — career, classes, or life</li>
                            <li>Open to all Virginia Tech students</li>
                        </ul>
                    </div>
                    <div className="c1-visual">
                        <div className="photo-placeholder">
                            <div style={{ textAlign: "center" }}>
                                <span>☕</span>
                                <p>Team photo or coffee image</p>
                            </div>
                        </div>
                        <div className="c1-btn-area">
                            <small>Takes ~2 min · We'll reach out within 48 hrs</small>
                            <a href="#" className="cc-btn cc-btn--primary">Request a Chat →</a>
                        </div>
                    </div>
                </div>
            </div>

            <hr className="divider" />

            {/* CONCEPT 2 — full-width warm centered section */}
            <div className="concept">
                <div className="concept-label">
                    <span className="dot"></span>
                    Option 2 &nbsp;·&nbsp; Full-width centered section with ambient glow
                </div>
                <div className="c2-section">
                    <span className="c2-icon">☕</span>
                    <h2>Want to talk to <span>a real person?</span></h2>
                    <p>
                        Our board members set aside time every week for coffee chats.
                        Whether you're a freshman figuring out where to start or a senior
                        prepping for final rounds — we've got 30 minutes for you.
                    </p>
                    <div className="c2-chips">
                        <span className="c2-chip">☑ Career advice</span>
                        <span className="c2-chip">☑ Resume review</span>
                        <span className="c2-chip">☑ Interview prep</span>
                        <span className="c2-chip">☑ Just to talk</span>
                    </div>
                    <div className="c2-btns">
                        <a href="#" className="cc-btn cc-btn--primary">Book a Coffee Chat →</a>
                        <a href="#" className="cc-btn cc-btn--ghost">Learn more</a>
                    </div>
                </div>
            </div>

            <hr className="divider" />

            {/* CONCEPT 3 — compact inline card (sits right after the team section) */}
            <div className="concept">
                <div className="concept-label">
                    <span className="dot"></span>
                    Option 3 &nbsp;·&nbsp; Compact card — sits directly below the team grid
                </div>
                <div className="c3-card">
                    <div className="c3-icon-wrap">☕</div>
                    <div className="c3-text">
                        <h3>Want to meet one of us?</h3>
                        <p>
                            Book a 30-minute coffee chat with a board member. Pick a topic,
                            fill out a quick form, and we'll be in touch within 48 hours.
                            Open to every VT student.
                        </p>
                    </div>
                    <div className="c3-right">
                        <a href="#" className="cc-btn cc-btn--primary">Request a Chat →</a>
                        <small>Free · 30 min · Any topic</small>
                    </div>
                </div>
            </div>

            <hr className="divider" />

            {/* CONCEPT 4 — sticky floating pill (simulated in-context) */}
            <div className="concept">
                <div className="concept-label">
                    <span className="dot"></span>
                    Option 4 &nbsp;·&nbsp; Sticky floating pill — follows you as you scroll
                </div>
                <div className="c4-demo">
                    <div className="c4-demo-bg"></div>
                    <div className="c4-page-content">
                        <h3>← Rest of the page content here</h3>
                        <p>
                            The floating pill lives in the bottom-right corner and stays visible
                            no matter where you are on the page — team section, mission, events.
                            It pulses gently to draw attention without being intrusive.
                        </p>
                    </div>
                    <div className="c4-pill-container">
                        <span className="c4-label">always visible ↓</span>
                        <div className="c4-pill">☕ Coffee Chat</div>
                    </div>
                    <div className="c4-pill-ring"></div>
                </div>
                <div className="c4-note">
                    💡 Option 4 works best <em>paired</em> with one of the other options — the pill gives persistent access while the section gives context and warmth. Used alone it can feel like a chat widget.
                </div>
            </div>
        </div>
    );
}

export default CoffeeChats;
