import ExecCard from "@components/ExecCard";
import FirstYearPhoto from "@assets/pics/events/first_year_experience.jpg";
import MicrosoftPhoto from "@assets/pics/events/msft_event.png";
import Alexa from "@assets/pics/headshots/Alexa.jpeg";
import Amy from "@assets/pics/headshots/Amy.jpeg";
import Harita from "@assets/pics/headshots/Harita.jpeg";
import Lucas from "@assets/pics/headshots/Lucas.jpeg";
import Nina from "@assets/pics/headshots/Nina.jpeg";
import Reet from "@assets/pics/headshots/Reet.jpeg";
import Aaron from "@assets/pics/headshots/Aaron.jpeg";
import Gabe from "@assets/pics/headshots/Gabe.jpeg";
import Gianfranco from "@assets/pics/headshots/Gianfranco.jpg";
import Alex from "@assets/pics/headshots/Alex.jpeg";
import Lauren from "@assets/pics/headshots/Lauren.jpeg";
import Sam from "@assets/pics/headshots/Sam.jpeg";
import Stuti from "@assets/pics/headshots/Stuti.jpeg";
import Tarun from "@assets/pics/headshots/Tarun.jpeg";

function AboutUs() {
  return (
    <div className="w-full bg-csc-maroon-bg">
      <section className="text-center mt-20 px-4">
        <h2>By The Numbers</h2>
        <div className="w-40 h-[11px] bg-csc-organge-bg mx-auto mt-2" />
        <div className="flex flex-wrap justify-center gap-6 mt-20 mb-32">
          {[
            { label: "Members", value: "1200+" },
            { label: "Events", value: "30+" },
            { label: "Largest CS Organization", value: "#1" },
          ].map((item, i) => (
            <div key={i} className="w-72 h-60 bg-[#D6995D] rounded-[50px] p-6 relative">
              <div className="text-white text-8xl font-semibold tracking-[5px] mt-4">{item.value}</div>
              <div className="text-white text-3xl font-semibold mt-12 tracking-widest">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full bg-csc-organge-bg px-4 py-20 flex flex-col items-center">
        <h2 className="text-center">How We Serve</h2>
        <div className="w-4/5 max-w-xs md:max-w-md h-2 bg-csc-maroon-bg my-4" />
        <div className="mt-12 w-full max-w-7xl flex flex-col lg:flex-row justify-between gap-12 px-4">
          <div className="flex flex-col gap-10 w-full lg:w-1/2">
            <p className="text-pink-50 text-lg md:text-xl leading-relaxed">
              CS Careers at Virginia Tech is committed to creating an educational space where VT students interested in careers related to computer science can be brought together to work on their journey to the job market...
            </p>
            <p className="text-pink-50 text-lg md:text-xl leading-relaxed">
              Established in the Fall of 2022, our organization has rapidly become a hub for connecting ambitious students with top companies and tech opportunities...
            </p>
          </div>
          <div className="flex flex-col items-center lg:items-end gap-8 w-full lg:w-1/2">
            <img src={MicrosoftPhoto} alt="Microsoft Event" className="w-full max-w-md rounded-2xl shadow-lg" />
            <img src={FirstYearPhoto} alt="First Year Experience" className="w-full max-w-md rounded-2xl shadow-lg" />
          </div>
        </div>
      </section>

      <section className="text-center mt-20 px-4">
        <h2>Meet The Executive Board!</h2>
        <div className="w-72 h-[11px] bg-csc-organge-bg mx-auto mt-2" />
      </section>

      <section className="mt-20 px-4 max-w-7xl mx-auto">
        <h3 className="text-white text-4xl font-semibold text-center pt-20">Board of Directors</h3>
        <div className="mt-12 flex flex-wrap justify-center gap-12">
          {/* All ExecCard components... */}
          <ExecCard name="Lauren Ruiz-Arenas" role="President" photo={Lauren} />
          <ExecCard name="Gianfranco Vivanco" role="Co-Vice President" photo={Gianfranco} />
          <ExecCard name="Alex Brown" role="Co-Vice President" photo={Alex} />
          <ExecCard name="Tarun Nandamudi" role="Operations Director" photo={Tarun} />
          <ExecCard name="Stuti Shah" role="Finance Director" photo={Stuti} />
          <ExecCard name="Sam Jarvis" role="Co-Marketing Director" photo={Sam} />
          <ExecCard name="Alexa Thompson" role="Co-Marketing Director" photo={Alexa} />
          <ExecCard name="Gabriel Palomino" role="Opportunities Chair" photo={Gabe} />
          <ExecCard name="Aaron Boateng" role="Webmaster" photo={Aaron} />
        </div>
      </section>

      <section className="mt-20 px-4 max-w-7xl mx-auto pb-32">
        <h3 className="text-white text-4xl font-semibold text-center pt-20">Officers</h3>
        <div className="mt-12 flex flex-wrap justify-center gap-12">
          <ExecCard name="Nina Yang" role="Outreach Chair" photo={Nina} />
          <ExecCard name="Amy Weston" role="Fundraising Chair" photo={Amy} />
          <ExecCard name="Reet Kaler" role="Graphic Designer" photo={Reet} />
          <ExecCard name="Harita Kondragunta" role="Co-Social Media Chair" photo={Harita} />
          <ExecCard name="Lucas Lombardi" role="Co-Social Media Chair" photo={Lucas} />
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
