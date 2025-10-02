
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  useColorScheme,
  Platform,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, mockSportsFields, SportsField } from '@/styles/commonStyles';

export default function ExploreScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = ['Todos', 'Fútbol', 'Basketball', 'Volleyball', 'Tenis'];
  const cities = ['Ciudad de México', 'Guadalajara', 'Monterrey', 'Cancún'];

  const filteredFields = mockSportsFields.filter(field => {
    const matchesSearch = field.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         field.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         field.sport.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || field.sport === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderCategoryFilter = (category: string) => (
    <Pressable
      key={category}
      style={[
        styles.categoryFilter,
        {
          backgroundColor: selectedCategory === category ? colors.main : (isDark ? colors.backgroundAltDark : colors.backgroundAlt),
          borderColor: selectedCategory === category ? colors.main : (isDark ? colors.borderDark : colors.border)
        }
      ]}
      onPress={() => setSelectedCategory(category)}
    >
      <Text style={[
        styles.categoryText,
        { color: selectedCategory === category ? '#ffffff' : (isDark ? colors.textDark : colors.text) }
      ]}>
        {category}
      </Text>
    </Pressable>
  );

  const renderFieldCard = (field: SportsField) => (
    <Pressable
      key={field.id}
      style={[styles.fieldCard, { backgroundColor: isDark ? colors.cardDark : colors.card }]}
      onPress={() => router.push(`/(tabs)/(home)/field/${field.id}`)}
    >
      <Image source={{ uri: field.images[0] }} style={styles.fieldImage} />
      <View style={styles.fieldInfo}>
        <Text style={[styles.fieldName, { color: isDark ? colors.textDark : colors.text }]}>
          {field.name}
        </Text>
        <Text style={[styles.fieldSport, { color: colors.secondary }]}>
          {field.sport}
        </Text>
        <Text style={[styles.fieldLocation, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
          {field.location.city}
        </Text>
        <View style={styles.fieldFooter}>
          <View style={styles.ratingContainer}>
            <IconSymbol name="star.fill" size={14} color={colors.accent} />
            <Text style={[styles.rating, { color: isDark ? colors.textDark : colors.text }]}>
              {field.rating}
            </Text>
          </View>
          <Text style={[styles.price, { color: colors.main }]}>
            ${field.pricePerHour}/h
          </Text>
        </View>
      </View>
    </Pressable>
  );

  const renderCityCard = (city: string) => {
    const cityFields = mockSportsFields.filter(field => field.location.city === city);
    const cityImage = cityFields[0]?.images[0];
    
    return (
      <Pressable
        key={city}
        style={[styles.cityCard, { backgroundColor: isDark ? colors.cardDark : colors.card }]}
        onPress={() => {
          setSearchQuery(city);
          setSelectedCategory('Todos');
        }}
      >
        <Image source={{ uri: cityImage }} style={styles.cityImage} />
        <View style={styles.cityOverlay}>
          <Text style={styles.cityName}>{city}</Text>
          <Text style={styles.cityCount}>
            {cityFields.length} {cityFields.length === 1 ? 'cancha' : 'canchas'}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? colors.backgroundDark : colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: isDark ? colors.backgroundDark : colors.background }]}>
        <Text style={[styles.headerTitle, { color: isDark ? colors.textDark : colors.text }]}>
          Explorar
        </Text>
        <Text style={[styles.headerSubtitle, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
          Descubre canchas deportivas
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={[styles.searchInputContainer, { backgroundColor: isDark ? colors.backgroundAltDark : colors.backgroundAlt }]}>
            <IconSymbol name="magnifyingglass" size={20} color={isDark ? colors.textSecondaryDark : colors.textSecondary} />
            <TextInput
              style={[styles.searchInput, { color: isDark ? colors.textDark : colors.text }]}
              placeholder="Buscar por deporte, ubicación..."
              placeholderTextColor={isDark ? colors.textSecondaryDark : colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <Pressable onPress={() => setSearchQuery('')}>
                <IconSymbol name="xmark.circle.fill" size={20} color={isDark ? colors.textSecondaryDark : colors.textSecondary} />
              </Pressable>
            )}
          </View>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? colors.textDark : colors.text }]}>
            Deportes
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categoriesContainer}>
              {categories.map(renderCategoryFilter)}
            </View>
          </ScrollView>
        </View>

        {/* Cities */}
        {!searchQuery && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: isDark ? colors.textDark : colors.text }]}>
              Ciudades Populares
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.citiesContainer}>
                {cities.map(renderCityCard)}
              </View>
            </ScrollView>
          </View>
        )}

        {/* Results */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? colors.textDark : colors.text }]}>
            {searchQuery ? `Resultados para "${searchQuery}"` : 'Todas las Canchas'}
            <Text style={[styles.resultCount, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
              {' '}({filteredFields.length})
            </Text>
          </Text>
          <View style={styles.fieldsGrid}>
            {filteredFields.map(renderFieldCard)}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    fontWeight: '400',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  resultCount: {
    fontSize: 16,
    fontWeight: '400',
  },
  categoriesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  categoryFilter: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
  },
  citiesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  cityCard: {
    width: 160,
    height: 120,
    borderRadius: 12,
    marginRight: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  cityImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cityOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 12,
  },
  cityName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  cityCount: {
    color: '#ffffff',
    fontSize: 12,
    opacity: 0.9,
  },
  fieldsGrid: {
    paddingHorizontal: 20,
  },
  fieldCard: {
    flexDirection: 'row',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  fieldImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  fieldInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  fieldName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  fieldSport: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  fieldLocation: {
    fontSize: 12,
    marginBottom: 8,
  },
  fieldFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
  },
});
