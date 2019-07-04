const mainObject = {

  /*block of dead end points*/

  UntenLinks: {
    id: 7,
    type: 'lastEl',
    name: "UntenLinks",
    nextShownElement: "firstBlock",
    optionName: "Unten Links"
  },

  ObenLinks: {
    id: 7,
    type: 'lastEl',
    name: "ObenLinks",
    nextShownElement: "firstBlock",
    optionName: "Oben Links"
  },

  UntenRechts: {
    id: 7,
    type: 'lastEl',
    name: "UntenRechts",
    nextShownElement: "firstBlock",
    optionName: "Unten Rechts"
  },

  ObenRechts: {
    id: 7,
    type: 'lastEl',
    name: "ObenRechts",
    nextShownElement: "firstBlock",
    optionName: "Oben Rechts"
  },

  chiplageRfIdHybrid: {
    id: 6,
    type: 'select',
    appendTo: "#wrapper",
    name: "chiplageRfIdHybrid",
    nextShownElement: "firstBlock",
    options: ["ObenRechts", "UntenRechts", "ObenLinks", "UntenLinks", "individualChiplageRfidHybrid"],
    labelName: "Chiplage"
  },

  individualChiplageRfidHybrid: {
    id: 7,
    type: "block",
    appendTo: "#wrapper",
    name: "individualChiplageRfidHybrid",
    nextShownElement: "firstBlock",
    options: ["individualChiplageRfidHybridBreite", "individualChiplageRfidHybridHöhe", "individualChiplageRfidHybridPositionX", "individualChiplageRfidHybridPositionY"],
    optionName: "Individuelle Chiplage",
    labelName: "Individuelle Chiplage"
  },

  hitagMIT24450: {
    id: 4,
    type: 'lastEl',
    name: "hitagMIT24450",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "HITAG 2 mit EM4450"
  },

  hitagMIT24102: {
    id: 4,
    type: 'lastEl',
    name: "hitagMIT24102",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "HITAG 2 mit EM4200 (EM4102)"
  },

  hitagMIT14450: {
    id: 4,
    type: 'lastEl',
    name: "hitagMIT14450",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "HITAG 1 mit EM4450"
  },

  hitagMIT14102: {
    id: 4,
    type: 'lastEl',
    name: "hitagMIT14102",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "HITAG 1 mit EM4200 (EM4102)"
  },

  mifareDESFire4kInduktiv: {
    id: 5,
    type: 'lastEl',
    name: "mifareDESFire4kInduktiv",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "MIFARE DESFire EV1 4K mit Induktiv, Kartenstärke ca. 1mm"
  },

  mifareDESFire4kSupertagUHFmonza: {
    id: 5,
    type: 'lastEl',
    name: "mifareDESFire4kSupertagUHFmonza",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "MIFARE DESFire EV1 4K V05 70pF Supertag mit UHF Monza 3 (Monza 4, 5, Gen 2)"
  },

  mifareDESFire4kSupertagAtmel: {
    id: 5,
    type: 'lastEl',
    name: "mifareDESFire4kSupertagAtmel",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "MIFARE DESFire EV1 4K V05 70pF Supertag mit Atmel (Temic, Q5) 5577"
  },

  mifareDESFire4kSupertagProx125: {
    id: 5,
    type: 'lastEl',
    name: "mifareDESFire4kSupertagProx125",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "MIFARE DESFire EV1 4K V05 70pF Supertag mit Prox 125 kHz / 26 bit (34, 35, 36, 37)"
  },

  mifareDESFire4kSupertagICode: {
    id: 5,
    type: 'lastEl',
    name: "mifareDESFire4kSupertagICode",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "MIFARE DESFire EV1 4K V05 70pF Supertag mit I-Code SLI S20"
  },

  mifareDESFire4kSupertagEM4200codiert: {
    id: 5,
    type: 'lastEl',
    name: "mifareDESFire4kSupertagEM4200codiert",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "MIFARE DESFire EV1 4K V05 70pF Supertag mit EM4200 (EM4102) 0F-codiert"
  },

  mifareDESFire4kSupertagEM4450: {
    id: 5,
    type: 'lastEl',
    name: "mifareDESFire4kSupertagEM4450",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "MIFARE DESFire EV1 4K V05 70pF Supertag mit EM4450"
  },

  mifareDESFire4kSupertagEM4200: {
    id: 5,
    type: 'lastEl',
    name: "mifareDESFire4kSupertagEM4200",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "MIFARE DESFire EV1 4K V05 70pF Supertag mit EM4200 (EM4102)"
  },

  mifareDESFire4kSupertagS: {
    id: 5,
    type: 'lastEl',
    name: "mifareDESFire4kSupertagS",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "MIFARE DESFire EV1 4K V05 70pF Supertag mit HITAG S 2048 bit"
  },

  mifareDESFire4kSupertag2: {
    id: 5,
    type: 'lastEl',
    name: "mifareDESFire4kSupertag2",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "MIFARE DESFire EV1 4K V05 70pF Supertag mit HITAG 2"
  },

  mifareDESFire4kSupertag1: {
    id: 5,
    type: 'lastEl',
    name: "mifareDESFire4kSupertag1",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "MIFARE DESFire EV1 4K V05 70pF Supertag mit HITAG 1"
  },

  mifareDESFire4kSupertagMifareClassic: {
    id: 5,
    type: 'lastEl',
    name: "mifareDESFire4kSupertagMifareClassic",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "MIFARE DESFire EV1 4K V05 70pF Supertag mit MIFARE Classic EV1 4K"
  },

  mifareDESFire4kMifareClassic: {
    id: 5,
    type: 'lastEl',
    name: "mifareDESFire4kMifareClassic",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "MIFARE DESFire EV1 4K mit MIFARE Classic EV1 1K"
  },

  mifareDESFire8kInduktiv: {
    id: 5,
    type: 'lastEl',
    name: "mifareDESFire8kInduktiv",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "MIFARE DESFire EV1 8K mit Induktiv, Kartenstärke ca. 1mm"
  },

  mifareDESFire8kSupertagUHFmonza: {
    id: 5,
    type: 'lastEl',
    name: "mifareDESFire8kSupertagUHFmonza",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "MIFARE DESFire EV1 8K V05 70pF Supertag mit UHF Monza 3 (Monza 4, 5, Gen 2)"
  },

  mifareDESFire8kSupertagAtmel: {
    id: 5,
    type: 'lastEl',
    name: "mifareDESFire8kSupertagAtmel",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "MIFARE DESFire EV1 8K V05 70pF Supertag mit Atmel (Temic, Q5) 5577"
  },

  mifareDESFire8kSupertagProx125: {
    id: 5,
    type: 'lastEl',
    name: "mifareDESFire8kSupertagProx125",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "MIFARE DESFire EV1 8K V05 70pF Supertag mit Prox 125 kHz / 26 bit (34, 35, 36, 37)"
  },

  mifareDESFire8kSupertagICode: {
    id: 5,
    type: 'lastEl',
    name: "mifareDESFire8kSupertagICode",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "MIFARE DESFire EV1 8K V05 70pF Supertag mit I-Code SLI S20"
  },

  mifareDESFire8kSupertagEM4200codiert: {
    id: 5,
    type: 'lastEl',
    name: "mifareDESFire8kSupertagEM4200codiert",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "MIFARE DESFire EV1 8K V05 70pF Supertag mit EM4200 (EM4102) 0F-codiert"
  },

  mifareDESFire8kSupertagEM4450: {
    id: 5,
    type: 'lastEl',
    name: "mifareDESFire8kSupertagEM4450",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "MIFARE DESFire EV1 8K V05 70pF Supertag mit EM4450"
  },

  mifareDESFire8kSupertagEM4200: {
    id: 5,
    type: 'lastEl',
    name: "mifareDESFire8kSupertagEM4200",
    optionName: "MIFARE DESFire EV1 8K V05 70pF Supertag mit EM4200 (EM4102)"
  },

  mifareDESFire8kSupertagS: {
    id: 5,
    type: 'lastEl',
    name: "mifareDESFire8kSupertagS",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "MIFARE DESFire EV1 8K V05 70pF Supertag mit HITAG S 2048 bit"
  },

  mifareDESFire8kSupertag2: {
    id: 5,
    type: 'lastEl',
    name: "mifareDESFire8kSupertag2",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "MIFARE DESFire EV1 8K V05 70pF Supertag mit HITAG 2"
  },

  mifareDESFire8kSupertag1: {
    id: 5,
    type: 'lastEl',
    name: "mifareDESFire8kSupertag1",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "MIFARE DESFire EV1 8K V05 70pF Supertag mit HITAG 1"
  },

  mifareDESFire8kSupertagMifareClassic: {
    id: 5,
    type: 'lastEl',
    name: "mifareDESFire8kSupertagMifareClassic",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "MIFARE DESFire EV1 8K V05 70pF Supertag mit MIFARE Classic EV1 4K"
  },

  mifareDESFire8kMifareClassic: {
    id: 5,
    type: 'lastEl',
    name: "mifareDESFire8kMifareClassic",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "MIFARE DESFire EV1 8K mit MIFARE Classic EV1 1K"
  },

  mifareClassic1kMitInduktiv: {
    id: 5,
    type: 'lastEl',
    name: "mifareClassic1kMitInduktiv",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "MIFARE Classic EV1 1K mit Induktiv, Kartenstärke ca. 1mm"
  },

  mifareClassic1kMitUHFMonza: {
    id: 5,
    type: 'lastEl',
    name: "mifareClassic1kMitUHFMonza",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "MIFARE Classic EV1 1K mit UHF Monza 3 (Monza 4, 5, Gen 2)"
  },

  mifareClassic1kMitAtmel: {
    id: 5,
    type: 'lastEl',
    name: "mifareClassic1kMitAtmel",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "MIFARE Classic EV1 1K mit Atmel (Temic, Q5) 5577"
  },

  mifareClassic1kMitProx125: {
    id: 5,
    type: 'lastEl',
    name: "mifareClassic1kMitProx125",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "MIFARE Classic EV1 1K mit Prox 125 kHz / 26 bit (34, 35, 36, 37)"
  },

  mifareClassic1kMit4450: {
    id: 5,
    type: 'lastEl',
    name: "mifareClassic1kMit4450",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "MIFARE Classic EV1 1K mit EM4450"
  },

  mifareClassic1kMitEM4200: {
    id: 5,
    type: 'lastEl',
    name: "mifareClassic1kMitEM4200",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "MIFARE Classic EV1 1K mit EM4200 (EM4102)"
  },

  mifareClassic1kMitHitag2: {
    id: 5,
    type: 'lastEl',
    name: "mifareClassic1kMitHitag2",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "MIFARE Classic EV1 1K mit HITAG 2"
  },

  mifareClassic1kMitHitag1: {
    id: 5,
    type: 'lastEl',
    name: "mifareClassic1kMitHitag1",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "MIFARE Classic EV1 1K mit HITAG 1"
  },

  mifareClassic4kMitInduktiv: {
    id: 5,
    type: 'lastEl',
    name: "mifareClassic4kMitInduktiv",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "MIFARE Classic EV1 4K mit Induktiv, Kartenstärke ca. 1mm"
  },

  mifareClassic4kMitUHFMonza: {
    id: 5,
    type: 'lastEl',
    name: "mifareClassic4kMitUHFMonza",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "MIFARE Classic EV1 4K mit UHF Monza 3 (Monza 4, 5, Gen 2)"
  },

  mifareClassic4kMitAtmel: {
    id: 5,
    type: 'lastEl',
    name: "mifareClassic4kMitAtmel",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "MIFARE Classic EV1 4K mit Atmel (Temic, Q5) 5577"
  },

  mifareClassic4kMitProx125: {
    id: 5,
    type: 'lastEl',
    name: "mifareClassic4kMitProx125",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "MIFARE Classic EV1 4K mit Prox 125 kHz / 26 bit (34, 35, 36, 37)"
  },

  mifareClassic4kMit4450: {
    id: 5,
    type: 'lastEl',
    name: "mifareClassic4kMit4450",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "MIFARE Classic EV1 4K mit EM4450"
  },

  mifareClassic4kMitEM4200: {
    id: 5,
    type: 'lastEl',
    name: "mifareClassic4kMitEM4200",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "MIFARE Classic EV1 4K mit EM4200 (EM4102)"
  },

  mifareClassic4kMitHitag2: {
    id: 5,
    type: 'lastEl',
    name: "mifareClassic4kMitHitag2",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "MIFARE Classic EV1 4K mit HITAG 2"
  },

  mifareClassic4kMitHitag1: {
    id: 5,
    type: 'lastEl',
    name: "mifareClassic4kMitHitag1",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "MIFARE Classic EV1 4K mit HITAG 1"
  },

  legicAdvant4096mitInduktiv: {
    type: 'lastEl',
    name: "legicAdvant4096mitInduktiv",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "LEGIC Advant ATC 4096 MP mit Induktiv, Kartenstärke 1,0 mm"
  },

  legicAdvant4096mitUHFmonza: {
    type: 'lastEl',
    name: "legicAdvant4096mitUHFmonza",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "LEGIC Advant ATC 4096 MP mit UHF Monza 3 / 4 / 5 / Gen 2"
  },

  legicAdvant4096mitAtmel5577: {
    type: 'lastEl',
    name: "legicAdvant4096mitAtmel5577",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "LEGIC Advant ATC 4096 MPmit Atmel (Temic, Q5) 5577"
  },

  legicAdvant4096mitProx125: {
    type: 'lastEl',
    name: "legicAdvant4096mitProx125",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "LEGIC Advant ATC 4096 MP mit Prox 125 kHz / 26 Bit (34, 35, 36, 37)"
  },

  legicAdvant4096mitICode: {
    type: 'lastEl',
    name: "legicAdvant4096mitICode",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "LEGIC Advant ATC 4096 MP mit I-Code SLI S20"
  },

  legicAdvant4096mitEM4200codiert: {
    type: 'lastEl',
    name: "legicAdvant4096mitEM4200codiert",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "LEGIC Advant ATC 4096 MP mit EM4200 0F-codiert"
  },

  legicAdvant4096mitEM4450: {
    type: 'lastEl',
    name: "legicAdvant4096mitEM4450",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "LEGIC Advant ATC 4096 MP mit EM4450"
  },

  legicAdvant4096mitEM4200: {
    type: 'lastEl',
    name: "legicAdvant4096mitEM4200",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "LEGIC Advant ATC 4096 MP mit EM4200 (EM4102)"
  },

  legicAdvant4096mitHitagS2048: {
    type: 'lastEl',
    name: "legicAdvant4096mitHitagS2048",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "LEGIC Advant ATC 4096 MP mit HITAG S 2048 Bit"
  },

  legicAdvant4096mitHitag256: {
    type: 'lastEl',
    name: "legicAdvant4096mitHitag256",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "LEGIC Advant ATC 4096 MP mit HITAG 2 256 Bit"
  },

  legicAdvant4096mitHitag2048: {
    type: 'lastEl',
    name: "legicAdvant4096mitHitag2048",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "LEGIC Advant ATC 4096 MP mit HITAG 1 2048 Bit"
  },

  legicAdvant4096mitMifareDESFire: {
    type: 'lastEl',
    name: "legicAdvant4096mitMifareDESFire",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "LEGIC Advant ATC 4096 MP mit MIFARE DESFire EV1 4K V05 70pF Supertag"
  },

  legicAdvant4096mitMifareClassic4k: {
    type: 'lastEl',
    name: "legicAdvant4096mitMifareClassic4k",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "LEGIC Advant ATC 4096 MP mit MIFARE Classic EV1 4K"
  },

  legicAdvant4096mitMifareClassic1k: {
    type: 'lastEl',
    name: "legicAdvant4096mitMifareClassic1k",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "LEGIC Advant ATC 4096 MP mit MIFARE Classic EV1 1K"
  },

  legicAdvant4096mitLegic: {
    type: 'lastEl',
    name: "legicAdvant4096mitLegic",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "LEGIC Advant ATC 4096 MP mit LEGIC Advant ATC 4096 MP311 V2 Supertag"
  },

  legicAdvant1024mitInduktiv: {
    id: 5,
    type: 'lastEl',
    name: "legicAdvant1024mitInduktiv",
    nextShownElement: "chiplageRfIdHybrid",
    optionName: "LEGIC Advant ATC 1024 MV mit Induktiv, Kartenstärke 1,0 mm"
  },

  legicAdvant1024mitUHFmonza: {
    id: 5,
    type: 'lastEl',
    name: "legicAdvant1024mitUHFmonza",
    nextShownElement: "chiplageRfIdHybrid",
    optionName: "LEGIC Advant ATC 1024 MV mit UHF Monza 3 / 4 / 5 / Gen 2"
  },

  legicAdvant1024mitAtmel5577: {
    id: 5,
    type: 'lastEl',
    name: "legicAdvant1024mitAtmel5577",
    nextShownElement: "chiplageRfIdHybrid",
    optionName: "LEGIC Advant ATC 1024 MVmit Atmel (Temic, Q5) 5577"
  },

  legicAdvant1024mitProx125: {
    id: 5,
    type: 'lastEl',
    name: "legicAdvant1024mitProx125",
    nextShownElement: "chiplageRfIdHybrid",
    optionName: "LEGIC Advant ATC 1024 MV mit Prox 125 kHz / 26 Bit (34, 35, 36, 37)"
  },

  legicAdvant1024mitICode: {
    id: 5,
    type: 'lastEl',
    name: "legicAdvant1024mitICode",
    nextShownElement: "chiplageRfIdHybrid",
    optionName: "LEGIC Advant ATC 1024 MV mit I-Code SLI S20"
  },

  legicAdvant1024mitEM4200codiert: {
    id: 5,
    type: 'lastEl',
    name: "legicAdvant1024mitEM4200codiert",
    nextShownElement: "chiplageRfIdHybrid",
    optionName: "LEGIC Advant ATC 1024 MV mit EM4200 0F-codiert"
  },

  legicAdvant1024mitEM4450: {
    id: 5,
    type: 'lastEl',
    name: "legicAdvant1024mitEM4450",
    nextShownElement: "chiplageRfIdHybrid",
    optionName: "LEGIC Advant ATC 1024 MV mit EM4450"
  },

  legicAdvant1024mitEM4200: {
    id: 5,
    type: 'lastEl',
    name: "legicAdvant1024mitEM4200",
    nextShownElement: "chiplageRfIdHybrid",
    optionName: "LEGIC Advant ATC 1024 MV mit EM4200 (EM4102)"
  },

  legicAdvant1024mitHitagS2048: {
    id: 5,
    type: 'lastEl',
    name: "legicAdvant1024mitHitagS2048",
    nextShownElement: "chiplageRfIdHybrid",
    optionName: "LEGIC Advant ATC 1024 MV mit HITAG S 2048 Bit"
  },

  legicAdvant1024mitHitag256: {
    id: 5,
    type: 'lastEl',
    name: "legicAdvant1024mitHitag256",
    nextShownElement: "chiplageRfIdHybrid",
    optionName: "LEGIC Advant ATC 1024 MV mit HITAG 2 256 Bit"
  },

  legicAdvant1024mitHitag2048: {
    id: 5,
    type: 'lastEl',
    name: "legicAdvant1024mitHitag2048",
    nextShownElement: "chiplageRfIdHybrid",
    optionName: "LEGIC Advant ATC 1024 MV mit HITAG 1 2048 Bit"
  },

  legicAdvant1024mitMifareDESFire: {
    id: 5,
    type: 'lastEl',
    name: "legicAdvant1024mitMifareDESFire",
    nextShownElement: "chiplageRfIdHybrid",
    optionName: "LEGIC Advant ATC 1024 MV mit MIFARE DESFire EV1 4K V05 70pF Supertag"
  },

  legicAdvant1024mitMifareClassic4k: {
    id: 5,
    type: 'lastEl',
    name: "legicAdvant1024mitMifareClassic4k",
    nextShownElement: "chiplageRfIdHybrid",
    optionName: "LEGIC Advant ATC 1024 MV mit MIFARE Classic EV1 4K"
  },

  legicAdvant1024mitMifareClassic1k: {
    id: 5,
    type: 'lastEl',
    name: "legicAdvant1024mitMifareClassic1k",
    nextShownElement: "chiplageRfIdHybrid",
    optionName: "LEGIC Advant ATC 1024 MV mit MIFARE Classic EV1 1K"
  },

  legicAdvant1024mitLegic: {
    id: 5,
    type: 'lastEl',
    name: "legicAdvant1024mitLegic",
    nextShownElement: "chiplageRfIdHybrid",
    optionName: "LEGIC Advant ATC 1024 MV mit LEGIC Advant ATC 4096 MP311 V2 Supertag"
  },

  legicMIM1024mitInduktiv: {
    id: 5,
    type: 'lastEl',
    name: "legicMIM1024mitInduktiv",
    nextShownElement: "chiplageRfIdHybrid",
    optionName: "LEGIC MIM 1024 mit Induktiv, Kartenstärke 1,0 mm"
  },

  legicMIM1024mitUHFmonza: {
    id: 5,
    type: 'lastEl',
    name: "legicMIM1024mitUHFmonza",
    nextShownElement: "chiplageRfIdHybrid",
    optionName: "LEGIC MIM 1024 mit UHF Monza 3 / 4 / 5 / Gen 2"
  },

  legicMIM1024mitAtmel5577: {
    id: 5,
    type: 'lastEl',
    name: "legicMIM1024mitAtmel5577",
    nextShownElement: "chiplageRfIdHybrid",
    optionName: "LEGIC MIM 1024 mit Atmel (Temic, Q5) 5577"
  },

  legicMIM1024mitProx125: {
    id: 5,
    type: 'lastEl',
    name: "legicMIM1024mitProx125",
    nextShownElement: "chiplageRfIdHybrid",
    optionName: "LEGIC MIM 1024 mit Prox 125 kHz / 26 Bit (34, 35, 36, 37)"
  },

  legicMIM1024mitICode: {
    id: 5,
    type: 'lastEl',
    name: "legicMIM1024mitICode",
    nextShownElement: "chiplageRfIdHybrid",
    optionName: "LEGIC MIM 1024 mit I-Code SLI S20"
  },

  legicMIM1024mitEM4200codiert: {
    id: 5,
    type: 'lastEl',
    name: "legicMIM1024mitEM4200codiert",
    nextShownElement: "chiplageRfIdHybrid",
    optionName: "LEGIC MIM 1024 mit EM4200 0F-codiert"
  },

  legicMIM1024mitEM4450: {
    id: 5,
    type: 'lastEl',
    name: "legicMIM1024mitEM4450",
    nextShownElement: "chiplageRfIdHybrid",
    optionName: "LEGIC MIM 1024 mit EM4450"
  },

  legicMIM1024mitEM4200: {
    id: 5,
    type: 'lastEl',
    name: "legicMIM1024mitEM4200",
    nextShownElement: "chiplageRfIdHybrid",
    optionName: "LEGIC MIM 1024 mit EM4200 (EM4102)"
  },

  legicMIM1024mitHitagS2048: {
    id: 5,
    type: 'lastEl',
    name: "legicMIM1024mitHitagS2048",
    nextShownElement: "chiplageRfIdHybrid",
    optionName: "LEGIC MIM 1024 mit HITAG S 2048 Bit"
  },

  legicMIM1024mitHitag256: {
    id: 5,
    type: 'lastEl',
    name: "legicMIM1024mitHitag256",
    nextShownElement: "chiplageRfIdHybrid",
    optionName: "LEGIC MIM 1024 mit HITAG 2 256 Bit"
  },

  legicMIM1024mitHitag2048: {
    id: 5,
    type: 'lastEl',
    name: "legicMIM1024mitHitag2048",
    nextShownElement: "chiplageRfIdHybrid",
    optionName: "LEGIC MIM 1024 mit HITAG 1 2048 Bit"
  },

  legicMIM1024mitMifareDESFire: {
    id: 5,
    type: 'lastEl',
    name: "legicMIM1024mitMifareDESFire",
    nextShownElement: "chiplageRfIdHybrid",
    optionName: "LEGIC MIM 1024 mit MIFARE DESFire EV1 4K V05 70pF Supertag"
  },

  legicMIM1024mitMifareClassic4k: {
    id: 5,
    type: 'lastEl',
    name: "legicMIM1024mitMifareClassic4k",
    nextShownElement: "chiplageRfIdHybrid",
    optionName: "LEGIC MIM 1024 mit MIFARE Classic EV1 4K"
  },

  legicMIM1024mitMifareClassic1k: {
    id: 5,
    type: 'lastEl',
    name: "legicMIM1024mitMifareClassic1k",
    nextShownElement: "chiplageRfIdHybrid",
    optionName: "LEGIC MIM 1024 mit MIFARE Classic EV1 1K"
  },

  legicMIM1024mitLegic: {
    id: 5,
    type: 'lastEl',
    name: "legicMIM1024mitLegic",
    nextShownElement: "chiplageRfIdHybrid",
    optionName: "LEGIC MIM 1024 mit LEGIC Advant ATC 4096 MP311 V2 Supertag"
  },

  individualChiplageRfidHybridBreite: {
    type: 'input',
    inputType: 'number',
    appendTo: "individualChiplageRfidHybrid",
    min: 0,
    name: "individualChiplageRfidHybridBreite",
    nextShownElement: "firstBlock",
    labelName: "Breite"
  },

  individualChiplageRfidHybridHöhe: {
    type: 'input',
    inputType: 'number',
    appendTo: "individualChiplageRfidHybrid",
    min: 0,
    name: "individualChiplageRfidHybridHöhe",
    nextShownElement: "firstBlock",
    labelName: "Höhe"
  },

  individualChiplageRfidHybridPositionX: {
    type: 'input',
    inputType: 'number',
    appendTo: "individualChiplageRfidHybrid",
    min: 0,
    name: "individualChiplageRfidHybridPositionX",
    nextShownElement: "firstBlock",
    labelName: "Position X"
  },

  individualChiplageRfidHybridPositionY: {
    type: 'input',
    inputType: 'number',
    appendTo: "individualChiplageRfidHybrid",
    min: 0,
    name: "individualChiplageRfidHybridPositionY",
    nextShownElement: "firstBlock",
    labelName: "Position Y"
  },

  sichtausweis: {
    id: 2,
    type: "lastEl",
    name: "sichtausweis",
    nextShownElement: "firstBlock",
    optionName: "Sichtausweis"
  },

  prox: {
    id: 4,
    type: "lastEl",
    name: "prox",
    nextShownElement: "chiplageRfIdHybrid",
    optionName: "Prox 125 kHz / 26 bit (34, 35, 36, 37)"
  },

  tagIt: {
    id: 4,
    type: "lastEl",
    name: "tagIt",
    nextShownElement: "chiplageRfIdHybrid",
    optionName: "Tag-it Plus 2048 bit"
  },

  iCode: {
    id: 4,
    type: "lastEl",
    name: "iCode",
    nextShownElement: "chiplageRfIdHybrid",
    optionName: "I-Code SLI S20 / SLIX"
  },

  atmel: {
    id: 4,
    type: "lastEl",
    name: "atmel",
    nextShownElement: "chiplageRfIdHybrid",
    optionName: "Atmel (Temic) ATA5577"
  },

  q5: {
    id: 4,
    type: "lastEl",
    name: "q5",
    nextShownElement: "chiplageRfIdHybrid",
    optionName: "Q5"
  },

  monza: {
    id: 4,
    type: "lastEl",
    name: "monza",
    nextShownElement: "chiplageRfIdHybrid",
    optionName: "UHF Monza 3 / 4 / 5"
  },

  em4200: {
    id: 4,
    type: "lastEl",
    name: "em4200",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "EM4200 (EM4102)"
  },

  em4450: {
    id: 4,
    type: "lastEl",
    name: "em4450",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "EM4450"
  },

  em4200Codiert: {
    id: 4,
    type: "lastEl",
    name: "em4200Codiert",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "EM4200 (EM4102) 0F-codiert"
  },

  hitag: {
    id: 4,
    type: "lastEl",
    name: "hitag",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "HITAG 1 2048 Bit"
  },

  hitag2: {
    id: 4,
    type: "lastEl",
    name: "hitag2",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "HITAG 2 256 Bit"
  },

  hitagS2048: {
    id: 4,
    type: "lastEl",
    name: "hitagS2048",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "HITAG S 2048 Bit"
  },

  hitagS256: {
    id: 4,
    type: "lastEl",
    name: "hitagS256",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "HITAG S 256 Bit"
  },

  fudan: {
    id: 4,
    type: "lastEl",
    name: "fudan",
    nextShownElement: "chiplageRfIdHybrid",
    optionName: "FUDAN Microelectronics 1K Chip FM11RF08"
  },

  fudan4K: {
    id: 4,
    type: "lastEl",
    name: "fudan4K",
    nextShownElement: "chiplageRfIdHybrid",
    optionName: "FUDAN Microelectronics 4K Chip FM11RF32N"
  },

  mifareClassic: {
    id: 4,
    type: "lastEl",
    name: "mifareClassic",
    nextShownElement: "chiplageRfIdHybrid",
    optionName: "MIFARE Classic 1K (4B NUID)"
  },

  mifareClassicNXP4B: {
    id: 4,
    type: "lastEl",
    name: "mifareClassicNXP4B",
    nextShownElement: "chiplageRfIdHybrid",
    optionName: "MIFARE Classic NXP EV1 1K (4B NUID)"
  },

  mifareClassicNXP7B: {
    id: 4,
    type: "lastEl",
    name: "mifareClassicNXP7B",
    nextShownElement: "chiplageRfIdHybrid",
    optionName: "MIFARE Classic NXP EV1 1K (7B UID)"
  },

  mifareClassicNXP4K: {
    id: 4,
    type: "lastEl",
    name: "mifareClassicNXP4K",
    nextShownElement: "chiplageRfIdHybrid",
    optionName: "MIFARE Classic NXP EV1 4K"
  },

  mifareUltralight: {
    id: 4,
    type: "lastEl",
    name: "mifareUltralight",
    nextShownElement: "chiplageRfIdHybrid",
    optionName: "MIFARE Ultralight MF0ICU1X 64 Byte"
  },

  mifareDES4: {
    id: 4,
    type: "lastEl",
    name: "mifareDES4",
    nextShownElement: "chiplageRfIdHybrid",
    optionName: "MIFARE DESFire EV1 4K V05 17pF"
  },

  mifareDES4Supertag: {
    id: 4,
    type: "lastEl",
    name: "mifareDES4Supertag",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "MIFARE DESFire EV1 4K V05 70pF Supertag"
  },

  mifareDES8: {
    id: 4,
    type: "lastEl",
    name: "mifareDES8",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "MIFARE DESFire EV1 8K V05 17pF"
  },

  mifareDES8Supertag: {
    id: 4,
    type: "lastEl",
    name: "mifareDES8Supertag",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "MIFARE DESFire EV1 8K V05 70pF Supertag"
  },

  mifarePlusS: {
    id: 4,
    type: "lastEl",
    name: "mifarePlusS",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "MIFARE Plus S 4K (7B UID)"
  },

  mifarePlusX: {
    id: 4,
    type: "lastEl",
    name: "mifarePlusX",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "MIFARE Plus X 4K (7B UID)"
  },

  legicMIM256: {
    id: 4,
    type: "lastEl",
    name: "legicMIM256",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "LEGIC MIM 256"
  },

  legicMIM256Supertag: {
    id: 4,
    type: "lastEl",
    name: "legicMIM256Supertag",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "LEGIC MIM 256 Supertag"
  },

  legicMIM1024: {
    id: 4,
    type: "lastEl",
    name: "legicMIM1024",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "LEGIC MIM 1024"
  },

  legicMIM1024Supertag: {
    id: 4,
    type: "lastEl",
    name: "legicMIM1024Supertag",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "LEGIC MIM 1024 Supertag"
  },

  legicATC128: {
    id: 4,
    type: "lastEl",
    name: "legicATC128",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "LEGIC Advant ATC 128 MV, ISO 15693"
  },

  legicATC1024: {
    id: 4,
    type: "lastEl",
    name: "legicATC1024",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "LEGIC Advant ATC 1024 MV, ISO 15693"
  },

  legicATC4096: {
    id: 4,
    type: "lastEl",
    name: "legicATC4096",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "LEGIC Advant ATC 4096 MP 311 V2, ISO 14443"
  },

  legicATC4096Supertag: {
    id: 4,
    type: "lastEl",
    name: "legicATC4096Supertag",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "LEGIC Advant ATC 4096 MP 311 V2 Supertag, ISO 14443"
  },

  legicCTC4096: {
    id: 4,
    type: "lastEl",
    name: "legicCTC4096",
    nextShownElement: "chiplageRfidHybrid",
    optionName: "LEGIC CTC 4096, ISO 14443"
  },

  linksISO: {
    type: "lastEl",
    name: "linksISO",
    nextShownElement: "firstBlock",
    optionName: "Links, gem. ISO"
  },

  rechtsISO: {
    type: "lastEl",
    name: "rechtsISO",
    nextShownElement: "firstBlock",
    optionName: "Rechts gem. ISO"
  },

  obenISO: {
    type: "lastEl",
    name: "obenISO",
    nextShownElement: "firstBlock",
    optionName: "Oben, gem. ISO"
  },

  untenISO: {
    type: "lastEl",
    name: "untenISO",
    nextShownElement: "firstBlock",
    optionName: "Unten, gem. ISO"
  },

  positionKontaktchipAndCodierung: {
    id: 5,
    type: "select",
    appendTo: "#wrapper",
    name: "positionKontaktchipAndCodierung",
    options: ["linksISO", "rechtsISO"],
    labelName: "Position Kontaktchip"
  },

  SLE66CX680pemitCardOS44Betriebssystem: {
    id: 4,
    type: "lastEl",
    name: "SLE66CX680pemitCardOS44Betriebssystem",
    nextShownElement: "positionKontaktchipAndCodierung",
    optionName: "SLE66CX680pe mit CardOS 4.4 Betriebssystem"
  },

  P5CC072mitStarCOS30: {
    id: 4,
    type: "lastEl",
    name: "P5CC072mitStarCOS30",
    nextShownElement: "positionKontaktchipAndCodierung",
    optionName: "P5CC072 mit StarCOS 3.0"
  },

  GemaltoChipNETv3IDPrime510: {
    id: 4,
    type: "lastEl",
    name: "GemaltoChipNETv3IDPrime510",
    nextShownElement: "positionKontaktchipAndCodierung",
    optionName: "Gemalto Chip .NET v3 ID Prime 510"
  },

  GemaltoCyberflexAccess64kv2CTOPIMFIPSCY2: {
    id: 4,
    type: "lastEl",
    name: "GemaltoCyberflexAccess64kv2CTOPIMFIPSCY2",
    nextShownElement: "positionKontaktchipAndCodierung",
    optionName: "Gemalto Cyberflex Access 64kv2C TOP IM FIPS CY2"
  },

  P5CD080mitTCOS30: {
    id: 4,
    type: "lastEl",
    name: "P5CD080mitTCOS30",
    nextShownElement: "positionKontaktchipAndCodierung",
    optionName: "P5CD080 mit TCOS 3.0"
  },

  J2A080GX0T0BG295mitJCOP21241SingleInterface80kB: {
    id: 4,
    type: "lastEl",
    name: "J2A080GX0T0BG295mitJCOP21241SingleInterface80kB",
    nextShownElement: "positionKontaktchipAndCodierung",
    optionName: "J2A080GX0/T0BG295 mit JCOP21 2.4.1 Single Interface 80kB"
  },

  Kontaktspeicherchip24LC16: {
    id: 4,
    type: "lastEl",
    name: "Kontaktspeicherchip24LC16",
    nextShownElement: "positionKontaktchipAndCodierung",
    optionName: "Kontaktspeicherchip 24LC16"
  },

  Kontaktspeicherchip24LC32: {
    id: 4,
    type: "lastEl",
    name: "Kontaktspeicherchip24LC32",
    nextShownElement: "positionKontaktchipAndCodierung",
    optionName: "Kontaktspeicherchip 24LC32"
  },

  Kontaktspeicherchip24LC128: {
    id: 4,
    type: "lastEl",
    name: "Kontaktspeicherchip24LC128",
    nextShownElement: "positionKontaktchipAndCodierung",
    optionName: "Kontaktspeicherchip 24LC128"
  },

  KontaktspeicherchipSLE55421024byteSpeicherPINSchutz: {
    id: 4,
    type: "lastEl",
    name: "KontaktspeicherchipSLE55421024byteSpeicherPINSchutz",
    nextShownElement: "positionKontaktchipAndCodierung",
    optionName: "Kontaktspeicherchip SLE 5542, 1024 byte Speicher, PIN-Schutz"
  },

  Kontaktspeicherchip24LC02: {
    id: 4,
    type: "lastEl",
    name: "Kontaktspeicherchip24LC02",
    nextShownElement: "positionKontaktchipAndCodierung",
    optionName: "Kontaktspeicherchip 24LC02 (I²C-Bus)"
  },

  positionMagnetstreifenAndCodierung: {
    id: 4,
    type: "select",
    appendTo: "#wrapper",
    name: "positionMagnetstreifenAndCodierung",
    options: ["obenISO", "untenISO"],
    labelName: "Position Magnetstreifen"
  },

  Schwarz: {
    type: "defaultSelected",
    name: "Schwarz",
    optionName: "Schwarz"
  },

  Grün: {
    type: "lastEl",
    name: "Grün",
    optionName: "Grün"
  },

  Silber: {
    type: "lastEl",
    name: "Silber",
    optionName: "Silber"
  },

  Braun: {
    type: "lastEl",
    name: "Braun",
    optionName: "Braun"
  },

  // xexexeee : {
  // 	type: "lastEl",
  // 	name: "xexexexex",
  // 	optionName: "exexexe"
  // },

  /*normal blocks*/

  // exexex : {
  // type: "select",
  // 	name: "xexexe",
  // 	options: [prox, tagIt, iCode, atmel, xexexeee, monza],
  // 	optionName: "xexexexe",
  // 	labelName: "xexexe"
  // },

  hico4000: {
    id: 3,
    type: "select",
    appendTo: "#wrapper",
    name: "hico4000",
    nextShownElement: "positionMagnetstreifenAndCodierung",
    options: ["Schwarz", "Braun"],
    optionName: "Magnetstreifen HiCo 4000 Oe",
    labelName: "Magnetstreifenausführung"
  },

  hico2750: {
    id: 3,
    type: "select",
    appendTo: "#wrapper",
    name: "hico2750",
    nextShownElement: "positionMagnetstreifenAndCodierung",
    options: ["Schwarz", "Silber"],
    optionName: "Magnetstreifen HiCo 2750 Oe",
    labelName: "Magnetstreifenausführung"
  },

  loco300: {
    id: 3,
    type: "select",
    appendTo: "#wrapper",
    name: "loco300",
    nextShownElement: "positionMagnetstreifenAndCodierung",
    options: ["Schwarz", "Grün"],
    optionName: "Magnetstreifen LoCo 300 Oe",
    labelName: "Magnetstreifenausführung"
  },

  WeitereSpeicherchips: {
    id: 4,
    type: "input",
    appendTo: "#speicherchip",
    inputType: "text",
    name: "WeitereSpeicherchips",
    nextShownElement: "positionKontaktchipAndCodierung",
    optionName: "Weitere Speicherchips",
    labelName: "Chiptyp"
  },

  WeitereProzessorchipsinklBetriebssytem: {
    id: 4,
    type: "input",
    appendTo: "#prozessor",
    inputType: "text",
    name: "WeitereProzessorchipsinklBetriebssytem",
    nextShownElement: "positionKontaktchipAndCodierung",
    optionName: "Weitere Prozessorchips inkl. Betriebssytem",
    labelName: "Chiptyp"
  },

  speicherchip: {
    id: 3,
    type: "select",
    appendTo: "#wrapper",
    name: "speicherchip",
    options: ["Kontaktspeicherchip24LC16", "Kontaktspeicherchip24LC32", "Kontaktspeicherchip24LC128", "KontaktspeicherchipSLE55421024byteSpeicherPINSchutz", "Kontaktspeicherchip24LC02", "WeitereSpeicherchips"],
    optionName: "Speicherchip (Read Only Memory)",
    labelName: "Speicherchips (Read Only Memory)"
  },

  prozessor: {
    id: 3,
    type: "select",
    appendTo: "#wrapper",
    name: "prozessor",
    options: ["SLE66CX680pemitCardOS44Betriebssystem", "P5CC072mitStarCOS30", "GemaltoChipNETv3IDPrime510", "GemaltoCyberflexAccess64kv2CTOPIMFIPSCY2", "P5CD080mitTCOS30", "J2A080GX0T0BG295mitJCOP21241SingleInterface80kB", "WeitereProzessorchipsinklBetriebssytem"],
    optionName: "Prozessor-/ PKI-Chip",
    labelName: "Prozessor-/ PKI-chips"
  },

  weitereRFID: {
    id: 4,
    type: "input",
    appendTo: "#mainSonstige",
    inputType: "text",
    name: "weitereRFID",
    nextShownElement: "chiplageRfIdHybrid",
    optionName: "Weitere RFID-Technologien",
    labelName: "RFID-Technologie"
  },

  mainSonstige: {
    id: 3,
    type: "select",
    appendTo: "#wrapper",
    name: "mainSonstige",
    options: ["prox", "tagIt", "iCode", "atmel", "q5", "monza", "weitereRFID"],
    optionName: "Sonstige RFID-Technologien",
    labelName: "Sonstige RFID-Technologien"
  },

  mainEm: {
    id: 3,
    type: "select",
    appendTo: "#wrapper",
    name: "mainEm",
    options: ["em4200", "em4450", "em4200Codiert"],
    optionName: "EM",
    labelName: "EM-Technologien"
  },

  mainHitag: {
    id: 3,
    type: "select",
    appendTo: "#wrapper",
    name: "mainHitag",
    options: ["hitag", "hitag2", "hitagS2048", "hitagS256"],
    optionName: "HITAG",
    labelName: "HITAG-Technologien"
  },

  mainFudan: {
    id: 3,
    type: "select",
    appendTo: "#wrapper",
    name: "mainFudan",
    options: ["fudan", "fudan4K"],
    optionName: "FUDAN",
    labelName: "FUDAN-Technologien"
  },

  mainMifare: {
    id: 3,
    type: "select",
    appendTo: "#wrapper",
    name: "mainMifare",
    options: ["mifareClassic", "mifareClassicNXP4B", "mifareClassicNXP7B", "mifareClassicNXP4K", "mifareUltralight", "mifareDES4", "mifareDES4Supertag", "mifareDES8", "mifareDES8Supertag", "mifarePlusS", "mifarePlusX"],
    optionName: "MIFARE",
    labelName: "MIFARE-Technologien"
  },

  mainLegic: {
    id: 3,
    type: "select",
    appendTo: "#wrapper",
    name: "mainLegic",
    options: ["legicMIM256", "legicMIM256Supertag", "legicMIM1024", "legicMIM1024Supertag", "legicATC128", "legicATC1024", "legicATC4096", "legicATC4096Supertag", "legicCTC4096"],
    optionName: "LEGIC",
    labelName: "LEGIC-Technologien"
  },

  karte: {
    id: 2,
    type: "select",
    appendTo: "#wrapper",
    name: "karte",
    options: ["mainLegic", "mainMifare", "mainFudan", "mainHitag", "mainEm", "mainSonstige"],
    optionName: "RFID-Karte",
    labelName: "RFID-Technologie"
  },

  hybrid: {
    id: 2,
    type: "select",
    appendTo: "#wrapper",
    name: "hybrid",
    options: ["technologieLegic", "technologieMifare", "sonstigeHybridTechnologien"],
    optionName: "RFID-Hybridkarte",
    labelName: "Führendes System"
  },

  kontaktchip: {
    id: 2,
    type: "select",
    appendTo: "#wrapper",
    name: "kontaktchip",
    options: ["prozessor", "speicherchip"],
    optionName: "Kontaktchipkarte",
    labelName: "Chiptyp"
  },

  magnetstreifen: {
    id: 2,
    type: "select",
    appendTo: "#wrapper",
    name: "magnetstreifen",
    options: ["loco300", "hico2750", "hico4000"],
    optionName: "Magnetstreifenkarte",
    labelName: "Magnetstreifentyp"
  },

  blanko: {
    id: 1,
    type: "select",
    appendTo: "#wrapper",
    name: "blanko",
    options: ["karte", "hybrid", "kontaktchip", "magnetstreifen"],
    optionName: "Plastikkarte (blanko)",
    labelName: "Kartentyp: Plastikkarte (blanko)"
  },

  bedruckt: {
    id: 1,
    type: "select",
    appendTo: "#wrapper",
    name: "bedruckt",
    options: ["sichtausweis", "karte", "hybrid", "kontaktchip", "magnetstreifen"],
    optionName: "Plastikkarte (bedruckt/personalissert)",
    labelName: "Kartentyp: Plastikkarte (bedruckt/personalissert)"
  },

  plastikkarten: {
    id: 0,
    type: "select",
    appendTo: "#wrapper",
    name: "plastikkarten",
    options: ["blanko", "bedruckt"],
    optionName: "Plastikkarte",
    labelName: "Kartentyp"
  },

  // necessarily block part

  weitereHybridkarten: {
    id: 4,
    type: 'input',
    appendTo: "#wrapper",
    inputType: 'text',
    name: "weitereHybridkarten",
    nextShownElement: "chiplageRfIdHybrid",
    optionName: "Weitere Hybridkarten",
    labelName: "Bezeichnung Hybridkarte"
  },

  mifareClassicEv14k: {
    id: 4,
    type: 'select',
    appendTo: "#wrapper",
    name: "mifareClassicEv14k",
    options: ["mifareClassic4kMitHitag1", "mifareClassic4kMitHitag2", "mifareClassic4kMitEM4200", "mifareClassic4kMit4450", "mifareClassic4kMitProx125", "mifareClassic4kMitAtmel", "mifareClassic4kMitUHFMonza", "mifareClassic4kMitInduktiv"],
    optionName: "MIFARE Classic EV1 4K Hybridkarten",
    labelName: "MIFARE Classic EV1 4K Hybridkarten"
  },

  mifareClassicEv1: {
    id: 4,
    type: 'select',
    appendTo: "#wrapper",
    name: "mifareClassicEv1",
    options: ["mifareClassic1kMitHitag1", "mifareClassic1kMitHitag2", "mifareClassic1kMitEM4200", "mifareClassic1kMit4450", "mifareClassic1kMitProx125", "mifareClassic1kMitAtmel", "mifareClassic1kMitUHFMonza", "mifareClassic1kMitInduktiv"],
    optionName: "MIFARE Classic EV1 Hybridkarten",
    labelName: "MIFARE Classic EV1 Hybridkarten"
  },

  mifareEv18k: {
    id: 4,
    type: 'select',
    appendTo: "#wrapper",
    name: "mifareEv18k",
    options: ["mifareDESFire8kMifareClassic", "mifareDESFire8kSupertagMifareClassic", "mifareDESFire8kSupertag1", "mifareDESFire8kSupertag2", "mifareDESFire8kSupertagS", "mifareDESFire8kSupertagEM4200", "mifareDESFire8kSupertagEM4450", "mifareDESFire8kSupertagEM4200codiert", "mifareDESFire8kSupertagICode", "mifareDESFire8kSupertagProx125", "mifareDESFire8kSupertagAtmel", "mifareDESFire8kSupertagUHFmonza", "mifareDESFire8kInduktiv"],
    optionName: "MIFARE DESFire EV1 8K V05 70pF Hybridkarten",
    labelName: "MIFARE DESFire EV1 8K V05 70pF Hybridkarten"
  },

  mifareEv14k: {
    id: 4,
    type: 'select',
    appendTo: "#wrapper",
    name: "mifareEv14k",
    options: ["mifareDESFire4kMifareClassic", "mifareDESFire4kSupertagMifareClassic", "mifareDESFire4kSupertag1", "mifareDESFire4kSupertag2", "mifareDESFire4kSupertagS", "mifareDESFire4kSupertagEM4200", "mifareDESFire4kSupertagEM4450", "mifareDESFire4kSupertagEM4200codiert", "mifareDESFire4kSupertagICode", "mifareDESFire4kSupertagProx125", "mifareDESFire4kSupertagAtmel", "mifareDESFire4kSupertagUHFmonza", "mifareDESFire4kInduktiv"],
    optionName: "MIFARE DESFire EV1 4k Hybridkarten",
    labelName: "MIFARE DESFire EV1 Hybridkarten"
  },

  legicAdvant4096: {
    id: 4,
    type: 'select',
    appendTo: "#wrapper",
    name: "legicAdvant4096",
    options: ["legicAdvant4096mitLegic", "legicAdvant4096mitMifareClassic1k", "legicAdvant4096mitMifareClassic4k", "legicAdvant4096mitMifareDESFire", "legicAdvant4096mitHitag2048", "legicAdvant4096mitHitag256", "legicAdvant4096mitHitagS2048", "legicAdvant4096mitEM4200", "legicAdvant4096mitEM4450", "legicAdvant4096mitEM4200codiert", "legicAdvant4096mitICode", "legicAdvant4096mitProx125", "legicAdvant4096mitAtmel5577", "legicAdvant4096mitUHFmonza", "legicAdvant4096mitInduktiv"],
    optionName: "LEGIC Advant ATC 4096 MP Hybridkarten",
    labelName: "LEGIC Advant ATC 4096 MP Hybridkarten"
  },

  legicAdvant1024: {
    id: 4,
    type: 'select',
    appendTo: "#wrapper",
    name: "legicAdvant1024",
    options: ["legicAdvant1024mitLegic", "legicAdvant1024mitMifareClassic1k", "legicAdvant1024mitMifareClassic4k", "legicAdvant1024mitMifareDESFire", "legicAdvant1024mitHitag2048", "legicAdvant1024mitHitag256", "legicAdvant1024mitHitagS2048", "legicAdvant1024mitEM4200", "legicAdvant1024mitEM4450", "legicAdvant1024mitEM4200codiert", "legicAdvant1024mitICode", "legicAdvant1024mitProx125", "legicAdvant1024mitAtmel5577", "legicAdvant1024mitUHFmonza", "legicAdvant1024mitInduktiv"],
    optionName: "LEGIC Advant ATC 1024 MV Hybridkarten",
    labelName: "LEGIC Advant ATC 1024 MV Hybridkarten"
  },

  legicMIM1024Hybridkarten: {
    id: 4,
    type: 'select',
    appendTo: "#wrapper",
    name: "legicMIM1024Hybridkarten",
    options: ["legicMIM1024mitLegic", "legicMIM1024mitMifareClassic1k", "legicMIM1024mitMifareClassic4k", "legicMIM1024mitMifareDESFire", "legicMIM1024mitHitag2048", "legicMIM1024mitHitag256", "legicMIM1024mitHitagS2048", "legicMIM1024mitEM4200", "legicMIM1024mitEM4450", "legicMIM1024mitEM4200codiert", "legicMIM1024mitICode", "legicMIM1024mitProx125", "legicMIM1024mitAtmel5577", "legicMIM1024mitUHFmonza", "legicMIM1024mitInduktiv"],
    optionName: "LEGIC MIM 1024 Hybridkarten",
    labelName: "LEGIC MIM 1024 Hybridkarten"
  },

  sonstigeHybridTechnologien: {
    id: 3,
    type: 'select',
    appendTo: "#wrapper",
    name: "sonstigeHybridTechnologien",
    options: ["hitagMIT14102", "hitagMIT14450", "hitagMIT24102", "hitagMIT24450", "weitereHybridkarten"],
    optionName: "Sonstige Hybrid-Technologien",
    labelName: "Sonstige Hybrid-Technologien"
  },

  technologieMifare: {
    id: 3,
    type: 'select',
    appendTo: "#wrapper",
    name: "technologieMifare",
    options: ["mifareEv14k", "mifareEv18k", "mifareClassicEv1", "mifareClassicEv14k"],
    optionName: "Hybride mit führender Technologie MIFARE",
    labelName: "MIFARE-Hybridkarten"
  },

  technologieLegic: {
    id: 3,
    type: 'select',
    appendTo: "#wrapper",
    name: "technologieLegic",
    options: ["legicMIM1024Hybridkarten", "legicAdvant1024", "legicAdvant4096"],
    optionName: "Hybride mit führender Technologie LEGIC",
    labelName: "LEGIC-Hybridkarten"
  },

  Glänzend: {
    type: "lastEl",
    name: "Glänzend",
    optionName: "Glänzend"
  },

  Matt: {
    type: "lastEl",
    name: "Matt",
    optionName: "Matt"
  },

  Geschliffen: {
    type: "lastEl",
    name: "Geschliffen",
    optionName: "Geschliffen, mit Metallic-Effekt"
  },

  Partiell: {
    type: "lastEl",
    name: "Partiell",
    optionName: "Partiell poliert / matt"
  },

  PVCStandard: {
    type: "lastEl",
    name: "PVCStandard",
    optionName: "PVC Standard"
  },

  PremiumCardPVCPETVerbundwerkstoff: {
    type: "lastEl",
    name: "PremiumCardPVCPETVerbundwerkstoff",
    optionName: "Premium Card (PVC-PET-Verbundwerkstoff)"
  },

  UltraCardPVCPETPCVerbundwerkstoff: {
    type: "lastEl",
    name: "UltraCardPVCPETPCVerbundwerkstoff",
    optionName: "Ultra Card (PVC-, PET-, PC - Verbundwerkstoff)"
  },

  PolycarbonatCard100Polycarbonat: {
    type: "lastEl",
    name: "PolycarbonatCard100Polycarbonat",
    optionName: "Polycarbonat Card (100% Polycarbonat)"
  },

  hochformat: {
    type: "lastEl",
    name: "hochformat",
    optionName: "Hochformat"
  },

  querformat: {
    type: "defaultSelected",
    name: "querformat",
    optionName: "Querformat"
  },

  ausrichtung: {
    type: "select",
    appendTo: "#kartenspezifikationen",
    name: "ausrichtung",
    options: ["querformat", "hochformat"],
    labelName: "Ausrichtung"
  },

  kartenmaterial: {
    type: "select",
    appendTo: "#kartenspezifikationen",
    name: "kartenmaterial",
    options: ["PVCStandard", "PremiumCardPVCPETVerbundwerkstoff", "UltraCardPVCPETPCVerbundwerkstoff", "PolycarbonatCard100Polycarbonat"],
    labelName: "Kartenmaterial"
  },

  kartenoberfläche: {
    type: "select",
    appendTo: "#kartenspezifikationen",
    name: "kartenoberfläche",
    options: ["Glänzend", "Matt", "Geschliffen", "Partiell"],
    labelName: "Kartenoberfläche"
  },

  kartenspezifikationen: {
    type: "block",
    appendTo: "#firstBlock",
    labelName: "Kartenspezifikationen",
    name: "kartenspezifikationen",
    options: ["ausrichtung", "kartenmaterial", "kartenoberfläche"]
  },

  UnbedrucktWeiß: {
    type: "lastEl",
    name: "UnbedrucktWeiß",
    optionName: "Unbedruckt Weiß"
  },

  farbigSchwarz: {
    type: "lastEl",
    name: "farbigSchwarz",
    optionName: "1-farbig Schwarz"
  },

  MehrfarbendruckEuroskala: {
    type: "lastEl",
    name: "MehrfarbendruckEuroskala",
    optionName: "Mehrfarbendruck Euroskala"
  },

  SonderfarbenVeredelung: {
    type: "lastEl",
    name: "SonderfarbenVeredelung",
    optionName: "Sonderfarben/Veredelung"
  },

  druckdatenVorderseiteInput: {
    type: "input",
    inputType: "file",
    appendTo: "#druckFarbePlastikkarte",
    name: "druckdatenVorderseiteInput",
    labelName: "Druckdaten Vorderseite"
  },

  druckdatenVorderseiteSelect: {
    type: "select",
    appendTo: "#druckFarbePlastikkarte",
    name: "druckdatenVorderseiteSelect",
    options: ["UnbedrucktWeiß", "farbigSchwarz", "MehrfarbendruckEuroskala", "SonderfarbenVeredelung"],
    labelName: "Druckausführung Vorderseite"
  },

  druckdatenRückseiteInput: {
    type: "input",
    inputType: "file",
    appendTo: "#druckFarbePlastikkarte",
    name: "druckdatenRückseiteInput",
    labelName: "Druckdaten Rückseite"
  },

  druckdatenRückseiteSelect: {
    type: "select",
    appendTo: "#druckFarbePlastikkarte",
    name: "druckdatenRückseiteSelect",
    options: ["UnbedrucktWeiß", "farbigSchwarz", "MehrfarbendruckEuroskala", "SonderfarbenVeredelung"],
    labelName: "Druckdaten Rückseite"
  },

  druckFarbePlastikkarte: {
    type: "block",
    appendTo: "#firstBlock",
    name: "druckFarbePlastikkarte",
    labelName: "Druck/Farbe Plastikkarte",
    options: ["druckdatenVorderseiteInput", "druckdatenRückseiteInput", "druckdatenVorderseiteSelect", "druckdatenRückseiteSelect"]
  },

  /* checkboxes */

  checkboxKontaktchip: {
    type: "input",
    inputType: "checkbox",
    appendTo: "#kartenoptionen",
    name: "checkboxKontaktchip",
    labelName: "Kontaktchip / Prozessorchip"
  },

  checkboxMagnetstreifen: {
    type: "input",
    inputType: "checkbox",
    appendTo: "#kartenoptionen",
    name: "checkboxMagnetstreifen",
    labelName: "Magnetstreifen"
  },

  checkboxPersonalisierung: {
    type: "input",
    inputType: "checkbox",
    appendTo: "#kartenoptionen",
    name: "checkboxPersonalisierung",
    labelName: "Personalisierung"
  },

  checkboxStatischerText: {
    type: "input",
    inputType: "checkbox",
    appendTo: "#kartenoptionen",
    name: "checkboxStatischerText",
    labelName: "Statischer Text"
  },

  checkboxNummerierung: {
    type: "input",
    inputType: "checkbox",
    appendTo: "#kartenoptionen",
    name: "checkboxNummerierung",
    labelName: "Nummerierung / Fortl. Nummerierung"
  },

  checkboxBarcode: {
    type: "input",
    inputType: "checkbox",
    appendTo: "#kartenoptionen",
    name: "checkboxBarcode",
    labelName: "Barcode"
  },

  checkboxTRW: {
    type: "input",
    inputType: "checkbox",
    appendTo: "#kartenoptionen",
    name: "checkboxTRW",
    labelName: "TRW (Thermo-Rewrite)"
  },

  checkboxUnterschriftenfeld: {
    type: "input",
    inputType: "checkbox",
    appendTo: "#kartenoptionen",
    name: "checkboxUnterschriftenfeld",
    labelName: "Unterschriftenfeld"
  },

  checkboxHologramme: {
    type: "input",
    inputType: "checkbox",
    appendTo: "#kartenoptionen",
    name: "checkboxHologramme",
    labelName: "Standardhologramm / Endlosmotiv"
  },

  checkboxCliploch: {
    type: "input",
    inputType: "checkbox",
    appendTo: "#kartenoptionen",
    name: "checkboxCliploch",
    labelName: "Cliploch"
  },

  checkboxBlindenschrift: {
    type: "input",
    inputType: "checkbox",
    appendTo: "#kartenoptionen",
    name: "checkboxBlindenschrift",
    labelName: "Blindenschrift / Brailleschrift"
  },

  checkboxRubbelfeld: {
    type: "input",
    inputType: "checkbox",
    appendTo: "#kartenoptionen",
    name: "checkboxRubbelfeld",
    labelName: "Rubbelfeld / Scratch-Off"
  },

  kartenoptionen: {
    type: "checkbox",
    appendTo: "#firstBlock",
    labelName: "Kartenoptionen",
    name: "kartenoptionen",
    options: ["checkboxKontaktchip", "checkboxMagnetstreifen", "checkboxPersonalisierung", "checkboxStatischerText", "checkboxNummerierung", "checkboxBarcode", "checkboxTRW", "checkboxUnterschriftenfeld", "checkboxHologramme", "checkboxCliploch", "checkboxBlindenschrift", "checkboxRubbelfeld"]
  },

  firstBlock: {
    type: "block",
    appendTo: "#wrapper",
    name: "firstBlock",
    options: ["kartenspezifikationen", "druckFarbePlastikkarte", "kartenoptionen"]
  },

  bauform: {
    type: "select",
    appendTo: "#wrapper",
    name: "bauform",
    options: ["plastikkarten"],
    labelName: "Bauform"
  }
}

// const aditionalObject = {
//   individualChiplageRfidHybrid: {
//     id: 7,
//     type: "block",
//     appendTo: "#chiplageRfIdHybrid",
//     name: "individualChiplageRfidHybrid",
//     nextShownElement: "firstBlock",
//     options: ["individualChiplageRfidHybridBreite", "individualChiplageRfidHybridHöhe", "individualChiplageRfidHybridPositionX", "individualChiplageRfidHybridPositionY"],
//     optionName: "Individuelle Chiplage",
//     labelName: "Individuelle Chiplage"
//   },

//   chiplageRfIdHybrid: {
//     id: 6,
//     type: 'select',
//     appendTo: "#wrapper",
//     name: "chiplageRfIdHybrid",
//     nextShownElement: "firstBlock",
//     options: [mainObject[ObenRechts], mainObject[UntenRechts], mainObject[ObenLinks], mainObject[UntenLinks], mainObject[individualChiplageRfidHybrid]],
//     labelName: "Chiplage"
//   }
// }

export default mainObject;
//export { aditionalObject };
