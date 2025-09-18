/**
 * Individual testimonial card component.
 * 
 * Purpose: Display a single testimonial with rating stars and content
 * Usage: Used in testimonials list and grid layouts
 * Props: Testimonial data with display formatting
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Star } from 'lucide-react'

interface TestimonialCardProps {
  testimonial: {
    id: string
    name: string
    rating: number
    content: string
    service: string
    date: string
    isStatic: boolean
  }
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-lg">{testimonial.name}</CardTitle>
          <span className="text-sm text-gray-500">{testimonial.date}</span>
        </div>
        <div className="flex items-center mb-2">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
          ))}
        </div>
        <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full inline-block">
          {testimonial.service}
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-700 leading-relaxed">
          "{testimonial.content}"
        </CardDescription>
      </CardContent>
    </Card>
  )
}