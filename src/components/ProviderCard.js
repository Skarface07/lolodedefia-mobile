import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, spacing, radius } from "../theme/theme";

export default function ProviderCard({ item }) {
  return (
    <View style={styles.card}>
      <View style={styles.imagePlaceholder}>
        {item.badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.badge}</Text>
          </View>
        )}
        <MaterialCommunityIcons name="account-circle" size={54} color="rgba(255,255,255,0.85)" />
      </View>

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.provider} numberOfLines={1}>Par {item.provider}</Text>

        <View style={styles.row}>
          <Ionicons name="star" size={12} color={colors.accentGold} />
          <Text style={styles.meta}>{item.rating} ({item.reviews})</Text>
          <Ionicons name="time-outline" size={12} color={colors.gray} style={{ marginLeft: 8 }} />
          <Text style={styles.meta}>{item.duration}</Text>
        </View>

        {item.verified && (
          <View style={styles.row}>
            <MaterialCommunityIcons name="shield-check" size={12} color={colors.success} />
            <Text style={styles.verified}>Prestataire vérifié</Text>
          </View>
        )}

        <View style={styles.footerRow}>
          <View>
            <Text style={styles.price}>{item.price}</Text>
            {item.oldPrice && <Text style={styles.oldPrice}>{item.oldPrice}</Text>}
          </View>
          <TouchableOpacity style={styles.bookBtn}>
            <Text style={styles.bookBtnText}>Demander</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 190,
    backgroundColor: colors.white,
    borderRadius: radius.md,
    marginRight: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },
  imagePlaceholder: {
    height: 110,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: colors.accentGold,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.sm,
  },
  badgeText: { color: colors.white, fontSize: 10, fontWeight: "700" },
  content: { padding: spacing.sm },
  name: { fontSize: 13, fontWeight: "700", color: colors.dark },
  provider: { fontSize: 11, color: colors.gray, marginTop: 1 },
  row: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  meta: { fontSize: 11, color: colors.gray, marginLeft: 3 },
  verified: { fontSize: 11, color: colors.success, marginLeft: 3 },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: spacing.sm,
  },
  price: { fontSize: 14, fontWeight: "800", color: colors.dark },
  oldPrice: { fontSize: 11, color: colors.grayLight, textDecorationLine: "line-through" },
  bookBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.sm,
  },
  bookBtnText: { color: colors.white, fontSize: 11, fontWeight: "700" },
});
