import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius, typography } from "../../theme/theme";
import { useAuth } from "../../context/AuthContext";
import { useMissions } from "../../context/MissionsContext";

export default function YouthAccountScreen({ navigation }) {
  const { user, logout } = useAuth();
  const { getYouthEarnings } = useMissions();
  const earnings = getYouthEarnings(user?.id);

  const menu = [
    {
      id: "1",
      label: "Mes informations",
      icon: "account-edit-outline",
      onPress: () => {},
    },
    {
      id: "2",
      label: "Académie en ligne",
      icon: "school-outline",
      onPress: () => navigation.navigate("Academy"),
    },
    {
      id: "3",
      label: "Historique des paiements",
      icon: "wallet-outline",
      onPress: () => {},
    },
    {
      id: "4",
      label: "Aide et support",
      icon: "help-circle-outline",
      onPress: () => {},
    },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="account-circle"
          size={72}
          color={colors.primary}
        />
        <Text style={[typography.h2, { marginTop: spacing.sm }]}>
          {user?.name ?? "Prestataire"}
        </Text>
        <Text style={typography.caption}>+228 {user?.phone}</Text>

        <View style={styles.earningsCard}>
          <Text style={styles.earningsLabel}>Gains reçus</Text>
          <Text style={styles.earningsValue}>
            {earnings.released.toLocaleString("fr-FR")} F
          </Text>
          {earnings.inEscrow > 0 && (
            <View style={styles.escrowRow}>
              <MaterialCommunityIcons
                name="shield-lock-outline"
                size={13}
                color={colors.accentGold}
              />
              <Text style={styles.escrowText}>
                {earnings.inEscrow.toLocaleString("fr-FR")} F en séquestre
              </Text>
            </View>
          )}
        </View>
      </View>

      <View style={{ paddingHorizontal: spacing.md }}>
        {menu.map((m) => (
          <TouchableOpacity key={m.id} style={styles.item} onPress={m.onPress}>
            <MaterialCommunityIcons
              name={m.icon}
              size={20}
              color={colors.primary}
            />
            <Text style={styles.itemText}>{m.label}</Text>
            <Ionicons
              name="chevron-forward"
              size={16}
              color={colors.grayLight}
              style={{ marginLeft: "auto" }}
            />
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
  header: { alignItems: "center", paddingVertical: spacing.lg },
  earningsCard: {
    marginTop: spacing.md,
    backgroundColor: colors.primaryLight,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    alignItems: "center",
  },
  earningsLabel: { fontSize: 11, color: colors.gray },
  earningsValue: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.primary,
    marginTop: 2,
  },
  escrowRow: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  escrowText: { fontSize: 10, color: colors.gray, marginLeft: 4 },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  itemText: { marginLeft: spacing.sm, fontSize: 14, color: colors.dark },
  logout: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.lg,
  },
  logoutText: { color: colors.danger, marginLeft: 6, fontWeight: "700" },
});
