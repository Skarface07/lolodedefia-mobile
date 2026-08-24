// Liste alphabétique des quartiers de Lomé
const lomeZones = [
  "Adakpamé", "Adidogomé", "Agbalépédogan", "Agbata", "Agoè",
  "Agoè-Nyivé", "Amoutivé", "Anfamé", "Attiegou", "Avédji",
  "Baguida", "Bè", "Bè-Kpota", "Cassablanca", "Djidjolé",
  "Dogbeavou", "Doulassamé", "Hédzranawoé", "Kagomé", "Klikamé",
  "Kodjoviakopé", "Kégué", "Lomé-Centre", "Nyékonakpoè", "Octaviano",
  "Ramco", "Tokoin", "Tokoin-Wuiti", "Totsi", "Zongo",
].sort((a, b) => a.localeCompare(b, "fr"));

export default lomeZones;