import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius, typography } from "../../theme/theme";
import { useMissions } from "../../context/MissionsContext";

export default function YouthChatScreen({ route, navigation }) {
  const { missionId } = route.params;
  const { getMissionById } = useMissions();
  const mission = getMissionById(missionId);
  const familyName = mission?.requesterName || "Famille";

  const [messages, setMessages] = useState([
    {
      id: "1",
      from: "family",
      text: "Bonjour, merci d'avoir accepté la mission !",
    },
  ]);
  const [text, setText] = useState("");
  const listRef = useRef(null);

  const send = () => {
    if (!text.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), from: "youth", text },
    ]);
    setText("");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={colors.dark} />
        </TouchableOpacity>
        <Text style={[typography.h2, { marginLeft: spacing.sm }]}>
          {familyName}
        </Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(m) => m.id}
          contentContainerStyle={{ padding: spacing.md }}
          onContentSizeChange={() =>
            listRef.current?.scrollToEnd({ animated: true })
          }
          renderItem={({ item }) => (
            <View
              style={[
                styles.bubble,
                item.from === "youth" ? styles.bubbleRight : styles.bubbleLeft,
              ]}
            >
              <Text
                style={[
                  styles.bubbleText,
                  item.from === "youth" && { color: colors.white },
                ]}
              >
                {item.text}
              </Text>
            </View>
          )}
        />
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Écrire un message..."
            placeholderTextColor={colors.grayLight}
            value={text}
            onChangeText={setText}
            onFocus={() =>
              setTimeout(
                () => listRef.current?.scrollToEnd({ animated: true }),
                150
              )
            }
          />
          <TouchableOpacity style={styles.sendBtn} onPress={send}>
            <Ionicons name="send" size={18} color={colors.white} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  bubble: {
    maxWidth: "75%",
    padding: spacing.sm,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
  },
  bubbleLeft: { backgroundColor: colors.background, alignSelf: "flex-start" },
  bubbleRight: { backgroundColor: colors.primary, alignSelf: "flex-end" },
  bubbleText: { fontSize: 13, color: colors.dark },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    height: 42,
    fontSize: 13,
    color: colors.dark,
  },
  sendBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: spacing.sm,
  },
});
