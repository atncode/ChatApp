import { useEffect } from 'react'
import 'bootstrap/scss/bootstrap.scss'
import { setupSocketListeners, removeSocketListeners } from '../sockets.js'
import { useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    setupSocketListeners(dispatch)

    return () => {
      removeSocketListeners()
    };
  }, [dispatch])
}

export default App
