import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa"; // Import icons

function PhotoGallery() {

    // Top of your component
    const imageModules = import.meta.glob('../assets/pics/events/*.{jpg,jpeg,png,JPG}', {
        eager: true,
        as: 'url',
    });

    const importedImages = Object.values(imageModules);


    // Array of image filenames 
    // const images = [
    //     "gobbler_alex.jpeg",
    //     "gobbler_anton.jpeg",
    //     "gobbler_main.jpeg",
    //     "msft_event.png",
    //     "pizza_party.png",
    //     "CSSocial2.jpeg",
    //     "VTHacks Misc 2.jpeg",
    //     "Harjas.jpg",
    //     "VTHacks Gian.jpeg",
    //     "FYE.jpeg",
    //     "Anton VTHacks.jpeg",
    //     "Gobbler Gabe.jpg",
    //     "AIEvent2.jpeg",
    //     "AIEvent3.jpeg",
    //     "AntonCrowd.jpeg",
    //     "CSSocial3.jpeg",
    //     "RishiPhoto2.jpeg",
    //     "RishiPhoto3.jpeg",
    //     "AIEvent3.jpeg",
    //     "Academia2.jpeg"
    // ];


    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    // Function to handle opening an image
    const openImage = (index: number) => setSelectedIndex(index);

    // Function to close the modal
    const closeImage = () => setSelectedIndex(null);

    // Function to navigate to previous image
    const prevImage = () => {
        if (selectedIndex !== null) {
            setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : importedImages.length - 1));
        }
    };

    // Function to navigate to next image
    const nextImage = () => {
        if (selectedIndex !== null) {
            setSelectedIndex((prev) => (prev !== null && prev < importedImages.length - 1 ? prev + 1 : 0));
        }
    };

    // Handle keyboard navigation when modal is open
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (selectedIndex !== null) {
                if (event.key === "ArrowLeft") {
                    prevImage();
                } else if (event.key === "ArrowRight") {
                    nextImage();
                } else if (event.key === "Escape") {
                    closeImage();
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedIndex]); // Re-run effect when `selectedIndex` changes


    return (
        <div className="w-full bg-csc-maroon-bg text-center mt-20">
            <h2 className="text-4xl sm:text-5xl font-bold font-['Outfit']">
                Photo Gallery
            </h2>
            <div className="w-[240px] sm:w-[330px] h-[11px] bg-csc-organge-bg mx-auto mt-3 rounded-md"></div>
            {/* Image grid container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 max-w-6xl mx-auto mt-8 flex-grow">
                {importedImages.map((src, index) => (
                    <div key={index} className="w-full h-64 max-w-[400px] max-h-[400px] mx-auto">
                        <img
                            src={src}
                            alt={`Gallery image ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg shadow-lg hover:scale-105 transition-transform cursor-pointer"
                            onClick={() => openImage(index)}
                        />
                    </div>
                ))}
            </div>

            {/* Expanded Image Modal with Navigation Controls */}
            {selectedIndex !== null && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                    {/* Close Button */}
                    <button
                        className="absolute top-5 right-5 text-white text-3xl cursor-pointer"
                        onClick={closeImage}
                    >
                        <FaTimes />
                    </button>

                    {/* Previous Button */}
                    <button
                        className="absolute left-5 text-white text-4xl p-2 bg-black bg-opacity-50 rounded-full"
                        onClick={prevImage}
                    >
                        <FaChevronLeft />
                    </button>

                    {/* Image */}
                    <img
                        src={importedImages[selectedIndex]}
                        alt="Expanded"
                        className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-xl"
                    />

                    {/* Next Button */}
                    <button
                        className="absolute right-5 text-white text-4xl p-2 bg-black bg-opacity-50 rounded-full"
                        onClick={nextImage}
                    >
                        <FaChevronRight />
                    </button>
                </div>
            )}
        </div>
    );
}

export default PhotoGallery;