import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import Box from './Box'

describe('Box Component', () => {
  it('Should render a box', () => {
    render(<Box />)

    expect(screen.getByTestId('box-test'))
  })
})
