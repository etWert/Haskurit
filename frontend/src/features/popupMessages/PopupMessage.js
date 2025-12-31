import { useState, useEffect } from 'react'
import { useGetRandomPopupMessageQuery } from './popupMessagesApiSlice'
import { FaTimes, FaPhone } from 'react-icons/fa'
import { useLocation } from 'react-router-dom'

const PopupMessage = () => {
    const location = useLocation()
    const [showPopup, setShowPopup] = useState(false)
    const [shouldFetch, setShouldFetch] = useState(false)
    const [hasShownOnce, setHasShownOnce] = useState(false)

    // רשימת עמודים שלא להציג בהם פופאפ
    const excludedPaths = ['/login', '/admin', '/register']
    const shouldShowPopup = !excludedPaths.some(path => location.pathname.startsWith(path))

    useEffect(() => {
        if (!shouldShowPopup) return // לא להציג בעמודי מנהל/לוגין

        const timer = setTimeout(() => {
            setShouldFetch(true)
        }, 1000)

        return () => clearTimeout(timer)
    }, [shouldShowPopup])

    const { data: popupData, isSuccess } = useGetRandomPopupMessageQuery(undefined, {
        skip: !shouldFetch
    })

    const popup = popupData?.data

    useEffect(() => {
        if (isSuccess && popup && !hasShownOnce) {
            setShowPopup(true)
            setHasShownOnce(true) // סימון שכבר הוצג פעם אחת
        }
    }, [isSuccess, popup, hasShownOnce])

    const closePopup = () => {
        setShowPopup(false)
    }

    // אם אין הודעה או הפופאפ סגור - לא מציג כלום
    if (!showPopup || !popup) {
        return null
    }

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={closePopup}
        >
            <div
                className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={closePopup}
                    className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 text-2xl z-10 bg-white rounded-full p-2 shadow-md transition"
                >
                    <FaTimes />
                </button>
                {popup.imageUrl && (
                    <div className="w-full h-48 md:h-64 overflow-hidden rounded-t-2xl p-2">
                        <img
                            src={popup.imageUrl}
                            alt={popup.title}
                            className="w-full h-full object-contain"
                        />
                    </div>
                )}
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-haskurit-gray mb-4">
                        {popup.title}
                    </h2>
                    <p className="text-gray-600 whitespace-pre-wrap mb-6 leading-relaxed">
                        {popup.content}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <a
                            href="tel:+972527694198"
                            className="flex-1 bg-haskurit-yellow text-haskurit-gray font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition"
                        >
                            <FaPhone />
                            <span>התקשר עכשיו</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopupMessage