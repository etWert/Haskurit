
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
            query: (newTool) => ({
                url: '/tool',
                method: 'POST',
                body: newTool
            }),
            invalidatesTags: ['Tool']
        }),

        // עדכון כלי (מנהל בלבד)
        updateTool: builder.mutation({
            query: (updatedTool) => ({
                url: '/tool',
                method: 'PUT',
                body: updatedTool
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Tool', id: arg.id }]
        }),

        // מחיקת כלי (מנהל בלבד)
        deleteTool: builder.mutation({
            query: (id) => ({
                url: `/tool/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Tool']
        })
    })
})

export const { useGetAllToolsQuery, useGetToolByIdQuery, useAddToolMutation, useUpdateToolMutation, useDeleteToolMutation } = toolsApiSlice