const barList = [
  {
    name: "WAWA",
    link: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2639.496347865903!2d7.759602212471312!3d48.5811944711761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4796c8ff02a99a57%3A0x67cef509666e2072!2sWawa%20Music%20%26%20Food!5e0!3m2!1sfr!2s!4v1755977378538!5m2!1sfr!2s",
    drinks: [
      { name: "Bière blonde", price: "5€" },
      { name: "Vin rouge", price: "4€" },
      { name: "Cocktail maison", price: "8€" },
    ],
    image: "https://picsum.photos/seed/wawa/400/300",
  },
  {
    name: "Barberousse",
    link: "https://www.google.com/maps/place/Bar+Barberousse+Strasbourg/@48.578998,7.750967,17z/data=!3m1!4b1!4m6!3m5!1s0x4796c84f4b27c21b:0x92f4c1b57d45bcd6!8m2!3d48.578998!4d7.7535419!16s%2Fg%2F11c5h93rdt",
    drinks: [
      { name: "Bière blonde", price: "5€" },
      { name: "Vin rouge", price: "4€" },
      { name: "Cocktail maison", price: "8€" },
    ],
    image: "https://picsum.photos/seed/barberousse/400/300",
  },
  {
    name: "Jimmy's",
    link: "https://www.google.com/maps/place/Jimmy's+Bar/@48.581089,7.752421,17z",
    drinks: [
      { name: "Bière blonde", price: "5€" },
      { name: "Vin rouge", price: "4€" },
      { name: "Cocktail maison", price: "8€" },
    ],
    image: "https://picsum.photos/seed/jimmys/400/300",
  },
  {
    name: "Algorythme",
    link: "https://www.google.com/maps/place/BAR+ALGORYTHME/@48.579092,7.751611,17z",
    drinks: [
      { name: "Bière blonde", price: "5€" },
      { name: "Vin rouge", price: "4€" },
      { name: "Cocktail maison", price: "8€" },
    ],
    image: "https://picsum.photos/seed/algorythme/400/300",
  },
  {
    name: "21 shooter bar",
    link: "https://www.google.com/maps/place/Le+21+ShooterBar/@48.578481,7.752803,17z",
    drinks: [
      { name: "Bière blonde", price: "5€" },
      { name: "Vin rouge", price: "4€" },
      { name: "Cocktail maison", price: "8€" },
    ],
    image: "https://picsum.photos/seed/shooterbar/400/300",
  },
  {
    name: "Tempête",
    link: "https://www.google.com/maps/place/Temp%C3%AAte/@48.581364,7.753799,17z",
    drinks: [
      { name: "Bière blonde", price: "5€" },
      { name: "Vin rouge", price: "4€" },
      { name: "Cocktail maison", price: "8€" },
    ],
    image: "https://picsum.photos/seed/tempete/400/300",
  },
  {
    name: "Tamil",
    link: "https://www.google.com/maps/place/Restaurant+Tamil/@48.580009,7.756101,17z",
    drinks: [
      { name: "Bière blonde", price: "5€" },
      { name: "Vin rouge", price: "4€" },
      { name: "Cocktail maison", price: "8€" },
    ],
    image: "https://picsum.photos/seed/tamil/400/300",
  },
  {
    name: "Starling Burgers",
    link: "https://www.google.com/maps/place/Starling+Burgers/@48.582013,7.754911,17z",
    drinks: ["Milkshakes - XXX €", "Bières pression - XXX €"],
    image: "https://picsum.photos/seed/starling/400/300",
  },
  {
    name: "Blue Moon",
    link: "https://www.google.com/maps/place/Blue+Moon+Bar/@48.583742,7.757421,17z",
    drinks: ["Cocktails bleus - XXX €", "Tequila - XXX €"],
    image: "https://picsum.photos/seed/bluemoon/400/300",
  },
  {
    name: "Happy Hours",
    link: "https://www.google.com/maps/place/Happy+Hours+-+Bar+Krutenau+Strasbourg/@48.578624,7.754612,17z",
    drinks: [
      { name: "Bière blonde", price: "5€" },
      { name: "Vin rouge", price: "4€" },
      { name: "Cocktail maison", price: "8€" },
    ],
    image: "https://picsum.photos/seed/happyhours/400/300",
  },
  {
    name: "The Spot",
    link: "https://www.google.com/maps/place/Le+Spot/@48.582013,7.752721,17z",
    drinks: [
      { name: "Bière blonde", price: "5€" },
      { name: "Vin rouge", price: "4€" },
      { name: "Cocktail maison", price: "8€" },
    ],
    image: "https://picsum.photos/seed/thespot/400/300",
  },
  {
    name: "The People Bar",
    link: "https://www.google.com/maps/place/The+People+Strasbourg/@48.586232,7.743611,17z",
    drinks: [
      { name: "Bière blonde", price: "5€" },
      { name: "Vin rouge", price: "4€" },
      { name: "Cocktail maison", price: "8€" },
    ],
    image: "https://picsum.photos/seed/peoplebar/400/300",
  },
  {
    name: "Legends Bar",
    link: "https://www.google.com/maps/place/Bar+Legends+Strasbourg/@48.577331,7.753288,17z",
    drinks: [
      { name: "Bière blonde", price: "5€" },
      { name: "Vin rouge", price: "4€" },
      { name: "Cocktail maison", price: "8€" },
    ],
    image: "https://picsum.photos/seed/legends/400/300",
  },
  {
    name: "Kebs baba",
    link: "https://www.google.com/maps/place/KEBS+BABA+KRUTENAU/@48.579099,7.755761,17z",
    drinks: [
      { name: "Bière blonde", price: "5€" },
      { name: "Vin rouge", price: "4€" },
      { name: "Cocktail maison", price: "8€" },
    ],
    image: "https://picsum.photos/seed/kebsbaba/400/300",
  },
  {
    name: "Queen's Elisabeth",
    link: "https://www.google.com/maps/place/The+Queen+Elizabeth+English+Pub/@48.585401,7.748111,17z",
    drinks: [
      { name: "Bière blonde", price: "5€" },
      { name: "Vin rouge", price: "4€" },
      { name: "Cocktail maison", price: "8€" },
    ],
    image: "https://picsum.photos/seed/queen/400/300",
  },
  {
    name: "Au Télégraphe",
    link: "https://www.google.com/maps/place/Brasserie+Au+T%C3%A9l%C3%A9graphe/@48.584118,7.747821,17z",
    drinks: [
      { name: "Bière blonde", price: "5€" },
      { name: "Vin rouge", price: "4€" },
      { name: "Cocktail maison", price: "8€" },
    ],
    image: "https://picsum.photos/seed/telegaphe/400/300",
  },
  {
    name: "Delirium café",
    link: "https://www.google.com/maps/place/Delirium+Caf%C3%A9/@48.583311,7.746999,17z",
    drinks: [
      { name: "Bière blonde", price: "5€" },
      { name: "Vin rouge", price: "4€" },
      { name: "Cocktail maison", price: "8€" },
    ],
    image: "https://picsum.photos/seed/delirium/400/300",
  },
  {
    name: "Réserve 1862",
    link: "https://www.google.com/maps/place/R%C3%A9serve+1862/@48.582001,7.745611,17z",
    drinks: [
      { name: "Bière blonde", price: "5€" },
      { name: "Vin rouge", price: "4€" },
      { name: "Cocktail maison", price: "8€" },
    ],
    image: "https://picsum.photos/seed/reserve1862/400/300",
  },
  {
    name: "Créchoir Café Bar",
    link: "https://www.google.com/maps/place/Cr%C3%A9choir+Caf%C3%A9+Bar/@48.581651,7.744218,17z",
    drinks: [
      { name: "Bière blonde", price: "5€" },
      { name: "Vin rouge", price: "4€" },
      { name: "Cocktail maison", price: "8€" },
    ],
    image: "https://picsum.photos/seed/crechoir/400/300",
  },
];

export default barList;
