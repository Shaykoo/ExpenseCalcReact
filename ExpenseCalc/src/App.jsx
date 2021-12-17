import { useState } from 'react'
import UpdateModal from './Components/UpdateModal/UpdateModal'
import Todo from './Pages/Todo/Todo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Todo/>
    </>
  )
}

export default App
