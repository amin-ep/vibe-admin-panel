export const AUTH_TOKEN_KEY = "c5e95ff7-2624-495b-937d-027c09474f85";
export const THEME_KEY = "VIBE-ADMIN-PANEL-THEME";
export const API_BASE_URL = "http://localhost:8000/api/v1";
export const FILE_BASE_URL = "http://localhost:8000/static/";
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Genre = {
  imageUrl: string;
  title: string;
  bgColorCode: string;
  textColorCode: string;
};

export const genresArr: Genre[] = [
  {
    title: "pop",
    imageUrl: "/icons/music-pop-icon.svg",
    bgColorCode: "#ffb6c1",
    textColorCode: "#6a1b1b",
  },
  {
    title: "rock",
    imageUrl: "/icons/music-rock-icon.svg",
    bgColorCode: "#9e9e9e",
    textColorCode: "#1b1b1b",
  },
  {
    title: "hip hop",
    imageUrl: "/icons/music-hiphop-icon.svg",
    bgColorCode: "#ffd54f",
    textColorCode: "#4e342e",
  },
  {
    title: "rap",
    imageUrl: "/icons/music-rap-icon.svg",
    bgColorCode: "#333333",
    textColorCode: "#ffffff",
  },
  {
    title: "r&b",
    imageUrl: "/icons/music-r&b-icon.svg",
    bgColorCode: "#ce93d8",
    textColorCode: "#4a148c",
  },
  {
    title: "jazz",
    imageUrl: "/icons/music-jazz-icon.svg",
    bgColorCode: "#81d4fa",
    textColorCode: "#01579b",
  },
  {
    title: "country",
    imageUrl: "/icons/music-country-icon.svg",
    bgColorCode: "#d7ccc8",
    textColorCode: "#4e342e",
  },
  {
    title: "electronic",
    imageUrl: "/icons/music-electronic-icon.svg",
    bgColorCode: "#00bcd4",
    textColorCode: "#004d40",
  },
  {
    title: "classical",
    imageUrl: "/icons/music-classical-icon.svg",
    bgColorCode: "#f5f5dc",
    textColorCode: "#3e3e3e",
  },
  {
    title: "reggae",
    imageUrl: "/icons/music-reggae-icon.svg",
    bgColorCode: "#c5e1a5",
    textColorCode: "#33691e",
  },
  {
    title: "metal",
    imageUrl: "/icons/music-metal-icon.svg",
    bgColorCode: "#b0bec5",
    textColorCode: "#212121",
  },
  {
    title: "edm",
    imageUrl: "/icons/music-edm-icon.svg",
    bgColorCode: "#4dd0e1",
    textColorCode: "#004d40",
  },
];
export const categoriesArr: CategoryObject[] = [
  { title: "chill", bgColorCode: "#D4EFFB", textColorCode: "#000000" },
  { title: "energetic", bgColorCode: "#FFB67A", textColorCode: "#000000" },
  { title: "workout", bgColorCode: "#FF8A66", textColorCode: "#000000" },
  { title: "party", bgColorCode: "#D75C66", textColorCode: "#FFFFFF" },
  { title: "study", bgColorCode: "#A29BFE", textColorCode: "#FFFFFF" },
  { title: "sleep", bgColorCode: "#A9D4FB", textColorCode: "#000000" },
  { title: "romantic", bgColorCode: "#FF9DA9", textColorCode: "#000000" },
  { title: "sad", bgColorCode: "#B0BEC9", textColorCode: "#000000" },
  { title: "happy", bgColorCode: "#FAE588", textColorCode: "#000000" },
  { title: "uplifting", bgColorCode: "#7BE1DE", textColorCode: "#000000" },
  { title: "dark", bgColorCode: "#4B5253", textColorCode: "#FFFFFF" },
  { title: "melancholic", bgColorCode: "#9BA2A5", textColorCode: "#000000" },
  { title: "relaxing", bgColorCode: "#B2F1F1", textColorCode: "#000000" },
  { title: "hype", bgColorCode: "#F98DBA", textColorCode: "#000000" },
  { title: "epic", bgColorCode: "#96456E", textColorCode: "#FFFFFF" },
  { title: "cinematic", bgColorCode: "#5E4B9C", textColorCode: "#FFFFFF" },
  { title: "morning", bgColorCode: "#FFF2CD", textColorCode: "#000000" },
  { title: "night", bgColorCode: "#3C348C", textColorCode: "#FFFFFF" },
  { title: "rainy day", bgColorCode: "#A9D4FB", textColorCode: "#000000" },
  { title: "road trip", bgColorCode: "#FFD4C7", textColorCode: "#000000" },
  { title: "driving", bgColorCode: "#A9F7E4", textColorCode: "#000000" },
  { title: "throwback", bgColorCode: "#C4BDFF", textColorCode: "#000000" },
  { title: "80s", bgColorCode: "#FABEEE", textColorCode: "#000000" },
  { title: "90s", bgColorCode: "#FFD2F6", textColorCode: "#000000" },
  { title: "2000s", bgColorCode: "#FEE8B2", textColorCode: "#000000" },
  { title: "2010s", bgColorCode: "#A5F2F2", textColorCode: "#000000" },
  { title: "2020s", bgColorCode: "#92EDD2", textColorCode: "#000000" },
  { title: "viral", bgColorCode: "#F66A5A", textColorCode: "#FFFFFF" },
  { title: "trending", bgColorCode: "#73C6F1", textColorCode: "#000000" },
  { title: "new release", bgColorCode: "#80E8C3", textColorCode: "#000000" },
  { title: "classic", bgColorCode: "#8A99A5", textColorCode: "#000000" },
  { title: "acoustic", bgColorCode: "#FFF0B8", textColorCode: "#000000" },
  { title: "instrumental", bgColorCode: "#B5F6CE", textColorCode: "#000000" },
  { title: "cover", bgColorCode: "#FFE07A", textColorCode: "#000000" },
  { title: "remix", bgColorCode: "#FFA589", textColorCode: "#000000" },
  { title: "mashup", bgColorCode: "#FFA9A9", textColorCode: "#000000" },
  { title: "live", bgColorCode: "#4869B3", textColorCode: "#FFFFFF" },
  { title: "danceable", bgColorCode: "#FCE0CB", textColorCode: "#000000" },
  { title: "background", bgColorCode: "#F1FCFD", textColorCode: "#000000" },
  { title: "motivational", bgColorCode: "#FFF3B2", textColorCode: "#000000" },
  { title: "emotional", bgColorCode: "#D96DAD", textColorCode: "#000000" },
  { title: "heartbreak", bgColorCode: "#D8E2B3", textColorCode: "#000000" },
  { title: "love", bgColorCode: "#FABEEE", textColorCode: "#000000" },
  { title: "breakup", bgColorCode: "#E5F6A3", textColorCode: "#000000" },
  { title: "summer", bgColorCode: "#FFD18C", textColorCode: "#000000" },
  { title: "winter", bgColorCode: "#E4ECF3", textColorCode: "#000000" },
  { title: "spring", bgColorCode: "#A9F7E4", textColorCode: "#000000" },
  { title: "autumn", bgColorCode: "#FFAD7D", textColorCode: "#000000" },
  { title: "gaming", bgColorCode: "#A5A0DD", textColorCode: "#FFFFFF" },
  { title: "focus", bgColorCode: "#92EDD2", textColorCode: "#000000" },
  { title: "meditation", bgColorCode: "#66D6BA", textColorCode: "#000000" },
];
