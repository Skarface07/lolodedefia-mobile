import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, spacing, radius, typography } from "../../theme/theme";
import { useMissions } from "../../context/MissionsContext";

export default function MissionDetailScreen({ route, navigation }) {
  const { missionId } = route.params;
  const { getMissionById, respondToMission } = useMissions();
  const mission = getMissionById(missionId);

  const accept = () => {
    respondToMission(missionId, true);
    navigation.navigate("YouthMain", { screen: "Accueil" });
  };
  const refuse = () => {
    respondToMission(missionId, false);
    navigation.goBack();
  };

  if (!mission) return null;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={colors.dark} />
        </TouchableOpacity>
        <Text style={[typography.h2, { marginLeft: spacing.sm }]}>Détail de la mission</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <MaterialCommunityIcons name="briefcase-outline" size={18} color={colors.primary} />
          <Text style={styles.value}>{mission.service}</Text>
        </View>
        <View style={styles.row}>
          <Ionicons name="location-outline" size={18} color={colors.primary} />
          <Text style={styles.value}>{mission.zone}</Text>
        </View>
        <View style={styles.row}>
          <Ionicons name="time-outline" size={18} color={colors.primary} />
          <Text style={styles.value}>{mission.date}</Text>
        </View>
        <View style={styles.row}>
          <Ionicons name="cash-outline" size={18} color={colors.primary} />
          <Text style={styles.value}>{mission.budget}</Text>
        </View>
        {!!mission.description && (
          <View style={{ marginTop: spacing.sm }}>
            <Text style={styles.descLabel}>Description</Text>
            <Text style={styles.desc}>{mission.description}</Text>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.refuseBtn} onPress={refuse}>
          <Text style={styles.refuseText}>Refuser</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.acceptBtn} onPress={accept}>
          <Text style={styles.acceptText}>Accepter</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  headerRow: { flexDirection: "row", alignItems: "center", padding: spacing.md },
  card: {
    marginHorizontal: spacing.md, borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.md, padding: spacing.md,
  },
  row: { flexDirection: "row", alignItems: "center", marginBottom: spacing.sm },
  value: { fontSize: 14, color: colors.dark, marginLeft: spacing.sm },
  descLabel: { fontSize: 12, fontWeight: "700", color: colors.dark, marginBottom: 4 },
  desc: { fontSize: 13, color: colors.gray },
  footer: { flexDirection: "row", padding: spacing.md, marginTop: "auto" },
  refuseBtn: {
    flex: 1, borderWidth: 1, borderColor: colors.danger, borderRadius: radius.pill,
    paddingVertical: 14, alignItems: "center", marginRight: spacing.sm,
  },
  refuseText: { color: colors.danger, fontWeight: "700" },
  acceptBtn: { flex: 1, backgroundColor: colors.primary, borderRadius: radius.pill, paddingVertical: 14, alignItems: "center" },
  acceptText: { color: colors.white, fontWeight: "700" },
});
