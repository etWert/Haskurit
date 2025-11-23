import Banner from '../components/sections/Banner'
import Menu from '../components/sections/Menu'
import About from '../components/sections/About'
import Tools from '../components/sections/Tools'
import Contact from '../components/sections/Contact'
import Footer from '../components/sections/Footer'

const HomePage = () => {
    return (
        <div className="min-h-screen bg-haskurit-white">
            <Banner />
            <div className="absolute top-0 left-0 right-0 z-10 pt-4 flex justify-start pr-8">
                <Menu />
            </div>
            <About />
            <Tools />
            <Contact />
            <Footer />
        </div>
    )
}

export default HomePage