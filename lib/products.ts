// Generado automáticamente desde el API público de RIMAN (cart-api.riman.com)
// Fecha de captura: 2026-07-23
// No editar a mano: regenerar con scripts/gen-products.js

export interface Product {
  id: number;
  name: string;
  brand: string;
  line: string;
  menu: string;
  categories: number[];
  price: number | null;
  image: string;
  imageAlt: string | null;
  gallery: string[];
  description: string;
  shortDescription: string;
  isPackage: boolean;
  bestsellerRank: number | null;
  kit: string[];
}

export const CATEGORY = { SKINCARE: 5, PERSONAL_CARE: 6, WELLNESS: 7, MONTHLY: 8, BESTSELLERS: 9 } as const;

export const RITUAL_IDS: number[] = [52817,53375,53376,53374,53356,53372,53373,53357,52823];

export const PRODUCTS: Product[] = [
  {
    "id": 52747,
    "name": "ICD Radiansome™100 Microfluidizer Essence",
    "brand": "ICD",
    "line": "ICD Radiansome",
    "menu": "Serums & Toners",
    "categories": [
      5
    ],
    "price": 120,
    "image": "https://cdn.rimanbuild.com/Incellderm/Radiansome/Radiansome2026/RADIANSOME100MICROFLUIDIZERESSENCE/TL_Radiansome100Essence_DFLT.png",
    "imageAlt": "https://cdn.rimanbuild.com/Incellderm/Radiansome/Radiansome2026/RADIANSOME100MICROFLUIDIZERESSENCE/TR_Radiansome100Essence_DFLT.png",
    "gallery": [
      "https://cdn.rimanbuild.com/Incellderm/Radiansome/Radiansome2026/RADIANSOME100MICROFLUIDIZERESSENCE/TL_Radiansome100Essence_DFLT.png",
      "https://cdn.rimanbuild.com/Incellderm/Radiansome/Radiansome2026/RADIANSOME100MICROFLUIDIZERESSENCE/TR_Radiansome100Essence_DFLT.png",
      "https://cdn.rimanbuild.com/Incellderm/Radiansome/Radiansome2026/RADIANSOME100MICROFLUIDIZERESSENCE/BL_Radiansome100Essence_DFLT.png",
      "https://cdn.rimanbuild.com/Incellderm/Radiansome/Radiansome2026/RADIANSOME100MICROFLUIDIZERESSENCE/BR_Radiansome100Essence_DFLT.png"
    ],
    "description": "An essence developed with a microfluidized liposomal formula to support a clear, radiant-looking complexion and a firmer looking appearance.",
    "shortDescription": "An essence developed with a microfluidized liposomal formula to support a clear, radiant-looking complexion and a firmer looking appearance.",
    "isPackage": false,
    "bestsellerRank": null,
    "kit": []
  },
  {
    "id": 52745,
    "name": "ICD Radiansome™100 Microfluidizer Cream",
    "brand": "ICD",
    "line": "ICD Radiansome",
    "menu": "Moisturizers",
    "categories": [
      5,
      9
    ],
    "price": 100,
    "image": "https://cdn.rimanbuild.com/Incellderm/Radiansome/Radiansome2026/MICROFLUIDIZERCREAM/TL_Radiansome100Cream_DFLT.png",
    "imageAlt": "https://cdn.rimanbuild.com/Incellderm/Radiansome/Radiansome2026/MICROFLUIDIZERCREAM/TR_Radiansome100Cream_DFLT.png",
    "gallery": [
      "https://cdn.rimanbuild.com/Incellderm/Radiansome/Radiansome2026/MICROFLUIDIZERCREAM/TL_Radiansome100Cream_DFLT.png",
      "https://cdn.rimanbuild.com/Incellderm/Radiansome/Radiansome2026/MICROFLUIDIZERCREAM/TR_Radiansome100Cream_DFLT.png",
      "https://cdn.rimanbuild.com/Incellderm/Radiansome/Radiansome2026/MICROFLUIDIZERCREAM/BL_Radiansome100Cream_DFLT.png",
      "https://cdn.rimanbuild.com/Incellderm/Radiansome/Radiansome2026/MICROFLUIDIZERCREAM/BR_Radiansome100Cream_DFLT.png"
    ],
    "description": "A rich cream powered by microfluidizes liposomes to deliver innate radiance and firmer elasticity.",
    "shortDescription": "A rich cream powered by microfluidizes liposomes to deliver innate radiance and firmer elasticity.",
    "isPackage": false,
    "bestsellerRank": 1,
    "kit": []
  },
  {
    "id": 52743,
    "name": "ICD Radiansome™100 Microfluidizer Toner",
    "brand": "ICD",
    "line": "ICD Radiansome",
    "menu": "Serums & Toners",
    "categories": [
      5,
      9
    ],
    "price": 80,
    "image": "https://cdn.rimanbuild.com/Incellderm/Radiansome/Radiansome2026/RADIANSOME100MICROFLUIDIZERTONER/TL_Radiansome100Toner_DFLT.png",
    "imageAlt": "https://cdn.rimanbuild.com/Incellderm/Radiansome/Radiansome2026/RADIANSOME100MICROFLUIDIZERTONER/TR_Radiansome100Toner_DFLT.png",
    "gallery": [
      "https://cdn.rimanbuild.com/Incellderm/Radiansome/Radiansome2026/RADIANSOME100MICROFLUIDIZERTONER/TL_Radiansome100Toner_DFLT.png",
      "https://cdn.rimanbuild.com/Incellderm/Radiansome/Radiansome2026/RADIANSOME100MICROFLUIDIZERTONER/TR_Radiansome100Toner_DFLT.png",
      "https://cdn.rimanbuild.com/Incellderm/Radiansome/Radiansome2026/RADIANSOME100MICROFLUIDIZERTONER/BL_Radiansome100Toner_DFLT.png",
      "https://cdn.rimanbuild.com/Incellderm/Radiansome/Radiansome2026/RADIANSOME100MICROFLUIDIZERTONER/BR_Radiansome100Toner_DFLT.png"
    ],
    "description": "A toner developed with a microfluidized liposomal formula to support a dewy-looking complexion.",
    "shortDescription": "A toner developed with a microfluidized liposomal formula to support a dewy-looking complexion.",
    "isPackage": false,
    "bestsellerRank": 2,
    "kit": []
  },
  {
    "id": 52817,
    "name": "ICD Cleansing Experience Kit (3 Items)",
    "brand": "ICD",
    "line": "ICD",
    "menu": "Rituals",
    "categories": [
      5
    ],
    "price": 36,
    "image": "https://cdn.rimanbuild.com/Incellderm/EX/ExperienceKits/US/CEK/TH_NAM-Cleansing-EXP-Kit-01.png",
    "imageAlt": null,
    "gallery": [
      "https://cdn.rimanbuild.com/Incellderm/EX/ExperienceKits/US/CEK/TH_NAM-Cleansing-EXP-Kit-01.png"
    ],
    "description": "As the first tenet of K-beauty, cleanse like never before with RIMAN - share the power of a k-beauty double cleanse or stock-up on travel minis for yourself with our ALL-NEW Cleansing Kit! Features the much-anticipated Moisture Cleansing Oil travel size, the ALL-NEW Balancing Gel Cleanser, and a RIMAN classic exfoliator, the Cleansing Powder Wash.",
    "shortDescription": "As the first tenet of K-beauty, cleanse like never before with RIMAN - share the power of a k-beauty double cleanse or stock-up on travel mi",
    "isPackage": false,
    "bestsellerRank": null,
    "kit": []
  },
  {
    "id": 53154,
    "name": "Moisture Layer Sunscreen",
    "brand": "ICD",
    "line": "ICD",
    "menu": "Makeup",
    "categories": [
      5,
      8
    ],
    "price": 36,
    "image": "https://cdn.rimanbuild.com/Incellderm/EX/MoistureLayerSunScreenBroadSpectrumSPF50/NAM/TL_MoistureLayerSunScreenSPF50DEFAULT_1023.png",
    "imageAlt": "https://cdn.rimanbuild.com/Incellderm/EX/MoistureLayerSunScreenBroadSpectrumSPF50/NAM/TR_MoistureLayerSunScreenSPF50DEFAULT_1023.png",
    "gallery": [
      "https://cdn.rimanbuild.com/Incellderm/EX/MoistureLayerSunScreenBroadSpectrumSPF50/NAM/TL_MoistureLayerSunScreenSPF50DEFAULT_1023.png",
      "https://cdn.rimanbuild.com/Incellderm/EX/MoistureLayerSunScreenBroadSpectrumSPF50/NAM/TR_MoistureLayerSunScreenSPF50DEFAULT_1023.png",
      "https://cdn.rimanbuild.com/Incellderm/EX/MoistureLayerSunScreenBroadSpectrumSPF50/NAM/BL_MoistureLayerSunScreenSPF50DEFAULT_1023.png",
      "https://cdn.rimanbuild.com/Incellderm/EX/MoistureLayerSunScreenBroadSpectrumSPF50/NAM/BR_MoistureLayerSunScreenSPF50DEFAULT_1118.png"
    ],
    "description": "LIGHTWEIGHT, BROAD SPECTRUM PROTECTION WITH A BOOST OF HYDRATION. This moisturizing sunscreen provides Broad Spectrum (SPF 50+) protection against harmful UVA/UVB rays, all while infusing the skin with elasticity-enhancing and skin-brightening ingredients. Completed primary skin irritation testing and epiocular testing; no potential for skin or eye irritation. 50 mL / 1.69 fl. oz",
    "shortDescription": "LIGHTWEIGHT, BROAD SPECTRUM PROTECTION WITH A BOOST OF HYDRATION. This moisturizing sunscreen provides Broad Spectrum (SPF 50+) protection a",
    "isPackage": false,
    "bestsellerRank": null,
    "kit": []
  },
  {
    "id": 52785,
    "name": "ICD Balancing Gel Cleanser",
    "brand": "ICD",
    "line": "ICD",
    "menu": "Cleansers",
    "categories": [
      5
    ],
    "price": 29,
    "image": "https://cdn.rimanbuild.com/Incellderm/BalancingGelCleanser/TL_BalancingGelCleanser.png",
    "imageAlt": "https://cdn.rimanbuild.com/Incellderm/EX/BalancingGelCleanser/NAM/ICG_NAM_Frame6.png",
    "gallery": [
      "https://cdn.rimanbuild.com/Incellderm/BalancingGelCleanser/TL_BalancingGelCleanser.png",
      "https://cdn.rimanbuild.com/Incellderm/EX/BalancingGelCleanser/NAM/ICG_NAM_Frame6.png",
      "https://cdn.rimanbuild.com/Incellderm/EX/BalancingGelCleanser/NAM/ICG_NAM_Frame7.png",
      "https://cdn.rimanbuild.com/Incellderm/EX/BalancingGelCleanser/NAM/ICG_NAM_Frame9.png"
    ],
    "description": "A gentle, daily gel cleanser containing Giant ByoungPool(tm) that removes impurities and maintains oil-moisture balance, leaving skin feeling fresh. 120 g / 4.23 oz.",
    "shortDescription": "A gentle, daily gel cleanser containing Giant ByoungPool(tm) that removes impurities and maintains oil-moisture balance, leaving skin feelin",
    "isPackage": false,
    "bestsellerRank": null,
    "kit": []
  },
  {
    "id": 54538,
    "name": "ICD Sheer Glow BB",
    "brand": "ICD",
    "line": "ICD",
    "menu": "Makeup",
    "categories": [
      5
    ],
    "price": 29,
    "image": "https://cdn.rimanbuild.com/Incellderm/ICD/SheerGlowBB/Thumnail_TL_SheerGlowBB.png",
    "imageAlt": "https://cdn.rimanbuild.com/Incellderm/ICD/SheerGlowBB/Thumnail_TR_SheerGlowBB.jpg",
    "gallery": [
      "https://cdn.rimanbuild.com/Incellderm/ICD/SheerGlowBB/Thumnail_TL_SheerGlowBB.png",
      "https://cdn.rimanbuild.com/Incellderm/ICD/SheerGlowBB/Thumnail_TR_SheerGlowBB.jpg",
      "https://cdn.rimanbuild.com/Incellderm/ICD/SheerGlowBB/Thumnail_BL_SheerGlowBB.jpg",
      "https://cdn.rimanbuild.com/Incellderm/ICD/SheerGlowBB/Thumnail_BR_SheerGlowBB.jpg"
    ],
    "description": "BEAUTIFULLY HIGHLIGHT THE SKIN YOU’RE IN WITH A LIGHT COVERAGE GLOW. A BB cream that moisturizes and illuminates the skin while evening skin tone and texture. It provides natural, light coverage to showcase an even, healthy complexion. 30 g / 1.05 oz.",
    "shortDescription": "BEAUTIFULLY HIGHLIGHT THE SKIN YOU’RE IN WITH A LIGHT COVERAGE GLOW. A BB cream that moisturizes and illuminates the skin while evening skin",
    "isPackage": false,
    "bestsellerRank": null,
    "kit": []
  },
  {
    "id": 53170,
    "name": "Suamel Nourishing Body Cream (Original Scent - Morning Garden)",
    "brand": "Botalab",
    "line": "Suamel",
    "menu": "Body Care",
    "categories": [
      6
    ],
    "price": 29,
    "image": "https://cdn.rimanbuild.com/Botalab/Suamel/SuamelNourishingBodyCream/NAM/Morning Garden/BBM-IMG-02-TL.png",
    "imageAlt": "https://cdn.rimanbuild.com/Botalab/Suamel/SuamelNourishingBodyCream/NAM/Morning Garden/BBM-IMG-TR.png",
    "gallery": [
      "https://cdn.rimanbuild.com/Botalab/Suamel/SuamelNourishingBodyCream/NAM/Morning Garden/BBM-IMG-02-TL.png",
      "https://cdn.rimanbuild.com/Botalab/Suamel/SuamelNourishingBodyCream/NAM/Morning Garden/BBM-IMG-TR.png",
      "https://cdn.rimanbuild.com/Botalab/Suamel/SuamelNourishingBodyCream/NAM/Morning Garden/BBM-IMG-BL.png",
      "https://cdn.rimanbuild.com/Botalab/Suamel/SuamelNourishingBodyCream/BR_SuamelNourishingBodyCream_DFLT.png"
    ],
    "description": "INTENSELY HYDRATING AND REJUVENATING BODY CREAM FOR OVERALL SKIN HEALTH This cream is a total dream: the rich, whipped texture of this cream provides instant moisturization to the skin, infusing it with nutrients for an overall healthy glow without a residual greasy feeling. 250 ml / 8.45 fl.oz",
    "shortDescription": "INTENSELY HYDRATING AND REJUVENATING BODY CREAM FOR OVERALL SKIN HEALTH This cream is a total dream: the rich, whipped texture of this cream",
    "isPackage": false,
    "bestsellerRank": null,
    "kit": []
  },
  {
    "id": 54387,
    "name": "Beauty Collagen",
    "brand": "Lifening",
    "line": "Lifening",
    "menu": "Supplements",
    "categories": [
      7,
      9
    ],
    "price": 99,
    "image": "https://cdn.rimanbuild.com/Lifening/Lifening/Beauty CollagenEX_2025_US/TL_BeautyCollagenEX_25_US.png",
    "imageAlt": "https://cdn.rimanbuild.com/Lifening/Lifening/Beauty CollagenEX_2025_US/BL_BeautyCollagenEX_25_US.png",
    "gallery": [
      "https://cdn.rimanbuild.com/Lifening/Lifening/Beauty CollagenEX_2025_US/TL_BeautyCollagenEX_25_US.png",
      "https://cdn.rimanbuild.com/Lifening/Lifening/Beauty CollagenEX_2025_US/BL_BeautyCollagenEX_25_US.png",
      "https://cdn.rimanbuild.com/Lifening/Lifening/Beauty CollagenEX_2025_US/TR_BeautyCollagenEX_25_US.png",
      "https://cdn.rimanbuild.com/Lifening/Lifening/Beauty CollagenEX_2025_US/BR_BeautyCollagenEX_25_US.png"
    ],
    "description": "COLLAGEN AND ANTIOXIDANT SUPPORT FOR HEALTHY BEAUTY FROM THE INSIDE OUT. This concentratred ampoule contains exclusive low molecular weight, Type I collagen peptides, alongside biotin, hyaluronic acid, and selenium and glutathione for well-rounded skincare you can sip on. 700 ml / 28 serving 23.66 fl.oz. / 25 ml",
    "shortDescription": "COLLAGEN AND ANTIOXIDANT SUPPORT FOR HEALTHY BEAUTY FROM THE INSIDE OUT. This concentratred ampoule contains exclusive low molecular weight,",
    "isPackage": false,
    "bestsellerRank": 3,
    "kit": []
  },
  {
    "id": 53166,
    "name": "Suamel Nourishing Body Wash",
    "brand": "Botalab",
    "line": "Suamel",
    "menu": "Body Care",
    "categories": [
      6
    ],
    "price": 35,
    "image": "https://cdn.rimanbuild.com/Botalab/Suamel/SuamelNourishingBodyWash/TL_SuamelNourishingBodyWash_DFLT.png",
    "imageAlt": "https://cdn.rimanbuild.com/Botalab/Suamel/SuamelNourishingBodyWash/TR_SuamelNourishingBodyWash_DFLT.png",
    "gallery": [
      "https://cdn.rimanbuild.com/Botalab/Suamel/SuamelNourishingBodyWash/TL_SuamelNourishingBodyWash_DFLT.png",
      "https://cdn.rimanbuild.com/Botalab/Suamel/SuamelNourishingBodyWash/TR_SuamelNourishingBodyWash_DFLT.png",
      "https://cdn.rimanbuild.com/Botalab/Suamel/SuamelNourishingBodyWash/BL_SuamelNourishingBodyWash_DFLT.png",
      "https://cdn.rimanbuild.com/Botalab/Suamel/SuamelNourishingBodyWash/BR_SuamelNourishingBodyWash_DFLT.gif"
    ],
    "description": "BODY WASH WITH DENSE FOAM FOR A GENTLE, YET EFFECTIVE, CLEANSING EXPERIENCE A moment of bubbly bliss for your skin: this body wash cleanses and revitalizes the skin, removing dirt and impurities while leaving a healthy, moisturized glow. 500 ml / 16.9 fl.oz",
    "shortDescription": "BODY WASH WITH DENSE FOAM FOR A GENTLE, YET EFFECTIVE, CLEANSING EXPERIENCE A moment of bubbly bliss for your skin: this body wash cleanses ",
    "isPackage": false,
    "bestsellerRank": null,
    "kit": []
  },
  {
    "id": 53375,
    "name": "Signature RIMAN Ritual",
    "brand": "ICD",
    "line": "ICD",
    "menu": "Rituals",
    "categories": [
      5,
      2
    ],
    "price": 380,
    "image": "https://cdn.rimanbuild.com/Rituals/NAM/SIG/Signature_Riman_Ritual_Webpage_v2_kk-02.jpg",
    "imageAlt": null,
    "gallery": [
      "https://cdn.rimanbuild.com/Rituals/NAM/SIG/Signature_Riman_Ritual_Webpage_v2_kk-02.jpg"
    ],
    "description": "Our signature solution to radiant, glowing skin. 1 Moisture Cleansing Oil 1 Snow Enzyme Cleanser EX 1 Cleansing Powder Wash 1 Calming Balance Gel 1 Two-Phase Oil Mist 1 Dermatology First Package 1 Dermatology Cream 1 Moisture Layer Sunscreen",
    "shortDescription": "Our signature solution to radiant, glowing skin. 1 Moisture Cleansing Oil 1 Snow Enzyme Cleanser EX 1 Cleansing Powder Wash 1 Calming Balanc",
    "isPackage": true,
    "bestsellerRank": null,
    "kit": [
      "ICD Dermatology Cream",
      "Snow Enzyme Cleanser EX",
      "ICD Dermatology First Package",
      "ICD Cleansing Powder Wash",
      "ICD Calming Balance Gel",
      "ICD Two-Phase Oil Mist",
      "Moisture Layer Sunscreen",
      "ICD Moisture Cleansing Oil"
    ]
  },
  {
    "id": 53376,
    "name": "Advanced RIMAN Ritual",
    "brand": "ICD",
    "line": "ICD",
    "menu": "Rituals",
    "categories": [
      5,
      2
    ],
    "price": 365,
    "image": "https://cdn.rimanbuild.com/Rituals/NAM/ADV/NAM_Adv-Ritual_WP-02.png",
    "imageAlt": null,
    "gallery": [
      "https://cdn.rimanbuild.com/Rituals/NAM/ADV/NAM_Adv-Ritual_WP-02.png"
    ],
    "description": "Our revamped Radiansome™100 formulas were created with the utmost care and respect for the original formulas you love, while elevating performance, stability, and overall skin benefits through the latest advancements in formulation science. The ALL-NEW Radiansome™100 offers a smooth, luxurious skin feel and robust skin nourishment for luminosity inside and out. Still 100% Nanoliposomal – now even MORE refined. We utilized our patented Microfluidizer Processor again, but not just once, as was the case for the original formulas – the new Radiansome™100 have been run upwards of 7x through, producing flexible liposomes – these microscopic magicians are enhanced in their resiliency, smoothness, and formula feel, depositing key ingredients onto the skin in a whole new way. 1 Moisture Cleansing O",
    "shortDescription": "Our revamped Radiansome™100 formulas were created with the utmost care and respect for the original formulas you love, while elevating perfo",
    "isPackage": true,
    "bestsellerRank": null,
    "kit": [
      "ICD Radiansome™100 Microfluidizer Cream",
      "ICD Radiansome™100 Microfluidizer Toner",
      "ICD Radiansome™100 Microfluidizer Essence",
      "ICD Moisture Cleansing Oil",
      "Snow Enzyme Cleanser EX"
    ]
  },
  {
    "id": 53374,
    "name": "Essential Double Cleanse RIMAN Ritual - Cleansing Powder Wash",
    "brand": "ICD",
    "line": "ICD",
    "menu": "Rituals",
    "categories": [
      5,
      2
    ],
    "price": 237,
    "image": "https://cdn.rimanbuild.com/Rituals/NAM/2026/EDC/CPW/CA/Essential_Powder_Wash_Double_Cleanse_RIMAN_Ritual_Webpage_as-02.png",
    "imageAlt": null,
    "gallery": [
      "https://cdn.rimanbuild.com/Rituals/NAM/2026/EDC/CPW/CA/Essential_Powder_Wash_Double_Cleanse_RIMAN_Ritual_Webpage_as-02.png"
    ],
    "description": "The mini double cleanse ritual to reveal a more radiant you. 1 Moisture Cleansing Oil 1 Cleansing Powder Wash 1 Dermatology First Package 1 Dermatology Cream",
    "shortDescription": "The mini double cleanse ritual to reveal a more radiant you. 1 Moisture Cleansing Oil 1 Cleansing Powder Wash 1 Dermatology First Package 1 ",
    "isPackage": true,
    "bestsellerRank": null,
    "kit": [
      "ICD Moisture Cleansing Oil",
      "ICD Cleansing Powder Wash",
      "ICD Dermatology First Package",
      "ICD Dermatology Cream"
    ]
  },
  {
    "id": 53356,
    "name": "Essential Double Cleanse RIMAN Ritual - Balancing Gel Cleanser",
    "brand": "ICD",
    "line": "ICD",
    "menu": "Rituals",
    "categories": [
      5,
      2
    ],
    "price": 230,
    "image": "https://cdn.rimanbuild.com/Rituals/NAM/2026/EDC/IGC/EDC-IGC-WI-NAM.png",
    "imageAlt": null,
    "gallery": [
      "https://cdn.rimanbuild.com/Rituals/NAM/2026/EDC/IGC/EDC-IGC-WI-NAM.png"
    ],
    "description": "A quick and convenient double cleanse ritual to reveal a more radiant you, featuring our all-new Balancing Gel Cleanser. Indulge in a purifying cleansing experience that maintains sebum control and visibly tighter pores. 1 Moisture Cleansing Oil 1 Balancing Gel Cleanser 1 Dermatology First Package 1 Dermatology Cream",
    "shortDescription": "A quick and convenient double cleanse ritual to reveal a more radiant you, featuring our all-new Balancing Gel Cleanser. Indulge in a purify",
    "isPackage": true,
    "bestsellerRank": null,
    "kit": [
      "ICD Moisture Cleansing Oil",
      "ICD Balancing Gel Cleanser",
      "ICD Dermatology First Package",
      "ICD Dermatology Cream"
    ]
  },
  {
    "id": 53372,
    "name": "Essential RIMAN Ritual",
    "brand": "ICD",
    "line": "ICD",
    "menu": "Rituals",
    "categories": [
      5,
      2
    ],
    "price": 230,
    "image": "https://cdn.rimanbuild.com/Rituals/NAM/ESS/Essential_RIMAN_Ritual_Webpage_v2_kk-02.jpg",
    "imageAlt": null,
    "gallery": [
      "https://cdn.rimanbuild.com/Rituals/NAM/ESS/Essential_RIMAN_Ritual_Webpage_v2_kk-02.jpg"
    ],
    "description": "The mini-ritual to reveal a more radiant you. 1 Snow Enzyme Cleanser EX 1 Dermatology First Package 1 Dermatology Cream 1 Moisture Layer Sunscreen",
    "shortDescription": "The mini-ritual to reveal a more radiant you. 1 Snow Enzyme Cleanser EX 1 Dermatology First Package 1 Dermatology Cream 1 Moisture Layer Sun",
    "isPackage": true,
    "bestsellerRank": null,
    "kit": [
      "ICD Dermatology First Package",
      "ICD Dermatology Cream",
      "Snow Enzyme Cleanser EX",
      "Moisture Layer Sunscreen"
    ]
  },
  {
    "id": 53373,
    "name": "Essential Double Cleanse RIMAN Ritual - Snow Enzyme",
    "brand": "ICD",
    "line": "ICD",
    "menu": "Rituals",
    "categories": [
      5,
      2
    ],
    "price": 230,
    "image": "https://cdn.rimanbuild.com/Rituals/NAM/2026/EDC/SE/CA/CA-Essential_Snow_Enzyme_Double_Cleanse_RIMAN_Ritual_Webpage_as-02.png",
    "imageAlt": null,
    "gallery": [
      "https://cdn.rimanbuild.com/Rituals/NAM/2026/EDC/SE/CA/CA-Essential_Snow_Enzyme_Double_Cleanse_RIMAN_Ritual_Webpage_as-02.png"
    ],
    "description": "The mini double cleanse ritual to reveal a more radiant you. 1 Moisture Cleansing Oil 1 Snow Enzyme Cleanser EX 1 Dermatology First Package 1 Dermatology Cream",
    "shortDescription": "The mini double cleanse ritual to reveal a more radiant you. 1 Moisture Cleansing Oil 1 Snow Enzyme Cleanser EX 1 Dermatology First Package ",
    "isPackage": true,
    "bestsellerRank": null,
    "kit": [
      "ICD Dermatology First Package",
      "ICD Moisture Cleansing Oil",
      "Snow Enzyme Cleanser EX",
      "ICD Dermatology Cream"
    ]
  },
  {
    "id": 53357,
    "name": "BooSeBoo Essential Bundle",
    "brand": "ICD",
    "line": "ICD",
    "menu": "Rituals",
    "categories": [
      5,
      2
    ],
    "price": 165,
    "image": "https://cdn.rimanbuild.com/Rituals/NAM/2026/BSB/RIMAN_BooSeBoo-Essentials__Web-Image_v1_NL.png",
    "imageAlt": null,
    "gallery": [
      "https://cdn.rimanbuild.com/Rituals/NAM/2026/BSB/RIMAN_BooSeBoo-Essentials__Web-Image_v1_NL.png"
    ],
    "description": "Meet your skin’s new obsession: a glow-boosting bundle featuring RIMAN’s First Dermatology Package and Dermatology Cream—designed to deeply nourish, strengthen, and visibly elevate your skin from the very first use. Bundle includes: 1 Dermatology First Package 1 Dermatology Cream",
    "shortDescription": "Meet your skin’s new obsession: a glow-boosting bundle featuring RIMAN’s First Dermatology Package and Dermatology Cream—designed to deeply ",
    "isPackage": true,
    "bestsellerRank": null,
    "kit": [
      "ICD Dermatology First Package",
      "ICD Dermatology Cream"
    ]
  },
  {
    "id": 52823,
    "name": "ICD Expert Experience Kit",
    "brand": "ICD",
    "line": "ICD",
    "menu": "Rituals",
    "categories": [
      5
    ],
    "price": 119,
    "image": "https://cdn.rimanbuild.com/Incellderm/EX/ExperienceKits/US/ERK/TH_NAM-Expert-EXP-Kit-03.png",
    "imageAlt": null,
    "gallery": [
      "https://cdn.rimanbuild.com/Incellderm/EX/ExperienceKits/US/ERK/TH_NAM-Expert-EXP-Kit-03.png"
    ],
    "description": "Enjoy or share our ICD Dermatology Expert RIMAN Ritual with the relaunched formulations and rebranded packaging. NOW INCLUDES: much-requested miniature of the Moisture Cleansing Oil and the NEW Balancing Gel Cleanser.",
    "shortDescription": "Enjoy or share our ICD Dermatology Expert RIMAN Ritual with the relaunched formulations and rebranded packaging. NOW INCLUDES: much-requeste",
    "isPackage": false,
    "bestsellerRank": null,
    "kit": []
  },
  {
    "id": 53140,
    "name": "ICD Dermatology First Package",
    "brand": "ICD",
    "line": "ICD",
    "menu": "Serums & Toners",
    "categories": [
      5,
      9
    ],
    "price": 99,
    "image": "https://cdn.rimanbuild.com/Incellderm/EX/DermatologyFirstPackage/TL_DermatologyFirstPackage_DFLT.png",
    "imageAlt": "https://cdn.rimanbuild.com/Incellderm/EX/DermatologyFirstPackage/TR_DermatologyFirstPackage_DFLT.png",
    "gallery": [
      "https://cdn.rimanbuild.com/Incellderm/EX/DermatologyFirstPackage/TL_DermatologyFirstPackage_DFLT.png",
      "https://cdn.rimanbuild.com/Incellderm/EX/DermatologyFirstPackage/TR_DermatologyFirstPackage_DFLT.png",
      "https://cdn.rimanbuild.com/Incellderm/EX/DermatologyFirstPackage/BL_DermatologyFirstPackage_DFLT.png",
      "https://cdn.rimanbuild.com/Incellderm/EX/DermatologyFirstPackage/BR_DermatologyFirstPackage_DFLT.gif"
    ],
    "description": "BOOSTER AND SERUM DUO FOR INTENSE HYDRATION AND SKIN NOURISHMENT. This booster and serum work together to brighten the skin, restore strength, and improve elasticity that is lost over time, all while nourishing and protecting the skin. DERMATOLOGY BOOSTER 130 ml / 4.39 fl. oz. DERMATOLOGY SERUM 45 ml / 1.52 fl. oz.",
    "shortDescription": "BOOSTER AND SERUM DUO FOR INTENSE HYDRATION AND SKIN NOURISHMENT. This booster and serum work together to brighten the skin, restore strengt",
    "isPackage": false,
    "bestsellerRank": 4,
    "kit": []
  },
  {
    "id": 53150,
    "name": "Collagen 100 Melting Mask",
    "brand": "ICD",
    "line": "ICD",
    "menu": "Moisturizers",
    "categories": [
      5,
      9
    ],
    "price": 69,
    "image": "https://cdn.rimanbuild.com/Incellderm/EX/Collagen100MeltingMask/TL_Collagen100MeltingMask_DFLT.png",
    "imageAlt": "https://cdn.rimanbuild.com/Incellderm/EX/Collagen100MeltingMask/TR_Collagen100MeltingMask_DFLT.png",
    "gallery": [
      "https://cdn.rimanbuild.com/Incellderm/EX/Collagen100MeltingMask/TL_Collagen100MeltingMask_DFLT.png",
      "https://cdn.rimanbuild.com/Incellderm/EX/Collagen100MeltingMask/TR_Collagen100MeltingMask_DFLT.png",
      "https://cdn.rimanbuild.com/Incellderm/EX/Collagen100MeltingMask/BL_Collagen100MeltingMask_DFLT.png",
      "https://cdn.rimanbuild.com/Incellderm/EX/Collagen100MeltingMask/BR_Collagen100MeltingMask_DFLT.png"
    ],
    "description": "SPECIALIZED TREATMENT FOR DERMAL SUPPORT. Fast absorbing, 100% collagen mask that melts into the face for bouncy, luminous skin. 2.5 x 6 sheets",
    "shortDescription": "SPECIALIZED TREATMENT FOR DERMAL SUPPORT. Fast absorbing, 100% collagen mask that melts into the face for bouncy, luminous skin. 2.5 x 6 she",
    "isPackage": false,
    "bestsellerRank": 5,
    "kit": []
  },
  {
    "id": 53142,
    "name": "ICD Dermatology Cream",
    "brand": "ICD",
    "line": "ICD",
    "menu": "Moisturizers",
    "categories": [
      5,
      9
    ],
    "price": 66,
    "image": "https://cdn.rimanbuild.com/Incellderm/EX/DermatologyCream/TL_DermatologyCream_DFLT.png",
    "imageAlt": "https://cdn.rimanbuild.com/Incellderm/EX/DermatologyCream/TR_DermatologyCream_DFLT.png",
    "gallery": [
      "https://cdn.rimanbuild.com/Incellderm/EX/DermatologyCream/TL_DermatologyCream_DFLT.png",
      "https://cdn.rimanbuild.com/Incellderm/EX/DermatologyCream/TR_DermatologyCream_DFLT.png",
      "https://cdn.rimanbuild.com/Incellderm/EX/DermatologyCream/BL_DermatologyCream_DFLT.gif",
      "https://cdn.rimanbuild.com/Incellderm/EX/DermatologyCream/BR_DermatologyCream_DFLT.png"
    ],
    "description": "A RICH, FAST-ABSORBING FACE CREAM. A unique, hypoallergenic hydrating cream that infuses moisture and nutrients deep into the skin, resulting in an unparalleled, glowing complexion. 50 ml / 1.69 fl. oz",
    "shortDescription": "A RICH, FAST-ABSORBING FACE CREAM. A unique, hypoallergenic hydrating cream that infuses moisture and nutrients deep into the skin, resultin",
    "isPackage": false,
    "bestsellerRank": 6,
    "kit": []
  },
  {
    "id": 53144,
    "name": "ICD Calming Balance Gel",
    "brand": "ICD",
    "line": "ICD",
    "menu": "Serums & Toners",
    "categories": [
      5,
      8
    ],
    "price": 39,
    "image": "https://cdn.rimanbuild.com/Incellderm/EX/CalmingBalanceGel/TL_CalmingBalanceGel_DFLT1.png",
    "imageAlt": "https://cdn.rimanbuild.com/Incellderm/EX/CalmingBalanceGel/TR_CalmingBalanceGel_20251223.jpg",
    "gallery": [
      "https://cdn.rimanbuild.com/Incellderm/EX/CalmingBalanceGel/TL_CalmingBalanceGel_DFLT1.png",
      "https://cdn.rimanbuild.com/Incellderm/EX/CalmingBalanceGel/TR_CalmingBalanceGel_20251223.jpg",
      "https://cdn.rimanbuild.com/Incellderm/EX/CalmingBalanceGel/BL_CalmingBalanceGel_DFLT.png",
      "https://cdn.rimanbuild.com/Incellderm/EX/CalmingBalanceGel/BR_CalmingBalanceGel_DFLT.gif"
    ],
    "description": "A LIGHTWEIGHT, HYDRATING GEL TO SOOTHE AND REJUVINATE THE SKIN. A water-based gel with Damask rose water and calming ingredients that restore skin balance, helping combat the effects of seasonal changes. Comforts and soothes while reducing redness. 100 ml / 3.38 fl.oz",
    "shortDescription": "A LIGHTWEIGHT, HYDRATING GEL TO SOOTHE AND REJUVINATE THE SKIN. A water-based gel with Damask rose water and calming ingredients that restor",
    "isPackage": false,
    "bestsellerRank": null,
    "kit": []
  },
  {
    "id": 53146,
    "name": "ICD Two-Phase Oil Mist",
    "brand": "ICD",
    "line": "ICD",
    "menu": "Serums & Toners",
    "categories": [
      5,
      9
    ],
    "price": 39,
    "image": "https://cdn.rimanbuild.com/Incellderm/EX/TwoPhaseOilMist/TL_TwoPhaseOilMist_DFLT.png",
    "imageAlt": "https://cdn.rimanbuild.com/Incellderm/EX/TwoPhaseOilMist/TR_TwoPhaseOilMist_DFLT.png",
    "gallery": [
      "https://cdn.rimanbuild.com/Incellderm/EX/TwoPhaseOilMist/TL_TwoPhaseOilMist_DFLT.png",
      "https://cdn.rimanbuild.com/Incellderm/EX/TwoPhaseOilMist/TR_TwoPhaseOilMist_DFLT.png",
      "https://cdn.rimanbuild.com/Incellderm/EX/TwoPhaseOilMist/BL_TwoPhaseOilMist_DFLT.png",
      "https://cdn.rimanbuild.com/Incellderm/EX/TwoPhaseOilMist/BR_TwoPhaseOilMist_DFLT.png"
    ],
    "description": "THE PERFECT GLOW-ENHANCING FACE MIST TO LOCK IN MOISTURE. A rich, hydrating mist that combines the powerful moisture of oil with the nourishment of vitamins to provide radiant, dewy skin. 50 ml/ 1.69 fl.oz.",
    "shortDescription": "THE PERFECT GLOW-ENHANCING FACE MIST TO LOCK IN MOISTURE. A rich, hydrating mist that combines the powerful moisture of oil with the nourish",
    "isPackage": false,
    "bestsellerRank": 7,
    "kit": []
  },
  {
    "id": 53152,
    "name": "ICD Cleansing Powder Wash",
    "brand": "ICD",
    "line": "ICD",
    "menu": "Cleansers",
    "categories": [
      5
    ],
    "price": 36,
    "image": "https://cdn.rimanbuild.com/Incellderm/EX/CleansingPowderWash/TL_CleansingPowderWash_DFLT.png",
    "imageAlt": "https://cdn.rimanbuild.com/Incellderm/EX/CleansingPowderWash/TR_CleansingPowderWash_DFLT.png",
    "gallery": [
      "https://cdn.rimanbuild.com/Incellderm/EX/CleansingPowderWash/TL_CleansingPowderWash_DFLT.png",
      "https://cdn.rimanbuild.com/Incellderm/EX/CleansingPowderWash/TR_CleansingPowderWash_DFLT.png",
      "https://cdn.rimanbuild.com/Incellderm/EX/CleansingPowderWash/BL_CleansingPowderWash_DFLT.png",
      "https://cdn.rimanbuild.com/Incellderm/EX/CleansingPowderWash/BR_CleansingPowderWash_DFLT.gif"
    ],
    "description": "WATER-ACTIVATED, POWDER CLEANSER FOR BRIGHTER SKIN TEXTURE A plant-derived, powder-based enzymatic cleanser that gently whisks away dead skin cells and impurities. Gentle acids help balance the skin and papain enzymes remove impurities – resulting in moisturized, healthy, energized skin. 80 g / 2.82 oz.",
    "shortDescription": "WATER-ACTIVATED, POWDER CLEANSER FOR BRIGHTER SKIN TEXTURE A plant-derived, powder-based enzymatic cleanser that gently whisks away dead ski",
    "isPackage": false,
    "bestsellerRank": null,
    "kit": []
  },
  {
    "id": 53156,
    "name": "ICD Moisture Cleansing Oil",
    "brand": "ICD",
    "line": "ICD",
    "menu": "Cleansers",
    "categories": [
      5
    ],
    "price": 36,
    "image": "https://cdn.rimanbuild.com/Incellderm/EX/MoistureCleansingOil/TL_MoistureCleansingOil_DFLT.png",
    "imageAlt": "https://cdn.rimanbuild.com/Incellderm/EX/MoistureCleansingOil/TR_MoistureCleansingOil_DFLT.png",
    "gallery": [
      "https://cdn.rimanbuild.com/Incellderm/EX/MoistureCleansingOil/TL_MoistureCleansingOil_DFLT.png",
      "https://cdn.rimanbuild.com/Incellderm/EX/MoistureCleansingOil/TR_MoistureCleansingOil_DFLT.png",
      "https://cdn.rimanbuild.com/Incellderm/EX/MoistureCleansingOil/BL_MoistureCleansingOil_DFLT.png",
      "https://cdn.rimanbuild.com/Incellderm/EX/MoistureCleansingOil/BR_MoistureCleansingOil_DFLT.png"
    ],
    "description": "DEEP, YET GENTLE CLEANSING THAT BRIGHTENS AND MOISTURIZES WITH EVERY USE. A cleansing oil that leaves skin clean, smooth, and radiant. The unique oil base delivers rich moisture without oversaturating the skin. 145 ml / 4.90 fl. oz.",
    "shortDescription": "DEEP, YET GENTLE CLEANSING THAT BRIGHTENS AND MOISTURIZES WITH EVERY USE. A cleansing oil that leaves skin clean, smooth, and radiant. The u",
    "isPackage": false,
    "bestsellerRank": null,
    "kit": []
  },
  {
    "id": 53195,
    "name": "ICD Makeup Set & Stay Makeup Spray",
    "brand": "ICD",
    "line": "ICD",
    "menu": "Makeup",
    "categories": [
      5,
      10
    ],
    "price": 33,
    "image": "https://cdn.rimanbuild.com/Incellderm/ICD/SetStayMakeupSpray/TL_SetStayMakeupSpray_DFLT.png",
    "imageAlt": "https://cdn.rimanbuild.com/Incellderm/ICD/SetStayMakeupSpray/TR_SetStayMakeupSpray_DFLT.jpg",
    "gallery": [
      "https://cdn.rimanbuild.com/Incellderm/ICD/SetStayMakeupSpray/TL_SetStayMakeupSpray_DFLT.png",
      "https://cdn.rimanbuild.com/Incellderm/ICD/SetStayMakeupSpray/TR_SetStayMakeupSpray_DFLT.jpg",
      "https://cdn.rimanbuild.com/Incellderm/ICD/SetStayMakeupSpray/BL_SetStayMakeupSpray_DFLT.jpg",
      "https://cdn.rimanbuild.com/Incellderm/ICD/SetStayMakeupSpray/BR_SetStayMakeupSpray_DFLT.jpg"
    ],
    "description": "STAY #RIMANRADIANT ALL DAY LONG! This moisturizing setting spray revitalizes tired skin while improving the longevity of your makeup for a glow that won't budge. 80 ml / 2.7 fl. oz.",
    "shortDescription": "STAY #RIMANRADIANT ALL DAY LONG! This moisturizing setting spray revitalizes tired skin while improving the longevity of your makeup for a g",
    "isPackage": false,
    "bestsellerRank": null,
    "kit": []
  },
  {
    "id": 53148,
    "name": "ICD Multi Stick Balm",
    "brand": "ICD",
    "line": "ICD",
    "menu": "Moisturizers",
    "categories": [
      5,
      9,
      8
    ],
    "price": 29,
    "image": "https://cdn.rimanbuild.com/Incellderm/EX/MultiStickBalm/TL_MultiStickBalm_DFLT.png",
    "imageAlt": "https://cdn.rimanbuild.com/Incellderm/EX/MultiStickBalm/TR_MultiStickBalm_DFLT.png",
    "gallery": [
      "https://cdn.rimanbuild.com/Incellderm/EX/MultiStickBalm/TL_MultiStickBalm_DFLT.png",
      "https://cdn.rimanbuild.com/Incellderm/EX/MultiStickBalm/TR_MultiStickBalm_DFLT.png",
      "https://cdn.rimanbuild.com/Incellderm/EX/MultiStickBalm/BL_MultiStickBalm_DFLT.png",
      "https://cdn.rimanbuild.com/Incellderm/EX/MultiStickBalm/BR_MultiStickBalm_DFLT.png"
    ],
    "description": "A MOISTURIZING, ALL-OVER BALM FOR NOURISHMENT ON THE GO. A multi-use, moisturizing stick balm that provides intense hydration, helping to minimize the appearance of fine lines and uneven skin tone 9 g / 0.31 oz.",
    "shortDescription": "A MOISTURIZING, ALL-OVER BALM FOR NOURISHMENT ON THE GO. A multi-use, moisturizing stick balm that provides intense hydration, helping to mi",
    "isPackage": false,
    "bestsellerRank": 8,
    "kit": []
  },
  {
    "id": 53158,
    "name": "Snow Enzyme Cleanser EX",
    "brand": "ICD",
    "line": "ICD",
    "menu": "Cleansers",
    "categories": [
      5
    ],
    "price": 29,
    "image": "https://cdn.rimanbuild.com/Incellderm/EX/SnowEnzymeCleanserEX2024/TL_SnowEnzyme_DFLT.png",
    "imageAlt": "https://cdn.rimanbuild.com/Incellderm/EX/SnowEnzymeCleanserEX2024/TR_SnowEnzyme_DFLT.jpg",
    "gallery": [
      "https://cdn.rimanbuild.com/Incellderm/EX/SnowEnzymeCleanserEX2024/TL_SnowEnzyme_DFLT.png",
      "https://cdn.rimanbuild.com/Incellderm/EX/SnowEnzymeCleanserEX2024/TR_SnowEnzyme_DFLT.jpg",
      "https://cdn.rimanbuild.com/Incellderm/EX/SnowEnzymeCleanserEX2024/BL_SnowEnzyme_DFLT.png",
      "https://cdn.rimanbuild.com/Incellderm/EX/SnowEnzymeCleanserEX2024/BR_SnowEnzyme_DFLT.gif"
    ],
    "description": "UNIQUE, ENZYME-INFUSED, HYDRATING CLEANSER Soft and gentle cleansing: powerful enzymes deliver mild exfoliation, removing dead skin cells and impurities while leaving skin clear and infused with moisture. 120 g / 4.23 oz.",
    "shortDescription": "UNIQUE, ENZYME-INFUSED, HYDRATING CLEANSER Soft and gentle cleansing: powerful enzymes deliver mild exfoliation, removing dead skin cells an",
    "isPackage": false,
    "bestsellerRank": null,
    "kit": []
  },
  {
    "id": 53178,
    "name": "ICD Makeup Glow Up Lip Oil",
    "brand": "ICD",
    "line": "ICD",
    "menu": "Makeup",
    "categories": [
      5,
      10
    ],
    "price": 29,
    "image": "https://cdn.rimanbuild.com/Incellderm/ICD/GlowUpLipOil/TL_GlowUpLipOil_DFLT.png",
    "imageAlt": "https://cdn.rimanbuild.com/Incellderm/ICD/GlowUpLipOil/TR_GlowUpLipOil_DFLT.png",
    "gallery": [
      "https://cdn.rimanbuild.com/Incellderm/ICD/GlowUpLipOil/TL_GlowUpLipOil_DFLT.png",
      "https://cdn.rimanbuild.com/Incellderm/ICD/GlowUpLipOil/TR_GlowUpLipOil_DFLT.png",
      "https://cdn.rimanbuild.com/Incellderm/ICD/GlowUpLipOil/BL_GlowUpLipOil_DFLT.png",
      "https://cdn.rimanbuild.com/Incellderm/ICD/GlowUpLipOil/BR_GlowUpLipOil_DFLT.png"
    ],
    "description": "Moisturizing lip treatment with noticeable shine for lip nourishment, day or night.",
    "shortDescription": "Moisturizing lip treatment with noticeable shine for lip nourishment, day or night.",
    "isPackage": false,
    "bestsellerRank": null,
    "kit": []
  },
  {
    "id": 53180,
    "name": "ICD Makeup Butter Lip Tint Semi Matte",
    "brand": "ICD",
    "line": "ICD",
    "menu": "Makeup",
    "categories": [
      5,
      10
    ],
    "price": 29,
    "image": "https://cdn.rimanbuild.com/Incellderm/ICD/ButterLipSemiMatte_Parent/TL_SemiMatteGlobalSwatch_DFLT.png",
    "imageAlt": "https://cdn.rimanbuild.com/Incellderm/ICD/ButterLipSemiMatte_Parent/TR_SemiMatteGlobalSwatch_DFLT.png",
    "gallery": [
      "https://cdn.rimanbuild.com/Incellderm/ICD/ButterLipSemiMatte_Parent/TL_SemiMatteGlobalSwatch_DFLT.png",
      "https://cdn.rimanbuild.com/Incellderm/ICD/ButterLipSemiMatte_Parent/TR_SemiMatteGlobalSwatch_DFLT.png",
      "https://cdn.rimanbuild.com/Incellderm/ICD/ButterLipSemiMatte_Parent/BL_SemiMatteGlobalSwatch_DFLT.png",
      "https://cdn.rimanbuild.com/Incellderm/ICD/ButterLipSemiMatte_Parent/BR_SemiMatteGlobalSwatch_DFLT.png"
    ],
    "description": "LASTING COLOR. LASTING LIP CARE. Low viscosity but high intensity lip butters for robust, long-lasting kisses of color with a subtle shine that lasts all day.",
    "shortDescription": "LASTING COLOR. LASTING LIP CARE. Low viscosity but high intensity lip butters for robust, long-lasting kisses of color with a subtle shine t",
    "isPackage": true,
    "bestsellerRank": null,
    "kit": [
      "ICD BEAUTY Butter Lip Tint Semi Matte (03 Brick Red)",
      "ICD BEAUTY Butter Lip Tint Semi Matte (04 Evening Rose)",
      "ICD BEAUTY Butter Lip Tint Semi Matte (07 Dusky Mauve)"
    ]
  },
  {
    "id": 53184,
    "name": "ICD Makeup Butter Lip Tint Velvet Matte",
    "brand": "ICD",
    "line": "ICD",
    "menu": "Makeup",
    "categories": [
      5,
      10
    ],
    "price": 29,
    "image": "https://cdn.rimanbuild.com/Incellderm/ICD/ButterLipVelvetMatte_Parent/TL_VelvetMatteGlobalSwatch_DFLT.png",
    "imageAlt": "https://cdn.rimanbuild.com/Incellderm/ICD/ButterLipVelvetMatte_Parent/TR_VelvetMatteGlobalSwatch-2_DFLT.png",
    "gallery": [
      "https://cdn.rimanbuild.com/Incellderm/ICD/ButterLipVelvetMatte_Parent/TL_VelvetMatteGlobalSwatch_DFLT.png",
      "https://cdn.rimanbuild.com/Incellderm/ICD/ButterLipVelvetMatte_Parent/TR_VelvetMatteGlobalSwatch-2_DFLT.png",
      "https://cdn.rimanbuild.com/Incellderm/ICD/ButterLipVelvetMatte_Parent/BL_VelvetMatteGlobalSwatch_NAM.jpg",
      "https://cdn.rimanbuild.com/Incellderm/ICD/ButterLipVelvetMatte_Parent/BR_VelvetMatteGlobalSwatch_DFLT.png"
    ],
    "description": "LASTING COLOR. LASTING LIP CARE. Cloud-like lip butters for robust, long-lasting kisses of matte color without drying or cracking.",
    "shortDescription": "LASTING COLOR. LASTING LIP CARE. Cloud-like lip butters for robust, long-lasting kisses of matte color without drying or cracking.",
    "isPackage": true,
    "bestsellerRank": null,
    "kit": [
      "ICD BEAUTY Butter Lip Tint Velvet Matte (13 Signature Red)",
      "ICD BEAUTY Butter Lip Tint Velvet Matte (15 Symphony Pink)",
      "ICD Makeup Butter Lip Tint Velvet Matte (19 Desert Heat)",
      "ICD Makeup Butter Lip Tint Velvet Matte (23 Nude Lush)",
      "11 Velvet Cabernet",
      "17 Dusty Petal",
      "ICD BEAUTY Butter Lip Tint Velvet Matte (22 Blushing Apricot)",
      "ICD BEAUTY Butter Lip Tint Velvet Matte (26 Sunset Canyon)",
      "ICD BEAUTY Butter Lip Tint Velvet Matte (35 Coral Lace)",
      "ICD BEAUTY Butter Lip Tint Velvet Matte (53 Cherry Pink)"
    ]
  },
  {
    "id": 53164,
    "name": "Deserticola Plus Hair Oil Serum",
    "brand": "Botalab",
    "line": "Deserticola",
    "menu": "Hair Care",
    "categories": [
      6,
      9
    ],
    "price": 39,
    "image": "https://cdn.rimanbuild.com/Botalab/Deserticola/DeserticolaPlusHairOilSerum/TL_DeserticolaPlusHairOilSerum_DFLT.png",
    "imageAlt": "https://cdn.rimanbuild.com/Botalab/Deserticola/DeserticolaPlusHairOilSerum/TR_DeserticolaPlusHairOilSerum_DFLT.png",
    "gallery": [
      "https://cdn.rimanbuild.com/Botalab/Deserticola/DeserticolaPlusHairOilSerum/TL_DeserticolaPlusHairOilSerum_DFLT.png",
      "https://cdn.rimanbuild.com/Botalab/Deserticola/DeserticolaPlusHairOilSerum/TR_DeserticolaPlusHairOilSerum_DFLT.png",
      "https://cdn.rimanbuild.com/Botalab/Deserticola/DeserticolaPlusHairOilSerum/BL_DeserticolaPlusHairOilSerum_DFLT.png",
      "https://cdn.rimanbuild.com/Botalab/Deserticola/DeserticolaPlusHairOilSerum/BR_DeserticolaPlusHairOilSerum_DFLT.gif"
    ],
    "description": "NOURISHING HAIR OIL THAT REPAIRS FOR AN INTENSE SHINE A luxe but lightweight multi-tasker: concentrated hair oil serum that makes dry and damaged hair soft, silky, and voluminous, with no residue or clumping 100 ml / 3.38 fl.oz",
    "shortDescription": "NOURISHING HAIR OIL THAT REPAIRS FOR AN INTENSE SHINE A luxe but lightweight multi-tasker: concentrated hair oil serum that makes dry and da",
    "isPackage": false,
    "bestsellerRank": 9,
    "kit": []
  },
  {
    "id": 53160,
    "name": "Deserticola Plus Shampoo",
    "brand": "Botalab",
    "line": "Deserticola",
    "menu": "Hair Care",
    "categories": [
      6
    ],
    "price": 37,
    "image": "https://cdn.rimanbuild.com/Botalab/Deserticola/DeserticolaPlusShampoo/TL_DeserticolaPlusShampoo_DFLT.png",
    "imageAlt": "https://cdn.rimanbuild.com/Botalab/Deserticola/DeserticolaPlusShampoo/TR_DeserticolaPlusShampoo_DFLT.png",
    "gallery": [
      "https://cdn.rimanbuild.com/Botalab/Deserticola/DeserticolaPlusShampoo/TL_DeserticolaPlusShampoo_DFLT.png",
      "https://cdn.rimanbuild.com/Botalab/Deserticola/DeserticolaPlusShampoo/TR_DeserticolaPlusShampoo_DFLT.png",
      "https://cdn.rimanbuild.com/Botalab/Deserticola/DeserticolaPlusShampoo/BL_DeserticolaPlusShampoo_DFLT.jpg",
      "https://cdn.rimanbuild.com/Botalab/Deserticola/DeserticolaPlusShampoo/BR_DeserticolaPlusShampoo_DFLT.png"
    ],
    "description": "NOURISHING, CLEANSING EXPERIENCE THAT IMPROVES HAIR DENSITY A cleaner way to clean your hair: this shampoo removes excess sebum and build-up from the scalp with a dense, rich foam, adding shine and elasticity to hair post-wash. 500 ml / 16.9 fl.oz.",
    "shortDescription": "NOURISHING, CLEANSING EXPERIENCE THAT IMPROVES HAIR DENSITY A cleaner way to clean your hair: this shampoo removes excess sebum and build-up",
    "isPackage": false,
    "bestsellerRank": null,
    "kit": []
  },
  {
    "id": 53168,
    "name": "Suamel Nourishing Body Cream (Relaxing Sunday Scent)",
    "brand": "Botalab",
    "line": "Suamel",
    "menu": "Body Care",
    "categories": [
      6
    ],
    "price": 29,
    "image": "https://cdn.rimanbuild.com/Botalab/Suamel/SuamelNourishingBodyCream/TL_SuamelNourishingBodyCream_DFLT.png",
    "imageAlt": "https://cdn.rimanbuild.com/Botalab/Suamel/SuamelNourishingBodyCream/TR_SuamelNourishingBodyCream_DFLT.png",
    "gallery": [
      "https://cdn.rimanbuild.com/Botalab/Suamel/SuamelNourishingBodyCream/TL_SuamelNourishingBodyCream_DFLT.png",
      "https://cdn.rimanbuild.com/Botalab/Suamel/SuamelNourishingBodyCream/TR_SuamelNourishingBodyCream_DFLT.png",
      "https://cdn.rimanbuild.com/Botalab/Suamel/SuamelNourishingBodyCream/BL_SuamelNourishingBodyCream_DFLT.png",
      "https://cdn.rimanbuild.com/Botalab/Suamel/SuamelNourishingBodyCream/BR_SuamelNourishingBodyCream_DFLT.png"
    ],
    "description": "INTENSELY HYDRATING AND REJUVENATING BODY CREAM FOR OVERALL SKIN HEALTH This cream is a total dream: the rich, whipped texture of this cream provides instant moisturization to the skin, infusing it with nutrients for an overall healthy glow without a residual greasy feeling. 250 ml / 8.45 fl.oz",
    "shortDescription": "INTENSELY HYDRATING AND REJUVENATING BODY CREAM FOR OVERALL SKIN HEALTH This cream is a total dream: the rich, whipped texture of this cream",
    "isPackage": false,
    "bestsellerRank": null,
    "kit": []
  },
  {
    "id": 53172,
    "name": "Deep Talk Plus",
    "brand": "Lifening",
    "line": "Lifening",
    "menu": "Supplements",
    "categories": [
      7,
      9,
      8
    ],
    "price": 75,
    "image": "https://cdn.rimanbuild.com/Lifening/Lifening/DeepTalkPlus/Deep Talk Plus_2025_US/TL_DeepTalkPlus_DFLT.png",
    "imageAlt": "https://cdn.rimanbuild.com/Lifening/Lifening/DeepTalkPlus/Deep Talk Plus_2025_US/TR_DeepTalkPlus_DFLT.png",
    "gallery": [
      "https://cdn.rimanbuild.com/Lifening/Lifening/DeepTalkPlus/Deep Talk Plus_2025_US/TL_DeepTalkPlus_DFLT.png",
      "https://cdn.rimanbuild.com/Lifening/Lifening/DeepTalkPlus/Deep Talk Plus_2025_US/TR_DeepTalkPlus_DFLT.png",
      "https://cdn.rimanbuild.com/Lifening/Lifening/DeepTalkPlus/Deep Talk Plus_2025_US/BL_DeepTalkPlus_DFLT.png",
      "https://cdn.rimanbuild.com/Lifening/Lifening/DeepTalkPlus/Deep Talk Plus_2025_US/BR_DeepTalkPlus_DFLT.png"
    ],
    "description": "NATURAL PSYLLIUM HUSK FIBER SUPPLEMENT Your gut is the foundation for all of your body’s systems; if your gut is imbalanced or unhealthy, you will be, too. Deep Talk Plus restores balance to your gut while providing powerful detoxification benefits in convenient, single-serve packaging. As a result, you won’t just feel like yourself - you’ll feel better and more energized. 5.5 g x 28 (154 g)",
    "shortDescription": "NATURAL PSYLLIUM HUSK FIBER SUPPLEMENT Your gut is the foundation for all of your body’s systems; if your gut is imbalanced or unhealthy, yo",
    "isPackage": false,
    "bestsellerRank": 10,
    "kit": []
  },
  {
    "id": 53197,
    "name": "ICD Makeup Luminous Glow Cushion",
    "brand": "ICD",
    "line": "ICD",
    "menu": "Makeup",
    "categories": [
      5,
      10
    ],
    "price": 59,
    "image": "https://cdn.rimanbuild.com/Incellderm/ICD/LuminousGlowCushion_Parent/TL_LuminousGlowCushion_DFLT.png",
    "imageAlt": "https://cdn.rimanbuild.com/Incellderm/ICD/LuminousGlowCushion_Parent/TR_LuminousGlowCushion_DFLT.png",
    "gallery": [
      "https://cdn.rimanbuild.com/Incellderm/ICD/LuminousGlowCushion_Parent/TL_LuminousGlowCushion_DFLT.png",
      "https://cdn.rimanbuild.com/Incellderm/ICD/LuminousGlowCushion_Parent/TR_LuminousGlowCushion_DFLT.png",
      "https://cdn.rimanbuild.com/Incellderm/ICD/LuminousGlowCushion_Parent/BL_LuminousGlowCushion_DFLT.png",
      "https://cdn.rimanbuild.com/Incellderm/ICD/LuminousGlowCushion_Parent/BR_LuminousGlowCushion_DFLT.png"
    ],
    "description": "A PERFECT BLEND OF SKINCARE AND MAKEUP. BUILDABLE COVERAGE WITH A GLOWY FINISH. Glow radiantly with this buildable cushion for light, dewy coverage. This luminous formula brightens skin while reflecting light in all the right areas, all while infusing it with nutrients and moisturizing factors. Includes 1 additional refill compact.",
    "shortDescription": "A PERFECT BLEND OF SKINCARE AND MAKEUP. BUILDABLE COVERAGE WITH A GLOWY FINISH. Glow radiantly with this buildable cushion for light, dewy c",
    "isPackage": true,
    "bestsellerRank": null,
    "kit": [
      "ICD Beauty Luminous Cushion 17 Fair",
      "ICD Beauty Luminous Cushion 21 light",
      "ICD Beauty Luminous Glow Cushion 23 Natural Beige",
      "ICD Beauty Luminous Glow Cushion 25 Tan",
      "ICD Beauty Luminous Glow Cushion 27 Deep"
    ]
  },
  {
    "id": 53162,
    "name": "Deserticola Plus Conditioner",
    "brand": "Botalab",
    "line": "Deserticola",
    "menu": "Hair Care",
    "categories": [
      6,
      9
    ],
    "price": 30,
    "image": "https://cdn.rimanbuild.com/Botalab/Deserticola/DeserticolaPlusConditioner/TL_DeserticolaPlusConditioner_DFLT.png",
    "imageAlt": "https://cdn.rimanbuild.com/Botalab/Deserticola/DeserticolaPlusConditioner/TR_DeserticolaPlusConditioner_DFLT.png",
    "gallery": [
      "https://cdn.rimanbuild.com/Botalab/Deserticola/DeserticolaPlusConditioner/TL_DeserticolaPlusConditioner_DFLT.png",
      "https://cdn.rimanbuild.com/Botalab/Deserticola/DeserticolaPlusConditioner/TR_DeserticolaPlusConditioner_DFLT.png",
      "https://cdn.rimanbuild.com/Botalab/Deserticola/DeserticolaPlusConditioner/BL_DeserticolaPlusConditioner_DFLT.png",
      "https://cdn.rimanbuild.com/Botalab/Deserticola/DeserticolaPlusConditioner/BR_DeserticolaPlusConditioner_DFLT.png"
    ],
    "description": "HAIR TREATMENT TO NOURISH STRANDS AND INCREASE HAIR DENSITY A water-to-cream treatment to transform your tresses: this treatment is not like your traditional conditioner; it contains a highly enriched ampoule that targets and repairs the scalp and hair for deep hydration and nourishment. The water-based formula turns into a cream and slightly warms as it is applied, providing a deep healing sensation while restoring hair moisture and shine. 300ml /10.14 fl.oz.",
    "shortDescription": "HAIR TREATMENT TO NOURISH STRANDS AND INCREASE HAIR DENSITY A water-to-cream treatment to transform your tresses: this treatment is not like",
    "isPackage": false,
    "bestsellerRank": 11,
    "kit": []
  }
];

export const BESTSELLERS: Product[] = PRODUCTS.filter((p) => p.bestsellerRank !== null).sort(
  (a, b) => (a.bestsellerRank ?? 99) - (b.bestsellerRank ?? 99)
);

export const RITUALS: Product[] = RITUAL_IDS.map((id) => PRODUCTS.find((p) => p.id === id)).filter(
  (p): p is Product => !!p
).sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
