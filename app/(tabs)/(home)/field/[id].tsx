
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  useColorScheme,
  Platform,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, mockSportsFields, SportsField } from '@/styles/commonStyles';

const { width } = Dimensions.get('window');

export default function FieldDetailsScreen() {
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const field = mockSportsFields.find(f => f.id === id) as SportsField;

  if (!field) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: isDark ? colors.backgroundDark : colors.background }]}>
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: isDark ? colors.textDark : colors.text }]}>
            Campo no encontrado
          </Text>
          <Pressable
            style={[styles.backButton, { backgroundColor: colors.main }]}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Volver</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const renderImagePagination = () => (
    <View style={styles.paginationContainer}>
      {field.images.map((_, index) => (
        <View
          key={index}
          style={[
            styles.paginationDot,
            {
              backgroundColor: index === currentImageIndex ? colors.accent : 'rgba(255,255,255,0.5)',
            }
          ]}
        />
      ))}
    </View>
  );

  const renderAmenity = (amenity: string, index: number) => (
    <View key={index} style={[styles.amenityItem, { backgroundColor: isDark ? colors.backgroundAltDark : colors.backgroundAlt }]}>
      <IconSymbol name="checkmark.circle.fill" size={16} color={colors.success} />
      <Text style={[styles.amenityText, { color: isDark ? colors.textDark : colors.text }]}>
        {amenity}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? colors.backgroundDark : colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: isDark ? colors.backgroundDark : colors.background }]}>
        <Pressable
          style={[styles.headerButton, { backgroundColor: 'rgba(0,0,0,0.5)' }]}
          onPress={() => router.back()}
        >
          <IconSymbol name="chevron.left" size={24} color="#ffffff" />
        </Pressable>
        <Pressable
          style={[styles.headerButton, { backgroundColor: 'rgba(0,0,0,0.5)' }]}
          onPress={() => console.log('Add to favorites')}
        >
          <IconSymbol name="heart" size={24} color="#ffffff" />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image Gallery */}
        <View style={styles.imageContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.x / width);
              setCurrentImageIndex(index);
            }}
          >
            {field.images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={styles.fieldImage}
              />
            ))}
          </ScrollView>
          {renderImagePagination()}
        </View>

        {/* Field Info */}
        <View style={[styles.infoContainer, { backgroundColor: isDark ? colors.backgroundDark : colors.background }]}>
          <View style={styles.titleSection}>
            <View style={styles.titleRow}>
              <Text style={[styles.fieldName, { color: isDark ? colors.textDark : colors.text }]}>
                {field.name}
              </Text>
              <View style={styles.ratingContainer}>
                <IconSymbol name="star.fill" size={20} color={colors.accent} />
                <Text style={[styles.rating, { color: isDark ? colors.textDark : colors.text }]}>
                  {field.rating}
                </Text>
                <Text style={[styles.reviewCount, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                  ({field.reviewCount})
                </Text>
              </View>
            </View>
            
            <View style={[styles.sportBadge, { backgroundColor: colors.secondary }]}>
              <Text style={styles.sportText}>{field.sport}</Text>
            </View>

            <View style={styles.locationRow}>
              <IconSymbol name="location" size={16} color={isDark ? colors.textSecondaryDark : colors.textSecondary} />
              <Text style={[styles.location, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                {field.location.address}, {field.location.city}
              </Text>
            </View>

            <Text style={[styles.price, { color: colors.main }]}>
              ${field.pricePerHour} MXN por hora
            </Text>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: isDark ? colors.textDark : colors.text }]}>
              Descripción
            </Text>
            <Text style={[styles.description, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
              {field.description}
            </Text>
          </View>

          {/* Amenities */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: isDark ? colors.textDark : colors.text }]}>
              Servicios incluidos
            </Text>
            <View style={styles.amenitiesGrid}>
              {field.amenities.map(renderAmenity)}
            </View>
          </View>

          {/* Map Placeholder */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: isDark ? colors.textDark : colors.text }]}>
              Ubicación
            </Text>
            <View style={[styles.mapPlaceholder, { backgroundColor: isDark ? colors.backgroundAltDark : colors.backgroundAlt }]}>
              <IconSymbol name="map" size={48} color={isDark ? colors.textSecondaryDark : colors.textSecondary} />
              <Text style={[styles.mapText, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                Los mapas no están disponibles en Natively por el momento
              </Text>
              <Text style={[styles.addressText, { color: isDark ? colors.textDark : colors.text }]}>
                {field.location.address}, {field.location.city}
              </Text>
            </View>
          </View>

          {/* Availability */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: isDark ? colors.textDark : colors.text }]}>
              Disponibilidad
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {Object.entries(field.availability).map(([date, slots]) => (
                <View key={date} style={[styles.availabilityCard, { backgroundColor: isDark ? colors.backgroundAltDark : colors.backgroundAlt }]}>
                  <Text style={[styles.dateText, { color: isDark ? colors.textDark : colors.text }]}>
                    {new Date(date).toLocaleDateString('es-ES', { 
                      weekday: 'short', 
                      day: 'numeric', 
                      month: 'short' 
                    })}
                  </Text>
                  <Text style={[styles.slotsText, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                    {slots.length} horarios
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>

      {/* Book Button */}
      <View style={[styles.bookingContainer, { backgroundColor: isDark ? colors.backgroundDark : colors.background }]}>
        <Pressable
          style={[styles.bookButton, { backgroundColor: colors.main }]}
          onPress={() => router.push(`/(tabs)/(home)/booking/${field.id}`)}
        >
          <Text style={styles.bookButtonText}>Reservar Ahora</Text>
          <IconSymbol name="arrow.right" size={20} color="#ffffff" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  backButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  imageContainer: {
    position: 'relative',
  },
  fieldImage: {
    width: width,
    height: 300,
    resizeMode: 'cover',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  infoContainer: {
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    paddingTop: 24,
    paddingHorizontal: 20,
  },
  titleSection: {
    marginBottom: 24,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  fieldName: {
    fontSize: 28,
    fontWeight: '700',
    flex: 1,
    marginRight: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 14,
    marginLeft: 4,
  },
  sportBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 12,
  },
  sportText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  location: {
    fontSize: 16,
    marginLeft: 8,
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 8,
  },
  amenityText: {
    fontSize: 14,
    marginLeft: 8,
  },
  mapPlaceholder: {
    height: 200,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  mapText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  addressText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  availabilityCard: {
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    minWidth: 120,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  slotsText: {
    fontSize: 14,
  },
  bookingContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  bookButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  bookButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
});
