import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

function PhotoGallery() {
    const images = [
        "gobbler_alex.jpeg", "gobbler_anton.jpeg", "gobbler_main.jpeg", "msft_event.png",
        "pizza_party.png", "CSSocial2.jpeg", "VTHacks Misc 2.jpeg", "Harjas.jpg",
        "VTHacks Gian.jpeg", "FYE.jpeg", "Anton VTHacks.jpeg", "Gobbler Gabe.jpg",
        "AIEvent2.jpeg", "AIEvent3.jpeg", "AntonCrowd.jpeg", "CSSocial3.jpeg",
        "RishiPhoto2.jpeg", "RishiPhoto3.jpeg", "AIEvent3.jpeg", "Academia2.jpeg"
    ];

    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const openImage = (index: number) => setSelectedIndex(index);
    const closeImage = () => setSelectedIndex(null);

    const prevImage = () => {
        if (selectedIndex !== null) {
            setSelectedIndex((prev) => (prev! > 0 ? prev! - 1 : images.length - 1));
        }
    };

    const nextImage = () => {
        if (selectedIndex !== null) {
            setSelectedIndex((prev) => (prev! < images.length - 1 ? prev! + 1 : 0));
        }
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (selectedIndex !== null) {
                if (event.key === "ArrowLeft") prevImage();
                else if (event.key === "ArrowRight") nextImage();
                else if (event.key === "Escape") closeImage();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [selectedIndex]);

    return (
        <div className="w-full bg-csc-maroon-bg text-center pt-28 pb-16 px-4 min-h-screen">
            <h2 className="text-white text-4xl md:text-5xl font-bold font-outfit mb-2">
                Photo Gallery
            </h2>
            <div className="w-[309.26px] h-[11px] bg-csc-organge-bg mx-auto mb-12"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {images.map((filename, index) => (
                    <div key={index} className="w-full h-64 max-w-[400px] mx-auto">
                        <img
                            src={`../../src/assets/pics/events/${filename}`}
                            alt={`Gallery image ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg shadow-md hover:scale-105 transition-transform cursor-pointer"
                            onClick={() => openImage(index)}
                        />
                    </div>
                ))}
            </div>

            {selectedIndex !== null && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 p-4">
                    {/* Close */}
                    <button
                        className="absolute top-5 right-5 text-white text-3xl z-50"
                        onClick={closeImage}
                        aria-label="Close"
                    >
                        <FaTimes />
                    </button>

                    {/* Prev */}
                    <button
                        className="absolute left-5 text-white text-4xl p-2 bg-black bg-opacity-40 rounded-full z-50"
                        onClick={prevImage}
                        aria-label="Previous"
                    >
                        <FaChevronLeft />
                    </button>

                    {/* Image */}
                    <img
                        src={`../../src/assets/pics/events/${images[selectedIndex]}`}
                        alt={`Gallery image ${selectedIndex + 1}`}
                        className="max-w-[90vw] max-h-[80vh] object-contain rounded-xl shadow-lg"
                    />

                    {/* Next */}
                    <button
                        className="absolute right-5 text-white text-4xl p-2 bg-black bg-opacity-40 rounded-full z-50"
                        onClick={nextImage}
                        aria-label="Next"
                    >
                        <FaChevronRight />
                    </button>
                </div>
            )}
        </div>
    );
}

export default PhotoGallery;
