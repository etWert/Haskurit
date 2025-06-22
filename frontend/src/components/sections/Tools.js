import { useGetAllToolsQuery } from '../../features/tools/toolsApiSlice'
import ToolCard from '../../features/tools/ToolCard'

const Tools = () => {
    const { data: tools, isLoading, isError, error } = useGetAllToolsQuery()

    if (isLoading) {
        return (
            <section id="tools" className="py-12 bg-haskurit-white text-center">
                <p className="text-haskurit-gray text-lg">טוען כלים...</p>
            </section>
        )
    }

    if (isError) {
        return (
            <section id="tools" className="py-12 bg-haskurit-white text-center">
                <p className="text-red-500 text-lg">שגיאה בטעינת הכלים: {error?.data?.message || 'נסי שוב מאוחר יותר'}</p>
            </section>
        )
    }

    return (
        <section id="tools" className="py-16 px-4 bg-haskurit-white">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-haskurit-gray mb-12">
                    הכלים שלנו
                </h2>

                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {tools.data.map(tool => (
                        <ToolCard key={tool._id} tool={tool} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Tools
