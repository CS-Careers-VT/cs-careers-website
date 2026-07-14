import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

const filters = ["All", "Company Nights", "Workshops", "Socials", "Hackathons", "Board"];

function tileSizeClass(index: number) {
    if (index % 7 === 0) return " gallery-tile--lg";
    if (index % 7 === 4) return " gallery-tile--tall";
    return "";
}

function PhotoGallery() {
    const imageModules = import.meta.glob('../assets/pics/events/*.{jpg,jpeg,png,JPG}', {
        eager: true,
        as: 'url',
    });

    const importedImages = Object.values(imageModules) as string[];

    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const openImage = (index: number) => setSelectedIndex(index);
    const closeImage = () => setSelectedIndex(null);

    const prevImage = () => {
        setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : importedImages.length - 1));
    };

    const nextImage = () => {
        setSelectedIndex((prev) => (prev !== null && prev < importedImages.length - 1 ? prev + 1 : 0));
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
        <>
            {/* PAGE HEADER */}
            <section className="page-head">
                <span className="eyebrow"><span className="eyebrow__dot"></span>Photo Gallery</span>
                <h1 className="page-title">Memories from <span className="grad">our community.</span></h1>
                <p className="page-sub">
                    Every event, every team night, every too-late study session —
                    a scrapbook of what our members look like when they show up for each other.
                </p>
            </section>

            {/* FILTER CHIPS */}
            <section className="gallery-filters">
                {filters.map((f, i) => (
                    <button key={f} className={`gallery-chip${i === 0 ? " is-active" : ""}`} type="button">
                        {f}
                    </button>
                ))}
            </section>

            {/* GRID */}
            <section className="gallery-section">
                <div className="gallery-grid">
                    {importedImages.map((src, index) => (
                        <figure
                            className={`gallery-tile${tileSizeClass(index)}`}
                            key={index}
                            onClick={() => openImage(index)}
                        >
                            <img
                                src={src}
                                alt={`Gallery image ${index + 1}`}
                                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                            />
                        </figure>
                    ))}
                </div>
            </section>

            {/* LIGHTBOX */}
            {selectedIndex !== null && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                    <button
                        className="absolute top-5 right-5 text-white text-3xl cursor-pointer"
                        onClick={closeImage}
                    >
                        <FaTimes />
                    </button>

                    <button
                        className="absolute left-5 text-white text-4xl p-2 bg-black bg-opacity-50 rounded-full"
                        onClick={prevImage}
                    >
                        <FaChevronLeft />
                    </button>

                    <img
                        src={importedImages[selectedIndex]}
                        alt="Expanded"
                        className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-xl"
                    />

                    <button
                        className="absolute right-5 text-white text-4xl p-2 bg-black bg-opacity-50 rounded-full"
                        onClick={nextImage}
                    >
                        <FaChevronRight />
                    </button>
                </div>
            )}
        </>
    );
}

export default PhotoGallery;
