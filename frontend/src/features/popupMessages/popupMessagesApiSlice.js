import apiSlice from '../../app/apiSlice'

export const popupMessagesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // קבלת כל ההודעות (למנהל)
        getAllPopupMessages: builder.query({
            query: () => '/popup-messages',
            providesTags: ['PopupMessage']
        }),

        // קבלת הודעות פעילות (לציבור)
        getActivePopupMessages: builder.query({
            query: () => '/popup-messages/active',
            providesTags: ['PopupMessage']
        }),

        // קבלת הודעה אקראית (לציבור)
        getRandomPopupMessage: builder.query({
            query: () => '/popup-messages/random',
            providesTags: ['PopupMessage']
        }),

        // קבלת הודעה ספציפית
        getPopupMessageById: builder.query({
            query: (id) => `/popup-messages/${id}`,
            providesTags: (result, error, id) => [{ type: 'PopupMessage', id }]
        }),

        // הוספת הודעה חדשה (מנהל בלבד)
        addPopupMessage: builder.mutation({
            query: (formData) => ({
                url: '/popup-messages',
                method: 'POST',
                body: formData,
                formData: true
            }),
            invalidatesTags: ['PopupMessage']
        }),

        // עדכון הודעה (מנהל בלבד)
        updatePopupMessage: builder.mutation({
            query: (formData) => ({
                url: '/popup-messages',
                method: 'PUT',
                body: formData,
                formData: true
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'PopupMessage', id: arg.id }]
        }),

        // מחיקת הודעה (מנהל בלבד)
        deletePopupMessage: builder.mutation({
            query: (id) => ({
                url: `/popup-messages`,
                method: 'DELETE',
                body: { _id: id }
            }),
            invalidatesTags: ['PopupMessage']
        })
    })
})

export const {
    useGetAllPopupMessagesQuery,
    useGetActivePopupMessagesQuery,
    useGetRandomPopupMessageQuery,
    useGetPopupMessageByIdQuery,
    useAddPopupMessageMutation,
    useUpdatePopupMessageMutation,
    useDeletePopupMessageMutation
} = popupMessagesApiSlice