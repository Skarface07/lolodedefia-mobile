import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius, typography } from "../../theme/theme";
import { useMissions } from "../../context/MissionsContext";
import { useAuth } from "../../context/AuthContext";

export default function YouthHomeScreen({ navigation }) {
  const { user } = useAuth();
  const { missions } = useMissions();

  const myMissions = missions.filter((m) => m.youthId === user?.id);
  const toRespond = myMissions.filter((m) => m.status === "en attente de confirmation");
  const active = myMissions.filter((m) => ["acceptée", "en_cours"].includes(m.status));

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={typography.h1}>Bonjour {user?.name?.split(" ")[0]} 👋</Text>
        <View style={styles.statRow}>
          <View style={styles.statCard}>
            <Ionicons name="star" size={16} color={colors.accentGold} />
            <Text style={styles.statValue}>{user?.rating}</Text>
            <Text style={styles.statLabel}>Note</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialCommunityIcons name="medal-outline" size={16} color={colors.primary} />
            <Text style={styles.statValue}>{user?.badge}</Text>
            <Text style={styles.statLabel}>Statut</Text>
          </View>
        </View>
      </View>

      <FlatList
        contentContainerStyle={{ padding: spacing.md }}
        data={toRespond}
        keyExtractor={(m) => m.id}
        ListHeaderComponent={
          <>
            {toRespond.length > 0 && <Text style={styles.sectionTitle}>Nouvelles propositions</Text>}
          </>
        }
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.newCard} onPress={() => navigation.navigate("MissionDetail", { missionId: item.id })}>
            <View style={styles.newBadge}>
              <Text style={styles.newBadgeText}>Nouvelle demande</Text>
            </View>
            <Text style={styles.service}>{item.service}</Text>
            <Text style={styles.meta}>{item.zone} · {item.date} · {item.budget}</Text>
          </TouchableOpacity>
        )}
        ListFooterComponent={
          <>
            <Text style={[styles.sectionTitle, { marginTop: spacing.md }]}>Missions en cours</Text>
            {active.length === 0 ? (
              <Text style={styles.emptyText}>Aucune mission en cours pour le moment.</Text>
            ) : (
              active.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.card}
                  onPress={() => navigation.navigate("CheckInOut", { missionId: item.id })}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={styles.service}>{item.service}</Text>
                    <Text style={styles.meta}>{item.zone} · {item.date}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={colors.grayLight} />
                </TouchableOpacity>
              ))
            )}
          </>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  header: { padding: spacing.md },
  statRow: { flexDirection: "row", marginTop: spacing.md },
  statCard: {
    flexDirection: "row", alignItems: "center", backgroundColor: colors.primaryLight,
    borderRadius: radius.md, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, marginRight: spacing.sm,
  },
  statValue: { fontSize: 13, fontWeight: "700", color: colors.dark, marginLeft: 6, marginRight: 4 },
  statLabel: { fontSize: 11, color: colors.gray },
  sectionTitle: { fontSize: 14, fontWeight: "700", color: colors.dark, marginBottom: spacing.sm },
  newCard: {
    backgroundColor: colors.primary, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm,
  },
  newBadge: { alignSelf: "flex-start", backgroundColor: colors.accentGold, borderRadius: radius.pill, paddingHorizontal: 8, paddingVertical: 2, marginBottom: 6 },
  newBadgeText: { color: colors.white, fontSize: 10, fontWeight: "700" },
  service: { fontSize: 14, fontWeight: "700", color: colors.white },
  meta: { fontSize: 11, color: "#DFF3E8", marginTop: 2 },
  card: {
    flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm,
  },
  emptyText: { fontSize: 12, color: colors.gray },
});
