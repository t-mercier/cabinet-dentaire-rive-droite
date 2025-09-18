/**
 * What changed & why
 * - Centralized API calls for testimonials used by the UI.
 * - Keeps fetch/JSON handling in one place, with small helpers.
 */

export type PublicTestimonial = {
  id: string
  patientName: string
  rating: number
  content: string
  service?: string | null
  createdAt?: string
  created_at?: string
}

/**
 * Fetch testimonials from the server API.
 * Returns parsed JSON or throws on HTTP error.
 */
export async function getTestimonials(): Promise<PublicTestimonial[]> {
  const res = await fetch('/api/testimonials', { cache: 'no-store' })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

/**
 * Submit a new testimonial to the server API.
 * Returns created record metadata or throws on HTTP error.
 */
export async function postTestimonial(input: {
  name?: string
  rating: number
  content: string
  service: string
}): Promise<{ message: string; id?: string }> {
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

