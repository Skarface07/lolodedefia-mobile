import React from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, spacing, radius, typography } from "../../theme/theme";
import { useMissions } from "../../context/MissionsContext";

const steps = [
  { key: "en attente de confirmation", label: "En attente de confirmation du jeune" },
  { key: "acceptée", label: "Mission acceptée" },
  { key: "en_cours", label: "Mission en cours (pointage effectué)" },
  { key: "terminée", label: "Mission terminée" },
];

export default function MissionTrackingScreen({ route, navigation }) {
  const { missionId } = route.params;
  const { getMissionById, candidates } = useMissions();
  const mission = getMissionById(missionId);
  const youth = candidates.find((c) => c.id === mission?.youthId);

  const currentIndex = steps.findIndex((s) => s.key === mission?.status);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={colors.dark} />
        </TouchableOpacity>
        <Text style={[typography.h2, { marginLeft: spacing.sm }]}>Suivi de la mission</Text>
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.service}>{mission?.service}</Text>
        <Text style={styles.meta}>{mission?.zone} · {mission?.date}</Text>
        {youth && (
          <View style={styles.youthRow}>
            <MaterialCommunityIcons name="account-circle" size={22} color={colors.primary} />
            <Text style={styles.youthName}>{youth.name}</Text>
          </View>
        )}
      </View>

      <View style={styles.timeline}>
        {steps.map((s, i) => {
          const done = i <= currentIndex;
          return (
            <View key={s.key} style={styles.stepRow}>
              <View style={[styles.dot, done && styles.dotDone]}>
                {done && <Ionicons name="checkmark" size={12} color={colors.white} />}
              </View>
              <Text style={[styles.stepLabel, done && styles.stepLabelDone]}>{s.label}</Text>
            </View>
          );
        })}
      </View>

      {mission?.status === "terminée" && !mission.familyEvaluated && (
        <TouchableOpacity
          style={styles.cta}
          onPress={() => navigation.navigate("Evaluation", { missionId })}
        >
          <Text style={styles.ctaText}>Évaluer le prestataire</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  headerRow: { flexDirection: "row", alignItems: "center", padding: spacing.md },
  summaryCard: { marginHorizontal: spacing.md, backgroundColor: colors.primaryLight, borderRadius: radius.md, padding: spacing.md },
  service: { fontSize: 15, fontWeight: "700", color: colors.dark },
  meta: { fontSize: 12, color: colors.gray, marginTop: 2 },
  youthRow: { flexDirection: "row", alignItems: "center", marginTop: spacing.sm },
  youthName: { marginLeft: 6, fontSize: 13, fontWeight: "600", color: colors.dark },
  timeline: { padding: spacing.md, marginTop: spacing.sm },
  stepRow: { flexDirection: "row", alignItems: "center", marginBottom: spacing.md },
  dot: {
    width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: colors.border,
    alignItems: "center", justifyContent: "center", marginRight: spacing.sm,
  },
  dotDone: { backgroundColor: colors.primary, borderColor: colors.primary },
  stepLabel: { fontSize: 13, color: colors.grayLight },
  stepLabelDone: { color: colors.dark, fontWeight: "600" },
  cta: {
    backgroundColor: colors.primary, marginHorizontal: spacing.md, marginTop: spacing.md,
    paddingVertical: 15, borderRadius: radius.pill, alignItems: "center",
  },
  ctaText: { color: colors.white, fontWeight: "700", fontSize: 14 },
});
