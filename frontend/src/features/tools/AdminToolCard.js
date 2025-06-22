import React from 'react'
import { useDeleteToolMutation } from './toolsApiSlice'

const AdminToolCard = ({ tool, onSuccess }) => {
  const [deleteTool, { isLoading: isDeleting }] = useDeleteToolMutation()

  const handleDelete = async () => {
    if (window.confirm(`האם למחוק את הכלי "${tool.name}"?`)) {
      try {
        await deleteTool(tool._id).unwrap()
        onSuccess?.()  // מרענן את הרשימה בדשבורד
      } catch (err) {
        console.error('שגיאה במחיקה:', err)
        alert('שגיאה במחיקת הכלי')
      }
    }
  }

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
        <p className="text-sm text-gray-600 mb-3">{tool.description}</p>

        <div className="flex justify-between items-center mb-3">
          <span className="text-lg font-semibold text-haskurit-yellow">
            ₪{tool.price} ליום
          </span>
        </div>

        {/* פעולות */}
        <div className="flex justify-end gap-3">
          <button
            className="text-blue-600 text-sm hover:underline"
            onClick={() => alert('תכונת העריכה תתווסף בקרוב')}
            disabled={isDeleting}
          >
            ✏️ ערוך
          </button>

          <button
            className="text-red-600 text-sm hover:underline"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            🗑️ מחק
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminToolCard
