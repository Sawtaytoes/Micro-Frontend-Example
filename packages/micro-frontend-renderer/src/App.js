import React, { useEffect } from 'react'
import { BrowserRouter, Link, useLocation } from 'react-router-dom'

import './App.css'

const useScript = ({
  matchingPathname,
  currentPathname,
  scriptLocations,
}) => {
  useEffect(() => {
    if (`/${matchingPathname}` !== currentPathname) {
      return Function.prototype
    }

    const scriptElements = (
      scriptLocations
      .map(scriptLocation => {
        const scriptElement = document.createElement('script')

        scriptElement.src = scriptLocation
        scriptElement.async = true

        return scriptElement
      })
    )

    scriptElements
    .forEach(scriptElement => {
      document.body.appendChild(scriptElement)
    })

    return () => {
      scriptElements
      .forEach(scriptElement => {
        document.body.removeChild(scriptElement)
      })
    }
  }, [currentPathname, matchingPathname, scriptLocations])
}

const MicroFrontendLoader = ({
  matchingPathname,
  scriptLocations,
}) => {
  const location = useLocation()

  const currentPathname = location.pathname.replace(/^(.*?)[/]*$/, '$1')

  useScript({
    currentPathname,
    matchingPathname,
    scriptLocations,
  })

  return (
    `/${matchingPathname}` === currentPathname
    ? <div id={matchingPathname} />
    : null
  )
}

const App = () => (
  <BrowserRouter>
    <div className="App">
      <header className="App-header">
        Parent Document Header
      </header>

      <nav>
        <div>
          <Link to="/micro-frontend-1">Load "Micro Frontend 1"</Link>
        </div>
        <div>
          <Link to="/micro-frontend-2">Load "Micro Frontend 2"</Link>
        </div>
      </nav>

      <MicroFrontendLoader
        matchingPathname="micro-frontend-1"
        scriptLocations={[
          '/micro-frontend-1/2.23615124.chunk.js',
          '/micro-frontend-1/main.90a2c267.chunk.js',
          '/micro-frontend-1/runtime-main.7ec979d4.js',
        ]}
      />

      <MicroFrontendLoader
        matchingPathname="micro-frontend-2"
        scriptLocations={[
          '/micro-frontend-2/2.b8170ca8.chunk.js',
          '/micro-frontend-2/main.0f1b2201.chunk.js',
          '/micro-frontend-2/runtime-main.0ef16878.js',
        ]}
      />

      <footer className="App-header">
        Parent Document Footer
      </footer>
    </div>
  </BrowserRouter>
)

export default App
