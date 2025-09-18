/**
 * Client-side API helpers for testimonials.
 * 
 * Purpose: Centralized fetch calls for testimonials API
 * Usage: Import in client components for data fetching
 * Security: Uses public API routes only
 */

import type { Testimonial, NewTestimonialInput, TestimonialResponse } from '@/types/testimonials'

/**
 * Fetch testimonials from the server API.
 * Returns parsed JSON or throws on HTTP error.
 */
export async function getTestimonials(): Promise<Testimonial[]> {
  const res = await fetch('/api/testimonials', { cache: 'no-store' })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

/**
 * Submit a new testimonial to the server API.
 * Returns created record metadata or throws on HTTP error.
 */
export async function postTestimonial(input: NewTestimonialInput): Promise<TestimonialResponse> {
  const res = await fetch('/api/testimonials', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })

  if (!res.ok) {
    const text = await res.text()
    try {
      const json = JSON.parse(text)
      throw new Error(json.error || 'Erreur lors de l\'envoi du témoignage')
    } catch {
      throw new Error(text || 'Erreur lors de l\'envoi du témoignage')
    }
  }
  return res.json()
}

