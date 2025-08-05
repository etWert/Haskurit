import React from 'react'

const ToolCard = ({ tool }) => {
    return (
        <div className="bg-white shadow-md rounded-xl overflow-hidden transition-transform transform hover:scale-105 duration-200 h-88">
            {/* תמונה */}
            <img
                src={tool.imageUrl}
                alt={tool.name}
                className="w-full h-44 object-cover"
            />

            {/* תוכן */}
            <div className="p-4 flex flex-col justify-between h-[calc(100%-11rem)]">
                {/* שם ותיאור הכלי */}
                <div>
                    <h3 className="text-xl font-bold text-haskurit-gray mb-1">{tool.name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-3">{tool.description}</p>
                </div>

                {/* מחיר (תחתית, בצד שמאל) */}
                <div className="flex justify-end items-center mt-2">
                    <span className="text-lg font-semibold text-haskurit-yellow">
                        ₪{tool.price} ליום
                    </span>
                    {/* כפתור עתידי להזמנה */}
                    {/* <button
                        disabled
                        className="bg-haskurit-gray text-white px-4 py-1 rounded-lg text-sm cursor-not-allowed opacity-60 ml-auto"
                    >
                        בהזמנה בהמשך
                    </button> */}
                </div>
            </div>
        </div>
    )
}

export default ToolCard
