import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from './authApiSlice';
import useAuth from '../../hooks/useAuth';

const Login = () => {
    const navigate = useNavigate()
    const { role } = useAuth();
    const [login, { error, isLoading, isSuccess }] = useLoginMutation()

    useEffect(() => {
        if (isSuccess) {
            if (role === 'admin') {
                console.log(1);
                navigate('/admin');
            } else if (role === 'user') {
                console.log(12)
                navigate('/profile'); // כרגע עדיין לא קיים
            }
        }
    }, [isSuccess,navigate,role])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData(e.target)
        const userObject = Object.fromEntries(data.entries())
        login(userObject)
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-haskurit-white px-4">
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-haskurit-gray mb-6">כניסת מנהל</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-haskurit-gray mb-1">שם משתמש</label>
                    <input type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:border-haskurit-yellow"
                        required
                        name="username"
                        autoFocus
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-haskurit-gray mb-1">סיסמה</label>
                    <input
                        type="password"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:border-haskurit-yellow"
                        required
                        name="password"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-haskurit-gray text-white py-2 rounded-lg font-semibold hover:bg-opacity-90 transition duration-200 disabled:opacity-50"
                    disabled={isLoading}
                >
                    {isLoading ? 'טוען...' : 'התחבר'}
                </button>
                {error && (<p className="text-red-600 text-sm text-center mb-4">{error.data?.message}</p>)}
            </form>
        </div>
    )
};
export default Login;

