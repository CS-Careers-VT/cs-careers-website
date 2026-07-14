import ResumeWorkshopPhoto from "@assets/pics/events/ResumeWorkshop.jpg"
import RishiPhoto from "@assets/pics/events/RishiEvent.jpeg"
import AcademiaPhoto from "@assets/pics/events/AcademiaEvent.jpeg"
import StarterPackPhoto from "@assets/pics/events/StarterPackCSEvent.jpeg"
import AiPhoto from "@assets/pics/events/AIEvent4.jpg"
import SocialPhoto from "@assets/pics/events/SocialEvent.jpeg"
import WomensPhoto from "@assets/pics/events/WomensEvent.jpg"
import VTHacksPhoto from "@assets/pics/events/VTHacks Stuti.jpeg"
import Gobbler25 from "@assets/pics/events/gobblerfest_exec_25.png"
import Dress2Impress from "@assets/pics/events/dress2impress.png"
import CapTechPhoto from "@assets/pics/events/CapTechMixer.jpg"
import VisualizePhoto from "@assets/pics/events/visual.jpeg"
import FinTechEvent from "@assets/pics/events/AlumInsights.jpeg"

const events = [
    {
        title: 'Alumni Insights Mixer w/ FinTech Club',
        date: 'September 23rd, 2025',
        imageSrc: FinTechEvent,
        description: 'Learning more about opportunities in the fintech industry from VT alumni.'
    },
    {
        title: 'Visualize Your Semester',
        date: 'September 16th, 2025',
        imageSrc: VisualizePhoto,
        description: "Encouraging a creative and ambitious goal-setting environment to help students conquer the semester."
    },
    {
        title: 'CapTech Mixer',
        date: 'September 8th, 2025',
        imageSrc: CapTechPhoto,
        description: 'Learning more about CapTech\'s culture, opportunities, and exciting projects from their profesionals, including VT alumni.'
    },
    {
        title: 'Dress to Impress',
        date: 'September 3rd, 2025',
        imageSrc: Dress2Impress,
        description: 'Headshot, resume, and elevator pitch workshop designed to connect students with career center professionals in preparation for Virginia Tech\'s career fairs.'
    },
    {
        title: 'Gobblerfest',
        date: 'August 29th, 2025',
        imageSrc: Gobbler25,
        description: 'Connecting with new members at Gobblerfest, Virginia Tech\'s annual club fair!'
    },
    {
        title: 'CS Social',
        date: 'May 1st, 2025',
        imageSrc: SocialPhoto,
        description: 'Unwinding with peers before finals—games, food, and good vibes!'
    },
    {
        title: 'AI Perspectives',
        date: 'April 24th, 2025',
        imageSrc: AiPhoto,
        description: 'Exploring the evolving implications of AI with industry experts in healthcare, finance, automaking, and more.'
    },
    {
        title: 'Freshman CS Starter Pack',
        date: 'April 17th, 2025',
        imageSrc: StarterPackPhoto,
        description: 'A comprehensive guide for first-year CS majors covering internships, clubs, and course planning.'
    },
    {
        title: 'Women in CS w/ Lockheed Martin',
        date: 'April 10th, 2025',
        imageSrc: WomensPhoto,
        description: 'Celebrating and supporting women in tech with professionals from Lockheed Martin.'
    },
    {
        title: 'Careers in Academia',
        date: 'April 3rd, 2025',
        imageSrc: AcademiaPhoto,
        description: 'A candid panel discussion on what it\'s like to pursue a career in higher education.'
    },
    {
        title: 'Finding Your Career Path w/ Rishi Jaitly',
        date: 'March 3rd, 2025',
        imageSrc: RishiPhoto,
        description: 'A conversation with the ex-FAANG exec on navigating the tech industry with purpose.'
    },
    {
        title: 'Resume Review',
        date: 'February 9th, 2025',
        imageSrc: ResumeWorkshopPhoto,
        description: 'Providing valuable resume tips and feedback before CS Source.'
    },
    {
        title: 'HackViolet LinkedIn Workshop',
        date: 'February 2nd, 2025',
        imageSrc: VTHacksPhoto,
        description: 'Teaching how to optimize your LinkedIn profile and grow your professional presence online.'
    }
];

function parseDate(dateStr: string) {
    const clean = dateStr.replace(/(\d+)(st|nd|rd|th)/i, "$1");
    const d = new Date(clean);
    return {
        mo: d.toLocaleString("en-US", { month: "short" }).toUpperCase(),
        day: String(d.getDate()).padStart(2, "0"),
        full: `${d.toLocaleString("en-US", { month: "short" }).toUpperCase()} ${d.getDate()}`,
    };
}

const [featured, ...rest] = events;
const gridEvents = rest.slice(0, 6);
const pastEvents = rest.slice(6);

function Events() {
    return (
        <>
            {/* PAGE HEADER */}
            <section className="page-head">
                <span className="eyebrow"><span className="eyebrow__dot"></span>What's happening</span>
                <h1 className="page-title">Events that <span className="grad">move the needle.</span></h1>
                <p className="page-sub">
                    Company nights, mock interviews, coffee chats, project sprints —
                    30+ events a year, all student-organized.
                </p>
            </section>

            {/* MOST RECENT EVENT */}
            <section className="featured-event">
                <div className="featured-event__card">
                    <div className="featured-event__border" aria-hidden="true"></div>
                    <div className="featured-event__body">
                        <span className="featured-event__badge">
                            <span className="eventpop__pulse" aria-hidden="true"></span>
                            Most Recent
                        </span>
                        <h2>{featured.title}</h2>
                        <p className="featured-event__desc">{featured.description}</p>
                        <ul className="featured-event__meta">
                            <li><strong>Date</strong><span>{featured.date}</span></li>
                        </ul>
                        <div className="hero__ctas">
                            <a className="btn btn--primary" href="#">RSVP Now <span aria-hidden="true">→</span></a>
                            <a className="btn btn--ghost" href="#">Add to Calendar</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* EVENTS GRID */}
            <section className="events-list">
                <div className="events-list__head">
                    <span className="eyebrow"><span className="eyebrow__dot"></span>Recent Events</span>
                    <h2>What we've been up to.</h2>
                </div>
                <div className="events-grid">
                    {gridEvents.map((e, idx) => {
                        const { mo, day } = parseDate(e.date);
                        return (
                            <article className="event-card" key={idx}>
                                <div className="event-card__date">
                                    <span className="event-card__mo">{mo}</span>
                                    <span className="event-card__day">{day}</span>
                                </div>
                                <div className="event-card__body">
                                    <h3>{e.title}</h3>
                                    <p>{e.description}</p>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </section>

            {/* PAST EVENTS */}
            <section className="past-events">
                <div className="events-list__head">
                    <span className="eyebrow"><span className="eyebrow__dot"></span>Earlier</span>
                    <h2>Further back.</h2>
                </div>
                <ul className="past-list">
                    {pastEvents.map((e, idx) => (
                        <li key={idx}>
                            <span className="past-list__date">{parseDate(e.date).full}</span>
                            <span className="past-list__name">{e.title}</span>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
}

export default Events;
