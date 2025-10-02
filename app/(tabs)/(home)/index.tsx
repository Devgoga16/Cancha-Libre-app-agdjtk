import React, { useState } from "react";
import { Stack, Link, router } from "expo-router";
import { 
  FlatList, 
  Pressable, 
  StyleSheet, 
  View, 
  Text, 
  TextInput,
  Image,
  ScrollView,
  Platform,
  useColorScheme
} from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, commonStyles, mockSportsFields, SportsField } from "@/styles/commonStyles";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState('Todos');

  const sports = ['Todos', 'Fútbol', 'Basketball', 'Volleyball', 'Tenis'];

  const filteredFields = mockSportsFields.filter(field => {
    const matchesSearch = field.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         field.location.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSport = selectedSport === 'Todos' || field.sport === selectedSport;
    return matchesSearch && matchesSport;
  });

  const renderFieldCard = ({ item }: { item: SportsField }) => (
    <Pressable 
      style={[styles.fieldCard, { backgroundColor: isDark ? colors.cardDark : colors.card }]}
      onPress={() => router.push(`/(tabs)/(home)/field/${item.id}`)}
    >
      <Image source={{ uri: item.images[0] }} style={styles.fieldImage} />
      <View style={styles.fieldInfo}>
        <View style={styles.fieldHeader}>
          <Text style={[styles.fieldName, { color: isDark ? colors.textDark : colors.text }]}>
            {item.name}
          </Text>
          <View style={styles.ratingContainer}>
            <IconSymbol name="star.fill" size={16} color={colors.accent} />
            <Text style={[styles.rating, { color: isDark ? colors.textDark : colors.text }]}>
              {item.rating}
            </Text>
          </View>
        </View>
        <Text style={[styles.fieldSport, { color: colors.secondary }]}>
          {item.sport}
        </Text>
        <Text style={[styles.fieldLocation, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
          {item.location.address}, {item.location.city}
        </Text>
        <View style={styles.fieldFooter}>
          <Text style={[styles.price, { color: colors.main }]}>
            ${item.pricePerHour}/hora
          </Text>
          <View style={[styles.availabilityBadge, { backgroundColor: colors.success }]}>
            <Text style={styles.availabilityText}>Disponible</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );

  const renderSportFilter = (sport: string) => (
    <Pressable
      key={sport}
      style={[
        styles.sportFilter,
        {
          backgroundColor: selectedSport === sport ? colors.main : (isDark ? colors.backgroundAltDark : colors.backgroundAlt),
          borderColor: selectedSport === sport ? colors.main : (isDark ? colors.borderDark : colors.border)
        }
      ]}
      onPress={() => setSelectedSport(sport)}
    >
      <Text style={[
        styles.sportFilterText,
        { color: selectedSport === sport ? '#ffffff' : (isDark ? colors.textDark : colors.text) }
      ]}>
        {sport}
      </Text>
    </Pressable>
  );

  const renderHeaderRight = () => (
    <Pressable
      onPress={() => router.push('/profile')}
      style={styles.headerButtonContainer}
    >
      <IconSymbol name="person.circle" color={colors.main} size={28} />
    </Pressable>
  );

  const renderHeaderLeft = () => (
    <View style={styles.logoContainer}>
      <Text style={[styles.logoText, { color: colors.main }]}>CANCHA</Text>
      <Text style={[styles.logoTextAccent, { color: colors.accent }]}>LIBRE</Text>
    </View>
  );

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "",
            headerRight: renderHeaderRight,
            headerLeft: renderHeaderLeft,
            headerStyle: {
              backgroundColor: isDark ? colors.backgroundDark : colors.background,
            },
          }}
        />
      )}
      <SafeAreaView style={[styles.container, { backgroundColor: isDark ? colors.backgroundDark : colors.background }]}>
        {/* Header for non-iOS platforms */}
        {Platform.OS !== 'ios' && (
          <View style={[styles.header, { backgroundColor: isDark ? colors.backgroundDark : colors.background }]}>
            {renderHeaderLeft()}
            {renderHeaderRight()}
          </View>
        )}

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={[styles.searchInputContainer, { backgroundColor: isDark ? colors.backgroundAltDark : colors.backgroundAlt }]}>
            <IconSymbol name="magnifyingglass" size={20} color={isDark ? colors.textSecondaryDark : colors.textSecondary} />
            <TextInput
              style={[styles.searchInput, { color: isDark ? colors.textDark : colors.text }]}
              placeholder="Buscar canchas por ubicación..."
              placeholderTextColor={isDark ? colors.textSecondaryDark : colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Sport Filters */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
          contentContainerStyle={styles.filtersContent}
        >
          {sports.map(renderSportFilter)}
        </ScrollView>

        {/* Popular Fields Section */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: isDark ? colors.textDark : colors.text }]}>
            Canchas Populares
          </Text>
          <Text style={[styles.sectionSubtitle, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
            Encuentra las mejores canchas cerca de ti
          </Text>
        </View>

        {/* Fields List */}
        <FlatList
          data={filteredFields}
          renderItem={renderFieldCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[
            styles.listContainer,
            Platform.OS !== 'ios' && styles.listContainerWithTabBar
          ]}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 24,
    fontWeight: '800',
    marginRight: 4,
  },
  logoTextAccent: {
    fontSize: 24,
    fontWeight: '800',
  },
  headerButtonContainer: {
    padding: 6,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
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
  filtersContainer: {
    paddingVertical: 10,
  },
  filtersContent: {
    paddingHorizontal: 20,
  },
  sportFilter: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
  },
  sportFilterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 16,
    fontWeight: '400',
  },
  listContainer: {
    paddingBottom: 20,
  },
  listContainerWithTabBar: {
    paddingBottom: 100,
  },
  fieldCard: {
    borderRadius: 16,
    marginHorizontal: 20,
    marginVertical: 8,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  fieldImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  fieldInfo: {
    padding: 16,
  },
  fieldHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  fieldName: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    marginRight: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  fieldSport: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  fieldLocation: {
    fontSize: 14,
    marginBottom: 12,
  },
  fieldFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
  },
  availabilityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  availabilityText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
});
