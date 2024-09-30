const barList = [
  {
    name: "Barberousse", //
    link: "https://www.google.com/maps/place/Bar+Barberousse+Strasbourg/@48.5833789,7.7485925,17z/data=!3m1!4b1!4m6!3m5!1s0x4796c853f85e36d5:0x81e07432a30c96a7!8m2!3d48.5833755!4d7.7534634!16s%2Fg%2F11c6_n44y4?entry=ttu"
  },
  {
    name: "WAWA", //
    link: "https://www.google.com/maps/place/Wawa+Music+%26+Food/@48.5811945,7.7621825,15z/data=!4m6!3m5!1s0x4796c8ff02a99a57:0x67cef509666e2072!8m2!3d48.5811945!4d7.7621825!16s%2Fg%2F1ptxg2z3q?entry=ttu"
  },
  {
    name: "Jimmy's", //
    link: "https://www.google.com/maps/place/Jimmy's+Bar/@48.5809347,7.7495472,17z/data=!3m1!4b1!4m6!3m5!1s0x4796c854f35d0057:0x6df65a0cc849055!8m2!3d48.5809313!4d7.7544181!16s%2Fg%2F1th27bgr?entry=ttu"
  },
  {
    name: "Kooma Pub",
    link: "https://www.google.com/maps/place/Kooma+Pub/@48.5811258,7.755639,17z/data=!4m10!1m2!2m1!1skooma+strasbourg!3m6!1s0x4796c99ad142f997:0x483656e5bded2ed!8m2!3d48.5812828!4d7.7584817!15sChBrb29tYSBzdHJhc2JvdXJnWhIiEGtvb21hIHN0cmFzYm91cmeSAQNiYXLgAQA!16s%2Fg%2F11vqhcsjht?entry=ttu&g_ep=EgoyMDI0MDkxNi4wIKXMDSoASAFQAw%3D%3D"
  },
  {
    name: "Algorythme", //
    link: "https://www.google.com/maps/place/BAR+ALGORYTHME/@48.5787635,7.7562891,17z/data=!3m1!4b1!4m6!3m5!1s0x4796c8ffe3a73db3:0xd1025e9238635ff7!8m2!3d48.57876!4d7.758864!16s%2Fg%2F11c5zyl72z?entry=ttu"
  },
  {
    name: "21 shooter bar", //
    link: "https://www.google.com/maps/place/Le+21+ShooterBar/@48.5804462,7.755008,17z/data=!3m1!4b1!4m6!3m5!1s0x4796c85572bd96ed:0xed05be5911efbfad!8m2!3d48.5804427!4d7.7575829!16s%2Fg%2F11b781b451?entry=ttu"
  },
  {
    name: "Tamil", //
    link: "https://www.google.com/maps/place/Restaurant+Tamil/@48.5789279,7.7520696,16z/data=!3m1!5s0x4796c84d57e20c77:0x3fa08421bf3a6579!4m6!3m5!1s0x4796c931101717cd:0xa4c4b7ed54df5182!8m2!3d48.5799053!4d7.7463184!16s%2Fg%2F11fq9knwxp?entry=ttu"
  },
  {
    name: "Starling Burgers", //
    link: "https://www.google.com/maps/place/Starling+Burgers/@48.5831214,7.7404499,17z/data=!3m1!4b1!4m6!3m5!1s0x4796c97c3dfe855b:0x627b045436e9af38!8m2!3d48.5831179!4d7.7430248!16s%2Fg%2F11sdbfx9f1?entry=ttu"
  },
  {
    name: "Blue Moon", //
    link: "https://www.google.com/maps/place/Blue+Moon+Bar/@48.580644,7.7596661,15z/data=!4m2!3m1!1s0x0:0xb93338379b5ab11?sa=X&ved=2ahUKEwjG3t-DvruBAxVZV6QEHQFSBawQ_BJ6BAhUEAA&ved=2ahUKEwjG3t-DvruBAxVZV6QEHQFSBawQ_BJ6BAhsEAg"
  },
  {
    name: "Happy Hours", //
    link: "https://www.google.com/maps/place/Happy+Hours+-+Bar+Krutenau+Strasbourg/@48.578064,7.7575262,16.25z/data=!4m6!3m5!1s0x4796c8ffc244d073:0xb9ea22c77b00c0e!8m2!3d48.5791832!4d7.7602776!16s%2Fg%2F11f2sh6vpz?entry=ttu&g_ep=EgoyMDI0MDkxNi4wIKXMDSoASAFQAw%3D%3D"
  },
  {
    name: "The People Bar", //
    link: "https://www.google.fr/maps/place/The+People+Strasbourg/@48.5812647,7.7548254,17z/data=!4m9!3m8!1s0x4796c855a0e90db7:0xd5f66a5234d0c8f8!5m2!4m1!1i2!8m2!3d48.5812612!4d7.7574003!16s%2Fg%2F11lgks7_0c?entry=ttu&g_ep=EgoyMDI0MDkxNi4wIKXMDSoASAFQAw%3D%3D"
  },
  {
    name: "R Club", //
    link: "https://www.google.fr/maps/place/R+Club/@48.5830367,7.7369528,15.25z/data=!3m1!5s0x4796c8492e6d4ad5:0x7edf0a3ac8c9c1ec!4m6!3m5!1s0x4796c84eb7880741:0xe0cae965504c544b!8m2!3d48.5857723!4d7.7425662!16s%2Fg%2F1jgl_bgm6?entry=ttu&g_ep=EgoyMDI0MDkyNS4wIKXMDSoASAFQAw%3D%3D"
  },
  {
    name: "What the fox", //
    link: "https://www.google.fr/maps/place/What+the+Fox/@48.5795824,7.7447121,17z/data=!3m1!4b1!4m6!3m5!1s0x4796c85328ff71f1:0x7c341e2cf12dde2f!8m2!3d48.579579!4d7.749583!16s%2Fg%2F11bwg0h6zf?entry=ttu&g_ep=EgoyMDI0MDkxNi4wIKXMDSoASAFQAw%3D%3D"
  },
  {
    name: "Queen's Elisabeth", //
    link: "https://www.google.fr/maps/place/The+Queen+Elizabeth+English+Pub/@48.5795109,7.7553067,17z/data=!3m1!4b1!4m6!3m5!1s0x4796c839a743ee27:0xdd01411e5a46054c!8m2!3d48.5795074!4d7.7578816!16s%2Fg%2F1tgxg_s2?entry=ttu&g_ep=EgoyMDI0MDkxNi4wIKXMDSoASAFQAw%3D%3D"
  },
  {
    name: "Reserve 1862", //
    link: "https://www.google.fr/maps/place/R%C3%A9serve+1862/@48.5805113,7.7462222,17z/data=!3m1!4b1!4m6!3m5!1s0x4796c97aec115a07:0x413175d0931be535!8m2!3d48.5805078!4d7.7487971!16s%2Fg%2F11j15531xg?entry=ttu&g_ep=EgoyMDI0MDkxNi4wIKXMDSoASAFQAw%3D%3D"
  },
  {
    name: "Berthom", //
    link: "https://www.google.fr/maps/place/Les+Berthom/@48.5805113,7.7462222,17z/data=!4m14!1m7!3m6!1s0x4796c97aec115a07:0x413175d0931be535!2sR%C3%A9serve+1862!8m2!3d48.5805078!4d7.7487971!16s%2Fg%2F11j15531xg!3m5!1s0x4796c852de9a82bb:0xf66dad79c0af2985!8m2!3d48.5801964!4d7.7492142!16s%2Fg%2F1v3kl_yv?entry=ttu&g_ep=EgoyMDI0MDkxNi4wIKXMDSoASAFQAw%3D%3D"
  },
  {
    name: "Shloss", //
    link: "https://www.google.fr/maps/place/Brasserie+La+Schloss/@48.5806196,7.7440057,15.25z/data=!4m10!1m2!2m1!1sschloss+%C3%A0+proximit%C3%A9+de+Strasbourg!3m6!1s0x4796c8529900979b:0x1a9e2c127751b72c!8m2!3d48.5806781!4d7.7470648!15sCiNzY2hsb3NzIMOgIHByb3hpbWl0w6kgZGUgU3RyYXNib3VyZ1olIiNzY2hsb3NzIMOgIHByb3hpbWl0w6kgZGUgc3RyYXNib3VyZ5IBCnJlc3RhdXJhbnSaASRDaGREU1VoTk1HOW5TMFZKUTBGblNVUkhNM1JUWVdsblJSQULgAQA!16s%2Fg%2F1q5blcjwl?entry=ttu&g_ep=EgoyMDI0MDkxNi4wIKXMDSoASAFQAw%3D%3D"
  },
  {
    name: "Trolleybus", //
    link: "https://www.google.fr/maps/place/Le+Trolleybus/@48.5818909,7.7405877,17z/data=!3m1!4b1!4m6!3m5!1s0x4796c84d9f94e3d5:0xbbfcefb4df29b8ae!8m2!3d48.5818875!4d7.7454586!16s%2Fg%2F1vqmh99p?entry=ttu&g_ep=EgoyMDI0MDkxNi4wIKXMDSoASAFQAw%3D%3D"
  },
  {
    name: "Delirium café", //
    link: "https://www.google.fr/maps/place/Delirium+Caf%C3%A9/@48.5846863,7.7398673,16z/data=!3m2!4b1!5s0x4796c84c1dbcb9b1:0x8cc95e51ca70bb93!4m6!3m5!1s0x4796c84c1d430bf1:0x6d86f9bc1635704d!8m2!3d48.5846828!4d7.7424422!16s%2Fg%2F11g9sx2l3b?entry=ttu&g_ep=EgoyMDI0MDkxNi4wIKXMDSoASAFQAw%3D%3D"
  },
  {
    name: "Legends Bar", //
    link: "https://www.google.fr/maps/place/Bar+Legends+Strasbourg/@48.5836137,7.7522478,17z/data=!3m1!4b1!4m6!3m5!1s0x4796c9fea972b3c9:0x9a5e33f44f8acf71!8m2!3d48.5836102!4d7.7548227!16s%2Fg%2F11vkm7dwb7?entry=ttu&g_ep=EgoyMDI0MDkyNS4wIKXMDSoASAFQAw%3D%3D"
  },
  {
    name: "Jeannette et les Cycleux", //
    link: "https://www.google.fr/maps/place/Jeannette+et+les+Cycleux/@48.5807032,7.746244,17z/data=!3m1!4b1!4m6!3m5!1s0x4796c852ef2c1af7:0xd29bcea104b08510!8m2!3d48.5806997!4d7.7488189!16s%2Fg%2F1tdkqr87?entry=ttu&g_ep=EgoyMDI0MDkxNi4wIKXMDSoASAFQAw%3D%3D"
  },
  {
    name: "Smokey Monkey", //
    link: "https://www.google.fr/maps/place/Smokey+Monkey/@48.573647,7.7615263,17z/data=!3m1!4b1!4m6!3m5!1s0x4796c9e4d81f6309:0x8170e0ab6a2eb51c!8m2!3d48.5736436!4d7.7663972!16s%2Fg%2F11f3p0kszn?entry=ttu&g_ep=EgoyMDI0MDkxNi4wIKXMDSoASAFQAw%3D%3D"
  },
  {
    name: "Barco Latino", //
    link: "https://www.google.fr/maps/place/Barco+Latino/@48.5743935,7.7566977,15.5z/data=!4m6!3m5!1s0x4796c855dc42b531:0x708a226f3b7cf502!8m2!3d48.5740432!4d7.7610416!16s%2Fg%2F1tdshqpx?entry=ttu&g_ep=EgoyMDI0MDkxNi4wIKXMDSoASAFQAw%3D%3D"
  },
  {
    name: "Créchoir Café Bar", //
    link: "https://www.google.fr/maps/place/Cr%C3%A9choir+Caf%C3%A9+Bar/@48.5739565,7.7636152,17z/data=!3m1!4b1!4m6!3m5!1s0x4796c9b54aba8c81:0xf5c0f980b4480864!8m2!3d48.573953!4d7.7661901!16s%2Fg%2F11y3nsbxcq?entry=ttu&g_ep=EgoyMDI0MDkxNi4wIKXMDSoASAFQAw%3D%3D"
  },
  {
    name: "Au Coin des Craquelins", //
    link: "https://www.google.fr/maps/place/Au+Coin+des+Craquelins/@48.5770637,7.7558038,14.75z/data=!4m6!3m5!1s0x4796c8fffb3b8fa3:0x139bac1f380f8238!8m2!3d48.5788591!4d7.7592678!16s%2Fg%2F1tkl27xy?entry=ttu&g_ep=EgoyMDI0MDkyNS4wIKXMDSoASAFQAw%3D%3D"
  },
  {
    name: "Au Télégraphe", //
    link: "https://www.google.fr/maps/place/Brasserie+Au+T%C3%A9l%C3%A9graphe/@48.5790952,7.7563858,17z/data=!3m1!4b1!4m6!3m5!1s0x4796c8fff75730e7:0xc0b48238e650c2c5!8m2!3d48.5790917!4d7.7589607!16s%2Fg%2F1vm79dj5?entry=ttu&g_ep=EgoyMDI0MDkyNS4wIKXMDSoASAFQAw%3D%3D"
  },
]

export default barList;