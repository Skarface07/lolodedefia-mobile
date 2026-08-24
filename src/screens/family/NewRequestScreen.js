import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius, typography } from "../../theme/theme";
import { popularServices } from "../../data/demoData";
import lomeZones from "../../data/lomeZones";
import SelectModal from "../../components/SelectModal";
import { useMissions } from "../../context/MissionsContext";

export default function NewRequestScreen({ route, navigation }) {
  const mode = route?.params?.mode ?? "instant";
  const preselectService = route?.params?.preselectService ?? null;
  const { createRequest } = useMissions();

  const [service, setService] = useState(preselectService);
  const [zone, setZone] = useState(null);
  const [budget, setBudget] = useState("");
  const [description, setDescription] = useState("");

  const canSubmit = service && zone;

  const submit = () => {
    if (!canSubmit) return;
    const mission = createRequest({
      service,
      zone,
      date: mode === "instant" ? "Dès que possible" : "À planifier",
      budget: budget || "À négocier",
      description,
    });
    navigation.replace("Proposals", { missionId: mission.id });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={colors.dark} />
        </TouchableOpacity>
        <Text style={[typography.h2, { marginLeft: spacing.sm }]}>Nouvelle demande</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.md, paddingBottom: spacing.xl }}>
        <Text style={styles.label}>Quel service recherchez-vous ?</Text>
        <View style={styles.chipsRow}>
          {popularServices.slice(0, 6).map((s) => (
            <TouchableOpacity
              key={s.id}
              style={[styles.chip, service === s.label && styles.chipActive]}
              onPress={() => setService(s.label)}
            >
              <Text style={[styles.chipText, service === s.label && styles.chipTextActive]}>{s.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Zone</Text>
        <SelectModal
          label="Choisir un quartier"
          value={zone}
          options={lomeZones}
          onSelect={setZone}
          placeholder="Sélectionner un quartier de Lomé"
        />

        <Text style={styles.label}>{mode === "instant" ? "Créneau souhaité" : "Date et heure"}</Text>
        <View style={styles.readonlyBox}>
          <Ionicons name={mode === "instant" ? "flash" : "calendar-outline"} size={16} color={colors.primary} />
          <Text style={styles.readonlyText}>
            {mode === "instant" ? "Dès que possible (sous 30 min)" : "À planifier — étape suivante"}
          </Text>
        </View>

        <Text style={styles.label}>Budget indicatif (FCFA)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex. 2 500"
          placeholderTextColor={colors.grayLight}
          keyboardType="numeric"
          value={budget}
          onChangeText={setBudget}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="Décrivez votre besoin (ex : garder 2 enfants pendant 2h)..."
          placeholderTextColor={colors.grayLight}
          multiline
          value={description}
          onChangeText={setDescription}
        />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.cta, !canSubmit && styles.ctaDisabled]}
          disabled={!canSubmit}
          onPress={submit}
        >
          <Text style={styles.ctaText}>Trouver un prestataire</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  headerRow: { flexDirection: "row", alignItems: "center", padding: spacing.md },
  label: { fontSize: 13, fontWeight: "700", color: colors.dark, marginTop: spacing.md, marginBottom: spacing.sm },
  chipsRow: { flexDirection: "row", flexWrap: "wrap" },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { fontSize: 12, color: colors.dark },
  chipTextActive: { color: colors.white, fontWeight: "700" },
  readonlyBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primaryLight,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  readonlyText: { fontSize: 12, color: colors.dark, marginLeft: 8 },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    height: 46,
    fontSize: 14,
    color: colors.dark,
  },
  textarea: { height: 90, paddingTop: 12, textAlignVertical: "top" },
  footer: { padding: spacing.md, borderTopWidth: 1, borderTopColor: colors.border },
  cta: { backgroundColor: colors.primary, paddingVertical: 15, borderRadius: radius.pill, alignItems: "center" },
  ctaDisabled: { backgroundColor: colors.grayLight },
  ctaText: { color: colors.white, fontWeight: "700", fontSize: 14 },
});