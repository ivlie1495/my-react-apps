import './App.css'
import Box from './components/Box'

function App() {
  return (
    <main>
      <Box>
        <h1>Hello World!</h1>
        <p>API URL: {process.env.VITE_API_URL}</p>
        <button data-testid="button-test">This is a button</button>
      </Box>
    </main>
  )
}

export default App
