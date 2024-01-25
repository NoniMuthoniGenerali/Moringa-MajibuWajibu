import React from 'react'
import{Routes, Route} from "react-router-dom"
import Home from './components/Home/Home' 



const App = () => {
  return (
    <div>
        <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact/>
            <Route exact/>
        </Routes>
        
      </div>


  )
}

export default App