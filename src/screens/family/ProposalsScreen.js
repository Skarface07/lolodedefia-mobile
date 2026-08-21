import React from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, spacing, radius, typography } from "../../theme/theme";
import { useMissions } from "../../context/MissionsContext";

export default function ProposalsScreen({ route, navigation }) {
  const { missionId } = route.params;
  const { getMissionById } = useMissions();
  const mission = getMissionById(missionId);
  const candidates = mission?.matched ?? [];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={colors.dark} />
        </TouchableOpacity>
        <Text style={[typography.h2, { marginLeft: spacing.sm }]}>Prestataires disponibles</Text>
      </View>

      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          {mission?.service} · {mission?.zone} · {mission?.date}
        </Text>
      </View>

      <FlatList
        data={candidates}
        keyExtractor={(c) => c.id}
        contentContainerStyle={{ padding: spacing.md }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("ProviderProfile", { missionId, youthId: item.id })}
          >
            <View style={styles.avatar}>
              <MaterialCommunityIcons name="account" size={28} color={colors.white} />
            </View>
            <View style={{ flex: 1, marginLeft: spacing.sm }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.name}>{item.name}</Text>
                {item.verified && (
                  <MaterialCommunityIcons name="shield-check" size={14} color={colors.success} style={{ marginLeft: 4 }} />
                )}
              </View>
              <Text style={styles.meta}>{item.skills.join(", ")} · {item.zone}</Text>
              <View style={styles.row}>
                <Ionicons name="star" size={12} color={colors.accentGold} />
                <Text style={styles.rating}>{item.rating} ({item.reviews} avis)</Text>
                <View style={styles.badgePill}>
                  <Text style={styles.badgeText}>{item.badge}</Text>
                </View>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.grayLight} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", color: colors.gray, marginTop: spacing.xl }}>
            Aucun prestataire disponible pour le moment dans cette zone.
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  headerRow: { flexDirection: "row", alignItems: "center", padding: spacing.md },
  summary: { paddingHorizontal: spacing.md, paddingBottom: spacing.sm },
  summaryText: { fontSize: 12, color: colors.gray },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  name: { fontSize: 14, fontWeight: "700", color: colors.dark },
  meta: { fontSize: 11, color: colors.gray, marginTop: 2 },
  row: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  rating: { fontSize: 11, color: colors.gray, marginLeft: 4 },
  badgePill: {
    marginLeft: spacing.sm,
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.pill,
  },
  badgeText: { fontSize: 10, color: colors.primary, fontWeight: "700" },
});
