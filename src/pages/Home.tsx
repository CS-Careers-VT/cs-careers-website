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
            <main className="flex-grow bg-csc-maroon-bg p-6 flex items-center justify-center">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
                    <div className="text-left max-w-lg space-y-11">
                        <h1>
                            CS Careers at Virginia Tech
                        </h1>
                        <p className="text-white">
                            Virginia Tech’s fastest growing technology organization.
                            Re-defining computer science on campus.
                        </p>
                        <div className="flex gap-6 mt-8">
                            <button
                                className="orange-btn-primary transform transition-transform duration-300 hover:scale-105"
                                onClick={() =>
                                    handleButtonNav({ type: "internal", path: "/about-us" }, navigate)
                                }
                            >
                                Who We Are
                            </button>
                            <button
                                className="orange-btn-secondary transform transition-transform duration-300 hover:scale-105"
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
                            className="h-[415px] w-[485px] object-contain"
                        />
                    </div>
                </div>
            </main>

            <div className="w-full min-h-[890px] flex items-center bg-csc-organge-bg p-12">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-start space-x-10">
                    {/* Left Content (Mission Statement) */}
                    <div className="bg-csc-maroon-bg text-white p-8 flex flex-col space-y-12 w-[800px] h-[320px] rounded-[50px] box-border">
                        <h2 className="text-5xl font-bold">Our Vision</h2>
                        <p className="text-2xl leading-loose">
                            To foster a robust educational space<br />
                            where students interested in computer science<br />
                            can flourish on their journey to the job market.
                        </p>
                    </div>

                    {/* Image with matching height and width */}
                    <div>
                        <img
                            src={GobblerPhoto}
                            alt="Gobblerfest Photo"
                            className="w-[800px] h-[320px] rounded-[50px] object-cover object-center transition-transform duration-300"
                        />
                    </div>
                </div>
            </div>
            {/* Follow Us Section */}
            <div
                ref={followUsRef}
                className="w-full flex flex-col items-center bg-csc-maroon-bg py-16 pb-24">
                <div className="w-full text-center mb-28">
                    <h2>
                        Follow Us
                    </h2>
                    <div className="w-[215px] h-[11px] bg-csc-organge-bg mx-auto mt-2"></div>
                </div>
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-4">
                    <div className="bg-csc-organge-bg text-white rounded-[50px] p-8 py-2 flex flex-wrap justify-between items-center w-[550px] h-[370px]">
                        {/* Instagram */}
                        <button
                            onClick={() =>
                                handleButtonNav({
                                    type: "external",
                                    url: "https://www.instagram.com/cscareersvt/",
                                })
                            }
                            className="transition-transform duration-300 ease-in-out transform hover:scale-110 focus:outline-none m-4"
                        >
                            <img src={InstaIcon} alt="Instagram" className="w-[154px] h-[148px]" />
                        </button>

                        {/* LinkedIn */}
                        <button
                            onClick={() =>
                                handleButtonNav({
                                    type: "external",
                                    url: "https://www.linkedin.com/company/cscareersvt/posts/?feedView=all",
                                })
                            }
                            className="transition-transform duration-300 ease-in-out transform hover:scale-110 focus:outline-none m-4"
                        >
                            <img src={LinkIcon} alt="LinkedIn" className="w-[149px] h-[149px]" />
                        </button>

                        {/* Facebook */}
                        <button
                            onClick={() =>
                                handleButtonNav({
                                    type: "external",
                                    url: "https://www.facebook.com/people/CS-Careers-at-VT/61573148439665/",
                                })
                            }
                            className="transition-transform duration-300 ease-in-out transform hover:scale-110 focus:outline-none m-4"
                        >
                            <img src={FacebookIcon} alt="Facebook" className="w-[143px] h-[143px]" />
                        </button>

                        {/* Discord */}
                        <button
                            onClick={() =>
                                handleButtonNav({
                                    type: "external",
                                    url: "https://discord.com/invite/YFTPSdcFxD?fbclid=PAZXh0bgNhZW0CMTEAAaZIa_lGREGfAHTM-u5BwjDghZFov9RqlzMxDSoN2ctGrTbKXEBpn27EElw_aem_tx7bJgjG1KQOrfClDkAi6g",
                                })
                            }
                            className="transition-transform duration-300 ease-in-out transform hover:scale-110 focus:outline-none m-4"
                        >
                            <img src={DiscordIcon} alt="Discord" className="w-[160px] h-[161px]" />
                        </button>
                    </div>

                    <div className="bg-csc-organge-bg text-white rounded-[50px] p-8 flex flex-col justify-center items-center w-[550px] h-[370px] space-y-6">
                        <h3>
                            CS Careers Newsletter
                        </h3>
                        <p>
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