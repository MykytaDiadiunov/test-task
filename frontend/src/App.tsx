import { Route, Routes } from 'react-router-dom'
import './App.css'
import { routes } from './router'
import { useEffect } from 'react'
import { useUserStore } from './store'

function App() {
  const userStore = useUserStore()

  useEffect(()=> {
    userStore.populate()
  }, [])

  const routeComponents = Object.values(routes).map(
    ({ path, element }, key) => (
      <Route path={path} element={element} key={key} />
    )
  )

  return (
    <>
      <Routes>{routeComponents}</Routes>
    </>
  )
}

export default App