import apiSlice from "../../app/apiSlice"
import {logout, setToken} from "./authSlice"
const authApiSlice =apiSlice.injectEndpoints({
    endpoints: (build)=>({
        login: build.mutation({
            query: (userData) =>({
                url: "/auth/login",
                method: "POST",
                body: userData

            }),
            async onQueryStarted( arg,  { dispatch,   queryFulfilled }) {
                try {
                    const { data } =  await queryFulfilled
                    if(data.accessToken){
                        dispatch(setToken({accessToken: data.accessToken}))
                    }
                } catch (err) {
                    console.log(err)
                }
            },
        }),
        sendLogout: build.mutation({
            query: () =>({
                url: "/auth/logout",
                method: "POST"
            }),
            async onQueryStarted( arg,  { dispatch,   queryFulfilled }) {
                try {
                    await queryFulfilled
                    dispatch(logout())
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState())
                    }, 1000)
                } catch (err) {
                    console.log(err)
                }
            },

        }),
        refresh: build.mutation({
            query: () =>({
                url: "/auth/refresh",
                method: "GET"
            }),
            async onQueryStarted( arg,  { dispatch,   queryFulfilled }) {
                try {
                    const { data } =  await queryFulfilled
                    if(data.accessToken){
                        dispatch(setToken({accessToken: data.accessToken}))
                    }
                } catch (err) {
                    console.log(err)
                }
            },

        }),
      
    })
})

export const {useLoginMutation, useSendLogoutMutation, useRefreshMutation} = authApiSlice