import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, spacing, radius, typography } from "../../theme/theme";
import {
  useMissions,
  PLATFORM_COMMISSION_RATE,
} from "../../context/MissionsContext";

const PROVIDERS = [
  { id: "flooz", label: "Flooz", color: "#F5A623", icon: "cellphone" },
  { id: "mixx", label: "Mixx by Moov", color: "#0F7ACC", icon: "cellphone" },
];

function parseAmountFromBudget(budget) {
  const digits = (budget || "").replace(/[^\d]/g, "");
  return digits ? String(parseInt(digits, 10)) : "";
}

export default function PaymentScreen({ route, navigation }) {
  const { missionId, youthId } = route.params;
  const {
    getMissionById,
    candidates,
    chooseYouth,
    payMission,
    getPaymentBreakdown,
  } = useMissions();
  const mission = getMissionById(missionId);
  const youth = candidates.find((c) => c.id === youthId);

  const [amount, setAmount] = useState(parseAmountFromBudget(mission?.budget));
  const [provider, setProvider] = useState(null);
  const [phone, setPhone] = useState("");
  const [processing, setProcessing] = useState(false);

  const numericAmount = Number(amount) || 0;
  const { commission, youthShare } = getPaymentBreakdown(numericAmount);
  const canPay = numericAmount > 0 && provider && phone.trim().length >= 8;

  const submit = () => {
    if (!canPay || processing) return;
    setProcessing(true);
    // Paiement simulé — sera remplacé par un vrai appel API Flooz/Mixx
    // une fois le backend en place.
    setTimeout(() => {
      payMission(missionId, {
        amount: numericAmount,
        method: provider,
        phone: phone.trim(),
      });
      chooseYouth(missionId, youthId);
      setProcessing(false);
      navigation.replace("MissionTracking", { missionId });
    }, 1200);
  };

  if (!mission || !youth) return null;

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={colors.dark} />
        </TouchableOpacity>
        <Text style={[typography.h2, { marginLeft: spacing.sm }]}>
          Paiement sécurisé
        </Text>
      </View>

      <KeyboardAwareScrollView
        contentContainerStyle={{
          padding: spacing.md,
          paddingBottom: spacing.xl,
        }}
        enableOnAndroid={true}
        extraScrollHeight={20}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <MaterialCommunityIcons
              name="account-circle"
              size={30}
              color={colors.primary}
            />
            <View style={{ marginLeft: spacing.sm }}>
              <Text style={styles.summaryName}>{youth.name}</Text>
              <Text style={styles.summaryMeta}>
                {mission.service} · {mission.zone}
              </Text>
            </View>
          </View>
        </View>

        <Text style={styles.label}>Montant convenu (FCFA)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex. 2 500"
          placeholderTextColor={colors.grayLight}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        <View style={styles.breakdownCard}>
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Montant total</Text>
            <Text style={styles.breakdownValue}>
              {numericAmount.toLocaleString("fr-FR")} F
            </Text>
          </View>
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>
              Frais de service ({Math.round(PLATFORM_COMMISSION_RATE * 100)}%)
            </Text>
            <Text style={styles.breakdownValueMuted}>
              − {commission.toLocaleString("fr-FR")} F
            </Text>
          </View>
          <View
            style={[
              styles.breakdownRow,
              {
                marginTop: 4,
                paddingTop: spacing.sm,
                borderTopWidth: 1,
                borderTopColor: colors.border,
              },
            ]}
          >
            <Text style={styles.breakdownLabelBold}>
              Reversé à {youth.name.split(" ")[0]}
            </Text>
            <Text style={styles.breakdownValueBold}>
              {youthShare.toLocaleString("fr-FR")} F
            </Text>
          </View>
        </View>

        <Text style={styles.label}>Moyen de paiement</Text>
        <View style={styles.providersRow}>
          {PROVIDERS.map((p) => {
            const active = provider === p.id;
            return (
              <TouchableOpacity
                key={p.id}
                style={[
                  styles.providerCard,
                  active && {
                    borderColor: p.color,
                    backgroundColor: `${p.color}14`,
                  },
                ]}
                onPress={() => setProvider(p.id)}
              >
                <View
                  style={[
                    styles.providerIconWrap,
                    { backgroundColor: p.color },
                  ]}
                >
                  <MaterialCommunityIcons
                    name={p.icon}
                    size={18}
                    color={colors.white}
                  />
                </View>
                <Text
                  style={[
                    styles.providerLabel,
                    active && { color: p.color, fontWeight: "800" },
                  ]}
                >
                  {p.label}
                </Text>
                {active && (
                  <Ionicons
                    name="checkmark-circle"
                    size={18}
                    color={p.color}
                    style={{ marginLeft: "auto" }}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.label}>Numéro Mobile Money</Text>
        <View style={styles.inputRow}>
          <Text style={styles.prefix}>+228</Text>
          <TextInput
            style={styles.phoneInput}
            placeholder="90 00 00 00"
            placeholderTextColor={colors.grayLight}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <View style={styles.escrowNote}>
          <MaterialCommunityIcons
            name="shield-lock-outline"
            size={16}
            color={colors.primary}
          />
          <Text style={styles.escrowNoteText}>
            Votre paiement est conservé en séquestre par Lɔlɔ̃dedefia Fe Do et
            n'est reversé au prestataire qu'une fois la mission terminée.
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.cta, (!canPay || processing) && styles.ctaDisabled]}
          disabled={!canPay || processing}
          onPress={submit}
        >
          {processing ? (
            <Text style={styles.ctaText}>Traitement du paiement...</Text>
          ) : (
            <Text style={styles.ctaText}>
              Payer {numericAmount.toLocaleString("fr-FR")} F en toute sécurité
            </Text>
          )}
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
  },
  summaryCard: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  summaryRow: { flexDirection: "row", alignItems: "center" },
  summaryName: { fontSize: 14, fontWeight: "700", color: colors.dark },
  summaryMeta: { fontSize: 12, color: colors.gray, marginTop: 2 },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.dark,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    height: 46,
    fontSize: 14,
    color: colors.dark,
  },
  breakdownCard: {
    backgroundColor: colors.primaryLight,
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.md,
  },
  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  breakdownLabel: { fontSize: 12, color: colors.gray },
  breakdownValue: { fontSize: 12, color: colors.dark, fontWeight: "600" },
  breakdownValueMuted: { fontSize: 12, color: colors.gray },
  breakdownLabelBold: { fontSize: 13, color: colors.dark, fontWeight: "700" },
  breakdownValueBold: {
    fontSize: 15,
    color: colors.primary,
    fontWeight: "800",
  },
  providersRow: { flexDirection: "row" },
  providerCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.sm,
    marginRight: spacing.sm,
  },
  providerIconWrap: {
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  providerLabel: { fontSize: 12, color: colors.dark, marginLeft: 8 },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    height: 46,
  },
  prefix: {
    fontSize: 14,
    color: colors.dark,
    marginRight: spacing.sm,
    fontWeight: "600",
  },
  phoneInput: { flex: 1, fontSize: 14, color: colors.dark },
  escrowNote: {
    flexDirection: "row",
    backgroundColor: colors.background,
    borderRadius: radius.md,
    padding: spacing.sm,
    marginTop: spacing.lg,
  },
  escrowNoteText: {
    fontSize: 11,
    color: colors.gray,
    marginLeft: 8,
    flex: 1,
    lineHeight: 16,
  },
  cta: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: radius.pill,
    alignItems: "center",
    marginTop: spacing.lg,
  },
  ctaDisabled: { backgroundColor: colors.grayLight },
  ctaText: { color: colors.white, fontWeight: "700", fontSize: 14 },
});
