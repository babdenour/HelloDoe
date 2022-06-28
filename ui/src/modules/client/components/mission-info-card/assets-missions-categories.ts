import ACCESS_CONTROL from '@assets/assetMissionCategory/ACCESS_CONTROL.png';
import ADMIN_HELP from '@assets/assetMissionCategory/ADMIN_HELP.png';
import AGRICULTURAL_EMPLOYEE from '@assets/assetMissionCategory/AGRICULTURAL_EMPLOYEE.png';
import ANIMATION_DEMONSTRATION from '@assets/assetMissionCategory/ANIMATION_DEMONSTRATION.png';
import BABY_SITTING from '@assets/assetMissionCategory/BABY_SITTING.png';
import CASH_AND_CARRY from '@assets/assetMissionCategory/CASH_AND_CARRY.png';
import COMMERCIAL_PROSPECTING from '@assets/assetMissionCategory/COMMERCIAL_PROSPECTING.png';
import CUSTOMER_SUPPORT from '@assets/assetMissionCategory/CUSTOMER_SUPPORT.png';
import DATA_ENTRY from '@assets/assetMissionCategory/DATA_ENTRY.png';
import DELIVERY from '@assets/assetMissionCategory/DELIVERY.png';
import DISH_WASHING from '@assets/assetMissionCategory/DISH_WASHING.png';
import DONOR_RECRUITER from '@assets/assetMissionCategory/DONOR_RECRUITER.png';
import FAST_FOOD from '@assets/assetMissionCategory/FAST_FOOD.png';
import HANDLING from '@assets/assetMissionCategory/HANDLING.png';
import HOST from '@assets/assetMissionCategory/HOST.png';
import HOST_VISITORS from '@assets/assetMissionCategory/HOST_VISITORS.png';
import INVENTORY from '@assets/assetMissionCategory/INVENTORY.png';
import LABELING_STOCK from '@assets/assetMissionCategory/LABELING_STOCK.png';
import LITTLE_HANDS from '@assets/assetMissionCategory/LITTLE_HANDS.png';
import LUXURY_SALE from '@assets/assetMissionCategory/LUXURY_SALE.png';
import MOVING from '@assets/assetMissionCategory/MOVING.png';
import ONLINE_SEARCH from '@assets/assetMissionCategory/ONLINE_SEARCH.png';
import PACKING from '@assets/assetMissionCategory/PACKING.png';
import SALES_ASSISTANT from '@assets/assetMissionCategory/SALES_ASSISTANT.png';
import SELF_SERVICE_MERCHANDISING from '@assets/assetMissionCategory/SELF_SERVICE_MERCHANDISING.png';
import SERVICE from '@assets/assetMissionCategory/SERVICE.png';
import STREET_MARKETING from '@assets/assetMissionCategory/STREET_MARKETING.png';
import TICKETING from '@assets/assetMissionCategory/TICKETING.png';
import VALET from '@assets/assetMissionCategory/VALET.png';
import WARDROBE from '@assets/assetMissionCategory/WARDROBE.png';

export const categoryColor = {
  lightBlue: '#bcd2fb',
  darkBlue: '#88b6ca',
  red: '#f9dee4',
  lightYellow: '#faedd2',
  darkYellow: '#ebd4b3',
  green: '#c3e4d8',
  purple: '#cbc7fb',
};

export const jobCategoryStyle = {
  ACCESS_CONTROL: { asset: ACCESS_CONTROL, color: categoryColor.darkBlue },
  ADMIN_HELP: { asset: ADMIN_HELP, color: categoryColor.green },
  ANIMATION_DEMONSTRATION: { asset: ANIMATION_DEMONSTRATION, color: categoryColor.darkBlue },
  AGRICULTURAL_EMPLOYEE: { asset: AGRICULTURAL_EMPLOYEE, color: categoryColor.purple },
  BABY_SITTING: { asset: BABY_SITTING, color: categoryColor.red },
  CASH_AND_CARRY: { asset: CASH_AND_CARRY, color: categoryColor.lightBlue },
  COMMERCIAL_PROSPECTING: { asset: COMMERCIAL_PROSPECTING, color: categoryColor.lightYellow },
  CUSTOMER_SUPPORT: { asset: CUSTOMER_SUPPORT, color: categoryColor.lightBlue },
  DATA_ENTRY: { asset: DATA_ENTRY, color: categoryColor.green },
  DELIVERY: { asset: DELIVERY, color: categoryColor.darkYellow },
  DISH_WASHING: { asset: DISH_WASHING, color: categoryColor.darkBlue },
  DONOR_RECRUITER: { asset: DONOR_RECRUITER, color: categoryColor.red },
  FAST_FOOD: { asset: FAST_FOOD, color: categoryColor.green },
  HANDLING: { asset: HANDLING, color: categoryColor.purple },
  HOST_VISITORS: { asset: HOST_VISITORS, color: categoryColor.purple },
  HOST: { asset: HOST, color: categoryColor.purple },
  INVENTORY: { asset: INVENTORY, color: categoryColor.lightYellow },
  LABELING_STOCK: { asset: LABELING_STOCK, color: categoryColor.darkBlue },
  LITTLE_HANDS: { asset: LITTLE_HANDS, color: categoryColor.green },
  LUXURY_SALE: { asset: LUXURY_SALE, color: categoryColor.red },
  MOVING: { asset: MOVING, color: categoryColor.lightBlue },
  ONLINE_SEARCH: { asset: ONLINE_SEARCH, color: categoryColor.darkYellow },
  PACKING: { asset: PACKING, color: categoryColor.lightBlue },
  SALES_ASSISTANT: { asset: SALES_ASSISTANT, color: categoryColor.green },
  SELF_SERVICE_MERCHANDISING: { asset: SELF_SERVICE_MERCHANDISING, color: categoryColor.darkBlue },
  SERVICE: { asset: SERVICE, color: categoryColor.purple },
  STREET_MARKETING: { asset: STREET_MARKETING, color: categoryColor.red },
  TICKETING: { asset: TICKETING, color: categoryColor.lightYellow },
  VALET: { asset: VALET, color: categoryColor.lightYellow },
  WARDROBE: { asset: WARDROBE, color: categoryColor.darkYellow },
  DEFAULT: { asset: HOST_VISITORS, color: categoryColor.purple },
};

export const getJobCategoryAssets = (jobName) => {
  if (jobName in jobCategoryStyle) {
    return jobCategoryStyle[jobName];
  } else {
    return jobCategoryStyle['DEFAULT'];
  }
};
