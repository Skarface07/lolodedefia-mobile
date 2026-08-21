import React, { createContext, useContext, useState } from "react";

const MissionsContext = createContext(null);

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

  return (
    <MissionsContext.Provider
      value={{ candidates, missions, createRequest, chooseYouth, respondToMission, checkIn, checkOut, evaluate, getMissionById }}
    >
      {children}
    </MissionsContext.Provider>
  );
}

export const useMissions = () => useContext(MissionsContext);
