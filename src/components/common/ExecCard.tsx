// ExecCard.jsx
export default function ExecCard({ name, role, photo }) {
    return (
        <div className="relative flex-shrink-0 w-64 sm:w-72 md:w-80 aspect-[3/4]">
            {/* orange pill (behind) */}
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-csc-organge-bg rounded-[50px] z-0" />

            {/* grey circle behind headshot */}
            <div
                className="absolute top-0 left-1/2 transform -translate-x-1/2
                     w-4/5 aspect-square bg-zinc-300 rounded-full z-10"
            />

            {/* headshot (on top) */}
            <img
                src={photo}
                alt={name}
                className="absolute top-0 left-1/2 transform -translate-x-1/2
                     w-4/5 aspect-square rounded-full object-cover z-20"
            />

            {/* name (just under the photo) */}
            <div
                className="absolute w-full text-center text-white text-2xl sm:text-3xl font-bold z-10"
                style={{ top: '68%' }}
            >
                {name}
            </div>

            {/* role (near the bottom of the pill) */}
            <div className="absolute w-full text-center text-white text-lg sm:text-xl font-normal bottom-6 z-10">
                {role}
            </div>
        </div>
    );
}
