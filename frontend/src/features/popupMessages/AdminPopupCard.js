import { useState } from 'react'
import { useDeletePopupMessageMutation, useUpdatePopupMessageMutation } from './popupMessagesApiSlice'
import { MdCancel, MdDelete, MdEdit } from "react-icons/md"
import { RiSave3Line } from "react-icons/ri"

const AdminPopupCard = ({ popup }) => {
  const [deletePopupMessage] = useDeletePopupMessageMutation()
  const [updatePopupMessage] = useUpdatePopupMessageMutation()

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    title: popup.title,
    content: popup.content || '',
    isActive: popup.isActive,
    _id: popup._id,
  })
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(popup.imageUrl)

  const handleChange = (e) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? e.target.checked : value
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpdate = () => {
    const form = new FormData()
    for (const key in formData) {
      form.append(key, formData[key])
    }
    if (selectedImage) {
      form.append('image', selectedImage)
    }
    updatePopupMessage(form).unwrap()
    setIsEditing(false)
  }

  const handleDelete = () => {
    if (window.confirm(`האם למחוק את ההודעה "${popup.title}"?`)) {
      deletePopupMessage(popup._id)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setImagePreview(popup.imageUrl)
    setSelectedImage(null)
    setFormData({
      title: popup.title,
      content: popup.content || '',
      isActive: popup.isActive,
      _id: popup._id,
    })
  }

  const toggleActive = () => {
    const form = new FormData()
    form.append('_id', popup._id)
    form.append('title', popup.title)
    form.append('content', popup.content)
    form.append('isActive', !popup.isActive)
    updatePopupMessage(form).unwrap()
  }

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden transition-transform transform hover:scale-105 duration-200 h-[32rem] md:h-96 flex flex-col md:flex-row-reverse">
      {/* תמונה - למעלה במובייל, בימין בדסקטופ */}
      <div className="md:w-64 w-full h-48 md:h-auto flex-shrink-0 bg-gray-100 p-2">
        {imagePreview ? (
          <img
            src={imagePreview}
            alt={formData.title}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span className="text-sm text-center px-2">אין תמונה</span>
          </div>
        )}
      </div>

      {/* תוכן */}
      <div className="flex-1 p-4 overflow-y-auto flex flex-col">
        {isEditing ? (
          <>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                תמונה (אופציונלי)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-sm border border-gray-300 rounded-lg p-2"
              />
              {selectedImage && (
                <p className="text-sm text-gray-500 mt-1">תמונה תעודכן לאחר שמירה</p>
              )}
            </div>

            <label className="block text-sm font-medium text-gray-700 mb-1">כותרת</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="text-lg font-bold text-haskurit-gray mb-3 border border-gray-300 rounded-lg px-3 py-2 w-full"
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">תוכן</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="4"
              className="text-sm text-gray-600 mb-3 border border-gray-300 rounded-lg px-3 py-2 w-full resize-none"
            />

            <div className="flex items-center mb-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="w-5 h-5"
                />
                <span className="text-sm font-medium">פעיל</span>
              </label>
            </div>

            <div className="flex justify-end gap-3 mt-auto">
              <button onClick={handleUpdate} className="bg-haskurit-yellow text-haskurit-gray font-semibold p-3 rounded-lg hover:opacity-90 transition">
                <RiSave3Line />
              </button>
              <button onClick={handleCancel} className="bg-haskurit-yellow text-haskurit-gray font-semibold p-3 rounded-lg hover:opacity-90 transition">
                <MdCancel />
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-bold text-haskurit-gray flex-1 line-clamp-2">{popup.title}</h3>
            </div>

            <p className="text-sm text-gray-600 mb-3 line-clamp-4 flex-1">{popup.content}</p>

            <div className="flex items-center gap-2 text-sm mb-3">
              <button
                onClick={toggleActive}
                className={`px-3 py-1 rounded font-semibold cursor-pointer transition-all hover:opacity-80 ${popup.isActive ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                title={popup.isActive ? 'לחץ להפוך ללא פעיל' : 'לחץ להפוך לפעיל'}
              >
                {popup.isActive ? 'פעיל' : 'לא פעיל'}
              </button>
            </div>

            <div className="flex justify-end gap-3 mt-auto">
              <button className="bg-haskurit-yellow text-haskurit-gray font-semibold p-3 rounded-lg hover:opacity-90 transition" onClick={() => setIsEditing(true)}>
                <MdEdit />
              </button>
              <button className="bg-haskurit-yellow text-haskurit-gray font-semibold p-3 rounded-lg hover:opacity-90 transition" onClick={handleDelete}>
                <MdDelete size={20} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default AdminPopupCard