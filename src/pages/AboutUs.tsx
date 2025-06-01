import ExecCard         from "@components/ExecCard";
import FirstYearPhoto   from "@assets/pics/events/first_year_experience.jpg";
import MicrosoftPhoto   from "@assets/pics/events/msft_event.png";
import Alexa            from "@assets/pics/headshots/Alexa.jpeg";
import Amy              from "@assets/pics/headshots/Amy.jpeg";
import Harita           from "@assets/pics/headshots/Harita.jpeg";
import Lucas            from "@assets/pics/headshots/Lucas.jpeg";
import Nina             from "@assets/pics/headshots/Nina.jpeg";
import Reet             from "@assets/pics/headshots/Reet.jpeg";
import Aaron            from "@assets/pics/headshots/Aaron.jpeg";
import Gabe             from "@assets/pics/headshots/Gabe.jpeg";
import Gianfranco       from "@assets/pics/headshots/Gianfranco.jpg";
import Alex             from "@assets/pics/headshots/Alex.jpeg";
import Lauren           from "@assets/pics/headshots/Lauren.jpeg";
import Sam              from "@assets/pics/headshots/Sam.jpeg";
import Stuti            from "@assets/pics/headshots/Stuti.jpeg";
import Tarun            from "@assets/pics/headshots/Tarun.jpeg";

function AboutUs() {
    return (
        <div>
            <div className="w-full bg-csc-maroon-bg text-center mt-20">
                <h2>By The Numbers</h2>
            </div>
            <div className="w-[360px] h-[11px] bg-csc-organge-bg mx-auto mt-2"></div>

            <div className="flex flex-wrap justify-center gap-6 mt-20 mb-80">
                {/* Box 1 */}
                <div className="w-80 h-60 relative rounded-[50px]">
                    <div className="w-80 h-60 left-0 top-0 absolute bg-[#D6995D] rounded-[50px]"></div>
                    <div className="left-[70px] top-[160px] absolute justify-start text-white text-4xl font-semibold font-['Outfit'] leading-7 tracking-widest">Members</div>
                    <div className="left-[23px] top-[67px] absolute justify-start text-white text-8xl font-semibold font-['Outfit'] leading-7 tracking-[5px]">1200+</div>
                </div>

                {/* Box 2 */}
                <div className="w-80 h-60 relative rounded-[50px]">
                    <div className="w-80 h-60 left-0 top-0 absolute bg-[#D6995D] rounded-[50px]"></div>
                    <div className="left-[100px] top-[160px] absolute justify-start text-white text-4xl font-semibold font-['Outfit'] leading-7 tracking-widest">Events</div>
                    <div className="w-56 h-20 left-[88px] top-[67px] absolute justify-start text-white text-8xl font-semibold font-['Outfit'] leading-7 tracking-[5px]">30+</div>
                </div>

                {/* Box 3 */}
                <div className="w-80 h-60 relative rounded-[50px]">
                    <div className="w-80 h-60 left-0 top-0 absolute bg-[#D6995D] rounded-[50px]"></div>
                    <div className="w-60 left-[36px] top-[141px] absolute justify-start text-white text-4xl font-semibold font-['Outfit'] leading-10 tracking-widest">Largest CS Organization</div>
                    <div className="left-[102px] top-[67px] absolute justify-start text-white text-8xl font-semibold font-['Outfit'] leading-7 tracking-[5px]">#1</div>
                </div>
            </div>

            {/* Serving the Community */}
            <div className="w-full min-h-[850px] bg-csc-organge-bg px-4 py-20 flex flex-col items-center">
                <h2 className="text-white text-5xl md:text-6xl font-semibold font-['Outfit'] text-center">
                    How We Serve
                </h2>

                <div className="w-4/5 md:w-[385px] h-3 bg-csc-maroon-bg"></div>
                {/* Content Section */}
                <div className="mt-16 w-full max-w-7xl flex flex-col md:flex-row justify-between gap-10 px-4">
                    {/* Left Side: Paragraphs */}
                    <div className="flex flex-col gap-10 md:w-1/2">
                        <p className="text-pink-50 text-xl md:text-2xl font-light font-['Outfit'] leading-relaxed">
                            CS Careers at Virginia Tech is committed to creating an educational space where VT students interested in careers related to computer science can be brought together to work on their journey to the job market while giving students the skills and tools they need to succeed in the competitive job market. These services include but are not limited to: resume workshops, LinkedIn workshops, interview workshops, and company sponsored events.
                        </p>
                        <p className="text-pink-50 text-xl md:text-2xl font-light font-['Outfit'] leading-relaxed">
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

            {/* Meet The Executive Board */}
            <div className="w-full bg-csc-maroon-bg text-center mt-20 px-4 pt-8 pb-4">
                <h2 className="text-white text-5xl md:text-6xl font-semibold font-['Outfit']">
                    Meet The Executive Board!
                </h2>
            <div className="w-[720px] h-[11px] bg-csc-organge-bg mx-auto"></div>
            </div>

            {/* Board of Directors */}
            <div className="mt-20 px-4 max-w-7xl mx-auto">
                <h3 className="text-5xl text-white font-semibold font-serif text-center pt-20">
                    Board of Directors
                </h3>
            
                <div className="mt-12 flex flex-wrap justify-center gap-16">
                    <ExecCard
                    name="Lauren Ruiz-Arenas"
                    role="President"
                    photo={Lauren}
                    />
                    <ExecCard
                    name="Gianfranco Vivanco"
                    role="Co-Vice President"
                    photo={Gianfranco}
                    />
                    <ExecCard
                    name="Alex Brown"
                    role="Co-Vice President"
                    photo={Alex}
                    />
                    <ExecCard
                    name="Tarun Nandamudi"
                    role="Operations Director"
                    photo={Tarun}
                    />
                    <ExecCard
                    name="Stuti Shah"
                    role="Finance Director"
                    photo={Stuti}
                    />
                    <ExecCard
                    name="Sam Jarvis"
                    role="Co-Marketing Director"
                    photo={Sam}
                    />
                    <ExecCard
                    name="Alexa Thompson"
                    role="Co-Marketing Director"
                    photo={Alexa}
                    />
                    <ExecCard
                    name="Gabriel Palomino"
                    role="Opportunities Chair"
                    photo={Gabe}
                    />
                    <ExecCard
                    name="Aaron Boateng"
                    role="Webmaster"
                    photo={Aaron}
                    />

                </div>
            </div>


            {/* Officers */}
            <div className="mt-12 px-4 max-w-7xl pb-32 mx-auto">
                <h3 className="text-5xl text-white font-semibold font-['Outfit'] text-center pt-20">
                    Officers
                </h3>
            
                <div className="mt-12 flex flex-wrap justify-center gap-16">
                    <ExecCard
                    name="Nina Yang"
                    role="Outreach Chair"
                    photo={Nina}
                    />
                    <ExecCard
                    name="Amy Weston"
                    role="Fundraising Chair"
                    photo={Amy}
                    />
                    <ExecCard
                    name="Reet Kaler"
                    role="Graphic Designer"
                    photo={Reet}
                    />
                    <ExecCard
                    name="Harita Kondragunta"
                    role="Co-Social Media Chair"
                    photo={Harita}
                    />
                    <ExecCard
                    name="Lucas Lombardi"
                    role="Co-Social Media Chair"
                    photo={Lucas}
                    />
                </div>
            </div>

        </div>
    )
}

export default AboutUs;