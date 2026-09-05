import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius } from "../theme/theme";

const WEEKDAYS = ["L", "M", "M", "J", "V", "S", "D"];
const MONTHS = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];

function toKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function MonthCalendar({ events = [], onDayPress, selectedDate }) {
  const [cursor, setCursor] = useState(new Date());

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const firstDay = new Date(year, month, 1);
  const startOffset = (firstDay.getDay() + 6) % 7; // lundi = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const eventsByDay = {};
  events.forEach((e) => {
    if (!eventsByDay[e.date]) eventsByDay[e.date] = [];
    eventsByDay[e.date].push(e);
  });

  const cells = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const changeMonth = (delta) => {
    setCursor(new Date(year, month + delta, 1));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => changeMonth(-1)}>
          <Ionicons name="chevron-back" size={20} color={colors.dark} />
        </TouchableOpacity>
        <Text style={styles.monthLabel}>{MONTHS[month]} {year}</Text>
        <TouchableOpacity onPress={() => changeMonth(1)}>
          <Ionicons name="chevron-forward" size={20} color={colors.dark} />
        </TouchableOpacity>
      </View>

      <View style={styles.weekRow}>
        {WEEKDAYS.map((w, i) => (
          <Text key={i} style={styles.weekLabel}>{w}</Text>
        ))}
      </View>

      <View style={styles.grid}>
        {cells.map((day, i) => {
          if (!day) return <View key={i} style={styles.cell} />;
          const dateObj = new Date(year, month, day);
          const key = toKey(dateObj);
          const dayEvents = eventsByDay[key] || [];
          const isSelected = selectedDate === key;
          return (
            <TouchableOpacity key={i} style={styles.cell} onPress={() => onDayPress && onDayPress(key)}>
              <View style={[styles.dayCircle, isSelected && styles.dayCircleSelected]}>
                <Text style={[styles.dayText, isSelected && styles.dayTextSelected]}>{day}</Text>
              </View>
              <View style={styles.dotsRow}>
                {dayEvents.slice(0, 3).map((e, idx) => (
                  <View key={idx} style={[styles.dot, { backgroundColor: e.color }]} />
                ))}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.sm },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.sm, paddingHorizontal: 4 },
  monthLabel: { fontSize: 14, fontWeight: "700", color: colors.dark },
  weekRow: { flexDirection: "row" },
  weekLabel: { flex: 1, textAlign: "center", fontSize: 10, color: colors.gray, fontWeight: "600" },
  grid: { flexDirection: "row", flexWrap: "wrap" },
  cell: { width: `${100 / 7}%`, alignItems: "center", paddingVertical: 4 },
  dayCircle: { width: 26, height: 26, borderRadius: 13, alignItems: "center", justifyContent: "center" },
  dayCircleSelected: { backgroundColor: colors.primary },
  dayText: { fontSize: 12, color: colors.dark },
  dayTextSelected: { color: colors.white, fontWeight: "700" },
  dotsRow: { flexDirection: "row", marginTop: 2, height: 5 },
  dot: { width: 4, height: 4, borderRadius: 2, marginHorizontal: 1 },
});