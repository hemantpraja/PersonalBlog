import './App.css'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authSerrvice from './appwrite/auth.js'
import { login, logout } from './redux/authSlice.js'
import { Header } from './components/index.js'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setloading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authSerrvice.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setloading(false))
  }), []
  return loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-grey-400'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet/>
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
