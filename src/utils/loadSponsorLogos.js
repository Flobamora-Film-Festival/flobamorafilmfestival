// utils/loadSponsorLogos.js

export function loadSponsorLogos() {
  const context = import.meta.glob("../assets/sponsor/*.{png,jpg,jpeg,svg}", { eager: true });

  return Object.values(context).map((module) => module.default);
}
