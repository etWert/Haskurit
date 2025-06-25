import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setToken, logout } from '../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://haskurit.onrender.com/api',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token
    if (token) {
      headers.set("authorization", `Bearer ${token}`)
    }
    return headers
  }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  // אם הטוכן פג, ננסה לרענן אותו
  if (result?.error?.status === 401) {
    console.log('שולח בקשת רענון טוכן')
    
    // נסה לרענן טוכן
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)
    
    if (refreshResult?.data) {
      const user = api.getState().auth.user
      // שמור את הטוכן החדש
      api.dispatch(setToken({ ...refreshResult.data, user }))
      // נסה שוב את הבקשה המקורית
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logout())
    }
  }

  return result
}

const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Tool', 'User'],
  endpoints: builder => ({})
})
export default apiSlice