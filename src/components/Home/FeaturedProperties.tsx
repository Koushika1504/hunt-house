import React, { useEffect, useState } from 'react'
                    <div className="absolute top-4 right-4">
                      <div className="bg-white bg-opacity-90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">4.5</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                        {property.title}
                      </h3>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary-600">
                          {formatPrice(property.rent_amount)}
                        </p>
                        <p className="text-sm text-gray-500">per month</p>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{property.city}, {property.state}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Bed className="h-4 w-4 mr-1" />
                          <span>{property.bedrooms}</span>
                        </div>
                        <div className="flex items-center">
                          <Bath className="h-4 w-4 mr-1" />
                          <span>{property.bathrooms}</span>
                        </div>
                        <div className="flex items-center">
                          <Square className="h-4 w-4 mr-1" />
                          <span>{property.area_sqft} sqft</span>
                        </div>
                      </div>
                    </div>

                    <Link
                      to={`/property/${property.id}`}
                      className="block w-full bg-primary-600 text-white text-center py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link
                to="/search"
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                View All Properties
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default FeaturedProperties
