import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius, typography } from "../../theme/theme";
import { popularServices } from "../../data/demoData";
import lomeZones from "../../data/lomeZones";
import SelectModal from "../../components/SelectModal";
import MonthCalendar from "../../components/MonthCalendar";
import { useMissions } from "../../context/MissionsContext";

export default function PlanScheduleScreen({ navigation }) {
  const { createRequest, getScheduledEvents } = useMissions();
  const [service, setService] = useState(null);
  const [zone, setZone] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");

  const canSubmit = service && zone && selectedDate && time;

  const submit = () => {
    if (!canSubmit) return;
    createRequest({
      service, zone, date: `${selectedDate} à ${time}`,
      scheduledDate: selectedDate, scheduledTime: time,
      budget: "À négocier", description,
    });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <View style={{ flexDirection: "row", alignItems: "center", padding: spacing.md }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={colors.dark} />
        </TouchableOpacity>
        <Text style={[typography.h2, { marginLeft: spacing.sm }]}>Planifier une demande</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.md, paddingBottom: spacing.xl }}>
        <MonthCalendar events={getScheduledEvents()} selectedDate={selectedDate} onDayPress={setSelectedDate} />

        <Text style={{ fontSize: 13, fontWeight: "700", color: colors.dark, marginTop: spacing.lg, marginBottom: spacing.sm }}>Service</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {popularServices.slice(0, 6).map((s) => (
            <TouchableOpacity
              key={s.id}
              onPress={() => setService(s.label)}
              style={{
                borderWidth: 1, borderColor: service === s.label ? colors.primary : colors.border,
                backgroundColor: service === s.label ? colors.primary : "transparent",
                borderRadius: radius.pill, paddingHorizontal: 14, paddingVertical: 8, marginRight: 8, marginBottom: 8,
              }}
            >
              <Text style={{ fontSize: 12, color: service === s.label ? colors.white : colors.dark, fontWeight: service === s.label ? "700" : "400" }}>{s.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={{ fontSize: 13, fontWeight: "700", color: colors.dark, marginTop: spacing.md, marginBottom: spacing.sm }}>Zone</Text>
        <SelectModal label="Choisir un quartier" value={zone} options={lomeZones} onSelect={setZone} placeholder="Sélectionner un quartier" />

        <Text style={{ fontSize: 13, fontWeight: "700", color: colors.dark, marginTop: spacing.md, marginBottom: spacing.sm }}>Heure souhaitée</Text>
        <TextInput
          value={time}
          onChangeText={setTime}
          placeholder="Ex. 15h00"
          placeholderTextColor={colors.grayLight}
          style={{ borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, paddingHorizontal: spacing.md, height: 46, fontSize: 14, color: colors.dark }}
        />

        <Text style={{ fontSize: 13, fontWeight: "700", color: colors.dark, marginTop: spacing.md, marginBottom: spacing.sm }}>Description</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Décrivez votre besoin..."
          placeholderTextColor={colors.grayLight}
          multiline
          style={{ borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.md, height: 90, textAlignVertical: "top", fontSize: 13, color: colors.dark }}
        />
      </ScrollView>

      <View style={{ padding: spacing.md, borderTopWidth: 1, borderTopColor: colors.border }}>
        <TouchableOpacity
          disabled={!canSubmit}
          onPress={submit}
          style={{ backgroundColor: canSubmit ? colors.primary : colors.grayLight, paddingVertical: 15, borderRadius: radius.pill, alignItems: "center" }}
        >
          <Text style={{ color: colors.white, fontWeight: "700", fontSize: 14 }}>Ajouter au calendrier</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}