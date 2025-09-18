/**
 * What changed & why
 * - Example component test to ensure Header renders key links.
 */

import { render, screen } from '@testing-library/react'
import React from 'react'
import Header from '@/components/header'

// Next.js Link uses <a> under the hood; works in jsdom

describe('Header', () => {
  it('renders navigation links', () => {
    render(<Header />)
    expect(screen.getByText('Accueil')).toBeInTheDocument()
    expect(screen.getAllByText('Services')[0]).toBeInTheDocument()
    expect(screen.getByText('Témoignages')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })
})

