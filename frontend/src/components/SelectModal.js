import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius } from "../theme/theme";

export default function SelectModal({ label, value, options, onSelect, placeholder = "Sélectionner..." }) {
  const [visible, setVisible] = useState(false);

  const handleSelect = (item) => {
    onSelect(item);
    setVisible(false);
  };

  return (
    <>
      <TouchableOpacity style={styles.trigger} onPress={() => setVisible(true)}>
        <Text style={[styles.triggerText, !value && styles.placeholder]}>
          {value || placeholder}
        </Text>
        <Ionicons name="chevron-down" size={18} color={colors.gray} />
      </TouchableOpacity>

      <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.overlay}>
          <SafeAreaView style={styles.sheet}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>{label}</Text>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <Ionicons name="close" size={22} color={colors.dark} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              contentContainerStyle={{ paddingBottom: spacing.lg }}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.option} onPress={() => handleSelect(item)}>
                  <Text style={[styles.optionText, item === value && styles.optionTextActive]}>{item}</Text>
                  {item === value && <Ionicons name="checkmark" size={18} color={colors.primary} />}
                </TouchableOpacity>
              )}
            />
          </SafeAreaView>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    borderWidth: 1, borderColor: colors.border, borderRadius: radius.md,
    paddingHorizontal: spacing.md, height: 46,
  },
  triggerText: { fontSize: 14, color: colors.dark },
  placeholder: { color: colors.grayLight },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "flex-end" },
  sheet: { backgroundColor: colors.white, borderTopLeftRadius: radius.lg, borderTopRightRadius: radius.lg, maxHeight: "75%" },
  sheetHeader: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  sheetTitle: { fontSize: 16, fontWeight: "700", color: colors.dark },
  option: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    paddingHorizontal: spacing.md, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: colors.background,
  },
  optionText: { fontSize: 14, color: colors.dark },
  optionTextActive: { color: colors.primary, fontWeight: "700" },
});