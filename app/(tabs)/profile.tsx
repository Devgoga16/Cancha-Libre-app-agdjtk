import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Pressable,
  useColorScheme,
  Alert,
  Platform
} from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/styles/commonStyles";

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleMenuPress = (item: string) => {
    Alert.alert('Próximamente', `La función "${item}" estará disponible pronto.`);
  };

  const menuItems = [
    {
      icon: 'person.circle',
      title: 'Información Personal',
      subtitle: 'Edita tu perfil y datos',
      action: () => handleMenuPress('Información Personal')
    },
    {
      icon: 'creditcard',
      title: 'Métodos de Pago',
      subtitle: 'Gestiona tus tarjetas y pagos',
      action: () => handleMenuPress('Métodos de Pago')
    },
    {
      icon: 'bell',
      title: 'Notificaciones',
      subtitle: 'Configura tus alertas',
      action: () => handleMenuPress('Notificaciones')
    },
    {
      icon: 'star',
      title: 'Mis Reseñas',
      subtitle: 'Reseñas que has escrito',
      action: () => handleMenuPress('Mis Reseñas')
    },
    {
      icon: 'heart',
      title: 'Favoritos',
      subtitle: 'Canchas que te gustan',
      action: () => handleMenuPress('Favoritos')
    },
    {
      icon: 'questionmark.circle',
      title: 'Ayuda y Soporte',
      subtitle: 'Obtén ayuda cuando la necesites',
      action: () => handleMenuPress('Ayuda y Soporte')
    },
    {
      icon: 'gear',
      title: 'Configuración',
      subtitle: 'Ajustes de la aplicación',
      action: () => handleMenuPress('Configuración')
    }
  ];

  const renderMenuItem = (item: any, index: number) => (
    <Pressable
      key={index}
      style={[styles.menuItem, { backgroundColor: isDark ? colors.cardDark : colors.card }]}
      onPress={item.action}
    >
      <View style={[styles.menuIconContainer, { backgroundColor: colors.main + '20' }]}>
        <IconSymbol name={item.icon} color={colors.main} size={24} />
      </View>
      <View style={styles.menuContent}>
        <Text style={[styles.menuTitle, { color: isDark ? colors.textDark : colors.text }]}>
          {item.title}
        </Text>
        <Text style={[styles.menuSubtitle, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
          {item.subtitle}
        </Text>
      </View>
      <IconSymbol name="chevron.right" color={isDark ? colors.textSecondaryDark : colors.textSecondary} size={16} />
    </Pressable>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? colors.backgroundDark : colors.background }]}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          Platform.OS !== 'ios' && styles.scrollContentWithTabBar
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: isDark ? colors.textDark : colors.text }]}>
            Mi Perfil
          </Text>
        </View>

        {/* Profile Card */}
        <View style={[styles.profileCard, { backgroundColor: isDark ? colors.cardDark : colors.card }]}>
          <View style={styles.profileInfo}>
            <View style={[styles.avatarContainer, { backgroundColor: colors.main }]}>
              <Text style={styles.avatarText}>JD</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={[styles.userName, { color: isDark ? colors.textDark : colors.text }]}>
                Juan Deportista
              </Text>
              <Text style={[styles.userEmail, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                juan.deportista@email.com
              </Text>
              <View style={styles.userStats}>
                <View style={styles.statItem}>
                  <Text style={[styles.statNumber, { color: colors.main }]}>12</Text>
                  <Text style={[styles.statLabel, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                    Reservas
                  </Text>
                </View>
                <View style={[styles.statDivider, { backgroundColor: isDark ? colors.borderDark : colors.border }]} />
                <View style={styles.statItem}>
                  <Text style={[styles.statNumber, { color: colors.secondary }]}>4.8</Text>
                  <Text style={[styles.statLabel, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                    Rating
                  </Text>
                </View>
                <View style={[styles.statDivider, { backgroundColor: isDark ? colors.borderDark : colors.border }]} />
                <View style={styles.statItem}>
                  <Text style={[styles.statNumber, { color: colors.accent }]}>3</Text>
                  <Text style={[styles.statLabel, { color: isDark ? colors.textSecondaryDark : colors.textSecondary }]}>
                    Favoritos
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <Pressable
            style={[styles.editButton, { backgroundColor: colors.main }]}
            onPress={() => handleMenuPress('Editar Perfil')}
          >
            <IconSymbol name="pencil" color="#ffffff" size={16} />
            <Text style={styles.editButtonText}>Editar</Text>
          </Pressable>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map(renderMenuItem)}
        </View>

        {/* Logout Button */}
        <Pressable
          style={[styles.logoutButton, { backgroundColor: colors.error }]}
          onPress={() => Alert.alert('Cerrar Sesión', '¿Estás seguro que deseas cerrar sesión?', [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Cerrar Sesión', style: 'destructive', onPress: () => console.log('Logout') }
          ])}
        >
          <IconSymbol name="arrow.right.square" color="#ffffff" size={20} />
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  scrollContentWithTabBar: {
    paddingBottom: 100, // Space for floating tab bar
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
  },
  profileCard: {
    marginHorizontal: 20,
    marginBottom: 32,
    borderRadius: 20,
    padding: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '700',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    marginBottom: 16,
  },
  userStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: 30,
    marginHorizontal: 8,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  editButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  menuSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  menuIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
