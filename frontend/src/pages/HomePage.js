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

    // לחיצות על הלוגו (5 לחיצות מהירות)
    const handleLogoClick = () => {
        setClickCount(prev => prev + 1)

        if (clickCount === 4) { // לחיצה חמישית
            console.log('🎯 Logo clicks activated')
            navigate('/dashboard-access')
            setClickCount(0)
        }

        // איפוס אחרי 2 שניות
        setTimeout(() => setClickCount(0), 2000)
    }

    return (
        <div className="min-h-screen bg-haskurit-white">
            <Hero onLogoClick={handleLogoClick} />
            <Tools />
            {/* <About /> */}
            <Contact />
            <Footer />
        </div>
    )
}

export default HomePage