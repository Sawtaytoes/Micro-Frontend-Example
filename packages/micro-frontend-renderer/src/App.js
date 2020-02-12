import React, { useEffect } from 'react'

import logo from './logo.svg'
import './App.css'

const useScript = url => {
  useEffect(() => {
    const script = document.createElement('script')

    script.src = url
    script.async = true

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [url])
}

// export default useScript

const App = () => {
  useScript('microFrontendJs/2.67ebc307.chunk.js')
  useScript('microFrontendJs/main.976bc0aa.chunk.js')
  useScript('microFrontendJs/runtime-main.7ec979d4.js')

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <div id="micro-frontend-1">1</div>
      <div id="micro-frontend-2">2</div>
    </div>
  )
}

export default App
