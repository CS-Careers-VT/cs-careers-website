// Events.tsx

import EventItem from '@components/EventItem';
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

function Events() {
    const events = [
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
    

    return (
        <div className="bg-csc-maroon-bg text-white pt-24 pb-12 px-4 min-h-screen">
            {/* Title */}
            <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl font-bold font-['Outfit']">Our Events</h1> {/* TODO: change back to SPRING 2025 */}
                <div className="w-[230px] sm:w-[260px] h-[11px] bg-csc-organge-bg mx-auto mt-3 rounded-md" />
            </div>

            {/* Mobile Layout - Simple Grid */}
            <div className="md:hidden max-w-4xl mx-auto">
                {events.map((e, idx) => (
                    <EventItem
                        key={idx}
                        title={e.title}
                        date={e.date}
                        imageSrc={e.imageSrc}
                        description={e.description}
                    />
                ))}
            </div>

            {/* Desktop Layout - Timeline Grid */}
            <div className="hidden md:block relative mt-28 px-4 max-w-4xl mx-auto">
                <div className="relative grid grid-cols-[auto_1.5rem_minmax(0,1fr)] gap-y-48 gap-x-24 z-10 items-start">
                    {/* Continuous line down column 2 */}
                    <div className="absolute inset-y-5 left-3 col-start-2 flex justify-center">
                        <div className="w-px h-[93.4%] bg-white" />
                    </div>

                    {events.map((e, idx) => (
                        <EventItem
                            key={idx}
                            title={e.title}
                            date={e.date}
                            imageSrc={e.imageSrc}
                            description={e.description}
                        />
                    ))}
                </div>
            </div>

            {/* Footer Message */}
            {/* TODO: UNCOMMENT
            <div className="mt-20 text-center">
                <h3 className="text-3xl sm:text-4xl font-semibold font-['Outfit']">Fall 2025: Coming Soon!</h3>
            </div> */}
        </div>
    );
}

export default Events;
