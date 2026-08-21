import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, spacing, radius } from "../theme/theme";

export default function PromoBanner({ onInstant, onSchedule }) {
  return (
    <View style={styles.banner}>
      <Text style={styles.title}>Besoin d'aide{"\n"}à la maison ?</Text>
      <Text style={styles.subtitle}>On vous met en relation en 30 min.</Text>

      <View style={styles.pointsRow}>
        <View style={styles.pointItem}>
          <Ionicons name="flash" size={13} color={colors.white} />
          <Text style={styles.pointText}>Mise en relation rapide</Text>
        </View>
      </View>
      <View style={styles.pointsRow}>
        <View style={styles.pointItem}>
          <MaterialCommunityIcons name="shield-check-outline" size={13} color={colors.white} />
          <Text style={styles.pointText}>Prestataires vérifiés et formés</Text>
        </View>
      </View>

      <View style={styles.buttonsRow}>
        <TouchableOpacity style={styles.primaryBtn} onPress={onInstant}>
          <Ionicons name="flash" size={14} color={colors.primary} />
          <Text style={styles.primaryBtnText}>Demande immédiate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryBtn} onPress={onSchedule}>
          <Ionicons name="calendar-outline" size={14} color={colors.white} />
          <Text style={styles.secondaryBtnText}>Planifier</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    padding: spacing.lg,
    overflow: "hidden",
  },
  title: { color: colors.white, fontSize: 22, fontWeight: "800", lineHeight: 28 },
  subtitle: { color: "#DFF3E8", fontSize: 13, marginTop: 6, marginBottom: spacing.sm },
  pointsRow: { marginBottom: 4 },
  pointItem: { flexDirection: "row", alignItems: "center" },
  pointText: { color: colors.white, fontSize: 12, marginLeft: 6 },
  buttonsRow: { flexDirection: "row", marginTop: spacing.md },
  primaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: radius.pill,
    marginRight: spacing.sm,
  },
  primaryBtnText: { color: colors.primary, fontWeight: "700", fontSize: 12, marginLeft: 6 },
  secondaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.6)",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: radius.pill,
  },
  secondaryBtnText: { color: colors.white, fontWeight: "700", fontSize: 12, marginLeft: 6 },
});
