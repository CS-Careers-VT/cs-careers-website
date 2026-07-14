import { useEffect, useRef, useState } from "react";
import ExecCard from "@components/ExecCard";

// Slideshow header photos
import HeaderPic from "@assets/aboutUsPage/headerPhotos/headerPic.jpg";
import Header2 from "@assets/aboutUsPage/headerPhotos/header2.jpg";
import Header3 from "@assets/aboutUsPage/headerPhotos/header3.jpg";
import Header4 from "@assets/aboutUsPage/headerPhotos/header4.jpg";

// 2026 (current) board photos
import Joanne from "@assets/aboutUsPage/headshots/2026_Members/Joanne.png";
import Aadil from "@assets/aboutUsPage/headshots/2026_Members/Aadil.jpg";
import Charlotte from "@assets/aboutUsPage/headshots/2026_Members/Charlotte.jpeg";
import Marvi from "@assets/aboutUsPage/headshots/2026_Members/Marvi.jpg";
import Ishita from "@assets/aboutUsPage/headshots/2026_Members/Ishita.jpg";
import Man from "@assets/aboutUsPage/headshots/2026_Members/Man.jpeg";

// 2025 board photos (existing headshots already used in production)
import Lauren from "@assets/pics/headshots/Lauren.jpeg";
import Gianfranco from "@assets/pics/headshots/Gianfranco.jpg";
import Alex from "@assets/pics/headshots/Alex.jpeg";
import Tarun from "@assets/pics/headshots/Tarun.jpeg";
import Stuti from "@assets/pics/headshots/Stuti.jpeg";
import Sam from "@assets/pics/headshots/Sam.jpeg";
import Alexa from "@assets/pics/headshots/Alexa.jpeg";
import Gabe from "@assets/pics/headshots/Gabe.jpeg";
import Aaron from "@assets/pics/headshots/Aaron.jpeg";
import Nina from "@assets/pics/headshots/Nina.jpeg";
import Amy from "@assets/pics/headshots/Amy.jpeg";
import Reet from "@assets/pics/headshots/Reet.jpeg";
import Harita from "@assets/pics/headshots/Harita.jpeg";
import Lucas from "@assets/pics/headshots/Lucas.jpeg";
import Pedro from "@assets/pics/headshots/Pedro.jpeg";

interface Member {
  name?: string;
  role: string;
  photo?: string;
}

interface Tier {
  label: string;
  rowVariant: "" | "--1" | "--2" | "--3" | "--4";
  members: Member[];
}

interface Generation {
  key: string;
  tabLabel: string;
  tiers: Tier[];
}

const generations: Generation[] = [
  {
    key: "current",
    tabLabel: "Current",
    tiers: [
      { label: "President", rowVariant: "--1", members: [{ name: "Gianfranco Vivanco", role: "President" }] },
      {
        label: "Vice Presidents", rowVariant: "--2", members: [
          { name: "Reet Kaler", role: "Co-Vice President" },
          { name: "Amy Weston", role: "Co-Vice President" },
        ]
      },
      {
        label: "Directors", rowVariant: "--4", members: [
          { name: "Joanne Wang", role: "Operations Director", photo: Joanne },
          { name: "Aadil", role: "Finance Director", photo: Aadil },
          { name: "Charlotte", role: "Co-Marketing Director", photo: Charlotte },
          { name: "Marvi", role: "Co-Marketing Director", photo: Marvi },
        ]
      },
      {
        label: "Board", rowVariant: "", members: [
          { role: "Opportunities Chair" },
          { name: "Nina Yang", role: "Webmaster" },
          { name: "Ishita", role: "Outreach Chair", photo: Ishita },
          { role: "Fundraising Chair" },
          { role: "Graphic Designer" },
          { role: "Co-Social Media Chair" },
          { name: "Man", role: "Co-Social Media Chair", photo: Man },
          { role: "Event Strategist" },
        ]
      },
    ],
  },
  {
    key: "2025",
    tabLabel: "2025",
    tiers: [
      { label: "President", rowVariant: "--1", members: [{ name: "Lauren Ruiz-Arenas", role: "President", photo: Lauren }] },
      {
        label: "Vice Presidents", rowVariant: "--2", members: [
          { name: "Gianfranco Vivanco", role: "Co-Vice President", photo: Gianfranco },
          { name: "Alex Brown", role: "Co-Vice President", photo: Alex },
        ]
      },
      {
        label: "Directors", rowVariant: "--4", members: [
          { name: "Tarun Nandamudi", role: "Operations Director", photo: Tarun },
          { name: "Stuti Shah", role: "Finance Director", photo: Stuti },
          { name: "Sam Jarvis", role: "Co-Marketing Director", photo: Sam },
          { name: "Alexa Thompson", role: "Co-Marketing Director", photo: Alexa },
        ]
      },
      {
        label: "Board", rowVariant: "", members: [
          { name: "Gabriel Palomino", role: "Opportunities Chair", photo: Gabe },
          { name: "Aaron Boateng", role: "Webmaster", photo: Aaron },
          { name: "Nina Yang", role: "Outreach Chair", photo: Nina },
          { name: "Amy Weston", role: "Fundraising Chair", photo: Amy },
          { name: "Reet Kaler", role: "Graphic Designer", photo: Reet },
          { name: "Harita Kondragunta", role: "Co-Social Media Chair", photo: Harita },
          { name: "Lucas Lombardi", role: "Co-Social Media Chair", photo: Lucas },
          { name: "Pedro Ribeiro", role: "Event Strategist", photo: Pedro },
        ]
      },
    ],
  },
  {
    key: "2024",
    tabLabel: "2024",
    tiers: [
      { label: "President", rowVariant: "--1", members: [{ name: "Anton Bilonog", role: "President" }] },
      {
        label: "Vice Presidents", rowVariant: "--2", members: [
          { name: "Gio Romero-Ruiz", role: "Vice President" },
          { name: "Blake Marterella", role: "Vice President" },
        ]
      },
      {
        label: "Directors", rowVariant: "--3", members: [
          { name: "Gabriel Holder", role: "Director of Logistics" },
          { name: "Alex Brown", role: "Director of Finance" },
          { name: "Bivash Oli", role: "Director of Marketing" },
        ]
      },
      {
        label: "Board", rowVariant: "", members: [
          { name: "Tarun Nandamudi", role: "Event Strategist" },
          { name: "Aaron Boateng", role: "Historian" },
          { name: "Gabriel Palomino", role: "Ambassador Coordinator" },
          { name: "Stuti Shah", role: "Fundraising Chair" },
          { name: "Sam Jarvis", role: "Graphic Designer" },
          { name: "Lauren Ruiz", role: "Social Media Chair" },
          { name: "Gianfranco Vivanco", role: "First-Year Experience" },
        ]
      },
    ],
  },
];

