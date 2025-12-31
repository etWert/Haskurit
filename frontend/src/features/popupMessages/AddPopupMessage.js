import { useAddPopupMessageMutation } from './popupMessagesApiSlice'
import { useEffect, useState } from "react"
import { IoIosAddCircle } from "react-icons/io"
import { BsHourglassSplit } from "react-icons/bs"

const AddPopupMessage = () => {
    const [addPopupMessage, { isError, error, isSuccess, isLoading }] = useAddPopupMessageMutation()
    const [selectedImage, setSelectedImage] = useState(null)
    const [imagePreview, setImagePreview] = useState('')

    useEffect(() => {
        if (isSuccess) {
            console.log("נוסף בהצלחה")
            setSelectedImage(null)
            setImagePreview('')
            document.querySelector('form').reset()
        }
    }, [isSuccess])

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setSelectedImage(file)
            const reader = new FileReader()
            reader.onload = (e) => {
                setImagePreview(e.target.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        
        // המרת isActive לבוליאני
        const isActiveValue = formData.get('isActive') === 'true'
        formData.set('isActive', isActiveValue)
        
        if (selectedImage) {
            formData.append('image', selectedImage)
        }

        try {
            await addPopupMessage(formData).unwrap()
            console.log('הודעה נוספה בהצלחה')
        } catch (err) {
            console.error('שגיאה בהוספת הודעה:', err)
            alert('שגיאה בהוספת ההודעה: ' + (err?.data?.message || 'שגיאה לא ידועה'))
        }
    }

    return (
        <div className="bg-haskurit-white px-6 py-10">
            {isError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 max-w-3xl mx-auto">
                    שגיאה: {error?.data?.message || 'שגיאה לא ידועה'}
                </div>
            )}

            {isSuccess && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 max-w-3xl mx-auto">
                    ההודעה נוספה בהצלחה!
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-6 max-w-3xl mx-auto mb-12">
                <h2 className="text-2xl font-bold text-center text-haskurit-gray mb-6">
                    הוספת הודעה קופצת חדשה
                </h2>

                <div className="grid gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            כותרת ההודעה *
                        </label>
                        <input
                            name="title"
                            placeholder='לדוגמה: "מבצע השבוע!"'
                            required
                            className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            תוכן ההודעה *
                        </label>
                        <textarea
                            name="content"
                            placeholder="תוכן ההודעה שיוצג למשתמשים"
                            rows="4"
                            required
                            className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                סטטוס
                            </label>
                            <select
                                name="isActive"
                                defaultValue="true"
                                className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                            >
                                <option value="true">פעיל</option>
                                <option value="false">לא פעיל</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            תמונה (אופציונלי)
                        </label>
                        <input
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                            onChange={handleImageChange}
                            className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            קבצים מותרים: JPG, PNG, GIF, WebP (מקסימום 5MB)
                        </p>

                        {imagePreview && (
                            <div className="mt-3">
                                <p className="text-sm text-gray-600 mb-2">תצוגה מקדימה:</p>
                                <img
                                    src={imagePreview}
                                    alt="תצוגה מקדימה"
                                    className="w-32 h-32 object-cover rounded-lg border"
                                />
                            </div>
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-6 bg-haskurit-yellow text-haskurit-gray font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed w-full"
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                            <BsHourglassSplit className="text-xl" />
                            מוסיף...
                        </span>
                    ) : (
                        <span className="flex items-center justify-center gap-2">
                            <IoIosAddCircle className="text-xl" />
                            הוסף הודעה
                        </span>
                    )}
                </button>
            </form>
        </div>
    )
}

export default AddPopupMessage