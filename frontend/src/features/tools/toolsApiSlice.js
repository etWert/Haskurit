
import apiSlice from '../../app/apiSlice'

export const toolsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // קבלת כל הכלים (לציבור)
        getAllTools: builder.query({
            query: () => '/tool',
            providesTags: ['Tool']
        }),

        // קבלת כלי ספציפי
        getToolById: builder.query({
            query: (id) => `/tool/${id}`,
            providesTags: (result, error, id) => [{ type: 'Tool', id }]
        }),

        // הוספת כלי חדש (מנהל בלבד)
        addTool: builder.mutation({
            query: (formData) => ({
                url: '/tool',
                method: 'POST',
                body: formData,
                // לא להוסיף Content-Type header כשמשתמשים ב-FormData
                // הדפדפן יוסיף אותו אוטומטית עם boundary
                formData: true
            }),
            invalidatesTags: ['Tool']
        }),

        // עדכון כלי (מנהל בלבד)
        updateTool: builder.mutation({
            query: (formData) => ({
                url: '/tool',
                method: 'PUT',
                body: formData,
                formData: true
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Tool', id: arg.id }]
            // invalidatesTags: (result, error, arg) => [{ type: 'Tool', id: arg.get('_id') }]

        }),

        // מחיקת כלי (מנהל בלבד)
        deleteTool: builder.mutation({
            query: (id) => ({
                url: `/tool`,
                method: 'DELETE',
                body: { _id: id }
            }),
            invalidatesTags: ['Tool']
        })
    })
})

export const { useGetAllToolsQuery, useGetToolByIdQuery, useAddToolMutation, useUpdateToolMutation, useDeleteToolMutation } = toolsApiSlice