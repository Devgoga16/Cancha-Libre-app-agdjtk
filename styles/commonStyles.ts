import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

// Types for the sports field booking app
export interface SportsField {
  id: string;
  name: string;
  description: string;
  sport: string;
  pricePerHour: number;
  rating: number;
  reviewCount: number;
  images: string[];
  location: {
    address: string;
    city: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  amenities: string[];
  availability: {
    [date: string]: string[]; // Available time slots for each date
  };
  isAvailable: boolean;
}

export interface Booking {
  id: string;
  fieldId: string;
  fieldName: string;
  date: string;
  timeSlot: string;
  duration: number;
  totalPrice: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  createdAt: string;
}

// Mock data for sports fields
export const mockSportsFields: SportsField[] = [
  {
    id: '1',
    name: 'Cancha Futbol Norte',
    description: 'Campo de fútbol profesional con césped sintético de alta calidad. Perfecto para partidos y entrenamientos.',
    sport: 'Fútbol',
    pricePerHour: 25,
    rating: 4.8,
    reviewCount: 124,
    images: [
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800',
      'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800'
    ],
    location: {
      address: 'Av. Principal 123',
      city: 'Ciudad de México',
      coordinates: {
        latitude: 19.4326,
        longitude: -99.1332
      }
    },
    amenities: ['Iluminación LED', 'Estacionamiento', 'Vestidores', 'Duchas', 'Seguridad 24/7'],
    availability: {
      '2024-01-20': ['09:00', '11:00', '15:00', '17:00', '19:00'],
      '2024-01-21': ['10:00', '14:00', '16:00', '18:00', '20:00'],
      '2024-01-22': ['08:00', '12:00', '16:00', '18:00']
    },
    isAvailable: true
  },
  {
    id: '2',
    name: 'Cancha Basketball Pro',
    description: 'Cancha de basketball techada con piso de duela profesional. Ideal para torneos y práctica.',
    sport: 'Basketball',
    pricePerHour: 20,
    rating: 4.6,
    reviewCount: 89,
    images: [
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800',
      'https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=800',
      'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=800'
    ],
    location: {
      address: 'Calle Deportiva 456',
      city: 'Guadalajara',
      coordinates: {
        latitude: 20.6597,
        longitude: -103.3496
      }
    },
    amenities: ['Aire acondicionado', 'Marcador electrónico', 'Vestidores', 'Estacionamiento', 'Cafetería'],
    availability: {
      '2024-01-20': ['10:00', '12:00', '14:00', '16:00', '18:00', '20:00'],
      '2024-01-21': ['09:00', '13:00', '15:00', '17:00', '19:00'],
      '2024-01-22': ['11:00', '13:00', '17:00', '19:00', '21:00']
    },
    isAvailable: true
  },
  {
    id: '3',
    name: 'Volleyball Arena',
    description: 'Cancha de volleyball con arena de playa importada. Ambiente tropical para disfrutar el deporte.',
    sport: 'Volleyball',
    pricePerHour: 18,
    rating: 4.7,
    reviewCount: 67,
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800'
    ],
    location: {
      address: 'Playa Deportiva 789',
      city: 'Cancún',
      coordinates: {
        latitude: 21.1619,
        longitude: -86.8515
      }
    },
    amenities: ['Arena de playa', 'Sombrillas', 'Regaderas', 'Bar de jugos', 'Música ambiente'],
    availability: {
      '2024-01-20': ['08:00', '10:00', '14:00', '16:00', '18:00'],
      '2024-01-21': ['09:00', '11:00', '15:00', '17:00', '19:00'],
      '2024-01-22': ['10:00', '12:00', '16:00', '18:00', '20:00']
    },
    isAvailable: true
  },
  {
    id: '4',
    name: 'Tenis Club Elite',
    description: 'Cancha de tenis con superficie de arcilla profesional. Perfecta para jugadores de todos los niveles.',
    sport: 'Tenis',
    pricePerHour: 30,
    rating: 4.9,
    reviewCount: 156,
    images: [
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'
    ],
    location: {
      address: 'Club Deportivo 321',
      city: 'Monterrey',
      coordinates: {
        latitude: 25.6866,
        longitude: -100.3161
      }
    },
    amenities: ['Superficie de arcilla', 'Iluminación profesional', 'Vestidores VIP', 'Tienda pro shop', 'Instructor disponible'],
    availability: {
      '2024-01-20': ['07:00', '09:00', '11:00', '15:00', '17:00', '19:00'],
      '2024-01-21': ['08:00', '10:00', '14:00', '16:00', '18:00'],
      '2024-01-22': ['09:00', '13:00', '15:00', '17:00', '19:00']
    },
    isAvailable: true
  }
];

export const colors = {
  // Cancha Libre color palette
  main: '#2f4ffc',       // Main color (primary buttons & highlights)
  primary: '#10154f',    // Primary color (headers, background accents)
  secondary: '#09b2a1',  // Secondary color (secondary highlights, tags)
  accent: '#ff751f',     // Accent color (CTAs, icons, emphasis details)
  
  // Light theme colors
  background: '#ffffff',
  backgroundAlt: '#f8f9fa',
  text: '#1a1a1a',
  textSecondary: '#666666',
  border: '#e0e0e0',
  card: '#ffffff',
  
  // Dark theme colors
  backgroundDark: '#0a0a0a',
  backgroundAltDark: '#1a1a1a',
  textDark: '#ffffff',
  textSecondaryDark: '#cccccc',
  borderDark: '#333333',
  cardDark: '#1a1a1a',
  
  // Status colors
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
};

export const buttonStyles = StyleSheet.create({
  instructionsButton: {
    backgroundColor: colors.primary,
    alignSelf: 'center',
    width: '100%',
  },
  backButton: {
    backgroundColor: colors.backgroundAlt,
    alignSelf: 'center',
    width: '100%',
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 800,
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    color: colors.text,
    marginBottom: 10
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.text,
    marginBottom: 8,
    lineHeight: 24,
  },
  textSecondary: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
    lineHeight: 20,
  },
  section: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    width: '100%',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  fieldCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    overflow: 'hidden',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  searchBar: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: 16,
    color: colors.text,
  },
  primaryButton: {
    backgroundColor: colors.main,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButton: {
    backgroundColor: colors.secondary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accentButton: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  icon: {
    width: 24,
    height: 24,
  },
});
