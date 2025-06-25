import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Anon Key:', supabaseAnonKey ? 'Present' : 'Missing')

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Test the connection with increased timeout
const testConnection = async () => {
  try {
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Connection timeout')), 10000)
    )
    
    const sessionPromise = supabase.auth.getSession()
    
    const { data, error } = await Promise.race([sessionPromise, timeoutPromise]) as any
    
    if (error) {
      console.error('Supabase connection error:', error)
    } else {
      console.log('Supabase connected successfully. Session:', data.session?.user?.email || 'No user')
    }
  } catch (error) {
    console.error('Supabase connection test failed:', error)
  }
}

testConnection()

// Database types
export interface Profile {
  id: string
  email: string
  full_name: string
  role: 'owner' | 'renter' | 'admin'
  phone?: string
  created_at: string
  updated_at: string
}

export interface Property {
  id: string
  owner_id: string
  title: string
  description: string
  address: string
  city: string
  state: string
  rent_amount: number
  deposit_amount: number
  property_type: 'apartment' | 'house' | 'villa' | 'room'
  bedrooms: number
  bathrooms: number
  area_sqft: number
  amenities: string[]
  images: string[]
  is_available: boolean
  created_at: string
  updated_at: string
  owner?: Profile
}

export interface Rating {
  id: string
  property_id: string
  renter_id: string
  rating: number
  review?: string
  created_at: string
  renter?: Profile
}

// Andhra Pradesh cities
export const AP_CITIES = [
  'Visakhapatnam',
  'Vijayawada',
  'Guntur',
  'Nellore',
  'Kurnool',
  'Rajahmundry',
  'Tirupati',
  'Kadapa',
  'Kakinada',
  'Anantapur',
  'Vizianagaram',
  'Eluru',
  'Ongole',
  'Nandyal',
  'Machilipatnam',
  'Adoni',
  'Tenali',
  'Chittoor',
  'Hindupur',
  'Proddatur',
  'Bhimavaram',
  'Madanapalle',
  'Guntakal',
  'Dharmavaram',
  'Gudivada',
  'Narasaraopet',
  'Tadipatri',
  'Mangalagiri',
  'Chilakaluripet'
]