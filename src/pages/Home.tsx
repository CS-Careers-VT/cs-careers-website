import MainLogo from "@assets/main_logo.svg"
import EmailInput from "@components/EmailInput"
// Assets
import GobblerPhoto from "@assets/pics/gobbler_main.jpeg"
import LinkIcon from "@assets/icons/linkedin.svg"
import FacebookIcon from "@assets/icons/facebook.svg"
import DiscordIcon from "@assets/icons/discord.svg"
import InstaIcon from "@assets/icons/instagram.svg"


function Home() {
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
                            <button className="orange-btn-primary">
                                Who We Are
                            </button>
                            <button className="orange-btn-secondary">
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

            {/* Hero Section 2 */}
            <div className="w-full min-h-[890px] flex items-center bg-csc-organge-bg p-12">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-start space-x-10">
                    {/* Left Content (Mission Statement) */}
                    <div className="bg-csc-maroon-bg text-white rounded-[50px] p-8 flex flex-col space-y-6 w-[60%]">
                        <h2>
                            Our Mission
                        </h2>
                        <p>
                            To foster a robust educational space where students interested
                            in computer science can flourish on their journey to the job market.
                        </p>
                    </div>

                    <div className="self-end">
                        <img
                            src={GobblerPhoto}
                            alt="Gobblerfest Photo"
                            className="w-[843px] h-[420px] rounded-[50px] object-cover"
                        />
                    </div>
                </div>
            </div>
            {/* Follow Us Section */}
            <div className="w-full flex flex-col items-center bg-csc-maroon-bg py-16 pb-40">
                <div className="w-full text-center mb-40">
                    <h2>
                        Follow Us
                    </h2>
                    <div className="w-[215px] h-[11px] bg-csc-organge-bg mx-auto mt-2"></div>
                </div>
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-4">
                    <div className="bg-csc-organge-bg text-white rounded-[50px] p-8 py-2 flex flex-wrap justify-between items-center w-[550px] h-[370px]">
                        <img src={InstaIcon} alt="Instagram" className="w-[154px] h-[148px] m-4" />
                        <img src={LinkIcon} alt="LinkedIn" className="w-[149px] h-[149px] m-4" />
                        <img src={FacebookIcon} alt="Facebook" className="w-[143px] h-[143px] m-4" />
                        <img src={DiscordIcon} alt="Discord" className="w-[160px] h-[161px] m-4" />
                    </div>

                    <div className="bg-csc-organge-bg text-white rounded-[50px] p-8 flex flex-col justify-center items-center w-[550px] h-[370px] space-y-6">
                        <h3>
                            CS Careers Newsletter
                        </h3>
                        <p>
                            Stay updated on events and opportunities!
                        </p>
                        <EmailInput />
                        <button className="maroon-btn-primary w-full">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Home;