const slides = [HeaderPic, Header2, Header3, Header4];

function AboutUs() {
  const [activeGen, setActiveGen] = useState("current");
  const [slideIndex, setSlideIndex] = useState(0);
  const stackRef = useRef<HTMLDivElement | null>(null);
  const [pillarsVisible, setPillarsVisible] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setSlideIndex((i) => (i + 1) % slides.length), 4000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const node = stackRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPillarsVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  const activeGeneration = generations.find((g) => g.key === activeGen)!;

  return (
    <>
      {/* PAGE HEADER + PILLARS */}
      <section className="intro-pillars">
        <div className="intro-pillars__left">
          <span className="eyebrow"><span className="eyebrow__dot"></span>About CS Careers</span>
          <h1 className="page-title">Built by students, <span className="grad">for students.</span></h1>
          <p className="page-sub">
            We're the largest student-led tech community at Virginia Tech.
            No recruiters. No fluff. Just people who've been where you are,
            helping you get where you want to go.
          </p>
          <div className="intro-pillars__img">
            <div className="slideshow__track" style={{ transform: `translateX(-${slideIndex * 100}%)` }}>
              {slides.map((src, i) => (
                <img key={i} src={src} alt="CS Careers" />
              ))}
            </div>
          </div>
        </div>
        <div className="intro-pillars__right">
          <span className="eyebrow"><span className="eyebrow__dot"></span>What We Do</span>
          <h2 className="pillars__heading">Three pillars, one community.</h2>
          <div className={`pillars__stack${pillarsVisible ? " is-visible" : ""}`} ref={stackRef}>
            <article className="pillar">
              <div className="pillar__num">01</div>
              <h3>Mentorship</h3>
              <p>Upperclassmen and alumni paired with underclassmen. Office hours, résumé reviews, real talk.</p>
            </article>
            <article className="pillar">
              <div className="pillar__num">02</div>
              <h3>Industry Access</h3>
              <p>Company nights, tech talks, and direct lines to recruiters at our partner companies.</p>
            </article>
            <article className="pillar">
              <div className="pillar__num">03</div>
              <h3>Build Together</h3>
              <p>Project sprints, hackathon teams, and study groups — because the fastest way to learn is to ship.</p>
            </article>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="team">
        <div className="team__head">
          <span className="eyebrow"><span className="eyebrow__dot"></span>The Board</span>
          <h2>Meet the people running it.</h2>
        </div>

        <div className="team-tabs" role="tablist" aria-label="Board generation">
          {generations.map((g) => (
            <button
              key={g.key}
              className={`team-tab${activeGen === g.key ? " is-active" : ""}`}
              role="tab"
              aria-selected={activeGen === g.key}
              onClick={() => setActiveGen(g.key)}
            >
              {g.tabLabel}
            </button>
          ))}
        </div>

        <div className="team-gen is-active">
          {activeGeneration.tiers.map((tier) => (
            <div className="team-tier" key={tier.label}>
              <div className="team-tier__label">{tier.label}</div>
              <div className={`team-tier__row team-tier__row${tier.rowVariant}`}>
                {tier.members.map((m, i) => (
                  <ExecCard key={i} name={m.name} role={m.role} photo={m.photo} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COFFEE CHAT CTA */}
      <section className="coffee-cta">
        <div className="coffee-cta__card">
          <div className="coffee-cta__border" aria-hidden="true"></div>
          <div className="coffee-cta__body">
            <div className="coffee-cta__icon">☕</div>
            <div className="coffee-cta__text">
              <h2>Want to meet one of us?</h2>
              <p>Fill out a quick form and we'll match you with a board member for a chat. Open to all Virginia Tech students, any topic.</p>
            </div>
            <div className="coffee-cta__action">
              <div className="coffee-cta__btn-wrap">
                <div className="coffee-cta__pulse-ring" aria-hidden="true"></div>
                <a href="/coffee-chats" className="btn btn--primary">Request a Chat →</a>
              </div>
              <small>Free · 30 min · Any topic</small>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutUs;
