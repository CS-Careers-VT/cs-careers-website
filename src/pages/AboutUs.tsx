import FirstYearPhoto from "@assets/pics/first_year_experience.jpg"
import MicrosoftPhoto from "@assets/pics/msft_event.png"

function AboutUs() {
    return (
        <div>
            <div className="w-full bg-csc-maroon-bg text-center mt-20">
                <h2>By The Numbers</h2>
            </div>
            <div className="w-[360px] h-[11px] bg-csc-organge-bg mx-auto mt-2"></div>

            <div className="flex flex-wrap justify-center gap-6 mt-20 mb-60">
                {/* Box 1 */}
                <div className="w-80 h-60 relative rounded-[50px]">
                    <div className="w-80 h-60 left-0 top-0 absolute bg-orange-400 rounded-[50px]"></div>
                    <div className="left-[70px] top-[160px] absolute justify-start text-white text-4xl font-semibold font-['Outfit'] leading-7 tracking-widest">Members</div>
                    <div className="left-[23px] top-[67px] absolute justify-start text-white text-8xl font-semibold font-['Outfit'] leading-7 tracking-[5px]">1200+</div>
                </div>

                {/* Box 2 */}
                <div className="w-80 h-60 relative rounded-[50px]">
                    <div className="w-80 h-60 left-0 top-0 absolute bg-orange-400 rounded-[50px]"></div>
                    <div className="left-[100px] top-[160px] absolute justify-start text-white text-4xl font-semibold font-['Outfit'] leading-7 tracking-widest">Events</div>
                    <div className="w-56 h-20 left-[88px] top-[67px] absolute justify-start text-white text-8xl font-semibold font-['Outfit'] leading-7 tracking-[5px]">30+</div>
                </div>

                {/* Box 3 */}
                <div className="w-80 h-60 relative rounded-[50px]">
                    <div className="w-80 h-60 left-0 top-0 absolute bg-orange-400 rounded-[50px]"></div>
                    <div className="w-60 left-[36px] top-[141px] absolute justify-start text-white text-4xl font-semibold font-['Outfit'] leading-10 tracking-widest">Largest CS Organization</div>
                    <div className="left-[102px] top-[67px] absolute justify-start text-white text-8xl font-semibold font-['Outfit'] leading-7 tracking-[5px]">#1</div>
                </div>
            </div>

            {/* Serving the Community */}
            <div className="w-full min-h-[850px] bg-csc-organge-bg px-4 py-20 flex flex-col items-center">
                <h2 className="text-white text-5xl md:text-6xl font-semibold font-['Outfit'] text-center">
                    Serving the Community
                </h2>

                <div className="mt-1 w-4/5 md:w-[620px] h-4 bg-csc-maroon-bg"></div>
                {/* Content Section */}
                <div className="mt-16 w-full max-w-7xl flex flex-col md:flex-row justify-between gap-10 px-4">
                    {/* Left Side: Paragraphs */}
                    <div className="flex flex-col gap-10 md:w-1/2">
                        <p className="text-pink-50 text-xl md:text-2xl font-normal font-['Outfit'] leading-relaxed">
                            CS Careers at Virginia Tech is committed to creating an educational space where VT students interested in careers related to computer science can be brought together to work on their journey to the job market while giving students the skills and tools they need to succeed in the competitive job market. These services include but are not limited to: resume workshops, LinkedIn workshops, interview workshops, and company sponsored events.
                        </p>
                        <p className="text-pink-50 text-xl md:text-2xl font-normal font-['Outfit'] leading-relaxed">
                            Established in the Fall of 2022, our organization has rapidly become a hub for connecting ambitious students with top companies and tech opportunities. Whether you're majoring in Computer Science or have a passion for technology, CS Careers @ VT is the community for you.
                        </p>
                    </div>

                    {/* Right Side: Images */}
                    <div className="flex flex-col gap-8 md:w-1/2 items-center md:items-end">
                        <img src={MicrosoftPhoto} alt="Microsoft Event" className="w-full max-w-md rounded-2xl shadow-lg" />
                        <img src={FirstYearPhoto} alt="First Year Experience" className="w-full max-w-md rounded-2xl shadow-lg" />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AboutUs;