import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius, typography } from "../../theme/theme";
import { popularServices } from "../../data/demoData";
import lomeZones from "../../data/lomeZones";
import SelectModal from "../../components/SelectModal";
import TimePickerModal from "../../components/TimePickerModal";
import MonthCalendar from "../../components/MonthCalendar";
import { useMissions } from "../../context/MissionsContext";

export default function PlanScheduleScreen({ navigation }) {
  const { createRequest, getScheduledEvents } = useMissions();
  const [service, setService] = useState(null);
  const [zone, setZone] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [time, setTime] = useState(null);
  const [description, setDescription] = useState("");

  const canSubmit = service && zone && selectedDate && time;

  const submit = () => {
    if (!canSubmit) return;
    createRequest({
      service,
      zone,
      date: `${selectedDate} à ${time}`,
      scheduledDate: selectedDate,
      scheduledTime: time,
      budget: "À négocier",
      description,
    });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: spacing.md,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={colors.dark} />
        </TouchableOpacity>
        <Text style={[typography.h2, { marginLeft: spacing.sm }]}>
          Planifier une demande
        </Text>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <ScrollView
          contentContainerStyle={{
            padding: spacing.md,
            paddingBottom: spacing.xl,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <MonthCalendar
            events={getScheduledEvents()}
            selectedDate={selectedDate}
            onDayPress={setSelectedDate}
          />

          <Text style={styles.label}>Service</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {popularServices.slice(0, 6).map((s) => (
              <TouchableOpacity
                key={s.id}
                onPress={() => setService(s.label)}
                style={[styles.chip, service === s.label && styles.chipActive]}
              >
                <Text
                  style={[
                    styles.chipText,
                    service === s.label && styles.chipTextActive,
                  ]}
                >
                  {s.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Zone</Text>
          <SelectModal
            label="Choisir un quartier"
            value={zone}
            options={lomeZones}
            onSelect={setZone}
            placeholder="Sélectionner un quartier"
          />

          <Text style={styles.label}>Heure souhaitée</Text>
          <TimePickerModal value={time} onSelect={setTime} />

          <Text style={styles.label}>Description</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Décrivez votre besoin..."
            placeholderTextColor={colors.grayLight}
            multiline
            style={styles.textarea}
          />
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.footer}>
        <TouchableOpacity
          disabled={!canSubmit}
          onPress={submit}
          style={[styles.cta, !canSubmit && styles.ctaDisabled]}
        >
          <Text style={styles.ctaText}>Ajouter au calendrier</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.dark,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
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
  textarea: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    height: 90,
    textAlignVertical: "top",
    fontSize: 13,
    color: colors.dark,
  },
  footer: {
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  cta: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: radius.pill,
    alignItems: "center",
  },
  ctaDisabled: { backgroundColor: colors.grayLight },
  ctaText: { color: colors.white, fontWeight: "700", fontSize: 14 },
});
