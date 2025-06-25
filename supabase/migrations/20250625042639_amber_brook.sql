/*
  # Add foreign key relationship between properties and profiles

  1. Changes
    - Add foreign key constraint to link properties.owner_id to profiles.id
    - This enables Supabase to understand the relationship for joins

  2. Security
    - No changes to existing RLS policies
    - Maintains data integrity with proper referential constraints
*/

-- Add foreign key constraint to establish relationship between properties and profiles
ALTER TABLE properties 
ADD CONSTRAINT fk_properties_owner 
FOREIGN KEY (owner_id) REFERENCES profiles(id) ON DELETE CASCADE;

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_properties_owner_id ON properties(owner_id);