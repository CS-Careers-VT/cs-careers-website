interface EventItemProps {
    title: string;
    date: string;
    imageSrc: string;
    description: string;
}

export default function EventItem({ title, date, imageSrc, description }: EventItemProps) {
    return (
        <>
            {/* ← Date (col 1) */}
            <div className="flex justify-end items-start mt-1.5 -mr-16 text-white text-xl font-normal font-['Outfit']">
                {date}
            </div>

            {/* ← Node (col 2) */}
            <div className="flex justify-center items-start">
                <div className="relative z-10 w-6 h-6 mt-2 bg-csc-organge-bg rounded-full" />
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
        </>
    );
}
