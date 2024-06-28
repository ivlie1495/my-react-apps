import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import App from './App'

describe('App Content', () => {
  it('Should render a button', () => {
    render(<App />)

    expect(screen.getByTestId('button-test')).toBeInTheDocument()
  })
})
