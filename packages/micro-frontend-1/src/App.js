import React from 'react'

import './App.css'

const App = () => (
  <div
    className="App"
    onClick={() => {
      window
      .top
      .dispatchEvent(
        new Event('unknownPath')
      )
    }}
  >
    Micro Frontend 1
  </div>
)

export default App
