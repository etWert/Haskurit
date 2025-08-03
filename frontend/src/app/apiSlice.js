import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setToken, logout } from '../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL
    ? process.env.REACT_APP_API_URL + '/api'
    : process.env.REACT_APP_API_URL_LOCAL
      ? process.env.REACT_APP_API_URL_LOCAL + '/api'
      : '',
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

  // אם הטוקן פג, ננסה לרענן אותו
  if (result?.error?.status === 401) {
    console.log('שולח בקשת רענון טוקן')

    // נסה לרענן טוקן
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)

    if (refreshResult?.data) {
      // שמור את הטוקן החדש
      api.dispatch(setToken({ ...refreshResult.data/*, user*/ }))
      // נסה שוב את הבקשה המקורית
      result = await baseQuery(args, api, extraOptions)
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = "Your login has expired."
      }
      return refreshResult
    }
  }
  return result
}

const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({})
})

export default apiSlice