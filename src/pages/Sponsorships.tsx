function Sponsorships() {
    return (
        <>
            <section className="page-head">
                <span className="eyebrow"><span className="eyebrow__dot"></span>Partner with us</span>
                <h1 className="page-title">Sponsor <span className="grad">CS Careers.</span></h1>
                <p className="page-sub">
                    We're the largest student-led tech community at Virginia Tech, and we're
                    always looking for companies who want to meet our members. Sponsorship
                    tiers and packages coming soon.
                </p>
            </section>

            {/* TODO(intern): replace with real sponsorship tiers, past sponsors, and a contact form. */}
            <section className="page-cta">
                <div className="page-cta__card">
                    <h2>Interested in sponsoring an event?</h2>
                    <p>Reach out and we'll follow up with our sponsorship deck.</p>
                    <div className="hero__ctas">
                        <a className="btn btn--primary" href="mailto:cscareersvt@gmail.com">
                            Email Us <span aria-hidden="true">→</span>
                        </a>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Sponsorships;
