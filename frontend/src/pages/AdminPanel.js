import { useState } from 'react'
import { useGetAllToolsQuery } from '../features/tools/toolsApiSlice'
import { useGetAllPopupMessagesQuery } from '../features/popupMessages/popupMessagesApiSlice'
import AdminToolCard from '../features/tools/AdminToolCard'
import AddTool from '../features/tools/AddTool'
import AdminPopupCard from '../features/popupMessages/AdminPopupCard'
import AddPopupMessage from '../features/popupMessages/AddPopupMessage'
import AdminPopupAccordion from '../features/popupMessages/AdminPopupAccordion'

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('tools') // 'tools' או 'popups'
  const [popupFilter, setPopupFilter] = useState('all') // 'all', 'active', 'inactive'

  const { data: tools, isLoading: toolsLoading, isError: toolsError, error: toolsErrorData } = useGetAllToolsQuery()
  const { data: popups, isLoading: popupsLoading, isError: popupsError, error: popupsErrorData } = useGetAllPopupMessagesQuery()

  // סינון הודעות לפי פעיל/לא פעיל
  const filteredPopups = popups?.data.filter(popup => {
    if (popupFilter === 'active') return popup.isActive
    if (popupFilter === 'inactive') return !popup.isActive
    return true
  })

  return (
    <div className="min-h-screen bg-haskurit-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-haskurit-gray mb-10">
          פאנל ניהול
        </h1>

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab('tools')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'tools'
                ? 'bg-haskurit-yellow text-haskurit-gray'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            כלים
          </button>
          <button
            onClick={() => setActiveTab('popups')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'popups'
                ? 'bg-haskurit-yellow text-haskurit-gray'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            הודעות קופצות
          </button>
        </div>

        {activeTab === 'tools' && (
          <>
            <AddTool />
            {toolsLoading && (
              <p className="text-haskurit-gray text-center text-lg">טוען נתונים...</p>
            )}
            {toolsError && (
              <p className="text-red-500 text-center">
                שגיאה בטעינת הכלים: {toolsErrorData?.data?.message || 'נסי שוב'}
              </p>
            )}
            {tools && (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {tools.data.map(tool => (
                  <AdminToolCard key={tool._id} tool={tool} />
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'popups' && (
          <>
            <AddPopupMessage />
            
            <div className="flex justify-center gap-3 mb-6">
              <button
                onClick={() => setPopupFilter('all')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  popupFilter === 'all'
                    ? 'bg-haskurit-gray text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                הכל ({popups?.data.length || 0})
              </button>
              <button
                onClick={() => setPopupFilter('active')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  popupFilter === 'active'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                פעילות ({popups?.data.filter(p => p.isActive).length || 0})
              </button>
              <button
                onClick={() => setPopupFilter('inactive')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  popupFilter === 'inactive'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                לא פעילות ({popups?.data.filter(p => !p.isActive).length || 0})
              </button>
            </div>

            {popupsLoading && (
              <p className="text-haskurit-gray text-center text-lg">טוען נתונים...</p>
            )}
            {popupsError && (
              <p className="text-red-500 text-center">
                שגיאה בטעינת ההודעות: {popupsErrorData?.data?.message || 'נסי שוב'}
              </p>
            )}
            {/* {filteredPopups && filteredPopups.length > 0 ? (
              <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                {filteredPopups.map(popup => (
                  <AdminPopupCard key={popup._id} popup={popup} />
                ))}
              </div> */}
              {filteredPopups && filteredPopups.length > 0 ? (
  <>
    <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-6">
      {filteredPopups.map(popup => (
        <AdminPopupCard key={popup._id} popup={popup} />
      ))}
    </div>

    <div className="lg:hidden">
      <AdminPopupAccordion popups={filteredPopups} />
    </div>
  </>
            ) : (
              popups && (
                <p className="text-center text-gray-500 py-8">
                  אין הודעות להצגה בסינון זה
                </p>
              )
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default AdminPanel