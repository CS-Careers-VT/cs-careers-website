import { useState } from "react";

function PhotoGallery() {

    // Array of image filenames 
    const images = [
        "gobbler_alex.jpeg",
        "gobbler_anton.jpeg",
        "gobbler_main.jpeg",
        "msft_event.png",
        "pizza_party.png"
    ];

    const [selectedImage, setSelectedImage] = useState<string | null>(null);


    return (
        <div className="w-full text-center mb-40 min-h-screen">
            <h2>
                Photo Gallery
            </h2>
            <div className="w-[309.26px] h-[11px] bg-csc-organge-bg mx-auto mt-2"></div>
            {/* Image grid container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 max-w-6xl mx-auto mt-8">
                {images.map((filename, index) => (
                    <div key={index} className="w-full h-64 max-w-[400px] max-h-[400px] mx-auto">
                        <img
                            src={`../../src/assets/pics/${filename}`} 
                            alt={`Gallery image ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg shadow-lg hover:scale-105 transition-transform cursor-pointer"
                            onClick={() => setSelectedImage(filename)}
                        />
                    </div>
                ))}
            </div>

            {/* Clicked Image Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 cursor-pointer"
                    onClick={() => setSelectedImage(null)} // Close on click outside
                >
                    <img
                        src={`../../src/assets/pics/${selectedImage}`}
                        alt="Expanded"
                        className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-xl"
                    />
                </div>
            )}
        </div>
    );
}

export default PhotoGallery;