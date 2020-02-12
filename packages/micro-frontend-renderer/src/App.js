import React from 'react'
import { BrowserRouter, Link, useLocation } from 'react-router-dom'

import './App.css'

const MicroFrontendLoader = ({
  cssLocation,
  matchingPathname,
  scriptLocations,
}) => {
  const location = useLocation()

  const currentPathname = location.pathname.replace(/^(.*?)[/]*$/, '$1')

  return (
    `/${matchingPathname}` === currentPathname
    ? (
      <iframe
        srcDoc={`
          <!DOCTYPE html>
          <html>
            <head>
              <link href="${cssLocation}" rel="stylesheet">
            </head>
            <body>
              <div id="${matchingPathname}" />

              ${
                scriptLocations
                .map(scriptLocation => (
                  `<script async src="${scriptLocation}"></script>`
                ))
                .join('')
              }
            </body>
          </html>
        `}
        style={{
          border: 0,
          width: '100%',
        }}
        title={matchingPathname}
      />
    )
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
        cssLocation="/micro-frontend-1/main.d1b05096.chunk.css"
        matchingPathname="micro-frontend-1"
        scriptLocations={[
          '/micro-frontend-1/2.23615124.chunk.js',
          '/micro-frontend-1/main.90a2c267.chunk.js',
          '/micro-frontend-1/runtime-main.7ec979d4.js',
        ]}
      />

      <MicroFrontendLoader
        cssLocation="/micro-frontend-2/main.9b5ecd00.chunk.css"
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
