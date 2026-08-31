import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { typography, colors, spacing, radius } from "../../theme/theme";

const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const slots = ["Matin", "Après-midi", "Soir"];
const zones = ["Adidogomé", "Bè", "Tokoin", "Agoè", "Kodjoviakopé"];

export default function AvailabilityScreen() {
  const [selected, setSelected] = useState({}); // "Lun-Matin": true
  const [selectedZones, setSelectedZones] = useState(["Adidogomé"]);

  const toggleSlot = (day, slot) => {
    const key = `${day}-${slot}`;
    setSelected((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleZone = (z) => {
    setSelectedZones((prev) => (prev.includes(z) ? prev.filter((x) => x !== z) : [...prev, z]));
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={{ padding: spacing.md, paddingBottom: spacing.xl }}>
        <Text style={typography.h1}>Mon planning</Text>
        <Text style={[typography.caption, { marginTop: 4, marginBottom: spacing.lg }]}>
          Indiquez vos disponibilités pour recevoir des propositions de missions adaptées.
        </Text>

        <Text style={styles.sectionTitle}>Disponibilités</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.dayHeaderCell} />
            {slots.map((s) => (
              <Text key={s} style={styles.slotHeader}>{s}</Text>
            ))}
          </View>
          {days.map((d) => (
            <View key={d} style={styles.tableRow}>
              <Text style={styles.dayLabel}>{d}</Text>
              {slots.map((s) => {
                const active = !!selected[`${d}-${s}`];
                return (
                  <TouchableOpacity
                    key={s}
                    style={[styles.cell, active && styles.cellActive]}
                    onPress={() => toggleSlot(d, s)}
                  />
                );
              })}
            </View>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { marginTop: spacing.lg }]}>Zones d'intervention</Text>
        <View style={styles.chipsRow}>
          {zones.map((z) => (
            <TouchableOpacity
              key={z}
              style={[styles.chip, selectedZones.includes(z) && styles.chipActive]}
              onPress={() => toggleZone(z)}
            >
              <Text style={[styles.chipText, selectedZones.includes(z) && styles.chipTextActive]}>{z}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.saveBtn}>
          <Text style={styles.saveBtnText}>Enregistrer mes disponibilités</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  sectionTitle: { fontSize: 13, fontWeight: "700", color: colors.dark, marginBottom: spacing.sm },
  table: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, overflow: "hidden" },
  tableRow: { flexDirection: "row", alignItems: "center", borderBottomWidth: 1, borderBottomColor: colors.border },
  dayHeaderCell: { width: 44 },
  dayLabel: { width: 44, fontSize: 11, color: colors.dark, textAlign: "center", paddingVertical: 10 },
  slotHeader: { flex: 1, fontSize: 10, color: colors.gray, textAlign: "center", paddingVertical: 6 },
  cell: { flex: 1, height: 32, borderLeftWidth: 1, borderLeftColor: colors.border },
  cellActive: { backgroundColor: colors.primary },
  chipsRow: { flexDirection: "row", flexWrap: "wrap" },
  chip: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.pill, paddingHorizontal: 14, paddingVertical: 8, marginRight: 8, marginBottom: 8 },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { fontSize: 12, color: colors.dark },
  chipTextActive: { color: colors.white, fontWeight: "700" },
  saveBtn: { backgroundColor: colors.primary, borderRadius: radius.pill, paddingVertical: 15, alignItems: "center", marginTop: spacing.lg },
  saveBtnText: { color: colors.white, fontWeight: "700" },
});
