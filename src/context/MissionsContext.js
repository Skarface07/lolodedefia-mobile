import React, { createContext, useContext, useState } from "react";

const MissionsContext = createContext(null);

const SERVICE_COLORS = {
  "Garde d'enfants": "#0F5C33",
  "Ménage": "#C9A227",
  "Chauffeur": "#378ADD",
  "Aide aux aînés": "#D85A30",
  "Cours particuliers": "#7F77DD",
  "Jardinage": "#639922",
  "Bricolage": "#993C1D",
};
const FALLBACK_COLOR = "#888888";

const initialCandidates = [
  { id: "y1", name: "Ama Koffi", rating: 4.8, reviews: 32, badge: "Or", zone: "Adidogomé", skills: ["Garde d'enfants"], verified: true },
  { id: "y2", name: "Kokou Mensah", rating: 4.6, reviews: 21, badge: "Argent", zone: "Adidogomé", skills: ["Ménage", "Garde d'enfants"], verified: true },
  { id: "y3", name: "Yao Sena", rating: 4.9, reviews: 47, badge: "Diamant", zone: "Bè", skills: ["Chauffeur"], verified: true },
];

// Une mission traverse les statuts suivants :
// "proposée" -> "acceptée" -> "en_route" -> "en_cours" -> "terminée"
const initialMissions = [
  {
    id: "m1",
    service: "Garde d'enfants",
    zone: "Adidogomé",
    date: "Aujourd'hui, 15h00",
    budget: "2 500 F",
    description: "Garder 2 enfants (5 et 8 ans) le temps d'une course, environ 2h.",
    status: "en attente de confirmation",
    youthId: "y2",
    familyEvaluated: false,
    youthEvaluated: false,
    checkIn: null,
    checkOut: null,
    scheduledDate: null,
    scheduledTime: null,
    color: SERVICE_COLORS["Garde d'enfants"],
  },
];

export function MissionsProvider({ children }) {
  const [candidates] = useState(initialCandidates);
  const [missions, setMissions] = useState(initialMissions);

  const createRequest = (data) => {
    const id = "m" + (missions.length + 1) + "_" + Date.now();
    const matched = candidates.filter((c) => c.zone === data.zone || c.skills.includes(data.service));
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
    };
    setMissions((prev) => [newMission, ...prev]);
    return newMission;
  };

  const chooseYouth = (missionId, youthId) => {
    setMissions((prev) =>
      prev.map((m) => (m.id === missionId ? { ...m, youthId, status: "en attente de confirmation" } : m))
    );
  };

  const respondToMission = (missionId, accept) => {
    setMissions((prev) =>
      prev.map((m) =>
        m.id === missionId ? { ...m, status: accept ? "acceptée" : "refusée" } : m
      )
    );
  };

  const checkIn = (missionId) => {
    setMissions((prev) =>
      prev.map((m) =>
        m.id === missionId ? { ...m, status: "en_cours", checkIn: new Date().toLocaleTimeString() } : m
      )
    );
  };

  const checkOut = (missionId) => {
    setMissions((prev) =>
      prev.map((m) =>
        m.id === missionId ? { ...m, status: "terminée", checkOut: new Date().toLocaleTimeString() } : m
      )
    );
  };

  const evaluate = (missionId, who) => {
    setMissions((prev) =>
      prev.map((m) =>
        m.id === missionId
          ? { ...m, [who === "family" ? "familyEvaluated" : "youthEvaluated"]: true }
          : m
      )
    );
  };

  const getMissionById = (id) => missions.find((m) => m.id === id);

  // Retourne uniquement les missions ayant une date planifiée, formatées
  // pour être consommées directement par le composant MonthCalendar.
  const getScheduledEvents = () =>
    missions
      .filter((m) => m.scheduledDate)
      .map((m) => ({
        id: m.id,
        date: m.scheduledDate,
        color: m.color || FALLBACK_COLOR,
        label: m.service,
      }));

  return (
    <MissionsContext.Provider
      value={{
        candidates,
        missions,
        createRequest,
        chooseYouth,
        respondToMission,
        checkIn,
        checkOut,
        evaluate,
        getMissionById,
        getScheduledEvents,
      }}
    >
      {children}
    </MissionsContext.Provider>
  );
}

export const useMissions = () => useContext(MissionsContext);