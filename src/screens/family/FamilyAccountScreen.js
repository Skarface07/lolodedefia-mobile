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

const sections = [
  {
    title: "Compte",
    items: [
      {
        id: "1",
        label: "Mes informations",
        icon: "account-edit-outline",
        color: colors.primary,
        bg: colors.primaryLight,
      },
      {
        id: "2",
        label: "Moyens de paiement",
        icon: "credit-card-outline",
        color: "#378ADD",
        bg: "#E6F1FB",
      },
    ],
  },
  {
    title: "Activité",
    items: [
      {
        id: "3",
        label: "Historique des missions",
        icon: "history",
        color: "#C9A227",
        bg: "#FAEEDA",
      },
      {
        id: "4",
        label: "Aide et support",
        icon: "help-circle-outline",
        color: "#7F77DD",
        bg: "#EEEDFE",
      },
    ],
  },
];

export default function FamilyAccountScreen() {
  const { user, logout } = useAuth();
  const { missions } = useMissions();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="account-circle"
          size={72}
          color={colors.primary}
        />
        <Text style={styles.name}>{user?.name ?? "Famille"}</Text>
        <Text style={styles.phone}>+228 {user?.phone}</Text>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{missions.length}</Text>
            <Text style={styles.statLabel}>
              Demande{missions.length > 1 ? "s" : ""}
            </Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>Juil. 2026</Text>
            <Text style={styles.statLabel}>Membre depuis</Text>
          </View>
        </View>
      </View>

      <View style={{ paddingHorizontal: spacing.md }}>
        {sections.map((section) => (
          <View key={section.title} style={{ marginBottom: spacing.md }}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((m) => (
              <TouchableOpacity key={m.id} style={styles.item}>
                <View style={[styles.iconWrap, { backgroundColor: m.bg }]}>
                  <MaterialCommunityIcons
                    name={m.icon}
                    size={18}
                    color={m.color}
                  />
                </View>
                <Text style={styles.itemText}>{m.label}</Text>
                <Ionicons
                  name="chevron-forward"
                  size={16}
                  color={colors.grayLight}
                  style={{ marginLeft: "auto" }}
                />
              </TouchableOpacity>
            ))}
          </View>
        ))}

        <TouchableOpacity style={styles.logoutCard} onPress={logout}>
          <Ionicons name="log-out-outline" size={18} color={colors.danger} />
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  header: {
    alignItems: "center",
    paddingVertical: spacing.lg,
    backgroundColor: colors.primaryLight,
    marginBottom: spacing.lg,
  },
  name: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.dark,
    marginTop: spacing.sm,
  },
  phone: { fontSize: 12, color: colors.gray, marginTop: 2 },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.md,
  },
  statItem: { alignItems: "center", paddingHorizontal: spacing.lg },
  statValue: { fontSize: 15, fontWeight: "800", color: colors.primary },
  statLabel: { fontSize: 10, color: colors.gray, marginTop: 2 },
  statDivider: { width: 1, height: 28, backgroundColor: colors.border },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.gray,
    marginBottom: spacing.sm,
    textTransform: "uppercase",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  itemText: {
    marginLeft: spacing.sm,
    fontSize: 14,
    color: colors.dark,
    fontWeight: "500",
  },
  logoutCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#F7C1C1",
    backgroundColor: "#FCEBEB",
    borderRadius: radius.md,
    paddingVertical: 14,
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
  logoutText: {
    color: colors.danger,
    marginLeft: 6,
    fontWeight: "700",
    fontSize: 13,
  },
});
