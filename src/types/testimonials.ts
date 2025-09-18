/**
 * TypeScript types for testimonials feature.
 * 
 * Purpose: Centralized type definitions for testimonials
 * Usage: Import in components and API routes for type safety
 */

export interface Testimonial {
  id?: string
  patientName: string
  rating: number
  content: string
  service: string
  isApproved: boolean
  createdAt?: string
  created_at?: string
}

export interface NewTestimonialInput {
  name?: string
  rating: number
  content: string
  service: string
}

export interface TestimonialResponse {
  message?: string
  error?: string
  details?: string
}

