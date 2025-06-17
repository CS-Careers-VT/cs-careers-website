import MainLogo from "@assets/icons/main_logo.svg";
import EmailInput from "@components/EmailInput";
import GobblerPhoto from "@assets/pics/events/gobbler_main.jpeg";
import LinkIcon from "@assets/icons/linkedin.svg";
import FacebookIcon from "@assets/icons/facebook.svg";
import DiscordIcon from "@assets/icons/discord.svg";
import InstaIcon from "@assets/icons/instagram.svg";

function Home() {
  return (
    <div className="flex flex-col">
      <main className="bg-csc-maroon-bg p-6 flex items-center justify-center">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="text-left space-y-8 max-w-xl">
            <h1>CS Careers at Virginia Tech</h1>
            <p className="text-white">
              Virginia Tech’s fastest growing technology organization. Re-defining computer science on campus.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="orange-btn-primary w-full sm:w-auto">Who We Are</button>
              <button className="orange-btn-secondary w-full sm:w-auto">Get Involved</button>
            </div>
          </div>
          <img
            src={MainLogo}
            alt="CS Careers @ VT Logo"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-contain mt-10 md:mt-0"
          />
        </div>
      </main>

      <section className="w-full bg-csc-organge-bg py-16 px-4 flex items-center justify-center">
        <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center gap-10">
          <div className="bg-csc-maroon-bg text-white rounded-[50px] p-8 flex flex-col space-y-6 w-full lg:w-3/5">
            <h2>Our Vision</h2>
            <p>
              To foster a robust educational space where students interested in computer science can flourish on their journey to the job market.
            </p>
          </div>
          <img
            src={GobblerPhoto}
            alt="Gobblerfest Photo"
            className="w-full max-w-2xl h-auto rounded-[50px] object-cover"
          />
        </div>
      </section>

      <section className="w-full bg-csc-maroon-bg py-16 px-4 flex flex-col items-center">
        <div className="text-center mb-20">
          <h2>Follow Us</h2>
          <div className="w-32 h-[11px] bg-csc-organge-bg mx-auto mt-2"></div>
        </div>

        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-8">
          <div className="bg-csc-organge-bg text-white rounded-[50px] p-6 flex flex-wrap justify-center items-center w-full max-w-xl gap-4">
            <img src={InstaIcon} alt="Instagram" className="w-24 h-24" />
            <img src={LinkIcon} alt="LinkedIn" className="w-24 h-24" />
            <img src={FacebookIcon} alt="Facebook" className="w-24 h-24" />
            <img src={DiscordIcon} alt="Discord" className="w-24 h-24" />
          </div>

          <div className="bg-csc-organge-bg text-white rounded-[50px] p-6 flex flex-col items-center w-full max-w-xl space-y-6">
            <h3>CS Careers Newsletter</h3>
            <p className="text-center">Stay updated on events and opportunities!</p>
            <EmailInput />
            <button className="maroon-btn-primary w-full">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
