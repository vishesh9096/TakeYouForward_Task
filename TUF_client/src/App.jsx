import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Router from './Router'
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react'
import Header from './components/Header'
import Footer from './components/Footer'
import theme from './theme'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ChakraProvider theme={theme}>

      
        <Router/>
      {/* <Footer/> */}

      </ChakraProvider>
    </>
  )
}

export default App
