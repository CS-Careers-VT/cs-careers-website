interface EventItemProps {
    title: string;
    date: string;
    imageSrc: string;
}

export default function EventItem({ title, date, imageSrc }: EventItemProps) {
    return (
        <div className="grid grid-cols-[auto_1fr] gap-x-8 items-start">
            {/* Node + Date column */}
            <div className="flex flex-col items-center">
                <div className="w-6 h-6 bg-csc-organge-bg rounded-full" />
                <div className="mt-2 text-white text-xl font-bold font-['Outfit']">
                    {date}
                </div>
            </div>

            {/* Content column: Title + Image */}
            <div>
                <div className="text-white text-4xl font-bold font-['Outfit'] mb-2">
                    {title}
                </div>
                <img
                    src={imageSrc}
                    alt={title}
                    className="w-full max-w-[810px] aspect-[81/53] rounded-2xl object-cover overflow-hidden"
                />
            </div>
        </div>
    );
}