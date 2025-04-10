import { Route, Routes } from 'react-router-dom'
import { routes } from '@/router'
import { useEffect, useState } from 'react'
import { useUserStore } from '@/store'
import LoadingPage from './pages/LoadingPage/LoadingPage'

function App() {
  const userStore = useUserStore()
  const [isLoading, setIsLoading] = useState(true)

  const populateAll = async () => {
    await userStore.populate()
  }

  useEffect(()=> {
    populateAll().then(() => {
      setIsLoading(false)
    })
  }, [])

  const routeComponents = Object.values(routes).map(
    ({ path, element }, key) => (
      <Route path={path} element={element} key={key} />
    )
  )

  return (
    <>
      {!isLoading ? (
        <Routes>{routeComponents}</Routes>
      ): <LoadingPage/>}
    </>
  )
}

export default App