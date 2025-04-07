import { routes } from '@/router'
import { useUserStore } from '@/store'
import { ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate()
  const userStore = useUserStore()

  useEffect(() => {
    if (!userStore.user) {
      navigate(routes.login.path)
    }
  }, [userStore])

  return children
}

export default ProtectedRoute;
