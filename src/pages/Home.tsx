import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { handleButtonNav } from "../../button_nav.ts";
import EmailInput from "@components/EmailInput";
import EventPopup from "@components/EventPopup";
import MainLogo from "@assets/icons/main_logo.svg";
import DiscordIcon from "@assets/icons/discord.svg";
import InstaIcon from "@assets/icons/instagram.svg";
import LinkIcon from "@assets/icons/linkedin.svg";
import FacebookIcon from "@assets/icons/facebook.svg";
import TeamsPhoto from "@assets/homePage/teams.jpg";
import Google from "@assets/homePage/companies/google.png";
import Meta from "@assets/homePage/companies/meta.png";
import Amazon from "@assets/homePage/companies/amazon.png";
import Microsoft from "@assets/homePage/companies/microsoft.png";
import CapitalOne from "@assets/homePage/companies/capital_one.png";
import Bloomberg from "@assets/homePage/companies/bloomberg.png";
import Salesforce from "@assets/homePage/companies/salesforce.png";
import CoStar from "@assets/homePage/companies/costar.png";
import IBM from "@assets/homePage/companies/ibm.png";
import Nasa from "@assets/homePage/companies/nasa.png";
import Caci from "@assets/homePage/companies/caci.png";
import FannieMae from "@assets/homePage/companies/fannie_mae.png";

const companies = [
  { name: "Google", src: Google },
  { name: "Meta", src: Meta },
  { name: "Amazon", src: Amazon },
  { name: "Microsoft", src: Microsoft },
  { name: "Capital One", src: CapitalOne },
  { name: "Bloomberg", src: Bloomberg },
  { name: "Salesforce", src: Salesforce },
  { name: "CoStar", src: CoStar },
  { name: "IBM", src: IBM },
  { name: "NASA", src: Nasa },
  { name: "CACI", src: Caci },
  { name: "Fannie Mae", src: FannieMae },
];

const socials = [
  {
    name: "Discord",
    icon: DiscordIcon,
    url: "https://discord.com/invite/YFTPSdcFxD?fbclid=PAZXh0bgNhZW0CMTEAAaZIa_lGREGfAHTM-u5BwjDghZFov9RqlzMxDSoN2ctGrTbKXEBpn27EElw_aem_tx7bJgjG1KQOrfClDkAi6g",
  },
  { name: "Instagram", icon: InstaIcon, url: "https://www.instagram.com/cscareersvt/" },
  { name: "LinkedIn", icon: LinkIcon, url: "https://www.linkedin.com/company/cscareersvt/posts/?feedView=all" },
  { name: "Facebook", icon: FacebookIcon, url: "https://www.facebook.com/people/CS-Careers-at-VT/61573148439665/" },
];

