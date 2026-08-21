import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [role, setRole] = useState(null); // "family" | "youth" | null
  const [phone, setPhone] = useState(null);
  const [user, setUser] = useState(null);

  const chooseRole = (r) => setRole(r);

  const login = (phoneNumber) => {
    setPhone(phoneNumber);
  };

  const confirmOtp = () => {
    // Simule la création/connexion du profil après validation du code reçu par SMS
    if (role === "family") {
      setUser({ name: "Famille Amétépé", phone, type: "family" });
    } else {
      setUser({
        id: "y2",
        name: "Kokou Mensah",
        phone,
        type: "youth",
        rating: 4.6,
        badge: "Argent",
        skills: ["Ménage", "Garde d'enfants"],
      });
    }
  };

  const logout = () => {
    setRole(null);
    setPhone(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ role, phone, user, chooseRole, login, confirmOtp, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
