import { useState } from 'react'
import './ListaPost.css'

function ListaPost() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="app-container">
        <h2>Lista de posts</h2>
        {/* <div className="card"> */}
        <div>
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
        </div>
      </div>
    </>
  )
}

export default ListaPost
