// NewsEvents.tsx

import EventItem from '@components/EventItem';
import ResumeWorkshopPhoto from "@assets/pics/events/ResumeWorkshop.jpg"
import RishiPhoto from "@assets/pics/events/RishiEvent.jpeg"
import AcademiaPhoto from "@assets/pics/events/AcademiaEvent.jpeg"
import StarterPackPhoto from "@assets/pics/events/StarterPackCSEvent.jpeg"
import AiPhoto from "@assets/pics/events/AIEvent4.jpg"
import SocialPhoto from "@assets/pics/events/SocialEvent.jpeg"
import WomensPhoto from "@assets/pics/events/WomensEvent.jpg"
import VTHacksPhoto from "@assets/pics/events/VTHacks Stuti.jpeg"

function NewsEvents() {
    const events = [
        {
            title: 'CS Social',
            date: 'May 1st',
            imageSrc: SocialPhoto,
            description: 'Unwinding with peers before finals—games, food, and good vibes!'
        },
        {
            title: 'AI Perspectives',
            date: 'April 24th',
            imageSrc: AiPhoto,
            description: 'Exploring the evolving implications of AI with industry experts in healthcare, finance, automaking, and more.'
        },
        {
            title: 'Freshman CS Starter Pack',
            date: 'April 17th',
            imageSrc: StarterPackPhoto,
            description: 'A comprehensive guide for first-year CS majors covering internships, clubs, and course planning.'
        },
        {
            title: 'Women in CS w/ Lockheed Martin',
            date: 'April 10th',
            imageSrc: WomensPhoto,
            description: 'Celebrating and support women in tech with professionals from Lockheed Martin.'
        },
        {
            title: 'Careers in Academia',
            date: 'April 3rd',
            imageSrc: AcademiaPhoto,
            description: 'A candid panel discussion on what it’s like to pursue a career in higher education.'
        },
        {
            title: 'Finding Your Career Path w/ Rishi Jaitly',
            date: 'March 3rd',
            imageSrc: RishiPhoto,
            description: 'A conversation with the ex-FAANG exec on navigating the tech industry with purpose.'
        },
        {
            title: 'Resume Review',
            date: 'February 9th',
            imageSrc: ResumeWorkshopPhoto,
            description: 'Providing valuable resume tips and feedback before CS Source.'
        },
        {
            title: 'VTHacks LinkedIn Workshop',
            date: 'February 2nd',
            imageSrc: VTHacksPhoto,
            description: 'Teaching how to optimize your LinkedIn profile and grow your professional presence online.'
        }
    ];
    

    return (
        <div className="bg-csc-maroon-bg min-h-screen pt-20 pb-20">
            {/* Header */}
            <div className="w-full text-center">
                <h2 className="text-white text-5xl md:text-6xl font-semibold font-['Outfit']">
                    Spring 2025
                </h2>
                <div className="w-[330px] h-[11px] bg-[#D4A074] mx-auto mt-1" />
            </div>

            {/* Timeline Grid */}
            <div className="relative mt-28 px-4 max-w-4xl mx-auto">
                <div className="relative grid grid-cols-[auto_1.5rem_minmax(0,1fr)] gap-y-48 gap-x-24 z-10 items-start">
                    {/* Continuous line down column 2 */}
                    <div className="absolute inset-y-5 left-3 col-start-2 flex justify-center">
                        <div className="w-px h-[90.6%] bg-white" />
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

            {/* Bottom Message */}
            <div className="mt-36 text-center">
                <h3 className="text-white text-4xl font-semibold font-['Outfit']">
                    Fall 2025: Coming Soon!
                </h3>
            </div>
        </div>
    );
}

export default NewsEvents;
