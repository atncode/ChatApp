import { Navigate } from 'react-router'

export const RequireAuth = ({ children }) => {
  const user = localStorage.getItem('user')
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return children
}
