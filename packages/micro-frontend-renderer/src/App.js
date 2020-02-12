import React, { useCallback, useEffect, useRef, useState } from 'react'
import { BrowserRouter, Link, Redirect, Route, Switch, useHistory } from 'react-router-dom'

import './App.css'

const MicroFrontendLoader = ({
  cssLocation,
  microFrontendIdentifier,
  scriptLocations,
}) => {
  const iframeRef = useRef()
  const [iframeHeight, setIframeHeight] = useState()

  const onIframeHeightChanged = (
    useCallback(() => {
      window.requestAnimationFrame(() => {
        setIframeHeight(iframeRef.current.contentDocument.body.clientHeight)
      })
    }, [iframeRef])
  )

  useEffect(() => {
    window.addEventListener('resize', onIframeHeightChanged)

    return () => {
      window.removeEventListener('resize', onIframeHeightChanged)
    }
  }, [onIframeHeightChanged])

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
        border: 'none',
        display: 'block',
        height: (
          iframeHeight
          ? `${iframeHeight}px`
          : '100%'
        ),
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

      <Switch>
        <Route path="/micro-frontend-1">
          <MicroFrontendLoader
            cssLocation="/micro-frontend-1/main.a9054f16.chunk.css"
            microFrontendIdentifier="micro-frontend-1"
            scriptLocations={[
              '/micro-frontend-1/2.23615124.chunk.js',
              '/micro-frontend-1/main.90a2c267.chunk.js',
              '/micro-frontend-1/runtime-main.7ec979d4.js',
            ]}
          />
        </Route>

        <Route path="/micro-frontend-2">
          <MicroFrontendLoader
            cssLocation="/micro-frontend-2/main.2e837e40.chunk.css"
            microFrontendIdentifier="micro-frontend-2"
            scriptLocations={[
              '/micro-frontend-2/2.b8170ca8.chunk.js',
              '/micro-frontend-2/main.0f1b2201.chunk.js',
              '/micro-frontend-2/runtime-main.0ef16878.js',
            ]}
          />
        </Route>

        <Route path="/404">
          <div className="App-unknownPathname">
            404 - Path not found.
          </div>
        </Route>

        <Redirect to="/404" />
      </Switch>

      <footer className="App-header">
        Parent Document Footer
      </footer>
    </div>
  </BrowserRouter>
)

export default App
