import React, { useCallback, useEffect, useRef, useState } from 'react'
import { BrowserRouter, Link, Redirect, Route, Switch, useHistory } from 'react-router-dom'

import './App.css'

const MicroFrontendLoader = ({
  assetManifestLocation,
  microFrontendIdentifier,
}) => {
  const [linkHrefs, setLinkHrefs] = useState([])
  const [scriptSrcs, setScriptSrcs] = useState([])

  useEffect(() => {
    fetch(assetManifestLocation)
    .then(response => (
      response
      .json()
    ))
    .then(({
      entrypoints,
    }) => {
      setLinkHrefs(
        entrypoints
        .filter(entrypoint => (
          entrypoint
          .match(/^.*?\.css$/)
        ))
      )

      setScriptSrcs(
        entrypoints
        .filter(entrypoint => (
          entrypoint
          .match(/^.*?\.js$/)
        ))
      )
    })
  }, [assetManifestLocation])

  useEffect(() => {
    const scriptElements = (
      scriptSrcs
      .map(scriptSrc => {
        const scriptElement = (
          document
          .createElement('script')
        )

        scriptElement.async = true
        scriptElement.src = `/${microFrontendIdentifier}/${scriptSrc}`

        document
        .body
        .appendChild(scriptElement)

        return scriptElement
      })
    )

    return () => {
      scriptElements
      .forEach(scriptElement => {
        document
        .body
        .removeChild(scriptElement)
      })
    }
  }, [microFrontendIdentifier, scriptSrcs])

  return (
    <div id={`${microFrontendIdentifier}-loader`}>
      <div id={microFrontendIdentifier} />

      {
        linkHrefs
        .map(linkHref => (
          <link
            href={`/${microFrontendIdentifier}/${linkHref}`}
            key={linkHref}
            rel="stylesheet"
          />
        ))
      }
    </div>
  )
}

const MicroFrontendLoaderIframe = ({
  indexHtmlLocation,
  microFrontendIdentifier,
}) => {
  const iframeRef = useRef()
  const [iframeContents, setIframeContents] = useState(null)
  const [iframeHeight, setIframeHeight] = useState(0)

  useEffect(() => {
    fetch(indexHtmlLocation)
    .then(response => (
      response
      .text()
    ))
    .then(setIframeContents)
  }, [indexHtmlLocation])

  const onIframeHeightChanged = (
    useCallback(() => {
      window.requestAnimationFrame(() => {
        setIframeHeight(
          iframeRef
          .current
          .contentDocument
          .body
          .clientHeight
        )
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
    <iframe
      id={microFrontendIdentifier}
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
          <Link to="/micro-frontend-1-iframe">Load "Micro Frontend 1" in iframe</Link>
        </div>
        <div>
          <Link to="/micro-frontend-2">Load "Micro Frontend 2"</Link>
        </div>
        <div>
          <Link to="/micro-frontend-2-iframe">Load "Micro Frontend 2" in iframe</Link>
        </div>
      </nav>

      <Switch>
        <Route path="/micro-frontend-1">
          <MicroFrontendLoader
            assetManifestLocation="/micro-frontend-1/asset-manifest.json"
            microFrontendIdentifier="micro-frontend-1"
          />
        </Route>
        <Route path="/micro-frontend-1-iframe">
          <MicroFrontendLoaderIframe
            indexHtmlLocation="/micro-frontend-1/app.html"
            microFrontendIdentifier="micro-frontend-1"
          />
        </Route>

        <Route path="/micro-frontend-2">
          <MicroFrontendLoader
            assetManifestLocation="/micro-frontend-2/asset-manifest.json"
            microFrontendIdentifier="micro-frontend-2"
          />
        </Route>
        <Route path="/micro-frontend-2-iframe">
          <MicroFrontendLoaderIframe
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
