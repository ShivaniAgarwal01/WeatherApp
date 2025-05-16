import { useState } from 'react'
import './App.css'
import Hero from './components/Hero'
// import SearchBar from './components/searchBar'

function App() {
   const[isDayTime , setIsDayTime] = useState(true);
  return (
    <>
      <div className = {`main-container ${isDayTime? 'bg-day' : 'bg-night'}`}>
          <h1 className='heading'>WEATHER APP</h1>
          <Hero setIsDayTime={setIsDayTime}/>
      </div>
    </>
  )
}

export default App
