import React from 'react'
import Layout from '../components/Layout/Layout'
import Hero from '../components/Home/Hero'
import FeaturedProperties from '../components/Home/FeaturedProperties'
import { CheckCircle, Shield, Users, Clock } from 'lucide-react'

const Home: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Verified Properties',
      description: 'All properties are verified by our team to ensure authenticity and quality.'
    },
    {
      icon: Users,
      title: 'Trusted Community',
      description: 'Connect with verified house owners and renters in your area.'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Our support team is available round the clock to help you.'
    },
    {
      icon: CheckCircle,
      title: 'Easy Process',
      description: 'Simple and straightforward process to list or find properties.'
    }
  ]

  return (
    <Layout>
      <Hero />
      <FeaturedProperties />
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose HouseHunt?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make finding and listing properties simple, secure, and efficient
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300 group"
              >
                <div className="bg-gradient-to-r from-primary-500 to-secondary-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Find Your Perfect Home?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of satisfied users who found their ideal properties through HouseHunt
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/search"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Start Searching
            </a>
            <a
              href="/register"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              List Your Property
            </a>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Home