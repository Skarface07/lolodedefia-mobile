import React from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, spacing, radius, typography } from "../../theme/theme";
import { useAuth } from "../../context/AuthContext";

export default function RoleSelectScreen({ navigation }) {
  const { chooseRole } = useAuth();

  const select = (role) => {
    chooseRole(role);
    navigation.navigate("PhoneLogin");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={typography.h1}>Qui êtes-vous ?</Text>
        <Text style={[typography.body, { color: colors.gray, marginTop: 4 }]}>
          Choisissez votre profil pour continuer.
        </Text>
      </View>

      <TouchableOpacity style={styles.card} onPress={() => select("family")}>
        <View style={styles.iconWrap}>
          <MaterialCommunityIcons name="home-heart" size={28} color={colors.primary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>Famille / Entreprise</Text>
          <Text style={styles.cardText}>Je cherche un prestataire pour un service.</Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={22} color={colors.grayLight} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => select("youth")}>
        <View style={styles.iconWrap}>
          <MaterialCommunityIcons name="account-hard-hat" size={28} color={colors.primary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>Jeune prestataire</Text>
          <Text style={styles.cardText}>Je propose mes services et je cherche des missions.</Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={22} color={colors.grayLight} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white, padding: spacing.lg },
  header: { marginTop: spacing.lg, marginBottom: spacing.xl },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: radius.md,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  cardTitle: { fontSize: 15, fontWeight: "700", color: colors.dark },
  cardText: { fontSize: 12, color: colors.gray, marginTop: 2 },
});
