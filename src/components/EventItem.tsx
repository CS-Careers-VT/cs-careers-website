interface EventItemProps {
    title: string;
    date: string;
    imageSrc: string;
    description: string;
  }
  
  export default function EventItem({ title, date, imageSrc, description }: EventItemProps) {
    return (
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 max-w-5xl mx-auto my-10 px-4">
        {/* Date and dot line for desktop */}
        <div className="hidden md:flex flex-col items-end pr-4 w-1/6">
          <span className="text-white text-lg font-outfit mb-2">{date}</span>
          <div className="w-[2px] h-full bg-white opacity-40"></div>
        </div>
  
        {/* Timeline dot */}
        <div className="hidden md:flex items-center justify-center w-6 h-6 rounded-full bg-csc-organge-bg border-2 border-white mt-2"></div>
  
        {/* Content */}
        <div className="bg-[#FDF9F4] rounded-[50px] shadow-lg overflow-hidden w-full md:w-4/6">
          <img src={imageSrc} alt={title} className="w-full object-cover h-64 md:h-[350px]" />
          <div className="p-6 md:p-10 space-y-4">
            <h3 className="text-3xl font-bold text-csc-maroon font-outfit">{title}</h3>
            <p className="text-csc-maroon font-outfit text-lg">{description}</p>
          </div>
        </div>
  
        {/* Mobile date */}
        <div className="md:hidden text-center mt-2 text-white text-xl font-outfit">
          {date}
        </div>
      </div>
    );
  }
  