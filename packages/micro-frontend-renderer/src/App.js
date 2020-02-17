import React, { useCallback, useEffect, useRef, useState } from 'react'
import { BrowserRouter, Link, Redirect, Route, Switch, useHistory } from 'react-router-dom'

import './App.css'

const MicroFrontendLoader = ({
  indexHtmlLocation,
  microFrontendIdentifier,
}) => {
  const iframeRef = useRef()
  const [iframeContents, setIframeContents] = useState(null)
  const [iframeHeight, setIframeHeight] = useState(0)

  const onIframeHeightChanged = (
    useCallback(() => {
      window.requestAnimationFrame(() => {
        setIframeHeight(iframeRef.current.contentDocument.body.clientHeight)
      })
    }, [iframeRef])
  )

  useEffect(() => {
    fetch(indexHtmlLocation)
    .then(response => (
      response
      .text()
    ))
    .then(setIframeContents)
  }, [indexHtmlLocation])

  useEffect(() => {
    window.addEventListener('resize', onIframeHeightChanged)

    return () => {
      window.removeEventListener('resize', onIframeHeightChanged)
    }
  }, [onIframeHeightChanged])

  return (
    <iframe
      onLoad={onIframeHeightChanged}
      ref={iframeRef}
      srcDoc={iframeContents}
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
      title={microFrontendIdentifier}
    />
  )
}

const EventListener = () => {
  const history = useHistory()

  useEffect(() => {
    const redirectOnUnknownPath = () => {
      history.push('/404')
    }

    window.addEventListener('unknownPath', redirectOnUnknownPath)

    return () => {
      window.removeEventListener('unknownPath', redirectOnUnknownPath)
    }
  }, [history])

  return null
}

const App = () => (
  <BrowserRouter>
    <EventListener />

    <div className="App">
      <header className="App-header">
        Parent Document Header
      </header>

      <nav>
        <div>
          <Link to="/">Main Route</Link>
        </div>
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
            indexHtmlLocation="/micro-frontend-1/app.html"
            microFrontendIdentifier="micro-frontend-1"
          />
        </Route>

        <Route path="/micro-frontend-2">
          <MicroFrontendLoader
            indexHtmlLocation="/micro-frontend-2/app.html"
            microFrontendIdentifier="micro-frontend-2"
          />
        </Route>

        <Route path="/404">
          <div className="App-unknownPathname">
            404 - Path not found (this is intentional).
          </div>
        </Route>

        <Route
          exact
          path="/"
        >
          <div
            className="App-main"
            onClick={() => {
              window
              .top
              .dispatchEvent(
                new Event('unknownPath')
              )
            }}
          >
            Main Route.
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
