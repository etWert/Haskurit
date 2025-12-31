import { useState } from 'react'
import { useDeletePopupMessageMutation, useUpdatePopupMessageMutation } from './popupMessagesApiSlice'
import { MdCancel, MdDelete, MdEdit, MdExpandMore, MdExpandLess } from "react-icons/md"
import { RiSave3Line } from "react-icons/ri"

const AdminPopupAccordion = ({ popups }) => {
  const [openId, setOpenId] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [deletePopupMessage] = useDeletePopupMessageMutation()
  const [updatePopupMessage] = useUpdatePopupMessageMutation()

  const [formData, setFormData] = useState({})
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState('')

  const toggleOpen = (id) => {
    if (openId === id) {
      setOpenId(null)
      setEditingId(null)
    } else {
      setOpenId(id)
      setEditingId(null)
    }
  }

  const startEdit = (popup) => {
    setEditingId(popup._id)
    setFormData({
      title: popup.title,
      content: popup.content || '',
      isActive: popup.isActive,
      _id: popup._id,
    })
    setSelectedImage(null)
    setImagePreview(popup.imageUrl || '')
  }

  const cancelEdit = () => {
    setEditingId(null)
    setFormData({})
    setSelectedImage(null)
    setImagePreview('')
  }

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
    setEditingId(null)
    setFormData({})
    setSelectedImage(null)
    setImagePreview('')
  }

  const handleDelete = (popup) => {
    if (window.confirm(`האם למחוק את ההודעה "${popup.title}"?`)) {
      deletePopupMessage(popup._id)
    }
  }

  const toggleActive = (popup) => {
    const form = new FormData()
    form.append('_id', popup._id)
    form.append('title', popup.title)
    form.append('content', popup.content)
    form.append('isActive', !popup.isActive)
    updatePopupMessage(form).unwrap()
  }

  if (!popups || popups.length === 0) {
    return (
      <p className="text-center text-gray-500 py-8">אין הודעות להצגה</p>
    )
  }

  return (
    <div className="space-y-2">
      {popups.map((popup) => {
        const isOpen = openId === popup._id
        const isEditing = editingId === popup._id

        return (
          <div
            key={popup._id}
            className="bg-white shadow-md rounded-xl overflow-hidden transition-all duration-200"
          >
            {/* כותרת דחוסה - רק כשסגור */}
            {!isOpen && (
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => toggleOpen(popup._id)}
              >
                <div className="flex items-center gap-3 flex-1">
                  <button
                    className="text-2xl text-haskurit-gray"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleOpen(popup._id)
                    }}
                  >
                    <MdExpandMore />
                  </button>
                  <h3 className="text-lg font-bold text-haskurit-gray flex-1">
                    {popup.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleActive(popup)
                    }}
                    className={`px-3 py-1 rounded font-semibold text-xs cursor-pointer transition-all hover:opacity-80 ${popup.isActive ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                    title={popup.isActive ? 'לחץ להפוך ללא פעיל' : 'לחץ להפוך לפעיל'}
                  >
                    {popup.isActive ? 'פעיל' : 'לא פעיל'}
                  </button>
                </div>
              </div>
            )}

            {/* כרטיס מלא - כשפתוח */}
            {isOpen && (
              <div className="h-auto min-h-[32rem] flex flex-col">
                {/* כפתור סגירה */}
                <div className="p-2 flex justify-start border-b">
                  <button
                    onClick={() => toggleOpen(popup._id)}
                    className="text-2xl text-haskurit-gray hover:bg-gray-100 p-2 rounded-lg"
                  >
                    <MdExpandLess />
                  </button>
                </div>

                {/* תוכן הכרטיס */}
                <div className="flex-1 flex flex-col">
                  {/* תמונה למעלה במובייל */}
                  <div className="w-full h-48 flex-shrink-0 bg-gray-100 p-2">
                    {(isEditing ? imagePreview : popup.imageUrl) ? (
                      <img
                        src={isEditing ? imagePreview : popup.imageUrl}
                        alt={isEditing ? formData.title : popup.title}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <span className="text-sm text-center px-2">אין תמונה</span>
                      </div>
                    )}
                  </div>

                  {/* תוכן */}
                  <div className="flex-1 p-4 flex flex-col">
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
                          <button onClick={cancelEdit} className="bg-haskurit-yellow text-haskurit-gray font-semibold p-3 rounded-lg hover:opacity-90 transition">
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
                            onClick={() => toggleActive(popup)}
                            className={`px-3 py-1 rounded font-semibold cursor-pointer transition-all hover:opacity-80 ${popup.isActive ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                            title={popup.isActive ? 'לחץ להפוך ללא פעיל' : 'לחץ להפוך לפעיל'}
                          >
                            {popup.isActive ? 'פעיל' : 'לא פעיל'}
                          </button>
                        </div>

                        <div className="flex justify-end gap-3 mt-auto">
                          <button className="bg-haskurit-yellow text-haskurit-gray font-semibold p-3 rounded-lg hover:opacity-90 transition" onClick={() => startEdit(popup)}>
                            <MdEdit />
                          </button>
                          <button className="bg-haskurit-yellow text-haskurit-gray font-semibold p-3 rounded-lg hover:opacity-90 transition" onClick={() => handleDelete(popup)}>
                            <MdDelete size={20} />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default AdminPopupAccordion