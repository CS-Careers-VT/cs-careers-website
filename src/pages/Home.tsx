import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { handleButtonNav } from "../../button_nav.ts"
import MainLogo from "@assets/icons/main_logo.svg"
import EmailInput from "@components/EmailInput"
// Assets
import GobblerPhoto from "@assets/pics/events/E-BoardPhoto.jpg"
import LinkIcon from "@assets/icons/linkedin.svg"
import FacebookIcon from "@assets/icons/facebook.svg"
import DiscordIcon from "@assets/icons/discord.svg"
import InstaIcon from "@assets/icons/instagram.svg"


function Home() {

    const navigate = useNavigate();
    const followUsRef = useRef<HTMLDivElement | null>(null);

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <main className="flex-grow bg-csc-maroon-bg flex items-center justify-center min-h-screen p-6 pt-24">
                <div className="container mx-auto px-4 md:px-10 flex flex-col md:flex-row items-center justify-between transform -translate-y-14">
                    <div className="text-left max-w-lg space-y-8 md:space-y-11">
                        <h1 className="text-5xl md:text-5xl lg:text-6xl xl:text-7xl">
                            CS Careers at Virginia Tech
                        </h1>
                        <p className="text-white text-lg md:text-2xl">
                            Virginia Tech's fastest growing technology organization.
                            Re-defining computer science on campus.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mt-8">
                            <button
                                className="orange-btn-primary transform transition-transform duration-300 hover:scale-105 w-full sm:w-auto"
                                onClick={() =>
                                    handleButtonNav({ type: "internal", path: "/about-us" }, navigate)
                                }
                            >
                                Who We Are
                            </button>
                            <button
                                className="orange-btn-secondary transform transition-transform duration-300 hover:scale-105 w-full sm:w-auto"
                                onClick={() =>
                                    handleButtonNav({ type: "section", ref: followUsRef })
                                }>
                                Get Involved
                            </button>
                        </div>
                    </div>
                    <div className="flex-shrink-0 mt-8 md:mt-0">
                        <img
                            src={MainLogo}
                            alt="CS Careers @ VT Logo"
                            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:h-[415px] xl:w-[485px] object-contain"
                        />
                    </div>
                </div>
            </main>

            <div className="w-full min-h-[850px] flex items-center bg-[#D4A074] p-4 md:p-12">
                <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center md:items-start gap-6 md:gap-10">
                    {/* Left Content (Mission Statement) */}
                    <div className="bg-csc-maroon-bg text-white p-6 md:p-8 flex flex-col space-y-6 md:space-y-12 w-full lg:w-[800px] h-auto lg:min-h-[320px] rounded-[50px] box-border">
                        <h2 className="text-3xl md:text-5xl font-bold">Our Vision</h2>
                        <p className="text-lg md:text-2xl leading-loose md:leading-[2.2]">
                            To foster a robust educational space where students interested in computer science can flourish on their journey to the job market.
                        </p>
                    </div>

                    {/* Image with matching height and width */}
                    <div className="w-full lg:w-auto">
                        <img
                            src={GobblerPhoto}
                            alt="Gobblerfest Photo"
                            className="w-full max-w-2xl lg:w-[800px] h-auto lg:min-h-[320px] rounded-[50px] object-cover object-center transition-transform duration-300"
                        />
                    </div>
                </div>
            </div>
            {/* Follow Us Section */}
            <div
                ref={followUsRef}
                className="w-full flex flex-col items-center bg-csc-maroon-bg py-16 pb-16 scroll-mt-24 px-4">
                <div className="w-full text-center mb-20 mt-10">
                    <h2 className="text-4xl sm:text-5xl font-bold font-['Outfit']">
                        Follow Us
                    </h2>
                    <div className="w-[230px] h-[11px] bg-csc-organge-bg mx-auto mt-3 rounded-md"></div>
                </div>
                <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-6 md:gap-4">
                    <div className="bg-[#D4A074] text-white rounded-[50px] p-6 px-8 py-0 flex flex-wrap content-start justify-center md:justify-between items-start w-full max-w-xl lg:w-[550px] h-auto lg:h-[370px] gap-4">
                        {/* Instagram */}
                        <button
                            onClick={() =>
                                handleButtonNav({
                                    type: "external",
                                    url: "https://www.instagram.com/cscareersvt/",
                                })
                            }
                            className="transition-transform duration-300 ease-in-out transform hover:scale-110 focus:outline-none m-2 md:m-4"
                        >
                            <img src={InstaIcon} alt="Instagram" className="w-24 h-24 md:w-[154px] md:h-[148px]" />
                        </button>

                        {/* LinkedIn */}
                        <button
                            onClick={() =>
                                handleButtonNav({
                                    type: "external",
                                    url: "https://www.linkedin.com/company/cscareersvt/posts/?feedView=all",
                                })
                            }
                            className="transition-transform duration-300 ease-in-out transform hover:scale-110 focus:outline-none m-2 md:m-4"
                        >
                            <img src={LinkIcon} alt="LinkedIn" className="w-24 h-24 md:w-[149px] md:h-[149px]" />
                        </button>

                        {/* Facebook */}
                        <button
                            onClick={() =>
                                handleButtonNav({
                                    type: "external",
                                    url: "https://www.facebook.com/people/CS-Careers-at-VT/61573148439665/",
                                })
                            }
                            className="transition-transform duration-300 ease-in-out transform hover:scale-110 focus:outline-none m-2 md:m-4"
                        >
                            <img src={FacebookIcon} alt="Facebook" className="w-24 h-24 md:w-[143px] md:h-[143px]" />
                        </button>

                        {/* Discord */}
                        <button
                            onClick={() =>
                                handleButtonNav({
                                    type: "external",
                                    url: "https://discord.com/invite/YFTPSdcFxD?fbclid=PAZXh0bgNhZW0CMTEAAaZIa_lGREGfAHTM-u5BwjDghZFov9RqlzMxDSoN2ctGrTbKXEBpn27EElw_aem_tx7bJgjG1KQOrfClDkAi6g",
                                })
                            }
                            className="transition-transform duration-300 ease-in-out transform hover:scale-110 focus:outline-none m-2 md:m-4"
                        >
                            <img src={DiscordIcon} alt="Discord" className="w-24 h-24 md:w-[160px] md:h-[161px]" />
                        </button>
                    </div>

                    <div className="bg-[#D4A074] text-white rounded-[50px] p-6 md:p-8 flex flex-col justify-center items-center w-full max-w-xl lg:w-[550px] h-auto lg:h-[370px] space-y-6">
                        <h3 className="text-4xl md:text-[40px] text-center">
                            CS Careers Newsletter
                        </h3>
                        <p className="text-center text-xl">
                            Stay updated on events and opportunities!
                        </p>
                        <EmailInput />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Home;