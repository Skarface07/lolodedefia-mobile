import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius, typography } from "../../theme/theme";
import { useAuth } from "../../context/AuthContext";
import { useMissions } from "../../context/MissionsContext";

const badgeLevels = ["Bronze", "Argent", "Or", "Diamant"];

export default function PassportScreen() {
  const { user } = useAuth();
  const { missions } = useMissions();
  const completedMissions = missions.filter((m) => m.youthId === user?.id && m.status === "terminée");
  const levelIndex = badgeLevels.indexOf(user?.badge ?? "Bronze");

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={{ padding: spacing.md, paddingBottom: spacing.xl }}>
        <Text style={typography.h1}>Passeport professionnel</Text>

        <View style={styles.card}>
          <View style={styles.qrBox}>
            <MaterialCommunityIcons name="qrcode" size={90} color={colors.dark} />
          </View>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.caption}>ID prestataire : {user?.id?.toUpperCase()}</Text>
          <View style={styles.row}>
            <Ionicons name="star" size={14} color={colors.accentGold} />
            <Text style={styles.rating}>{user?.rating} · Statut {user?.badge}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Progression du classement</Text>
        <View style={styles.progressRow}>
          {badgeLevels.map((lvl, i) => (
            <View key={lvl} style={styles.progressStep}>
              <View style={[styles.progressDot, i <= levelIndex && styles.progressDotActive]} />
              <Text style={[styles.progressLabel, i <= levelIndex && styles.progressLabelActive]}>{lvl}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Compétences</Text>
        <View style={styles.chipsRow}>
          {(user?.skills ?? []).map((s) => (
            <View key={s} style={styles.chip}>
              <Text style={styles.chipText}>{s}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Formations validées</Text>
        <View style={styles.row}>
          <MaterialCommunityIcons name="certificate-outline" size={16} color={colors.primary} />
          <Text style={styles.formationText}>Module 1 — Accueil et sécurité de l'enfant</Text>
        </View>
        <View style={styles.row}>
          <MaterialCommunityIcons name="certificate-outline" size={16} color={colors.primary} />
          <Text style={styles.formationText}>Module 3 — Premiers secours de base</Text>
        </View>

        <Text style={styles.sectionTitle}>Historique des missions</Text>
        {completedMissions.length === 0 ? (
          <Text style={styles.emptyText}>Aucune mission terminée pour le moment.</Text>
        ) : (
          completedMissions.map((m) => (
            <View key={m.id} style={styles.historyRow}>
              <Text style={styles.historyService}>{m.service}</Text>
              <Text style={styles.historyMeta}>{m.zone} · {m.date}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  card: { alignItems: "center", backgroundColor: colors.primaryLight, borderRadius: radius.lg, padding: spacing.lg, marginTop: spacing.lg, marginBottom: spacing.lg },
  qrBox: { backgroundColor: colors.white, padding: spacing.md, borderRadius: radius.md, marginBottom: spacing.sm },
  name: { fontSize: 16, fontWeight: "700", color: colors.dark },
  caption: { fontSize: 11, color: colors.gray, marginTop: 2 },
  row: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  rating: { fontSize: 12, color: colors.dark, marginLeft: 4, fontWeight: "600" },
  sectionTitle: { fontSize: 13, fontWeight: "700", color: colors.dark, marginBottom: spacing.sm, marginTop: spacing.sm },
  progressRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: spacing.lg },
  progressStep: { alignItems: "center", flex: 1 },
  progressDot: { width: 16, height: 16, borderRadius: 8, backgroundColor: colors.border, marginBottom: 4 },
  progressDotActive: { backgroundColor: colors.primary },
  progressLabel: { fontSize: 10, color: colors.grayLight },
  progressLabelActive: { color: colors.dark, fontWeight: "700" },
  chipsRow: { flexDirection: "row", flexWrap: "wrap", marginBottom: spacing.sm },
  chip: { backgroundColor: colors.background, borderRadius: radius.pill, paddingHorizontal: 12, paddingVertical: 6, marginRight: 8, marginBottom: 8 },
  chipText: { fontSize: 12, color: colors.dark },
  formationText: { fontSize: 12, color: colors.dark, marginLeft: 6 },
  emptyText: { fontSize: 12, color: colors.gray },
  historyRow: { borderBottomWidth: 1, borderBottomColor: colors.border, paddingVertical: spacing.sm },
  historyService: { fontSize: 13, fontWeight: "600", color: colors.dark },
  historyMeta: { fontSize: 11, color: colors.gray, marginTop: 2 },
});
