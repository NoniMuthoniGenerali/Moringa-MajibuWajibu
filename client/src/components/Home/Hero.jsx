import React from 'react'
import "./hero.css"

const Hero = () => {
  return (
    <div className="hero-container">
        <div className='hero'>
        <h1 className="stay-curious">Stay curious. </h1>
        <p className="discover">
            Discover interesting articles that will help you troubleshoot your coding deficiencies.
        </p>
        <div className='start-reading-container'>
        <button className="start-reading">Start reading</button>
        </div>
        
    </div>
    </div>
  )
}

export default Hero