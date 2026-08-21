import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius, typography } from "../../theme/theme";
import { useMissions } from "../../context/MissionsContext";

const criteria = ["Ponctualité", "Qualité du travail", "Communication", "Respect des consignes", "Recommanderiez-vous ?"];

function StarRow({ value, onChange }) {
  return (
    <View style={{ flexDirection: "row" }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <TouchableOpacity key={n} onPress={() => onChange(n)}>
          <Ionicons
            name={n <= value ? "star" : "star-outline"}
            size={24}
            color={colors.accentGold}
            style={{ marginRight: 4 }}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default function EvaluationScreen({ route, navigation }) {
  const { missionId } = route.params;
  const { evaluate } = useMissions();
  const [notes, setNotes] = useState(Array(criteria.length).fill(0));
  const [comment, setComment] = useState("");

  const setNote = (i, v) => {
    const next = [...notes];
    next[i] = v;
    setNotes(next);
  };

  const canSubmit = notes.every((n) => n > 0);

  const submit = () => {
    evaluate(missionId, "family");
    navigation.popToTop();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={colors.dark} />
        </TouchableOpacity>
        <Text style={[typography.h2, { marginLeft: spacing.sm }]}>Évaluer la mission</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.md, paddingBottom: spacing.xl }}>
        {criteria.map((c, i) => (
          <View key={c} style={styles.criterionRow}>
            <Text style={styles.criterionLabel}>{c}</Text>
            <StarRow value={notes[i]} onChange={(v) => setNote(i, v)} />
          </View>
        ))}

        <Text style={styles.label}>Commentaire (optionnel)</Text>
        <TextInput
          style={styles.textarea}
          placeholder="Un mot sur cette expérience..."
          placeholderTextColor={colors.grayLight}
          multiline
          value={comment}
          onChangeText={setComment}
        />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={[styles.cta, !canSubmit && styles.ctaDisabled]} disabled={!canSubmit} onPress={submit}>
          <Text style={styles.ctaText}>Envoyer mon évaluation</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  headerRow: { flexDirection: "row", alignItems: "center", padding: spacing.md },
  criterionRow: { marginBottom: spacing.md },
  criterionLabel: { fontSize: 13, color: colors.dark, marginBottom: 6, fontWeight: "600" },
  label: { fontSize: 13, fontWeight: "700", color: colors.dark, marginTop: spacing.sm, marginBottom: spacing.sm },
  textarea: {
    borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.md,
    height: 90, textAlignVertical: "top", fontSize: 13, color: colors.dark,
  },
  footer: { padding: spacing.md, borderTopWidth: 1, borderTopColor: colors.border },
  cta: { backgroundColor: colors.primary, paddingVertical: 15, borderRadius: radius.pill, alignItems: "center" },
  ctaDisabled: { backgroundColor: colors.grayLight },
  ctaText: { color: colors.white, fontWeight: "700", fontSize: 14 },
});
