import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase, Profile } from '../lib/supabase'
import toast from 'react-hot-toast'

interface AuthContextType {
  user: User | null
  profile: Profile | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string, userData: { full_name: string; role: 'owner' | 'renter'; phone?: string }) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<Profile>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('AuthProvider: Initializing...')
    
    let mounted = true

    const initializeAuth = async () => {
      try {
        // Get initial session with increased timeout
        const sessionPromise = supabase.auth.getSession()
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Session timeout')), 10000)
        )

        const { data: { session }, error } = await Promise.race([
          sessionPromise,
          timeoutPromise
        ]) as any

        if (!mounted) return

        if (error) {
          console.error('AuthProvider: Error getting initial session:', error)
          setLoading(false)
          return
        }
        
        console.log('AuthProvider: Initial session:', session?.user?.email || 'No user')
        setSession(session)
        setUser(session?.user ?? null)
        
        if (session?.user) {
          await fetchProfile(session.user.id)
        } else {
          setLoading(false)
        }
      } catch (error) {
        console.error('AuthProvider: Session initialization failed:', error)
        if (mounted) {
          setLoading(false)
        }
      }
    }

    initializeAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return
      
      console.log('AuthProvider: Auth state changed:', event, session?.user?.email || 'No user')
      
      setSession(session)
      setUser(session?.user ?? null)
      
      if (session?.user) {
        await fetchProfile(session.user.id)
      } else {
        setProfile(null)
        setLoading(false)
      }
    })

    return () => {
      mounted = false
      console.log('AuthProvider: Cleaning up subscription')
      subscription.unsubscribe()
    }
  }, [])

  const fetchProfile = async (userId: string) => {
    try {
      console.log('AuthProvider: Fetching profile for user:', userId)
      
      // Add increased timeout to profile fetch
      const profilePromise = supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Profile fetch timeout')), 10000)
      )

      const { data, error } = await Promise.race([
        profilePromise,
        timeoutPromise
      ]) as any

      if (error) {
        console.error('AuthProvider: Profile fetch error:', error)
        // Handle the specific case where no profile is found (PGRST116)
        if (error.code === 'PGRST116') {
          console.warn('AuthProvider: No profile found for user, setting profile to null')
          setProfile(null)
        } else {
          console.warn('AuthProvider: Profile fetch failed, continuing without profile')
        }
      } else {
        console.log('AuthProvider: Profile fetched:', data)
        setProfile(data)
      }
    } catch (error) {
      console.error('AuthProvider: Error fetching profile:', error)
      // Don't show error toast for profile fetch failures during initialization or timeouts
      setProfile(null)
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string, userData: { full_name: string; role: 'owner' | 'renter'; phone?: string }) => {
    try {
      console.log('AuthProvider: Starting sign up for:', email)
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      })

      if (error) throw error

      if (data.user) {
        console.log('AuthProvider: User created, creating profile...')
        // Create profile
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              email: data.user.email!,
              full_name: userData.full_name,
              role: userData.role,
              phone: userData.phone
            }
          ])

        if (profileError) {
          console.error('AuthProvider: Profile creation error:', profileError)
          throw profileError
        }
        
        console.log('AuthProvider: Sign up successful')
        toast.success('Account created successfully!')
      }
    } catch (error: any) {
      console.error('AuthProvider: Sign up error:', error)
      toast.error(error.message || 'Error creating account')
      throw error
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      console.log('AuthProvider: Starting sign in for:', email)
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error
      
      console.log('AuthProvider: Sign in successful')
      toast.success('Signed in successfully!')
    } catch (error: any) {
      console.error('AuthProvider: Sign in error:', error)
      toast.error(error.message || 'Error signing in')
      throw error
    }
  }

  const signOut = async () => {
    try {
      console.log('AuthProvider: Starting sign out process...')
      console.log('AuthProvider: Current user before signout:', user?.email)
      
      // Clear local state immediately for better UX
      setUser(null)
      setProfile(null)
      setSession(null)
      
      const { error } = await supabase.auth.signOut()
      if (error) {
        // Handle the specific case where user is already signed out on server
        if (error.message === 'User from sub claim in JWT does not exist' || error.message?.includes('user_not_found')) {
          console.warn('AuthProvider: User already signed out on server, treating as successful')
          toast.success('Signed out successfully!')
          return
        }
        console.error('AuthProvider: Supabase signOut error:', error)
        throw error
      }
      
      console.log('AuthProvider: Supabase sign out successful')
      toast.success('Signed out successfully!')
    } catch (error: any) {
      console.error('AuthProvider: Sign out error:', error)
      toast.error(error.message || 'Error signing out')
      throw error
    }
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) throw new Error('No user logged in')

    try {
      console.log('AuthProvider: Updating profile:', updates)
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)

      if (error) throw error

      setProfile(prev => prev ? { ...prev, ...updates } : null)
      console.log('AuthProvider: Profile updated successfully')
      toast.success('Profile updated successfully!')
    } catch (error: any) {
      console.error('AuthProvider: Profile update error:', error)
      toast.error(error.message || 'Error updating profile')
      throw error
    }
  }

  const value = {
    user,
    profile,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile
  }

  console.log('AuthProvider: Current state - Loading:', loading, 'User:', user?.email || 'None', 'Profile:', profile?.full_name || 'None')

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}