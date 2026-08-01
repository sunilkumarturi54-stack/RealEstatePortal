/**
 * Mock Initial Data Store for Properties
 */
const INITIAL_PROPERTIES = [
  {
    id: 'prop-1',
    title: 'The Grand View Modern Villa',
    type: 'Villa',
    price: 3450000,
    location: 'Los Angeles, CA',
    address: '742 Evergreen Terrace, Beverly Hills',
    bedrooms: 5,
    bathrooms: 6,
    area: 5800,
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
    description: 'An architectural masterpiece featuring floor-to-ceiling glass, infinite city view pool, custom Italian cabinetry, and state-of-the-art smart home integration.',
    amenities: ['Swimming Pool', 'Garden', 'Gym', 'Security', 'Balcony', 'Parking']
  },
  {
    id: 'prop-2',
    title: 'Skyline Penthouse Suites',
    type: 'Penthouse',
    price: 2100000,
    location: 'New York, NY',
    address: '432 Park Avenue, Manhattan',
    bedrooms: 3,
    bathrooms: 3.5,
    area: 3200,
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    description: 'Breathtaking 360-degree panoramic views of Central Park and the skyline. Features private elevator entrance, marble fireplaces, and concierge service.',
    amenities: ['Gym', 'Security', 'Balcony', 'Parking']
  },
  {
    id: 'prop-3',
    title: 'Cozy Coastal Beachfront Cottage',
    type: 'House',
    price: 1250000,
    location: 'Miami, FL',
    address: '102 Ocean Drive, Miami Beach',
    bedrooms: 4,
    bathrooms: 3,
    area: 2700,
    status: 'Pending',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    description: 'Direct beach access with private boardwalk. Features wraparound decks, lush tropical landscaping, and a completely restored mid-century interior.',
    amenities: ['Swimming Pool', 'Garden', 'Balcony']
  },
  {
    id: 'prop-4',
    title: 'Minimalist Alpine Chalet',
    type: 'Villa',
    price: 1890000,
    location: 'Aspen, CO',
    address: '88 Snowmass Road, Aspen',
    bedrooms: 4,
    bathrooms: 4,
    area: 3900,
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80',
    description: 'Ultimate ski-in/ski-out luxury. Includes heated floors, outdoor hot tub, custom stone fireplace, and floor-to-ceiling mountain vistas.',
    amenities: ['Security', 'Balcony', 'Parking', 'Gym']
  },
  {
    id: 'prop-5',
    title: 'Urban Glass Loft',
    type: 'Apartment',
    price: 850000,
    location: 'Chicago, IL',
    address: '215 W Michigan Ave, Chicago',
    bedrooms: 2,
    bathrooms: 2,
    area: 1650,
    status: 'Sold',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    description: 'Industrial chic loft with exposed brickwork, soaring 14ft ceilings, polished concrete floors, and custom chef kitchen.',
    amenities: ['Gym', 'Security']
  }
];

// Initialize Storage if Empty
export const getProperties = () => {
  const data = localStorage.getItem('properties_db');
  if (!data) {
    localStorage.setItem('properties_db', JSON.stringify(INITIAL_PROPERTIES));
    return INITIAL_PROPERTIES;
  }
  return JSON.parse(data);
};

export const saveProperties = (properties) => {
  localStorage.setItem('properties_db', JSON.stringify(properties));
};