function Home() {
  const navigate = useNavigate();
  const followUsRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <EventPopup />

      {/* HERO */}
      <section className="hero">
        <div className="hero__content">
          <span className="eyebrow">
            <span className="eyebrow__dot"></span>
            Virginia Tech's fastest growing tech org
          </span>
          <h1 className="hero__title">
            CS Careers at <span className="grad">Virginia Tech</span>
          </h1>
          <p className="hero__sub">
            Re-defining computer science on campus. We connect curious students to
            mentors, companies, and each other — so the path from classroom to
            career feels less like a maze and more like momentum.
          </p>
          <div className="hero__ctas">
            <button
              className="btn btn--primary"
              onClick={() => handleButtonNav({ type: "internal", path: "/about-us" }, navigate)}
            >
              Who We Are <span aria-hidden="true">→</span>
            </button>
            <button
              className="btn btn--ghost"
              onClick={() => handleButtonNav({ type: "section", ref: followUsRef })}
            >
              Get Involved
            </button>
          </div>
          <ul className="hero__stats" role="list">
            <li><strong>1400+</strong><span>Members</span></li>
            <li><strong>30+</strong><span>Events / yr</span></li>
            <li><strong>#1</strong><span>Largest CS Org</span></li>
          </ul>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="orb orb--a"></div>
          <div className="orb orb--b"></div>
          <div className="orb orb--c"></div>
          <img src={MainLogo} alt="" className="hero__logo" />
          <svg className="hero__art" viewBox="0 0 520 520" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="g1" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#A8305A" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#3DCCB6" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#3DCCB6" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#3DCCB6" />
                <stop offset="100%" stopColor="#861F41" />
              </linearGradient>
            </defs>
            <circle cx="260" cy="260" r="220" fill="url(#g1)" />
            <circle cx="260" cy="260" r="180" stroke="url(#g2)" strokeOpacity="0.35" strokeDasharray="3 6" />
            <circle cx="260" cy="260" r="130" stroke="url(#g2)" strokeOpacity="0.55" />
            <g opacity="0.9">
              <rect x="60" y="80" width="70" height="28" rx="14" fill="#160A24" stroke="#3DCCB6" strokeOpacity="0.5" />
              <circle cx="75" cy="94" r="4" fill="#3DCCB6" />
              <rect x="86" y="90" width="36" height="8" rx="4" fill="#3DCCB6" opacity="0.5" />
            </g>
            <g opacity="0.9">
              <rect x="380" y="120" width="90" height="28" rx="14" fill="#160A24" stroke="#A8305A" strokeOpacity="0.6" />
              <circle cx="395" cy="134" r="4" fill="#A8305A" />
              <rect x="406" y="130" width="54" height="8" rx="4" fill="#A8305A" opacity="0.5" />
            </g>
            <g opacity="0.9">
              <rect x="360" y="380" width="110" height="28" rx="14" fill="#160A24" stroke="#3DCCB6" strokeOpacity="0.6" />
              <circle cx="375" cy="394" r="4" fill="#3DCCB6" />
              <rect x="386" y="390" width="74" height="8" rx="4" fill="#3DCCB6" opacity="0.5" />
            </g>
            <g opacity="0.9">
              <rect x="70" y="400" width="80" height="28" rx="14" fill="#160A24" stroke="#A8305A" strokeOpacity="0.6" />
              <circle cx="85" cy="414" r="4" fill="#A8305A" />
              <rect x="96" y="410" width="44" height="8" rx="4" fill="#A8305A" opacity="0.5" />
            </g>
          </svg>
        </div>
      </section>

      {/* LOGO MARQUEE */}
      <section className="strip">
        <p className="strip__label">Members go on to build at</p>
        <div className="marquee" aria-label="Companies where members work">
          <div className="marquee__track">
            <ul className="marquee__list" role="list">
              {companies.map((c) => (
                <li key={c.name}><img src={c.src} alt={c.name} /></li>
              ))}
            </ul>
            <ul className="marquee__list" aria-hidden="true" role="presentation">
              {companies.map((c) => (
                <li key={c.name}><img src={c.src} alt={c.name} /></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* OUR VISION */}
      <section className="vision">
        <div className="vision__card">
          <span className="eyebrow"><span className="eyebrow__dot"></span>Our Vision</span>
          <h2>A launchpad, not a lecture hall.</h2>
          <p>
            To foster a robust educational space where students interested in
            computer science can flourish on their journey to the job market.
          </p>
        </div>
        <div className="vision__image">
          <div className="vision__frame">
            <img src={TeamsPhoto} alt="CS Careers team on Virginia Tech campus" className="vision__photo" />
            <div className="vision__shine" aria-hidden="true"></div>
          </div>
          <div className="vision__badge">
            <strong>2025</strong>
            <span>Cohort</span>
          </div>
        </div>
      </section>

      {/* FOLLOW + NEWSLETTER */}
      <section className="follow" id="follow" ref={followUsRef}>
        <div className="follow__head">
          <span className="eyebrow"><span className="eyebrow__dot"></span>Follow Us</span>
          <h2>Stay in the loop.</h2>
          <p>One tap to our community. One email a week, max.</p>
        </div>

        <div className="follow__grid">
          <ul className="socials" aria-label="Social media">
            {socials.map((s) => (
              <li key={s.name}>
                <button onClick={() => handleButtonNav({ type: "external", url: s.url })}>
                  <img src={s.icon} alt="" width={22} height={22} />
                  <span>{s.name}</span>
                </button>
              </li>
            ))}
          </ul>

          <EmailInput />
        </div>
      </section>
    </>
  );
}

export default Home;
