import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../store/hook'

const PrivateRoutes = () => {
    const token = useAppSelector((state) => state.auth.token)    
    return token ? <Outlet /> : <Navigate to="/home" replace />
}

export default PrivateRoutes