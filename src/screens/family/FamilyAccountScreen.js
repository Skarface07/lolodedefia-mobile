import React from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius, typography } from "../../theme/theme";
import { useAuth } from "../../context/AuthContext";

const menu = [
  { id: "1", label: "Mes informations", icon: "account-edit-outline" },
  { id: "2", label: "Moyens de paiement", icon: "credit-card-outline" },
  { id: "3", label: "Historique des missions", icon: "history" },
  { id: "4", label: "Aide et support", icon: "help-circle-outline" },
];

export default function FamilyAccountScreen() {
  const { user, logout } = useAuth();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="account-circle" size={72} color={colors.primary} />
        <Text style={[typography.h2, { marginTop: spacing.sm }]}>{user?.name ?? "Famille"}</Text>
        <Text style={typography.caption}>+228 {user?.phone}</Text>
      </View>

      <View style={{ paddingHorizontal: spacing.md }}>
        {menu.map((m) => (
          <TouchableOpacity key={m.id} style={styles.item}>
            <MaterialCommunityIcons name={m.icon} size={20} color={colors.primary} />
            <Text style={styles.itemText}>{m.label}</Text>
            <Ionicons name="chevron-forward" size={16} color={colors.grayLight} style={{ marginLeft: "auto" }} />
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.logout} onPress={logout}>
          <Ionicons name="log-out-outline" size={18} color={colors.danger} />
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  header: { alignItems: "center", paddingVertical: spacing.xl },
  item: {
    flexDirection: "row", alignItems: "center", paddingVertical: spacing.md,
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  itemText: { marginLeft: spacing.sm, fontSize: 14, color: colors.dark },
  logout: { flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: spacing.lg },
  logoutText: { color: colors.danger, marginLeft: 6, fontWeight: "700" },
});
