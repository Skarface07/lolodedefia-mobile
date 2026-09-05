import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius } from "../theme/theme";

export default function MultiSelectModal({
  label,
  values = [],
  options,
  onChange,
  placeholder = "Sélectionner...",
}) {
  const [visible, setVisible] = useState(false);
  const [draft, setDraft] = useState(values);

  useEffect(() => {
    if (visible) setDraft(values);
  }, [visible]);

  const toggle = (item) => {
    setDraft((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]
    );
  };

  const confirm = () => {
    onChange(draft);
    setVisible(false);
  };

  const summary =
    values.length === 0
      ? placeholder
      : values.length <= 2
        ? values.join(", ")
        : `${values.length} quartiers sélectionnés`;

  return (
    <>
      <TouchableOpacity style={styles.trigger} onPress={() => setVisible(true)}>
        <Text
          style={[
            styles.triggerText,
            values.length === 0 && styles.placeholder,
          ]}
          numberOfLines={1}
        >
          {summary}
        </Text>
        <Ionicons name="chevron-down" size={18} color={colors.gray} />
      </TouchableOpacity>

      <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.overlay}>
          <SafeAreaView style={styles.sheet} edges={["bottom"]}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>{label}</Text>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <Ionicons name="close" size={22} color={colors.dark} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              contentContainerStyle={{ paddingBottom: spacing.sm }}
              renderItem={({ item }) => {
                const checked = draft.includes(item);
                return (
                  <TouchableOpacity
                    style={styles.option}
                    onPress={() => toggle(item)}
                  >
                    <Text style={styles.optionText}>{item}</Text>
                    <View
                      style={[
                        styles.checkbox,
                        checked && styles.checkboxChecked,
                      ]}
                    >
                      {checked && (
                        <Ionicons
                          name="checkmark"
                          size={13}
                          color={colors.white}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
            <View style={styles.footer}>
              <TouchableOpacity style={styles.confirmBtn} onPress={confirm}>
                <Text style={styles.confirmBtnText}>
                  Valider {draft.length > 0 ? `(${draft.length})` : ""}
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    height: 46,
  },
  triggerText: { fontSize: 14, color: colors.dark, flex: 1, marginRight: 8 },
  placeholder: { color: colors.grayLight },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    maxHeight: "75%",
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sheetTitle: { fontSize: 16, fontWeight: "700", color: colors.dark },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  optionText: { fontSize: 14, color: colors.dark },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  footer: {
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  confirmBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    paddingVertical: 14,
    alignItems: "center",
  },
  confirmBtnText: { color: colors.white, fontWeight: "700", fontSize: 14 },
});
