import './App.css'
import { Route, Routes } from 'react-router-dom'
import { routes } from '@/router'
import { useEffect, useState } from 'react'
import { useUserStore } from '@/store'

function App() {
  const userStore = useUserStore()
  const [isLoading, setIsLoading] = useState(true)

  const populateAll = async () => {
    await userStore.populate()
    console.log("GGWP")
  }

  useEffect(()=> {
    populateAll().then(() => {
      console.log("OMEGA LOH")
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
      ): (<>Loading</>)}
    </>
  )
}

export default App