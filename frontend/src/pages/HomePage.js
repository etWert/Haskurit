import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Hero from '../components/sections/Hero'
import Tools from '../components/sections/Tools'
import Contact from '../components/sections/Contact'
import Footer from '../components/sections/Footer'

const HomePage = () => {
    const navigate = useNavigate()
    const [clickCount, setClickCount] = useState(0)

    // קיצור מקלדת נסתר: Ctrl + Shift + A
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'A') {
                console.log('🔑 Admin access activated')
                navigate('/dashboard-access')
            }
        }

        window.addEventListener('keydown', handleKeyPress)
        return () => window.removeEventListener('keydown', handleKeyPress)
    }, [navigate])



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