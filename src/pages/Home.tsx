import mainLogo from "@assets/main_logo.svg"
import GobblerPhoto from "@assets/gobbler_main.jpeg"


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
                            <button className="bg-csc-organge-bg text-[#faefef] text-2xl font-semibold tracking-wide py-4 px-8 rounded-full">
                                Who We Are
                            </button>
                            <button className="border-4 border-csc-organge-bg text-[#fdfbfb] text-2xl font-semibold tracking-wide py-4 px-8 rounded-full">
                                Get Involved
                            </button>
                        </div>
                    </div>
                    <div className="flex-shrink-0 mt-8 md:mt-0">
                        <img
                            src={mainLogo}
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
                            in CS can flourish on their journey to the job market.
                        </p>
                    </div>

                    {/* Right Image (Aligned Lower Right) */}
                    <div className="self-end">
                        <img
                            src={GobblerPhoto}
                            alt="Gobblerfest Photo"
                            className="w-[750px] h-[400px] rounded-[50px] object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Home;