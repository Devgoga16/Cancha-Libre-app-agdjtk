
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  useColorScheme,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, mockSportsFields, Booking } from '@/styles/commonStyles';

// Mock bookings data
const mockBookings: Booking[] = [
  {
    id: '1',
    fieldId: '1',
    fieldName: 'Cancha Futbol Norte',
    date: '2024-01-25',
    timeSlot: '15:00',
    duration: 2,
    totalPrice: 50,
    status: 'upcoming',
    createdAt: '2024-01-20T10:00:00Z'
  },
  {
    id: '2',
    fieldId: '2',
    fieldName: 'Cancha Basketball Pro',
    date: '2024-01-22',
    timeSlot: '18:00',
    duration: 1,
    totalPrice: 20,
    status: 'upcoming',
    createdAt: '2024-01-19T14:30:00Z'
  },
  {
    id: '3',
    fieldId: '3',
    fieldName: 'Volleyball Arena',
    date: '2024-01-18',
    timeSlot: '16:00',
    duration: 1,
    totalPrice: 18,
    status: 'completed',
    createdAt: '2024-01-15T09:15:00Z'
  },
  {
    id: '4',
    fieldId: '4',
    fieldName: 'Tenis Club Elite',
    date: '2024-01-16',
    timeSlot: '11:00',
    duration: 1,
    totalPrice: 30,
    status: 'completed',
    createdAt: '2024-01-14T16:45:00Z'
  }
];

export default function BookingsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'completed'>('upcoming');

  const upcomingBookings = mockBookings.filter(booking => booking.status === 'upcoming');
  const completedBookings = mockBookings.filter(booking => booking.status === 'completed');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return colors.main;
      case 'completed':
        return colors.success;
      case 'cancelled':
        return colors.error;
      default:
        return colors.textSecondary;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'Próxima';
      case 'completed':
        return 'Completada';
      case 'cancelled':
        return 'Cancelada';
      default:
        return status;
    }
  };

  const renderBookingCard = (booking: Booking) => {
    const field = mockSportsFields.find(f => f.id === booking.fieldId);
    const bookingDate = new Date(booking.date);
    const isUpcoming = booking.status === 'upcoming';

    return (
      <Pressable
        key={booking.id}
        style={[styles.bookingCard, { backgroundColor: isDark ? colors.cardDark : colors.card }]}
        onPress={() => {
          if (field) {
            router.push(`/(tabs)/(home)/field/${field.id}`);
          }
        }}
      >
        {field && (
          <Image source={{ uri: field.images[0] }} style={styles.bookingImage} />
        )}
        <View style={styles.bookingInfo}>
          <View style={styles.bookingHeader}>
            <Text style={[styles.bookingFieldName, { color: isDark ? colors.textDark : colors.text }]}>
              {booking.fieldName}
            </Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) }]}>
              <Text style={styles.statusText}>
                {getStatusText(booking.status)}
              </Text>
            </View>
          </View>

          <View style={styles.bookingDetails}>
            <View style={styles.detailRow}>
              <IconSymbol name="calendar" size={16} color={isDark ? colors.textSecondaryDark : colors.textSecondary} />
              <Text style={[styles.detailText, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                {bookingDate.toLocaleDateString('es-ES', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <IconSymbol name="clock" size={16} color={isDark ? colors.textSecondaryDark : colors.textSecondary} />
              <Text style={[styles.detailText, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                {booking.timeSlot} - {booking.duration} {booking.duration === 1 ? 'hora' : 'horas'}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <IconSymbol name="dollarsign.circle" size={16} color={isDark ? colors.textSecondaryDark : colors.textSecondary} />
              <Text style={[styles.detailText, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                ${booking.totalPrice} MXN
              </Text>
            </View>
          </View>

          {isUpcoming && (
            <View style={styles.bookingActions}>
              <Pressable
                style={[styles.actionButton, styles.cancelButton]}
                onPress={() => console.log('Cancel booking', booking.id)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </Pressable>
              <Pressable
                style={[styles.actionButton, { backgroundColor: colors.main }]}
                onPress={() => console.log('Modify booking', booking.id)}
              >
                <Text style={styles.actionButtonText}>Modificar</Text>
              </Pressable>
            </View>
          )}
        </View>
      </Pressable>
    );
  };

  const renderTabButton = (tab: 'upcoming' | 'completed', label: string, count: number) => (
    <Pressable
      style={[
        styles.tabButton,
        {
          backgroundColor: selectedTab === tab ? colors.main : 'transparent',
          borderBottomColor: selectedTab === tab ? colors.main : 'transparent',
        }
      ]}
      onPress={() => setSelectedTab(tab)}
    >
      <Text style={[
        styles.tabButtonText,
        { color: selectedTab === tab ? '#ffffff' : (isDark ? colors.textDark : colors.text) }
      ]}>
        {label} ({count})
      </Text>
    </Pressable>
  );

  const currentBookings = selectedTab === 'upcoming' ? upcomingBookings : completedBookings;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? colors.backgroundDark : colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: isDark ? colors.backgroundDark : colors.background }]}>
        <Text style={[styles.headerTitle, { color: isDark ? colors.textDark : colors.text }]}>
          Mis Reservas
        </Text>
        <Text style={[styles.headerSubtitle, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
          Gestiona tus reservas de canchas
        </Text>
      </View>

      {/* Tabs */}
      <View style={[styles.tabsContainer, { backgroundColor: isDark ? colors.backgroundDark : colors.background }]}>
        {renderTabButton('upcoming', 'Próximas', upcomingBookings.length)}
        {renderTabButton('completed', 'Completadas', completedBookings.length)}
      </View>

      {/* Content */}
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {currentBookings.length === 0 ? (
          <View style={styles.emptyState}>
            <IconSymbol 
              name={selectedTab === 'upcoming' ? 'calendar.badge.plus' : 'checkmark.circle'} 
              size={64} 
              color={isDark ? colors.textSecondaryDark : colors.textSecondary} 
            />
            <Text style={[styles.emptyTitle, { color: isDark ? colors.textDark : colors.text }]}>
              {selectedTab === 'upcoming' ? 'No tienes reservas próximas' : 'No tienes reservas completadas'}
            </Text>
            <Text style={[styles.emptySubtitle, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
              {selectedTab === 'upcoming' 
                ? 'Explora canchas y haz tu primera reserva'
                : 'Tus reservas completadas aparecerán aquí'
              }
            </Text>
            {selectedTab === 'upcoming' && (
              <Pressable
                style={[styles.exploreButton, { backgroundColor: colors.main }]}
                onPress={() => router.push('/(tabs)/explore')}
              >
                <Text style={styles.exploreButtonText}>Explorar Canchas</Text>
              </Pressable>
            )}
          </View>
        ) : (
          <View style={styles.bookingsList}>
            {currentBookings.map(renderBookingCard)}
          </View>
        )}
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
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
    borderBottomWidth: 2,
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Space for floating tab bar
  },
  bookingsList: {
    paddingHorizontal: 20,
  },
  bookingCard: {
    flexDirection: 'row',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bookingImage: {
    width: 100,
    height: 140,
    resizeMode: 'cover',
  },
  bookingInfo: {
    flex: 1,
    padding: 16,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bookingFieldName: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
  bookingDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
    fontSize: 14,
    marginLeft: 8,
  },
  bookingActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.error,
  },
  cancelButtonText: {
    color: colors.error,
    fontSize: 14,
    fontWeight: '500',
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  exploreButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  exploreButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
