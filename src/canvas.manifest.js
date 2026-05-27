export const manifest = {
  screens: {
    scr_psxd51: { name: "Home", route: "/", position: { "x": 160, "y": 2200 } },
    scr_85s5xg: { name: "Feed", route: "/feed", position: { "x": 1560, "y": 2200 } },
    scr_ted7or: { name: "Product Detail", route: "/product/1", position: { "x": 2960, "y": 2200 } },
    scr_a8kdq4: { name: "Profile", route: "/profile/sofia", position: { "x": 160, "y": 4180 } },
    scr_s7s35z: { name: "Upload", route: "/upload", position: { "x": 1560, "y": 4180 } },
    scr_ejy0db: { name: "Chat List", route: "/chat", position: { "x": 160, "y": 6160 } },
    scr_4t2q0b: { name: "Chat Thread", route: "/chat/1", position: { "x": 1560, "y": 6160 } },
    scr_t10icq: { name: "Auth", route: "/auth", position: { "x": 160, "y": 220 } },
    scr_v43ayf: { name: "Onboarding", route: "/onboarding", position: { "x": 1560, "y": 220 } },
    scr_68hrrj: { name: "Favorites", route: "/favorites", position: { "x": 4360, "y": 2200 } }
  },
  sections: {
    sec_wrxrcb: { name: "Auth & Onboarding", x: 0, y: 0, width: 2920, height: 1180 },
    sec_zii1hw: { name: "Discovery & Browse", x: 0, y: 1980, width: 5720, height: 1180 },
    sec_zvj22t: { name: "User Profile", x: 0, y: 3960, width: 2920, height: 1180 },
    sec_7zsu6r: { name: "Messaging", x: 0, y: 5940, width: 2920, height: 1180 }
  },
  layers: [
  { kind: "section", id: "sec_wrxrcb", children: [
    { kind: "screen", id: "scr_t10icq" },
    { kind: "screen", id: "scr_v43ayf" }]
  },
  { kind: "section", id: "sec_zii1hw", children: [
    { kind: "screen", id: "scr_psxd51" },
    { kind: "screen", id: "scr_85s5xg" },
    { kind: "screen", id: "scr_ted7or" },
    { kind: "screen", id: "scr_68hrrj" }]
  },
  { kind: "section", id: "sec_zvj22t", children: [
    { kind: "screen", id: "scr_a8kdq4" },
    { kind: "screen", id: "scr_s7s35z" }]
  },
  { kind: "section", id: "sec_7zsu6r", children: [
    { kind: "screen", id: "scr_ejy0db" },
    { kind: "screen", id: "scr_4t2q0b" }]
  }]

};