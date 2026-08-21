import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, spacing, radius, typography } from "../theme/theme";

function ServiceIcon({ icon, type }) {
  const Comp = type === "ION" ? Ionicons : MaterialCommunityIcons;
  return <Comp name={icon} size={24} color={colors.primary} />;
}

export default function ServiceGrid({ services, onSeeAll }) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={typography.h2}>Services populaires</Text>
        <TouchableOpacity style={styles.seeAll} onPress={onSeeAll}>
          <Text style={styles.seeAllText}>Voir tout</Text>
          <Ionicons name="chevron-forward" size={14} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {services.map((s) => (
          <TouchableOpacity key={s.id} style={styles.item}>
            <View style={styles.iconWrap}>
              <ServiceIcon icon={s.icon} type={s.type} />
            </View>
            <Text style={styles.label} numberOfLines={2}>
              {s.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: spacing.lg, paddingHorizontal: spacing.md },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  seeAll: { flexDirection: "row", alignItems: "center" },
  seeAllText: { color: colors.primary, fontSize: 13, fontWeight: "600", marginRight: 2 },
  grid: { flexDirection: "row", flexWrap: "wrap", marginTop: spacing.md, marginHorizontal: -spacing.xs },
  item: { width: "25%", alignItems: "center", marginBottom: spacing.md, paddingHorizontal: spacing.xs },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  label: { fontSize: 11, textAlign: "center", color: colors.dark },
});
