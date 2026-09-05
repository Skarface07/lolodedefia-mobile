// ⚠️ Remplace cette IP par l'adresse IP locale de TON ordinateur sur le
// réseau Wi-Fi (tape "ipconfig" dans un terminal, cherche "Adresse IPv4").
const API_BASE_URL = "http://192.168.1.76:8080/api";

let authToken = null;

export function setAuthToken(token) {
  authToken = token;
}

async function request(path, options = {}) {
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  if (authToken) headers.Authorization = `Bearer ${authToken}`;

  const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(typeof data === "string" ? data : data?.message || "Erreur serveur");
  }
  return data;
}

export const api = {
  register: (payload) => request("/auth/register", { method: "POST", body: JSON.stringify(payload) }),
  login: (payload) => request("/auth/login", { method: "POST", body: JSON.stringify(payload) }),
  getMissions: () => request("/missions"),
  createMission: (payload) => request("/missions", { method: "POST", body: JSON.stringify(payload) }),
  chooseYouth: (missionId, youthId) => request(`/missions/${missionId}/choose-youth`, { method: "POST", body: JSON.stringify({ youthId }) }),
  pay: (missionId, payload) => request(`/missions/${missionId}/pay`, { method: "POST", body: JSON.stringify(payload) }),
  respond: (missionId, accept) => request(`/missions/${missionId}/respond`, { method: "POST", body: JSON.stringify({ accept }) }),
  checkIn: (missionId) => request(`/missions/${missionId}/checkin`, { method: "POST" }),
  checkOut: (missionId) => request(`/missions/${missionId}/checkout`, { method: "POST" }),
  evaluate: (missionId, who) => request(`/missions/${missionId}/evaluate`, { method: "POST", body: JSON.stringify({ who }) }),
  getYouths: () => request("/users/youths"),
};