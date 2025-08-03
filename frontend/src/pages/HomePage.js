// import Hero from '../components/sections/Hero'
import Tools from '../components/sections/Tools'
import Contact from '../components/sections/Contact'
import Footer from '../components/sections/Footer'
import Banner from '../components/sections/Banner'
import About from '../components/sections/About'

const HomePage = () => {
    return (
        <div className="min-h-screen bg-haskurit-white">
            <Banner />
            <About />
            <Tools />
            <Contact />
            <Footer />
        </div>
    )
}

export default HomePage