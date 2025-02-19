import mainLogo from "@assets/main_logo.svg"
import GobblerPhoto from "@assets/gobbler_main.jpeg"
import MainLogo from "../assets/main_logo.svg"
import InstaIcon from "../assets/instagram_icon.svg"
import LinkIcon from "../assets/linkedin_icon.svg"
import FacebookIcon from "../assets/facebook_icon.svg"
import DiscordIcon from "../assets/discord_icon.svg"
import GobblerPhoto from "../assets/gobbler_main.jpeg"
import EmailInput from "../components/EmailInput"


function Home() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Hero Section */}
            <main className="flex-grow bg-[#861f41] p-6 flex items-center justify-center min-h-screen">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
                    <div className="text-left max-w-lg space-y-11">
                        <h1 className="text-white text-7xl font-bold font-['Outfit']">
                            CS Careers at Virginia Tech
                        </h1>
                        <p className="text-white text-[25px] font-light font-['Outfit'] leading-10 mt-4">
                            Virginia Tech’s fastest growing technology organization.
                            Re-defining computer science on campus.
                        </p>
                        <div className="flex gap-6 mt-8">
                            <button className="bg-[#d6995d] text-[#faefef] text-2xl font-semibold font-['Outfit'] tracking-wide py-4 px-8 rounded-full">
                                Who We Are
                            </button>
                            <button className="border-4 border-[#d6995d] text-[#fdfbfb] text-2xl font-semibold font-['Outfit'] tracking-wide py-4 px-8 rounded-full">
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

            {/* Mission Section */}
            <div className="w-full min-h-[890px] flex items-center bg-[#d6995d] p-12">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-start space-x-10">
                    <div className="bg-[#861f41] text-white rounded-[50px] p-8 flex flex-col space-y-10 w-[60%] h-[420px]">
                        <h2 className="text-[55px] font-bold font-['Outfit'] leading-[55px]">
                            Our Mission
                        </h2>
                        <p className="text-[30px] font-light font-['Outfit'] leading-[60px] text-[#fdf6f6]">
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
            <div className="w-full flex flex-col items-center bg-[#861f41] py-16 pb-40">
                <div className="w-full text-center mb-40">
                    <h2 className="text-white text-[70px] font-bold font-['Outfit'] leading-[77px]">
                        Follow Us
                    </h2>
                    <div className="w-[309.26px] h-[11px] bg-[#d6995d] mx-auto mt-2"></div>
                </div>
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-4">
                    <div className="bg-[#d6995d] text-white rounded-[50px] p-8 py-2 flex flex-wrap justify-between items-center w-[550px] h-[370px]">
                        <img src={InstaIcon} alt="Instagram" className="w-[154px] h-[148px] m-4" />
                        <img src={LinkIcon} alt="LinkedIn" className="w-[149px] h-[149px] m-4" />
                        <img src={FacebookIcon} alt="Facebook" className="w-[143px] h-[143px] m-4" />
                        <img src={DiscordIcon} alt="Discord" className="w-[160px] h-[161px] m-4" />
                    </div>

                    <div className="bg-[#d6995d] text-white rounded-[50px] p-8 flex flex-col justify-center items-center w-[550px] h-[370px] space-y-6">
                        <h2 className="text-[40px] font-bold font-['Outfit'] leading-[44px]">
                            CS Careers Newsletter
                        </h2>
                        <p className="text-[26px] font-normal font-['Outfit'] leading-7">
                            Stay updated on events and opportunities!
                        </p>
                        <EmailInput />
                        <button className="bg-[#861f41] rounded-[50px] w-64 h-[62.38px] text-white text-[23px] font-semibold font-['Helvetica']">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default Home;