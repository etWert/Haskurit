import { useParams, useNavigate } from 'react-router-dom'
import { FaPhone, FaArrowRight, FaTimes } from 'react-icons/fa'
import { useState } from 'react'
import { useGetToolByIdQuery } from '../features/tools/toolsApiSlice'

const ToolPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [imageZoomed, setImageZoomed] = useState(false)

    const { data: toolData, isLoading, isError, error } = useGetToolByIdQuery(id)

    const tool = toolData?.data

    const handleBack = () => {
        //חזרה למקום הקודם
        if (window.history.length > 1) {
            navigate(-1)
        } else {
            navigate('/')
        }
    }
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex justify-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-haskurit-gray animate-[loaderBounce_0.6s_infinite_alternate]"></span>
                    <span className="w-3 h-3 rounded-full bg-haskurit-gray animate-[loaderBounce_0.6s_infinite_alternate_0.2s]"></span>
                    <span className="w-3 h-3 rounded-full bg-haskurit-gray animate-[loaderBounce_0.6s_infinite_alternate_0.4s]"></span>
                </div>
            </div>
        )
    }

    if (isError || !tool) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <div className="text-xl text-red-600">
                    {error?.data?.message || 'הכלי לא נמצא'}
                </div>
                <button
                    onClick={handleBack}
                    className="bg-haskurit-yellow text-white px-6 py-2 rounded-lg hover:bg-yellow-500 transition-colors"
                >
                    חזור לדף הבית
                </button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-5xl mx-auto">
                {/* כפתור חזרה */}
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-haskurit-gray hover:text-haskurit-yellow transition-colors mb-6"
                >
                    <FaArrowRight />
                    <span>חזור לדף הבית</span>
                </button>

                {/* כרטיס הכלי */}
                <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-6 p-6">
                        {/* תמונה */}
                        <div className="relative">
                            <img
                                src={tool.imageUrl}
                                alt={tool.name}
                                onClick={() => setImageZoomed(true)}
                                className="w-full h-80 object-contain bg-gray-100 rounded-lg cursor-zoom-in hover:opacity-90 transition-opacity"
                            />
                            <div className="text-xs text-haskurit-gray text-center mt-2">
                                לחץ על התמונה להגדלה
                            </div>
                        </div>

                        {/* פרטים */}
                        <div className="flex flex-col justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-haskurit-gray mb-4">
                                    {tool.name}
                                </h1>

                                {tool.description && (
                                    <div className="mb-6">
                                        <h2 className="text-lg font-semibold text-haskurit-gray mb-2">
                                            תיאור:
                                        </h2>
                                        <p className="text-haskurit-gray leading-relaxed">{tool.description}</p>
                                    </div>
                                )}
                                {tool.specs && (
                                    <div className="mb-6">
                                        <h2 className="text-lg font-semibold text-gray-700 mb-2">
                                            מפרט טכני:
                                        </h2>
                                        <p className="text-haskurit-gray">{tool.specs}</p>
                                    </div>
                                )}
                            </div>

                            {/* מחיר וכפתור */}
                            <div className="border-t pt-6 mt-6">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-haskurit-gray">מחיר השכרה:</span>
                                    <span className="text-3xl font-bold text-haskurit-yellow">
                                        ₪{tool.price}
                                        <span className="text-lg text-haskurit-yellow"> ליום</span>
                                    </span>
                                </div>
                                <a
                                    href="tel:+972527694198"
                                    className="w-full bg-haskurit-gray text-white py-4 rounded-lg flex items-center justify-center gap-3 hover:bg-neutral-700 transition-colors text-lg font-semibold"
                                >
                                    <span>התקשר להזמנה</span>
                                    <FaPhone />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* מודאל תמונה מוגדלת */}
            {imageZoomed && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
                    onClick={() => setImageZoomed(false)}
                >
                    <button
                        className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300"
                        onClick={() => setImageZoomed(false)}
                    >
                        <FaTimes />
                    </button>
                    <img
                        src={tool.imageUrl}
                        alt={tool.name}
                        className="max-w-full max-h-full object-contain"
                    />
                </div>
            )}
        </div>
    )
}

export default ToolPage