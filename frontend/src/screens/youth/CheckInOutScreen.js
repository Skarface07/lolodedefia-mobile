import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, spacing, radius, typography } from "../../theme/theme";
import { useMissions } from "../../context/MissionsContext";

export default function CheckInOutScreen({ route, navigation }) {
  const { missionId } = route.params;
  const { getMissionById, checkIn, checkOut } = useMissions();
  const mission = getMissionById(missionId);

  if (!mission) return null;

  const hasCheckedIn = !!mission.checkIn;
  const hasCheckedOut = !!mission.checkOut;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={colors.dark} />
        </TouchableOpacity>
        <Text style={[typography.h2, { marginLeft: spacing.sm }]}>{mission.service}</Text>
      </View>

      <View style={styles.mapPlaceholder}>
        <MaterialCommunityIcons name="map-marker-radius-outline" size={40} color={colors.white} />
        <Text style={styles.mapText}>{mission.zone}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.stepCard}>
          <View style={styles.stepRow}>
            <View style={[styles.dot, hasCheckedIn && styles.dotDone]} />
            <View style={{ flex: 1 }}>
              <Text style={styles.stepLabel}>Arrivée</Text>
              <Text style={styles.stepTime}>{mission.checkIn ?? "Non pointée"}</Text>
            </View>
            {!hasCheckedIn && (
              <TouchableOpacity style={styles.smallBtn} onPress={() => checkIn(missionId)}>
                <Text style={styles.smallBtnText}>Pointer</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.stepRow}>
            <View style={[styles.dot, hasCheckedOut && styles.dotDone]} />
            <View style={{ flex: 1 }}>
              <Text style={styles.stepLabel}>Départ</Text>
              <Text style={styles.stepTime}>{mission.checkOut ?? "Non pointé"}</Text>
            </View>
            {hasCheckedIn && !hasCheckedOut && (
              <TouchableOpacity style={styles.smallBtn} onPress={() => checkOut(missionId)}>
                <Text style={styles.smallBtnText}>Pointer</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <TouchableOpacity style={styles.sosBtn} onPress={() => navigation.navigate("Sos", { missionId })}>
          <Ionicons name="alert-circle" size={20} color={colors.white} />
          <Text style={styles.sosText}>Signaler une urgence</Text>
        </TouchableOpacity>

        {hasCheckedOut && !mission.youthEvaluated && (
          <TouchableOpacity
            style={styles.evalBtn}
            onPress={() => navigation.navigate("EvaluationFamily", { missionId })}
          >
            <Text style={styles.evalBtnText}>Évaluer la famille / l'entreprise</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  headerRow: { flexDirection: "row", alignItems: "center", padding: spacing.md },
  mapPlaceholder: {
    height: 140, marginHorizontal: spacing.md, borderRadius: radius.md, backgroundColor: colors.primary,
    alignItems: "center", justifyContent: "center",
  },
  mapText: { color: colors.white, fontWeight: "700", marginTop: 6 },
  content: { padding: spacing.md },
  stepCard: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.md, marginTop: spacing.md },
  stepRow: { flexDirection: "row", alignItems: "center", marginBottom: spacing.md },
  dot: { width: 14, height: 14, borderRadius: 7, borderWidth: 2, borderColor: colors.border, marginRight: spacing.sm },
  dotDone: { backgroundColor: colors.success, borderColor: colors.success },
  stepLabel: { fontSize: 13, fontWeight: "700", color: colors.dark },
  stepTime: { fontSize: 11, color: colors.gray, marginTop: 2 },
  smallBtn: { backgroundColor: colors.primary, paddingHorizontal: 12, paddingVertical: 8, borderRadius: radius.pill },
  smallBtnText: { color: colors.white, fontSize: 11, fontWeight: "700" },
  sosBtn: {
    flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: colors.danger,
    borderRadius: radius.pill, paddingVertical: 13, marginTop: spacing.lg,
  },
  sosText: { color: colors.white, fontWeight: "700", marginLeft: 8 },
  evalBtn: { backgroundColor: colors.accentGold, borderRadius: radius.pill, paddingVertical: 13, marginTop: spacing.sm, alignItems: "center" },
  evalBtnText: { color: colors.white, fontWeight: "700" },
});
