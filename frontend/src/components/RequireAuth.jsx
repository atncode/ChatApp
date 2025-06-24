import { Navigate } from 'react-router'

const RequireAuth = ({ children }) => {
  const user = localStorage.getItem('user')
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return children
}

export default RequireAuth
