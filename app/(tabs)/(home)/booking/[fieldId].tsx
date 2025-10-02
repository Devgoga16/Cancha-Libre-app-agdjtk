
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  useColorScheme,
  Alert,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, mockSportsFields, SportsField } from '@/styles/commonStyles';

export default function BookingScreen() {
  const { fieldId } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [duration, setDuration] = useState<number>(1);

  const field = mockSportsFields.find(f => f.id === fieldId) as SportsField;

  if (!field) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: isDark ? colors.backgroundDark : colors.background }]}>
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: isDark ? colors.textDark : colors.text }]}>
            Campo no encontrado
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const availableDates = Object.keys(field.availability);
  const availableTimeSlots = selectedDate ? field.availability[selectedDate] || [] : [];
  const totalPrice = field.pricePerHour * duration;

  const handleBooking = () => {
    if (!selectedDate || !selectedTimeSlot) {
      Alert.alert('Error', 'Por favor selecciona una fecha y horario');
      return;
    }

    Alert.alert(
      'Reserva Confirmada',
      `Tu reserva para ${field.name} el ${new Date(selectedDate).toLocaleDateString('es-ES')} a las ${selectedTimeSlot} ha sido confirmada.\n\nTotal: $${totalPrice} MXN`,
      [
        {
          text: 'OK',
          onPress: () => router.push('/(tabs)/profile')
        }
      ]
    );
  };

  const renderDateOption = (date: string) => {
    const isSelected = selectedDate === date;
    const dateObj = new Date(date);
    
    return (
      <Pressable
        key={date}
        style={[
          styles.dateOption,
          {
            backgroundColor: isSelected ? colors.main : (isDark ? colors.backgroundAltDark : colors.backgroundAlt),
            borderColor: isSelected ? colors.main : (isDark ? colors.borderDark : colors.border),
          }
        ]}
        onPress={() => {
          setSelectedDate(date);
          setSelectedTimeSlot(''); // Reset time slot when date changes
        }}
      >
        <Text style={[
          styles.dateText,
          { color: isSelected ? '#ffffff' : (isDark ? colors.textDark : colors.text) }
        ]}>
          {dateObj.toLocaleDateString('es-ES', { 
            weekday: 'short', 
            day: 'numeric', 
            month: 'short' 
          })}
        </Text>
      </Pressable>
    );
  };

  const renderTimeSlot = (timeSlot: string) => {
    const isSelected = selectedTimeSlot === timeSlot;
    
    return (
      <Pressable
        key={timeSlot}
        style={[
          styles.timeSlot,
          {
            backgroundColor: isSelected ? colors.secondary : (isDark ? colors.backgroundAltDark : colors.backgroundAlt),
            borderColor: isSelected ? colors.secondary : (isDark ? colors.borderDark : colors.border),
          }
        ]}
        onPress={() => setSelectedTimeSlot(timeSlot)}
      >
        <Text style={[
          styles.timeSlotText,
          { color: isSelected ? '#ffffff' : (isDark ? colors.textDark : colors.text) }
        ]}>
          {timeSlot}
        </Text>
      </Pressable>
    );
  };

  const renderDurationOption = (hours: number) => {
    const isSelected = duration === hours;
    
    return (
      <Pressable
        key={hours}
        style={[
          styles.durationOption,
          {
            backgroundColor: isSelected ? colors.accent : (isDark ? colors.backgroundAltDark : colors.backgroundAlt),
            borderColor: isSelected ? colors.accent : (isDark ? colors.borderDark : colors.border),
          }
        ]}
        onPress={() => setDuration(hours)}
      >
        <Text style={[
          styles.durationText,
          { color: isSelected ? '#ffffff' : (isDark ? colors.textDark : colors.text) }
        ]}>
          {hours} {hours === 1 ? 'hora' : 'horas'}
        </Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? colors.backgroundDark : colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: isDark ? colors.backgroundDark : colors.background }]}>
        <Pressable
          style={styles.headerButton}
          onPress={() => router.back()}
        >
          <IconSymbol name="chevron.left" size={24} color={isDark ? colors.textDark : colors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: isDark ? colors.textDark : colors.text }]}>
          Reservar Cancha
        </Text>
        <View style={styles.headerButton} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Field Summary */}
        <View style={[styles.fieldSummary, { backgroundColor: isDark ? colors.cardDark : colors.card }]}>
          <Text style={[styles.fieldName, { color: isDark ? colors.textDark : colors.text }]}>
            {field.name}
          </Text>
          <Text style={[styles.fieldSport, { color: colors.secondary }]}>
            {field.sport}
          </Text>
          <Text style={[styles.fieldLocation, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
            {field.location.address}, {field.location.city}
          </Text>
        </View>

        {/* Date Selection */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? colors.textDark : colors.text }]}>
            Selecciona una fecha
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.dateContainer}>
              {availableDates.map(renderDateOption)}
            </View>
          </ScrollView>
        </View>

        {/* Time Slot Selection */}
        {selectedDate && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: isDark ? colors.textDark : colors.text }]}>
              Horarios disponibles
            </Text>
            <View style={styles.timeSlotsGrid}>
              {availableTimeSlots.map(renderTimeSlot)}
            </View>
          </View>
        )}

        {/* Duration Selection */}
        {selectedTimeSlot && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: isDark ? colors.textDark : colors.text }]}>
              Duración
            </Text>
            <View style={styles.durationContainer}>
              {[1, 2, 3, 4].map(renderDurationOption)}
            </View>
          </View>
        )}

        {/* Price Summary */}
        {selectedDate && selectedTimeSlot && (
          <View style={[styles.priceSummary, { backgroundColor: isDark ? colors.cardDark : colors.card }]}>
            <View style={styles.priceRow}>
              <Text style={[styles.priceLabel, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                Precio por hora:
              </Text>
              <Text style={[styles.priceValue, { color: isDark ? colors.textDark : colors.text }]}>
                ${field.pricePerHour} MXN
              </Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={[styles.priceLabel, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                Duración:
              </Text>
              <Text style={[styles.priceValue, { color: isDark ? colors.textDark : colors.text }]}>
                {duration} {duration === 1 ? 'hora' : 'horas'}
              </Text>
            </View>
            <View style={[styles.priceRow, styles.totalRow]}>
              <Text style={[styles.totalLabel, { color: isDark ? colors.textDark : colors.text }]}>
                Total:
              </Text>
              <Text style={[styles.totalValue, { color: colors.main }]}>
                ${totalPrice} MXN
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Book Button */}
      {selectedDate && selectedTimeSlot && (
        <View style={[styles.bookingContainer, { backgroundColor: isDark ? colors.backgroundDark : colors.background }]}>
          <Pressable
            style={[styles.bookButton, { backgroundColor: colors.main }]}
            onPress={handleBooking}
          >
            <Text style={styles.bookButtonText}>
              Confirmar Reserva - ${totalPrice} MXN
            </Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
  },
  fieldSummary: {
    padding: 20,
    borderRadius: 16,
    marginVertical: 20,
  },
  fieldName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  fieldSport: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  fieldLocation: {
    fontSize: 14,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    paddingRight: 20,
  },
  dateOption: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    marginRight: 12,
    borderWidth: 1,
    minWidth: 100,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
    fontWeight: '500',
  },
  timeSlotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  timeSlot: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    minWidth: 80,
    alignItems: 'center',
  },
  timeSlotText: {
    fontSize: 14,
    fontWeight: '500',
  },
  durationContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  durationOption: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  durationText: {
    fontSize: 14,
    fontWeight: '500',
  },
  priceSummary: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 16,
  },
  priceValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
    marginTop: 8,
    marginBottom: 0,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  bookingContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  bookButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});
