import EventItem from "../components/EventItem";
import MicrosoftPhoto from "../assets/pics/events/msft_event.png";
import VTHacksPhoto from "../assets/pics/events/VTHacks Gian.jpeg";
import ResumeWorkshopPhoto from "../assets/pics/events/ResumeWorkshopStuti.jpeg";
import RishiPhoto from "../assets/pics/events/RishiEvent.jpeg";
import AcademiaPhoto from "../assets/pics/events/AcademiaEvent.jpeg";
import StarterPackPhoto from "../assets/pics/events/StarterPackCSEvent.jpeg";
import AiPhoto from "../assets/pics/events/AIEvent.jpeg";
import SocialPhoto from "../assets/pics/events/SocialEvent.jpeg";

function NewsEvents() {
  const events = [
    {
      title: "VTHacks LinkedIn Workshop",
      date: "February 2nd",
      imageSrc: VTHacksPhoto,
      description: "Teaching how to optimize your LinkedIn profile and grow your professional presence online.",
    },
    {
      title: "Resume Workshop",
      date: "February 9th",
      imageSrc: ResumeWorkshopPhoto,
      description: "Providing valuable resume tips and feedback before CS Source.",
    },
    {
      title: "Finding Your Career Path w/ Rishi Jaitly",
      date: "March 3rd",
      imageSrc: RishiPhoto,
      description: "A conversation with the ex-FAANG exec on navigating the tech industry with purpose.",
    },
    {
      title: "Careers in Academia",
      date: "April 3rd",
      imageSrc: AcademiaPhoto,
      description: "Panel discussion on what it’s like to pursue a career in higher education.",
    },
    {
      title: "Women in CS w/ Lockheed Martin",
      date: "April 10th",
      imageSrc: MicrosoftPhoto,
      description: "Celebrate and support women in tech with professionals from Lockheed Martin.",
    },
    {
      title: "Freshman CS Starter Pack",
      date: "April 17th",
      imageSrc: StarterPackPhoto,
      description: "A comprehensive guide for first-year CS majors covering internships, clubs, and course planning.",
    },
    {
      title: "AI Perspectives",
      date: "April 24th",
      imageSrc: AiPhoto,
      description: "Exploring the evolving world of AI with industry experts across different domains.",
    },
    {
      title: "CS Social",
      date: "May 1st",
      imageSrc: SocialPhoto,
      description: "Unwinding with peers before finals—games, food, and good vibes!",
    },
  ];

  return (
    <div className="bg-csc-maroon-bg text-white pt-24 pb-12 px-4 min-h-screen">
      {/* Title */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold font-['Outfit']">Spring 2025</h1>
        <div className="w-[330px] h-[11px] bg-csc-organge-bg mx-auto mt-3 rounded-md" />
      </div>

      {/* Event Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {events.map((event, index) => (
          <EventItem
            key={index}
            title={event.title}
            date={event.date}
            imageSrc={event.imageSrc}
            description={event.description}
          />
        ))}
      </div>

      {/* Footer Message */}
      <div className="mt-20 text-center">
        <h3 className="text-3xl sm:text-4xl font-semibold font-['Outfit']">Fall 2025: Coming Soon!</h3>
      </div>
    </div>
  );
}

export default NewsEvents;
