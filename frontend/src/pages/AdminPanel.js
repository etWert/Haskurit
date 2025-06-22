import { useState } from 'react'
import { useGetAllToolsQuery } from '../features/tools/toolsApiSlice'
import AdminToolCard from '../features/tools/AdminToolCard'
import { useAddToolMutation } from '../features/tools/toolsApiSlice'

const AdminPanel = () => {
  const { data: tools, isLoading, isError, error, refetch } = useGetAllToolsQuery()
  // const [addTool, { data, isError, error, isSuccess, isLoading }] = useAddToolMutation()
  const [addTool, {
    data: addToolData,
    isError: isAddToolError,
    error: addToolError,
    isSuccess: isAddToolSuccess,
    isLoading: isAddToolLoading
  }] = useAddToolMutation();


  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: ''
  })

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addTool({ ...formData, price: Number(formData.price) }).unwrap()
      setFormData({ name: '', description: '', price: '', imageUrl: '' })
      refetch()
    } catch (err) {
      console.error('שגיאה בהוספה:', err)
      alert('שגיאה בהוספת כלי')
    }
  }

  return (
    <div className="min-h-screen bg-haskurit-white px-6 py-10">
      <h1 className="text-3xl font-bold text-center text-haskurit-gray mb-10">
        פאנל ניהול הכלים
      </h1>
      {/* טופס הוספה */}
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-6 max-w-3xl mx-auto mb-12">
        <h2 className="text-xl font-semibold text-haskurit-gray mb-4">הוספת כלי חדש</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <input name="name" value={formData.name}
            onChange={handleChange}
            placeholder="שם הכלי"
            required
            className="border border-gray-300 rounded-lg px-3 py-2"
          />
          <input
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="מחיר ליום"
            type="number"
            required
            className="border border-gray-300 rounded-lg px-3 py-2"
          />
          <input
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="קישור לתמונה"
            required
            className="border border-gray-300 rounded-lg px-3 py-2 md:col-span-2"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="תיאור הכלי"
            rows="3"
            required
            className="border border-gray-300 rounded-lg px-3 py-2 md:col-span-2"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-haskurit-yellow text-haskurit-gray font-semibold px-6 py-2 rounded-lg hover:opacity-90 transition"
        >
          ➕ הוסף כלי
        </button>
      </form>

      {/* רשימת כלים קיימים */}
      {isLoading && (
        <p className="text-haskurit-gray text-center text-lg">טוען נתונים...</p>
      )}
      {isError && (
        <p className="text-red-500 text-center">
          שגיאה בטעינת הכלים: {error?.data?.message || 'נסי שוב'}
        </p>
      )}
      {tools && (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {tools.data.map(tool => (
            <AdminToolCard key={tool._id} tool={tool} onSuccess={refetch} />
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminPanel
