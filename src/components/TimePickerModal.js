import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius } from "../theme/theme";

function generateSlots(startHour, endHour) {
  const slots = [];
  for (let h = startHour; h < endHour; h++) {
    slots.push(`${String(h).padStart(2, "0")}:00`);
    slots.push(`${String(h).padStart(2, "0")}:30`);
  }
  return slots;
}

const PERIODS = [
  { label: "Matin", icon: "partly-sunny-outline", slots: generateSlots(7, 12) },
  { label: "Après-midi", icon: "sunny-outline", slots: generateSlots(12, 18) },
  { label: "Soir", icon: "moon-outline", slots: generateSlots(18, 21) },
];

export default function TimePickerModal({
  label = "Heure souhaitée",
  value,
  onSelect,
  placeholder = "Choisir un horaire",
}) {
  const [visible, setVisible] = useState(false);

  const handleSelect = (time) => {
    onSelect(time);
    setVisible(false);
  };

  return (
    <>
      <TouchableOpacity style={styles.trigger} onPress={() => setVisible(true)}>
        <Ionicons
          name="time-outline"
          size={18}
          color={colors.primary}
          style={{ marginRight: 8 }}
        />
        <Text style={[styles.triggerText, !value && styles.placeholder]}>
          {value || placeholder}
        </Text>
        <Ionicons
          name="chevron-down"
          size={18}
          color={colors.gray}
          style={{ marginLeft: "auto" }}
        />
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

            <ScrollView
              contentContainerStyle={{
                padding: spacing.md,
                paddingBottom: spacing.xl,
              }}
            >
              {PERIODS.map((period) => (
                <View key={period.label} style={{ marginBottom: spacing.lg }}>
                  <View style={styles.periodHeader}>
                    <Ionicons
                      name={period.icon}
                      size={16}
                      color={colors.gray}
                    />
                    <Text style={styles.periodLabel}>{period.label}</Text>
                  </View>
                  <View style={styles.grid}>
                    {period.slots.map((slot) => {
                      const active = value === slot;
                      return (
                        <TouchableOpacity
                          key={slot}
                          style={[styles.slot, active && styles.slotActive]}
                          onPress={() => handleSelect(slot)}
                        >
                          <Text
                            style={[
                              styles.slotText,
                              active && styles.slotTextActive,
                            ]}
                          >
                            {slot}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              ))}
            </ScrollView>
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
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    height: 46,
  },
  triggerText: { fontSize: 14, color: colors.dark },
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
    maxHeight: "80%",
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
  periodHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  periodLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.gray,
    marginLeft: 6,
    textTransform: "uppercase",
  },
  grid: { flexDirection: "row", flexWrap: "wrap", marginHorizontal: -4 },
  slot: {
    width: "31%",
    margin: "1.16%",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: 12,
    alignItems: "center",
  },
  slotActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  slotText: { fontSize: 13, color: colors.dark, fontWeight: "600" },
  slotTextActive: { color: colors.white, fontWeight: "700" },
});
