import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import HeroLogo from "../components/HeroLogo";

function Home() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                {/* Page content here */}
            </main>
            <Footer />
        </div>

    )
}

export default Home;