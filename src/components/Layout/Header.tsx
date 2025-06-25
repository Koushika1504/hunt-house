import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Home, User, LogOut, Menu, X, Search, Plus, Settings } from 'lucide-react'

const Header: React.FC = () => {
  const { user, profile, signOut } = useAuth()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)

  const handleSignOut = async () => {
    if (isSigningOut) return // Prevent multiple clicks
    
    try {
      setIsSigningOut(true)
      console.log('Header: Starting sign out process...')
      console.log('Header: Current user before signout:', user?.email)
      
      await signOut()
      
      console.log('Header: Sign out successful, navigating to home...')
      navigate('/', { replace: true })
      setIsMenuOpen(false)
    } catch (error) {
      console.error('Header: Sign out failed:', error)
    } finally {
      setIsSigningOut(false)
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Debug logging
  console.log('Header render - User:', user?.email || 'No user', 'Profile:', profile?.full_name || 'No profile')

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-2 rounded-lg group-hover:scale-105 transition-transform">
              <Home className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              HouseHunt
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/search"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1"
            >
              <Search className="h-4 w-4" />
              <span>Search</span>
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                {profile?.role === 'owner' && (
                  <Link
                    to="/owner/dashboard"
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-1"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Property</span>
                  </Link>
                )}
                
                {profile?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="bg-accent-600 text-white px-4 py-2 rounded-lg hover:bg-accent-700 transition-colors flex items-center space-x-1"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Admin</span>
                  </Link>
                )}

                <div className="flex items-center space-x-2">
                  <div className="bg-primary-100 p-2 rounded-full">
                    <User className="h-5 w-5 text-primary-600" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">{profile?.full_name || 'Loading...'}</p>
                    <p className="text-gray-500 capitalize">{profile?.role || 'Loading...'}</p>
                  </div>
                </div>

                <button
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className="text-gray-500 hover:text-red-600 p-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  title={isSigningOut ? "Signing out..." : "Sign Out"}
                >
                  {isSigningOut ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-600"></div>
                  ) : (
                    <LogOut className="h-5 w-5" />
                  )}
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-slide-up">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/search"
                className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1"
                onClick={() => setIsMenuOpen(false)}
              >
                <Search className="h-4 w-4" />
                <span>Search</span>
              </Link>
              
              {user ? (
                <>
                  {profile?.role === 'owner' && (
                    <Link
                      to="/owner/dashboard"
                      className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Property</span>
                    </Link>
                  )}
                  
                  {profile?.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Settings className="h-4 w-4" />
                      <span>Admin Panel</span>
                    </Link>
                  )}

                  <div className="px-3 py-2 border-t border-gray-200 mt-2">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="bg-primary-100 p-2 rounded-full">
                        <User className="h-5 w-5 text-primary-600" />
                      </div>
                      <div className="text-sm">
                        <p className="font-medium text-gray-900">{profile?.full_name || 'Loading...'}</p>
                        <p className="text-gray-500 capitalize">{profile?.role || 'Loading...'}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleSignOut}
                      disabled={isSigningOut}
                      className="text-red-600 hover:text-red-700 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSigningOut ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                          <span>Signing Out...</span>
                        </>
                      ) : (
                        <>
                          <LogOut className="h-4 w-4" />
                          <span>Sign Out</span>
                        </>
                      )}
                    </button>
                  </div>
                </>
              ) : (
                <div className="px-3 py-2 border-t border-gray-200 mt-2 space-y-2">
                  <Link
                    to="/login"
                    className="block text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block bg-primary-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-700 transition-colors text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header