import React from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius, typography } from "../../theme/theme";
import { useMissions } from "../../context/MissionsContext";

const statusColor = {
  "proposée": colors.grayLight,
  "en attente de confirmation": colors.accentGold,
  "acceptée": colors.primary,
  "en_cours": colors.primary,
  "terminée": colors.success,
  "refusée": colors.danger,
};

export default function FamilyBookingsScreen({ navigation }) {
  const { missions } = useMissions();

  if (!missions.length) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.empty}>
          <MaterialCommunityIcons name="calendar-check-outline" size={48} color={colors.primary} />
          <Text style={[typography.h2, { marginTop: spacing.md }]}>Vos demandes</Text>
          <Text style={[typography.caption, { marginTop: 4, textAlign: "center" }]}>
            Vous n'avez pas encore de demande.{"\n"}Créez-en une depuis l'accueil.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={{ padding: spacing.md }}>
        <Text style={typography.h1}>Mes demandes</Text>
      </View>
      <FlatList
        data={missions}
        keyExtractor={(m) => m.id}
        contentContainerStyle={{ paddingHorizontal: spacing.md }}
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
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  empty: { flex: 1, alignItems: "center", justifyContent: "center", padding: spacing.lg },
  card: {
    flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm,
  },
  service: { fontSize: 14, fontWeight: "700", color: colors.dark },
  meta: { fontSize: 11, color: colors.gray, marginTop: 2 },
  statusPill: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: radius.pill },
  statusText: { fontSize: 10, color: colors.white, fontWeight: "700" },
});
