import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius, typography } from "../theme/theme";

export default function Header({ location = "Adidogomé, Lomé", subtitle = "Prestataires disponibles près de vous" }) {
  return (
    <View style={styles.container}>
      <View style={styles.locationBlock}>
        <Ionicons name="location" size={20} color={colors.primary} />
        <View style={{ marginLeft: spacing.xs }}>
          <View style={styles.locationRow}>
            <Text style={styles.locationText}>{location}</Text>
            <Ionicons name="chevron-down" size={14} color={colors.dark} style={{ marginLeft: 4 }} />
          </View>
          <Text style={typography.caption}>{subtitle}</Text>
        </View>
      </View>

      <View style={styles.icons}>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="notifications-outline" size={20} color={colors.dark} />
          <View style={styles.dot} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.iconBtn, { marginLeft: spacing.sm }]}>
          <Ionicons name="person-outline" size={20} color={colors.dark} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
  },
  locationBlock: { flexDirection: "row", alignItems: "flex-start", flexShrink: 1 },
  locationRow: { flexDirection: "row", alignItems: "center" },
  locationText: { fontSize: 15, fontWeight: "700", color: colors.dark },
  icons: { flexDirection: "row" },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    position: "absolute",
    top: 9,
    right: 10,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.accentGold,
  },
});
