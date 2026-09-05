import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius } from "../theme/theme";

export default function TrustBadges({ items }) {
  return (
    <View style={styles.container}>
      {items.map((b) => (
        <View key={b.id} style={styles.item}>
          <Ionicons name={b.icon.replace("-outline", "-outline")} size={20} color={colors.primary} />
          <Text style={styles.label}>{b.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.primaryLight,
    marginHorizontal: spacing.md,
    marginTop: spacing.lg,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  item: { alignItems: "center", flex: 1 },
  label: { fontSize: 10, color: colors.dark, textAlign: "center", marginTop: 4 },
});
