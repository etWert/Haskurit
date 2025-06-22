import { useAddToolMutation } from './toolsApiSlice'
import { useEffect, useState } from "react"

const AddTool = () => {
    const [addTool, { data, isError, error, isSuccess, isLoading }] = useAddToolMutation()
    const [selectedImage, setSelectedImage] = useState(null)
    const [imagePreview, setImagePreview] = useState('')

    useEffect(() => {
        if (isSuccess) {
            console.log("נוסף בהצלחה");
            setSelectedImage(null)
            setImagePreview('')
            document.querySelector('form').reset()
        }
    }, [isSuccess])

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setSelectedImage(file)
            // יצירת תצוגה מקדימה של התמונה
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
        formData.append('image', selectedImage)

        try {
            await addTool(formData).unwrap()
            console.log('כלי נוסף בהצלחה')
        } catch (err) {
            console.error('שגיאה בהוספת כלי:', err)
            alert('שגיאה בהוספת הכלי: ' + (err?.data?.message || 'שגיאה לא ידועה'))
        }
    }

    return (
        <div className="min-h-screen bg-haskurit-white px-6 py-10">
            <h1 className="text-3xl font-bold text-center text-haskurit-gray mb-10">
                הוספת כלי חדש
            </h1>
            {isError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 max-w-3xl mx-auto">
                    שגיאה: {error?.data?.message || 'שגיאה לא ידועה'}
                </div>
            )}

            {isSuccess && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 max-w-3xl mx-auto">
                    הכלי נוסף בהצלחה!
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-6 max-w-3xl mx-auto mb-12">
                <h2 className="text-xl font-semibold text-haskurit-gray mb-4">פרטי הכלי</h2>

                <div className="grid gap-4 md:grid-cols-2">
                    <input
                        name="name"
                        placeholder="שם הכלי"
                        required
                        className="border border-gray-300 rounded-lg px-3 py-2"
                    />
                    <input
                        name="price"
                        placeholder="מחיר ליום"
                        type="number"
                        min="1"
                        step="0.01"
                        required
                        className="border border-gray-300 rounded-lg px-3 py-2"
                    />

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            תמונת הכלי *
                        </label>
                        <input
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                            onChange={handleImageChange}
                            required
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

                    <textarea
                        name="description"
                        placeholder="תיאור הכלי (אופציונלי)"
                        rows="3"
                        className="border border-gray-300 rounded-lg px-3 py-2 md:col-span-2"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-4 bg-haskurit-yellow text-haskurit-gray font-semibold px-6 py-2 rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? '⏳ מוסיף...' : '➕ הוסף כלי'}
                </button>
            </form>
        </div>
    )
}

export default AddTool