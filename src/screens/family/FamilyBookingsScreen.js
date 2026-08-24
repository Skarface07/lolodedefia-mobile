import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, Platform } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius, typography } from "../../theme/theme";
import { useMissions } from "../../context/MissionsContext";
import MonthCalendar from "../../components/MonthCalendar";

const statusColor = {
  "proposée": colors.grayLight,
  "en attente de confirmation": colors.accentGold,
  "acceptée": colors.primary,
  "en_cours": colors.primary,
  "terminée": colors.success,
  "refusée": colors.danger,
};

export default function FamilyBookingsScreen({ navigation }) {
  const { missions, getScheduledEvents } = useMissions();
  const [menuOpen, setMenuOpen] = useState(false);

  const goNewRequest = () => {
    setMenuOpen(false);
    navigation.navigate("NewRequest", { mode: "instant" });
  };

  const goPlanSchedule = () => {
    setMenuOpen(false);
    navigation.navigate("PlanSchedule");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={missions}
        keyExtractor={(m) => m.id}
        contentContainerStyle={{ paddingHorizontal: spacing.md, paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View style={{ paddingTop: spacing.md, paddingBottom: spacing.sm }}>
              <Text style={typography.h1}>Mes demandes</Text>
            </View>
            <MonthCalendar events={getScheduledEvents()} />
            <Text style={[typography.h2, { marginTop: spacing.lg, marginBottom: spacing.sm }]}>Toutes les demandes</Text>
          </>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              item.status === "proposée"
                ? navigation.navigate("Proposals", { missionId: item.id })
                : navigation.navigate("MissionTracking", { missionId: item.id })
            }
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.service}>{item.service}</Text>
              <Text style={styles.meta}>{item.zone} · {item.date}</Text>
            </View>
            <View style={[styles.statusPill, { backgroundColor: statusColor[item.status] ?? colors.grayLight }]}>
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.grayLight} style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <MaterialCommunityIcons name="calendar-check-outline" size={40} color={colors.primary} />
            <Text style={[typography.caption, { marginTop: spacing.sm, textAlign: "center" }]}>
              Vous n'avez pas encore de demande.{"\n"}Touchez le bouton + pour en créer une.
            </Text>
          </View>
        }
      />

      {menuOpen && (
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem} onPress={goPlanSchedule}>
            <Ionicons name="calendar-outline" size={16} color={colors.dark} />
            <Text style={styles.menuItemText}>Planifier</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={goNewRequest}>
            <Ionicons name="flash-outline" size={16} color={colors.dark} />
            <Text style={styles.menuItemText}>Nouvelle demande</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.fab} onPress={() => setMenuOpen((v) => !v)}>
        <Ionicons name={menuOpen ? "close" : "add"} size={26} color={colors.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  empty: { alignItems: "center", justifyContent: "center", paddingVertical: spacing.xl },
  card: {
    flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm,
  },
  service: { fontSize: 14, fontWeight: "700", color: colors.dark },
  meta: { fontSize: 11, color: colors.gray, marginTop: 2 },
  statusPill: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: radius.pill },
  statusText: { fontSize: 10, color: colors.white, fontWeight: "700" },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
      },
      android: { elevation: 5 },
    }),
  },
  menu: {
    position: "absolute",
    bottom: 90,
    right: 20,
    backgroundColor: colors.white,
    borderRadius: radius.md,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: colors.border,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
      },
      android: { elevation: 4 },
    }),
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    minWidth: 170,
  },
  menuItemText: { fontSize: 13, color: colors.dark, marginLeft: 10, fontWeight: "600" },
});