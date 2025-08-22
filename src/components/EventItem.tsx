interface EventItemProps {
    title: string;
    date: string;
    imageSrc: string;
    description: string;
}

export default function EventItem({ title, date, imageSrc, description }: EventItemProps) {
    return (
        <>
            {/* Mobile Layout - Card Style */}
            <div className="md:hidden">
                <div className="bg-white/10 rounded-2xl overflow-hidden mb-8">
                    <img
                        src={imageSrc}
                        alt={title}
                        className="w-full aspect-[81/53] object-cover"
                    />
                    <div className="p-6">
                        <div className="mb-3">
                            <h3 className="text-white text-2xl font-bold font-['Outfit'] mb-2">
                                {title}
                            </h3>
                            <span className="text-white text-sm font-medium font-['Outfit'] bg-csc-organge-bg px-3 py-1.5 rounded-full inline-block">
                                {date}
                            </span>
                        </div>
                        <p className="text-white text-base font-light font-['Outfit'] leading-relaxed">
                            {description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Desktop Layout - Timeline Style */}
            <div className="hidden md:contents">
                {/* ← Date (col 1) */}
                <div className="flex justify-end items-start mt-1.5 -mr-16 text-white text-xl font-normal font-['Outfit']">
                    {date}
                </div>

                {/* ← Node (col 2) */}
                <div className="flex justify-center items-start">
                    <div className="relative z-10 w-6 h-6 mt-2 bg-[#D4A074] rounded-full" />
                </div>

                {/* ← Content (col 3) */}
                <div>
                    <div className="text-white text-5xl font-bold font-['Outfit'] mb-2">
                        {title}
                    </div>
                    <img
                        src={imageSrc}
                        alt={title}
                        className="w-full max-w-[810px] aspect-[81/53] rounded-2xl object-cover mb-4"
                    />
                    <p className="text-white text-lg font-light font-['Outfit']">
                        {description}
                    </p>
                </div>
            </div>
        </>
    );
}
