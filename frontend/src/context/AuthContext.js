import React, { createContext, useContext, useState } from "react";
import { api, setAuthToken } from "../api/apiClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const chooseRole = (r) => {
    setError(null);
    setRole(r);
  };

  const mapResponseToUser = (data) => ({
    id: data.userId,
    name: data.name,
    phone: data.phone,
    type: data.role === "FAMILY" ? "family" : "youth",
    zone: data.zone,
    skills: data.skills ? data.skills.split(",") : [],
    rating: data.rating,
    badge: data.badge,
  });

  const register = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.register(payload);
      setAuthToken(data.token);
      setUser(mapResponseToUser(data));
    } catch (e) {
      setError(e.message || "Impossible de créer le compte. Vérifiez votre connexion au serveur.");
    } finally {
      setLoading(false);
    }
  };

  const login = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.login(payload);
      setAuthToken(data.token);
      setUser(mapResponseToUser(data));
    } catch (e) {
      setError(e.message || "Impossible de se connecter. Vérifiez votre connexion au serveur.");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ role, user, error, loading, chooseRole, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);