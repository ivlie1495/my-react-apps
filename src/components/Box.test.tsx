import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import Box from './Box'

describe('Box Component', () => {
  it('should render a button', () => {
    render(<Box />)

    expect(screen.getByTestId('box-test')).toBeInTheDocument()
  })
})
