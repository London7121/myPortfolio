import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../store/hook'

const PublicRoutes = () => {
    const token = useAppSelector((state) => state?.auth?.token)
    return token ? <Navigate to="/admin" replace /> : <Outlet />
}
export default PublicRoutes