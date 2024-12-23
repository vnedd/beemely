export const SHIPPING_RULES = {
  WEIGHT: {
    LEVEL_1: { MAX: 500, PRICE: 15000 },
    LEVEL_2: { MAX: 1500, PRICE: 30000 },
    LEVEL_3: { MAX: 5000, PRICE: 50000 },
    LEVEL_4: { MAX: 10000, PRICE: 80000 },
    LEVEL_5: { MAX: 20000, PRICE: 150000 },
    LEVEL_6: { MAX: 30000, PRICE: 200000 },
    LEVEL_7: { MAX: 40000, PRICE: 300000 },
  },
  VOLUME_TO_WEIGHT_RATIO: 6000,
  EXTRA_CHARGE_PER_KG: 5000,
} as const;

export const MAX_LEVEL = SHIPPING_RULES.WEIGHT.LEVEL_7;
