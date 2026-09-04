import React, { createContext, useContext, useState } from "react";

const MissionsContext = createContext(null);

export const PLATFORM_COMMISSION_RATE = 0.05; // 5% association / 95% jeune

const SERVICE_COLORS = {
  "Garde d'enfants": "#0F5C33",
  Ménage: "#C9A227",
  Chauffeur: "#378ADD",
  "Aide aux aînés": "#D85A30",
  "Cours particuliers": "#7F77DD",
  Jardinage: "#639922",
  Bricolage: "#993C1D",
};
const FALLBACK_COLOR = "#888888";

const initialCandidates = [
  {
    id: "y1",
    name: "Ama Koffi",
    rating: 4.8,
    reviews: 32,
    badge: "Or",
    zone: "Adidogomé",
    skills: ["Garde d'enfants"],
    verified: true,
  },
  {
    id: "y2",
    name: "Kokou Mensah",
    rating: 4.6,
    reviews: 21,
    badge: "Argent",
    zone: "Adidogomé",
    skills: ["Ménage", "Garde d'enfants"],
    verified: true,
  },
  {
    id: "y3",
    name: "Yao Sena",
    rating: 4.9,
    reviews: 47,
    badge: "Diamant",
    zone: "Bè",
    skills: ["Chauffeur"],
    verified: true,
  },
];

// Une mission traverse les statuts suivants :
// "proposée" -> "en attente de confirmation" -> "acceptée" -> "en_cours" -> "terminée"
// Le paiement, lui, suit son propre cycle indépendant :
// aucun paiement -> "en séquestre" (dès que payMission() est appelée) -> "libéré" (dès que status devient "terminée")
const initialMissions = [
  {
    id: "m1",
    service: "Garde d'enfants",
    zone: "Adidogomé",
    date: "Aujourd'hui, 15h00",
    budget: "2 500 F",
    description:
      "Garder 2 enfants (5 et 8 ans) le temps d'une course, environ 2h.",
    status: "en attente de confirmation",
    youthId: "y2",
    familyEvaluated: false,
    youthEvaluated: false,
    checkIn: null,
    checkOut: null,
    scheduledDate: null,
    scheduledTime: null,
    color: SERVICE_COLORS["Garde d'enfants"],
    paymentAmount: null,
    paymentMethod: null,
    paymentPhone: null,
    paidAt: null,
  },
];

export function MissionsProvider({ children }) {
  const [candidates] = useState(initialCandidates);
  const [missions, setMissions] = useState(initialMissions);

  const createRequest = (data) => {
    const id = "m" + (missions.length + 1) + "_" + Date.now();
    const matched = candidates.filter(
      (c) => c.zone === data.zone || c.skills.includes(data.service)
    );
    const newMission = {
      id,
      ...data,
      status: "proposée",
      youthId: null,
      matched: matched.length ? matched : candidates,
      familyEvaluated: false,
      youthEvaluated: false,
      checkIn: null,
      checkOut: null,
      scheduledDate: data.scheduledDate || null,
      scheduledTime: data.scheduledTime || null,
      color: SERVICE_COLORS[data.service] || FALLBACK_COLOR,
      paymentAmount: null,
      paymentMethod: null,
      paymentPhone: null,
      paidAt: null,
    };
    setMissions((prev) => [newMission, ...prev]);
    return newMission;
  };

  const chooseYouth = (missionId, youthId) => {
    setMissions((prev) =>
      prev.map((m) =>
        m.id === missionId
          ? { ...m, youthId, status: "en attente de confirmation" }
          : m
      )
    );
  };

  // Enregistre le paiement en séquestre. Appelée juste avant chooseYouth
  // dans le parcours Famille (voir PaymentScreen.js).
  const payMission = (missionId, { amount, method, phone }) => {
    setMissions((prev) =>
      prev.map((m) =>
        m.id === missionId
          ? {
              ...m,
              paymentAmount: amount,
              paymentMethod: method,
              paymentPhone: phone,
              paidAt: new Date().toLocaleString("fr-FR"),
            }
          : m
      )
    );
  };

  const respondToMission = (missionId, accept) => {
    setMissions((prev) =>
      prev.map((m) =>
        m.id === missionId
          ? { ...m, status: accept ? "acceptée" : "refusée" }
          : m
      )
    );
  };

  const checkIn = (missionId) => {
    setMissions((prev) =>
      prev.map((m) =>
        m.id === missionId
          ? {
              ...m,
              status: "en_cours",
              checkIn: new Date().toLocaleTimeString(),
            }
          : m
      )
    );
  };

  // Le check-out termine la mission ET libère automatiquement le paiement
  // du séquestre vers le prestataire (le statut "terminée" fait office de
  // déclencheur de libération, voir getPaymentStatus ci-dessous).
  const checkOut = (missionId) => {
    setMissions((prev) =>
      prev.map((m) =>
        m.id === missionId
          ? {
              ...m,
              status: "terminée",
              checkOut: new Date().toLocaleTimeString(),
            }
          : m
      )
    );
  };

  const evaluate = (missionId, who) => {
    setMissions((prev) =>
      prev.map((m) =>
        m.id === missionId
          ? {
              ...m,
              [who === "family" ? "familyEvaluated" : "youthEvaluated"]: true,
            }
          : m
      )
    );
  };

  const getMissionById = (id) => missions.find((m) => m.id === id);

  const getScheduledEvents = () =>
    missions
      .filter((m) => m.scheduledDate)
      .map((m) => ({
        id: m.id,
        date: m.scheduledDate,
        color: m.color || FALLBACK_COLOR,
        label: m.service,
      }));

  // Calcule la répartition commission / prestataire pour un montant donné.
  const getPaymentBreakdown = (amount) => {
    const total = Number(amount) || 0;
    const commission = Math.round(total * PLATFORM_COMMISSION_RATE);
    const youthShare = total - commission;
    return { total, commission, youthShare };
  };

  // Statut d'affichage du paiement d'une mission :
  // "aucun" -> pas encore payé | "en_sequestre" -> payé, en attente de fin de mission | "libere" -> mission terminée
  const getPaymentStatus = (mission) => {
    if (!mission?.paymentAmount) return "aucun";
    return mission.status === "terminée" ? "libere" : "en_sequestre";
  };

  // Revenus du jeune : somme des parts (95%) déjà libérées (missions terminées)
  // et somme de ce qui est encore en séquestre (missions payées, pas encore terminées).
  const getYouthEarnings = (youthId) => {
    const own = missions.filter(
      (m) => m.youthId === youthId && m.paymentAmount
    );
    let released = 0;
    let inEscrow = 0;
    own.forEach((m) => {
      const { youthShare } = getPaymentBreakdown(m.paymentAmount);
      if (m.status === "terminée") released += youthShare;
      else inEscrow += youthShare;
    });
    return { released, inEscrow, total: released + inEscrow };
  };

  return (
    <MissionsContext.Provider
      value={{
        candidates,
        missions,
        createRequest,
        chooseYouth,
        payMission,
        respondToMission,
        checkIn,
        checkOut,
        evaluate,
        getMissionById,
        getScheduledEvents,
        getPaymentBreakdown,
        getPaymentStatus,
        getYouthEarnings,
      }}
    >
      {children}
    </MissionsContext.Provider>
  );
}

export const useMissions = () => useContext(MissionsContext);
