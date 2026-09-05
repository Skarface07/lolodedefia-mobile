import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius } from "../theme/theme";

export default function SearchBar({ placeholder = "Rechercher un service (ménage, garde...)" }) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={18} color={colors.grayLight} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.grayLight}
        style={styles.input}
      />
      <TouchableOpacity>
        <Ionicons name="options-outline" size={20} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    backgroundColor: colors.background,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    height: 46,
  },
  input: { flex: 1, marginLeft: spacing.sm, fontSize: 14, color: colors.dark },
});
