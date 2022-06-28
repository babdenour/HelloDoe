const colors = {
  lightBlue: '#bcd2fb',
  darkBlue: '#88b6ca',
  red: '#f9dee4',
  lightYellow: '#faedd2',
  darkYellow: '#ebd4b3',
  green: '#c3e4d8',
  purple: '#cbc7fb',
};

const missionStyles = {
  ACCESS_CONTROL: { color: colors.darkBlue },
  ADMIN_HELP: { color: colors.green },
  ANIMATION_DEMONSTRATION: { color: colors.darkBlue },
  AGRICULTURAL_EMPLOYEE: { color: colors.purple },
  BABY_SITTING: { color: colors.red },
  CASH_AND_CARRY: { color: colors.lightBlue },
  COMMERCIAL_PROSPECTING: { color: colors.lightYellow },
  CUSTOMER_SUPPORT: { color: colors.lightBlue },
  DATA_ENTRY: { color: colors.green },
  DELIVERY: { color: colors.darkYellow },
  DISH_WASHING: { color: colors.darkBlue },
  DONOR_RECRUITER: { color: colors.red },
  FAST_FOOD: { color: colors.green },
  HANDLING: { color: colors.purple },
  HOST_VISITORS: { color: colors.purple },
  HOST: { color: colors.purple },
  INVENTORY: { color: colors.lightYellow },
  LABELING_STOCK: { color: colors.darkBlue },
  LITTLE_HANDS: { color: colors.green },
  LUXURY_SALE: { color: colors.red },
  MOVING: { color: colors.lightBlue },
  ONLINE_SEARCH: { color: colors.darkYellow },
  PACKING: { color: colors.lightBlue },
  SALES_ASSISTANT: { color: colors.green },
  SELF_SERVICE_MERCHANDISING: { color: colors.darkBlue },
  SERVICE: { color: colors.purple },
  STREET_MARKETING: { color: colors.red },
  TICKETING: { color: colors.lightYellow },
  VALET: { color: colors.lightYellow },
  WARDROBE: { color: colors.darkYellow },
  DEFAULT: { color: colors.purple },
};

export const getMissionStyle = (jobName: string): { color: string } => {
  if (jobName in missionStyles) {
    return missionStyles[jobName];
  }

  return missionStyles['DEFAULT'];
};
