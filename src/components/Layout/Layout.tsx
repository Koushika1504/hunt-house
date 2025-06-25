import React from 'react'
import Header from './Header'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-2 rounded-lg">
                  <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </div>
                <span className="text-2xl font-bold">HouseHunt</span>
              </div>
              <p className="text-gray-300 mb-4 max-w-md">
                Connecting house owners and renters across Andhra Pradesh. Find your perfect home or list your property with ease.
              </p>
              <div className="text-sm text-gray-400">
                <p>© 2024 HouseHunt. All rights reserved.</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="/search" className="hover:text-white transition-colors">Search Properties</a></li>
                <li><a href="/register" className="hover:text-white transition-colors">Register</a></li>
                <li><a href="/login" className="hover:text-white transition-colors">Login</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-300">
                <li>Email: info@househunt.com</li>
                <li>Phone: +91 9876543210</li>
                <li>Address: Andhra Pradesh, India</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout