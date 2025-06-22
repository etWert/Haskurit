import React from 'react'

const ToolCard = ({ tool }) => {
    return (
        <div className="bg-white shadow-md rounded-xl overflow-hidden transition-transform transform hover:scale-105 duration-200">
            {/* תמונה */}
            <img
                src={tool.imageUrl}
                alt={tool.name}
                className="w-full h-48 object-cover"
            />

            {/* תוכן */}
            <div className="p-4">
                <h3 className="text-xl font-bold text-haskurit-gray mb-2">{tool.name}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-3">{tool.description}</p>
                <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-haskurit-yellow">
                        ₪{tool.price} ליום
                    </span>
                    {/* כפתור עתידי להזמנה (נשאיר אותו פשוט לעת עתה) */}
                    {/* <button
                        disabled
                        className="bg-haskurit-gray text-white px-4 py-1 rounded-lg text-sm cursor-not-allowed opacity-60"
                    >
                        בהזמנה בהמשך
                    </button> */}
                </div>
            </div>
        </div>
    )
}

export default ToolCard
