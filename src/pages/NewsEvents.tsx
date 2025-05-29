import EventItem from '@components/EventItem';
import MicrosoftPhoto from '@assets/pics/events/msft_event.png';
import VTHacksPhoto from "@assets/pics/events/VTHacks Gian.jpeg"
import ResumeWorkshopPhoto from "@assets/pics/events/ResumeWorkshopStuti.jpeg"
import RishiPhoto from "@assets/pics/events/RishiEvent.jpeg"
import AcademiaPhoto from "@assets/pics/events/AcademiaEvent.jpeg"
import StarterPackPhoto from "@assets/pics/events/StarterPackCSEvent.jpeg"
import AiPhoto from "@assets/pics/events/AIEvent.jpeg"
import SocialPhoto from "@assets/pics/events/SocialEvent.jpeg"

function NewsEvents() {
    const events = [
        { title: 'VTHacks LinkedIn Workshop', date: 'February 2nd', imageSrc: VTHacksPhoto },
        { title: 'Resume Workshop', date: 'February 9th', imageSrc: ResumeWorkshopPhoto },
        { title: 'Finding Your Career Path w/ Rishi Jaitly', date: 'March 3rd', imageSrc: RishiPhoto },
        { title: 'Careers in Academia', date: 'April 3rd', imageSrc: AcademiaPhoto },
        { title: 'Women in CS w/ Lockheed Martin', date: 'April 10th', imageSrc: MicrosoftPhoto },
        { title: 'Freshman CS Starter Pack', date: 'April 17th', imageSrc: StarterPackPhoto },
        { title: 'AI Perspectives', date: 'April 24th', imageSrc: AiPhoto },
        { title: 'CS Social', date: 'May 1st', imageSrc: SocialPhoto }
    ];
    return (
        <div className="bg-csc-maroon-bg min-h-screen pt-20 pb-20">
            {/* Header */}
            <div className="w-full text-center">
                <h2 className="text-white text-5xl md:text-6xl font-semibold font-['Outfit']">
                    Spring 2025
                </h2>
                <div className="w-[330px] h-[11px] bg-csc-organge-bg mx-auto mt-1" />
            </div>

            {/* Timeline Grid */}
            <div className="relative mt-28 px-4 max-w-4xl mx-auto">

                <div className="relative grid grid-cols-[auto_1.5rem_minmax(0,1fr)] gap-y-48 gap-x-24 z-10 items-start">

                    {/* ─── continuous line down column 2 ─── */}
                    <div className="absolute inset-y-5 left-3 col-start-2 flex justify-center">
                        <div className=" w-px h-[92%] bg-white" />
                    </div>


                    {events.map((e, idx) => (
                        <EventItem
                            key={idx}
                            title={e.title}
                            date={e.date}
                            imageSrc={e.imageSrc}
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
    )
}

export default NewsEvents;