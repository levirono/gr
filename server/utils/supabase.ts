import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// Helper function to handle database errors
export const handleDatabaseError = (error: any) => {
  console.error('Database error:', error)
  throw createError({
    statusCode: 500,
    message: 'Internal server error'
  })
}

// Database types
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          description: string
          icon: string
          slug: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          icon: string
          slug: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          icon?: string
          slug?: string
          created_at?: string
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          title: string
          slug: string
          category_id: string
          author_id: string
          content: string
          excerpt: string
          rating: number
          quick_summary: Record<string, string>
          pros: string[]
          cons: string[]
          sections: Record<string, any>
          verdict: string
          created_at: string
          updated_at: string
          is_featured: boolean
        }
        Insert: {
          id?: string
          title: string
          slug: string
          category_id: string
          author_id: string
          content: string
          excerpt: string
          rating: number
          quick_summary: Record<string, string>
          pros: string[]
          cons: string[]
          sections: Record<string, any>
          verdict: string
          created_at?: string
          updated_at?: string
          is_featured?: boolean
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          category_id?: string
          author_id?: string
          content?: string
          excerpt?: string
          rating?: number
          quick_summary?: Record<string, string>
          pros?: string[]
          cons?: string[]
          sections?: Record<string, any>
          verdict?: string
          created_at?: string
          updated_at?: string
          is_featured?: boolean
        }
      }
      review_images: {
        Row: {
          id: string
          review_id: string
          cloudinary_url: string
          cloudinary_public_id: string
          section: string
          created_at: string
        }
        Insert: {
          id?: string
          review_id: string
          cloudinary_url: string
          cloudinary_public_id: string
          section: string
          created_at?: string
        }
        Update: {
          id?: string
          review_id?: string
          cloudinary_url?: string
          cloudinary_public_id?: string
          section?: string
          created_at?: string
        }
      }
      retailers: {
        Row: {
          id: string
          review_id: string
          name: string
          price: number
          link: string
          created_at: string
        }
        Insert: {
          id?: string
          review_id: string
          name: string
          price: number
          link: string
          created_at?: string
        }
        Update: {
          id?: string
          review_id?: string
          name?: string
          price?: number
          link?: string
          created_at?: string
        }
      }
    }
  }
} 