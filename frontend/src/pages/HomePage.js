import Hero from '../components/sections/Hero'
import Tools from '../components/sections/Tools'
import Contact from '../components/sections/Contact'
import Footer from '../components/sections/Footer'

const HomePage = () => {
    return (
        <div className="min-h-screen bg-haskurit-white">
            <Hero />
            <Tools />
            {/* <About /> */}
            <Contact />
            <Footer />
        </div>
    )
}

export default HomePage