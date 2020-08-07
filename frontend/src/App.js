import React, { useState } from 'react'
import ImageClassifier from './components/ImageClassifier'
import Navbar from './Navbar'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { useTheme, useThemeUpdate } from './ThemeContext'
import { useEffect } from 'react'

const App = () => {
  const [darkState, setDarkState] = useState(true)
  const palletType = darkState ? 'dark' : 'light'
  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
    },
  })

  const handleThemeChange = () => {
    setDarkState(!darkState)
  }
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Navbar handleThemeChange={handleThemeChange} darkState={darkState} />
        <ImageClassifier darkState={darkState} />
      </ThemeProvider>
    </>
  )
}

export default App
