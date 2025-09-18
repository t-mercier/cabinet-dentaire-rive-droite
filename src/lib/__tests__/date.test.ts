/**
 * What changed & why
 * - Example unit test for a tiny date formatting behavior.
 */

import { describe, expect, it } from 'vitest'

function toISODateString(input?: string | number | Date) {
  const d = input ? new Date(input) : new Date()
  return d.toISOString().split('T')[0]
}

describe('toISODateString', () => {
  it('formats a timestamp as YYYY-MM-DD', () => {
    expect(toISODateString('2024-01-15T12:00:00Z')).toBe('2024-01-15')
  })

  it('handles Date objects', () => {
    const d = new Date('2023-12-31T23:59:59Z')
    expect(toISODateString(d)).toBe('2023-12-31')
  })
})

