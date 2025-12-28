import { FaPhone } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const ToolCard = ({ tool }) => {
    const navigate = useNavigate()

    const handleCardClick = (e) => {
        // אם לחצו על לינק הטלפון - אל תעשה כלום
        if (e.target.closest('a')) return
        navigate(`/tools/${tool._id}`)
    }

    return (
        <div
            onClick={handleCardClick}
            className="bg-white shadow-md rounded-xl overflow-hidden transition-transform transform cursor-pointer hover:scale-105 duration-200 h-88"
        >
            <img
                src={tool.imageUrl}
                alt={tool.name}
                className="w-full h-44 object-contain bg-gray-100 p-2"
            />
            <div className="p-4 flex flex-col justify-between h-[calc(100%-11rem)]">
                <div>
                    <h3 className="text-xl font-bold text-haskurit-gray mb-1">{tool.name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-3">{tool.description}</p>
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="text-lg font-semibold text-haskurit-yellow">
                        ₪{tool.price} ליום
                    </span>
                    <a
                        href="tel:+972527694198"
                        aria-label="התקשר עכשיו"
                        className="bg-haskurit-gray text-white p-3 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        <FaPhone />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default ToolCard