/*
  # Add Sample Properties with Mock Data

  1. New Tables
    - Create sample properties with realistic data
    - Use placeholder owner IDs that reference existing auth users
  
  2. Sample Data
    - 8 properties across different cities in Andhra Pradesh
    - Mix of apartments, houses, villas, and rooms
    - Realistic pricing and amenities
    - High-quality property images from Pexels
  
  3. Notes
    - Properties will be associated with actual authenticated users
    - If no authenticated users exist, properties will be created with placeholder owner_ids
    - Owner information is embedded in property descriptions for display purposes
*/

-- Insert sample properties with realistic data
-- Note: These will use placeholder UUIDs for owner_id since we can't create auth users directly
-- In a real scenario, these would be associated with actual authenticated users

INSERT INTO properties (
  id,
  owner_id, 
  title, 
  description, 
  address, 
  city, 
  state, 
  rent_amount, 
  deposit_amount,
  property_type, 
  bedrooms, 
  bathrooms, 
  area_sqft, 
  amenities, 
  images, 
  is_available,
  created_at, 
  updated_at
) VALUES 
-- Koushika's Properties
(
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000001'::uuid,
  'Luxury 3BHK Apartment with Sea View - by Koushika',
  'Beautiful spacious apartment with stunning sea views, modern amenities, and prime location. Perfect for families looking for comfort and luxury. The apartment features a large living room, fully equipped kitchen, and balcony overlooking the beach. Contact Owner: Koushika (+91 9876543210)',
  'Beach Road, MVP Colony, Visakhapatnam, Andhra Pradesh 530017',
  'Visakhapatnam',
  'Andhra Pradesh',
  25000,
  75000,
  'apartment',
  3,
  2,
  1400,
  ARRAY['Parking', 'Security', 'Elevator', 'Balcony', 'Air Conditioning', 'Internet', 'Power Backup'],
  ARRAY[
    'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
    'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg',
    'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg'
  ],
  true,
  now(),
  now()
),
(
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000001'::uuid,
  'Modern 2BHK Near IT Hub - by Koushika',
  'Contemporary apartment in the heart of the IT corridor. Ideal for working professionals with easy access to major tech companies. Features modern interiors, high-speed internet, and 24/7 security. Contact Owner: Koushika (+91 9876543210)',
  'Benz Circle, Vijayawada, Andhra Pradesh 520008',
  'Vijayawada',
  'Andhra Pradesh',
  18000,
  54000,
  'apartment',
  2,
  2,
  1100,
  ARRAY['Parking', 'Security', 'Gym', 'Internet', 'Air Conditioning', 'Power Backup'],
  ARRAY[
    'https://images.pexels.com/photos/1571467/pexels-photo-1571467.jpeg',
    'https://images.pexels.com/photos/1571461/pexels-photo-1571461.jpeg'
  ],
  true,
  now(),
  now()
),
(
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000001'::uuid,
  'Traditional House in Heritage Area - by Koushika',
  'Beautiful traditional house in the heritage area of Tirupati. Perfect for families who appreciate cultural architecture. Close to temples and local markets. Contact Owner: Koushika (+91 9876543210)',
  'Heritage Street, Near Tirumala Temple, Tirupati, Andhra Pradesh 517501',
  'Tirupati',
  'Andhra Pradesh',
  15000,
  45000,
  'house',
  3,
  2,
  1300,
  ARRAY['Parking', 'Garden', 'Water Supply', 'Power Backup'],
  ARRAY[
    'https://images.pexels.com/photos/1396119/pexels-photo-1396119.jpeg',
    'https://images.pexels.com/photos/1396126/pexels-photo-1396126.jpeg'
  ],
  true,
  now(),
  now()
),
(
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000001'::uuid,
  'Waterfront Apartment with Pool - by Koushika',
  'Luxury apartment with swimming pool and waterfront views. Premium amenities include gym, clubhouse, and 24/7 concierge service. Contact Owner: Koushika (+91 9876543210)',
  'Waterfront Road, Nellore, Andhra Pradesh 524001',
  'Nellore',
  'Andhra Pradesh',
  28000,
  84000,
  'apartment',
  3,
  2,
  1500,
  ARRAY['Swimming Pool', 'Gym', 'Security', 'Elevator', 'Parking', 'Air Conditioning', 'Internet'],
  ARRAY[
    'https://images.pexels.com/photos/1396117/pexels-photo-1396117.jpeg',
    'https://images.pexels.com/photos/1396123/pexels-photo-1396123.jpeg',
    'https://images.pexels.com/photos/1396127/pexels-photo-1396127.jpeg'
  ],
  true,
  now(),
  now()
),

-- Samkoushi's Properties
(
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000002'::uuid,
  'Spacious Villa with Garden - by Samkoushi',
  'Independent villa with beautiful garden, perfect for large families. Features include a private garden, parking for multiple vehicles, and a peaceful environment away from city noise. Contact Owner: Samkoushi (+91 9876543211)',
  'Lakshmipuram, Guntur, Andhra Pradesh 522007',
  'Guntur',
  'Andhra Pradesh',
  35000,
  105000,
  'villa',
  4,
  3,
  2200,
  ARRAY['Parking', 'Garden', 'Security', 'Air Conditioning', 'Furnished', 'Power Backup', 'Water Supply'],
  ARRAY[
    'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
    'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
    'https://images.pexels.com/photos/1396125/pexels-photo-1396125.jpeg'
  ],
  true,
  now(),
  now()
),
(
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000002'::uuid,
  'Cozy 1BHK for Students - by Samkoushi',
  'Perfect for students and young professionals. Located near colleges and universities with easy access to public transport. Includes basic furniture and all essential amenities. Contact Owner: Samkoushi (+91 9876543211)',
  'University Area, Guntur, Andhra Pradesh 522006',
  'Guntur',
  'Andhra Pradesh',
  8000,
  16000,
  'apartment',
  1,
  1,
  600,
  ARRAY['Furnished', 'Internet', 'Security', 'Water Supply'],
  ARRAY[
    'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg',
    'https://images.pexels.com/photos/1571464/pexels-photo-1571464.jpeg'
  ],
  true,
  now(),
  now()
),
(
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000002'::uuid,
  'Premium Room with Attached Bath - by Samkoushi',
  'Well-furnished single room with attached bathroom. Ideal for working professionals. Includes Wi-Fi, AC, and daily housekeeping services. Contact Owner: Samkoushi (+91 9876543211)',
  'Benz Circle, Vijayawada, Andhra Pradesh 520010',
  'Vijayawada',
  'Andhra Pradesh',
  12000,
  24000,
  'room',
  1,
  1,
  400,
  ARRAY['Furnished', 'Air Conditioning', 'Internet', 'Security'],
  ARRAY[
    'https://images.pexels.com/photos/1571469/pexels-photo-1571469.jpeg'
  ],
  true,
  now(),
  now()
),
(
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000002'::uuid,
  'Family House with Courtyard - by Samkoushi',
  'Traditional family house with central courtyard. Perfect for joint families with multiple rooms and common areas. Includes parking and garden space. Contact Owner: Samkoushi (+91 9876543211)',
  'Old City, Kurnool, Andhra Pradesh 518001',
  'Kurnool',
  'Andhra Pradesh',
  20000,
  60000,
  'house',
  4,
  3,
  1800,
  ARRAY['Parking', 'Garden', 'Water Supply', 'Power Backup', 'Security'],
  ARRAY[
    'https://images.pexels.com/photos/1396121/pexels-photo-1396121.jpeg',
    'https://images.pexels.com/photos/1396124/pexels-photo-1396124.jpeg'
  ],
  true,
  now(),
  now()
)
ON CONFLICT (id) DO NOTHING;