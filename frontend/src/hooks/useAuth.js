import { useSelector } from "react-redux"
import { jwtDecode } from "jwt-decode"
import { selectToken } from "../features/auth/authSlice"

const useAuth = () => {
    const token = useSelector(selectToken)
    let isAdmin = false
    let isUser = false
    if (token) {
        const userDecode = jwtDecode(token)
        const { _id, username, role, name } = userDecode
        isAdmin = role === "admin"
        isUser = role === "user"
        return { _id, username, role, name, isAdmin, isUser  }
    }
    return { _id: '', username: '', name: '', role: '', isAdmin, isUser }
}
export default useAuth