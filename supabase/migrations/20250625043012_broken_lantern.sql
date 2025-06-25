/*
  # Add Sample Properties with Static Data

  1. Sample Profiles
    - Creates two property owners: Koushika and Samkoushi
    - Each with contact information and owner role

  2. Sample Properties
    - 8 diverse properties across different cities in Andhra Pradesh
    - Various property types (apartment, house, villa, room)
    - Different price ranges and amenities
    - High-quality property images from Pexels

  3. Features
    - Realistic property descriptions and addresses
    - Varied amenities and specifications
    - Properties distributed across major AP cities
*/

-- Insert sample owner profiles
INSERT INTO profiles (id, email, full_name, role, phone, created_at, updated_at)
VALUES 
  (
    gen_random_uuid(),
    'koushika@example.com',
    'Koushika',
    'owner',
    '+91 9876543210',
    now(),
    now()
  ),
  (
    gen_random_uuid(),
    'samkoushi@example.com',
    'Samkoushi',
    'owner',
    '+91 9876543211',
    now(),
    now()
  )
ON CONFLICT (email) DO NOTHING;

-- Insert sample properties
WITH owner_ids AS (
  SELECT id, full_name FROM profiles WHERE full_name IN ('Koushika', 'Samkoushi')
)
INSERT INTO properties (
  owner_id, title, description, address, city, state, rent_amount, deposit_amount,
  property_type, bedrooms, bathrooms, area_sqft, amenities, images, is_available,
  created_at, updated_at
)
SELECT 
  koushika.id,
  'Luxury 3BHK Apartment with Sea View',
  'Beautiful spacious apartment with stunning sea views, modern amenities, and prime location. Perfect for families looking for comfort and luxury. The apartment features a large living room, fully equipped kitchen, and balcony overlooking the beach.',
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
FROM owner_ids koushika WHERE koushika.full_name = 'Koushika'

UNION ALL

SELECT 
  koushika.id,
  'Modern 2BHK Near IT Hub',
  'Contemporary apartment in the heart of the IT corridor. Ideal for working professionals with easy access to major tech companies. Features modern interiors, high-speed internet, and 24/7 security.',
  'Madhapur, HITEC City, Hyderabad, Andhra Pradesh 500081',
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
FROM owner_ids koushika WHERE koushika.full_name = 'Koushika'

UNION ALL

SELECT 
  samkoushi.id,
  'Spacious Villa with Garden',
  'Independent villa with beautiful garden, perfect for large families. Features include a private garden, parking for multiple vehicles, and a peaceful environment away from city noise.',
  'Banjara Hills, Road No. 12, Hyderabad, Andhra Pradesh 500034',
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
FROM owner_ids samkoushi WHERE samkoushi.full_name = 'Samkoushi'

UNION ALL

SELECT 
  samkoushi.id,
  'Cozy 1BHK for Students',
  'Perfect for students and young professionals. Located near colleges and universities with easy access to public transport. Includes basic furniture and all essential amenities.',
  'University Area, Guntur, Andhra Pradesh 522007',
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
FROM owner_ids samkoushi WHERE samkoushi.full_name = 'Samkoushi'

UNION ALL

SELECT 
  koushika.id,
  'Traditional House in Heritage Area',
  'Beautiful traditional house in the heritage area of Tirupati. Perfect for families who appreciate cultural architecture. Close to temples and local markets.',
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
FROM owner_ids koushika WHERE koushika.full_name = 'Koushika'

UNION ALL

SELECT 
  samkoushi.id,
  'Premium Room with Attached Bath',
  'Well-furnished single room with attached bathroom. Ideal for working professionals. Includes Wi-Fi, AC, and daily housekeeping services.',
  'Benz Circle, Vijayawada, Andhra Pradesh 520008',
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
FROM owner_ids samkoushi WHERE samkoushi.full_name = 'Samkoushi'

UNION ALL

SELECT 
  koushika.id,
  'Waterfront Apartment with Pool',
  'Luxury apartment with swimming pool and waterfront views. Premium amenities include gym, clubhouse, and 24/7 concierge service.',
  'Banjara Hills, Hyderabad, Andhra Pradesh 500034',
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
FROM owner_ids koushika WHERE koushika.full_name = 'Koushika'

UNION ALL

SELECT 
  samkoushi.id,
  'Family House with Courtyard',
  'Traditional family house with central courtyard. Perfect for joint families with multiple rooms and common areas. Includes parking and garden space.',
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
FROM owner_ids samkoushi WHERE samkoushi.full_name = 'Samkoushi';