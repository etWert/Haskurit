import { useGetAllToolsQuery } from '../features/tools/toolsApiSlice'
import AdminToolCard from '../features/tools/AdminToolCard'
import AddTool from '../features/tools/AddTool'

const AdminPanel = () => {
  const { data: tools, isLoading, isError, error } = useGetAllToolsQuery()

  return (
    <div className="min-h-screen bg-haskurit-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-haskurit-gray mb-10">
          פאנל ניהול הכלים
        </h1>
        <AddTool />
        {isLoading && (
          <p className="text-haskurit-gray text-center text-lg">טוען נתונים...</p>
        )}
        {isError && (
          <p className="text-red-500 text-center">
            שגיאה בטעינת הכלים: {error?.data?.message || 'נסי שוב'}
          </p>
        )}
        {tools && (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tools.data.map(tool => (
              <AdminToolCard key={tool._id} tool={tool} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPanel