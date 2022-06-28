import { TimeTableApi } from '@api/time-table-api';

export enum ContractTypeApi {
  CDI = 'CDI',
  CDD = 'CDD',
  EXTRA = 'EXTRA',
  FREELANCE = 'FREELANCE',
  SEASONAL = 'SEASONAL',
  TEMPORARY = 'TEMPORARY',
}

export enum MissionCategoryApi {
  ACCESS_CONTROL = 'ACCESS_CONTROL',
  ADMIN_HELP = 'ADMIN_HELP',
  ANIMATION_DEMONSTRATION = 'ANIMATION_DEMONSTRATION',
  AGRICULTURAL_EMPLOYEE = 'AGRICULTURAL_EMPLOYEE',
  BABY_SITTING = 'BABY_SITTING',
  CASH_AND_CARRY = 'CASH_AND_CARRY',
  COMMERCIAL_PROSPECTING = 'COMMERCIAL_PROSPECTING',
  CUSTOMER_SUPPORT = 'CUSTOMER_SUPPORT',
  DATA_ENTRY = 'DATA_ENTRY',
  DELIVERY = 'DELIVERY',
  DISH_WASHING = 'DISH_WASHING',
  DONOR_RECRUITER = 'DONOR_RECRUITER',
  FAST_FOOD = 'FAST_FOOD',
  HANDLING = 'HANDLING',
  HOST = 'HOST',
  HOST_VISITORS = 'HOST_VISITORS',
  INVENTORY = 'INVENTORY',
  LABELING_STOCK = 'LABELING_STOCK',
  LITTLE_HANDS = 'LITTLE_HANDS',
  LUXURY_SALE = 'LUXURY_SALE',
  MOVING = 'MOVING',
  ONLINE_SEARCH = 'ONLINE_SEARCH',
  PACKING = 'PACKING',
  SALES_ASSISTANT = 'SALES_ASSISTANT',
  SELF_SERVICE_MERCHANDISING = 'SELF_SERVICE_MERCHANDISING',
  SERVICE = 'SERVICE',
  STREET_MARKETING = 'STREET_MARKETING',
  TICKETING = 'TICKETING',
  VALET = 'VALET',
  WARDROBE = 'WARDROBE',
}

export enum MissionTaskApi {
  ASSEMBLY_DISASSEMBLY = 'ASSEMBLY_DISASSEMBLY',
  BABY_SITTING_CLEAN_UP = 'BABY_SITTING_CLEAN_UP',
  BABY_SITTING_COOKING = 'BABY_SITTING_COOKING',
  BABY_SITTING_ENTERTAINING = 'BABY_SITTING_ENTERTAINING',
  BABY_SITTING_HOMEWORK = 'BABY_SITTING_HOMEWORK',
  BABY_SITTING_OUTDOOR_ACTIVITIES = 'BABY_SITTING_OUTDOOR_ACTIVITIES',
  CASHING = 'CASHING',
  CATERING_BUFFET_SERVICE = 'CATERING_BUFFET_SERVICE',
  CATERING_DISH_WASHING_SERVICE = 'CATERING_DISH_WASHING_SERVICE',
  CATERING_DRINKS_SERVICE = 'CATERING_DRINKS_SERVICE',
  CATERING_INDOOR_SERVICE = 'CATERING_INDOOR_SERVICE',
  CATERING_OENOLOGY = 'CATERING_OENOLOGY',
  CATERING_SERVICE = 'CATERING_SERVICE',
  CATERING_TABLE_PREPARATION = 'CATERING_TABLE_PREPARATION',
  CLOAK_ROOM = 'CLOAK_ROOM',
  CUSTOMER_ACCESS_CONTROL = 'CUSTOMER_ACCESS_CONTROL',
  CUSTOMER_FEEDBACK_GATHERING = 'CUSTOMER_FEEDBACK_GATHERING',
  CUSTOMER_SUPPORT_DISPATCH_REQUESTS = 'CUSTOMER_SUPPORT_DISPATCH_REQUESTS',
  CUSTOMER_SUPPORT_PROCESS_ORAL_REQUESTS = 'CUSTOMER_SUPPORT_PROCESS_ORAL_REQUESTS',
  CUSTOMER_SUPPORT_PROCESS_WRITTEN_REQUESTS = 'CUSTOMER_SUPPORT_PROCESS_WRITTEN_REQUESTS',
  CUSTOMER_SUPPORT_REPORTING = 'CUSTOMER_SUPPORT_REPORTING',
  DATA_CLEANING = 'DATA_CLEANING',
  DATA_ENTRY = 'DATA_ENTRY',
  DATA_STRUCTURATION = 'DATA_STRUCTURATION',
  DATA_QUALIFICATION = 'DATA_QUALIFICATION',
  DOCUMENT_ARCHIVING = 'DOCUMENT_ARCHIVING',
  DOCUMENT_CLASSIFICATION = 'DOCUMENT_CLASSIFICATION',
  DOCUMENT_SCANNING = 'DOCUMENT_SCANNING',
  EVENT_CUSTOMER_RECEPTION = 'EVENT_CUSTOMER_RECEPTION',
  EVENT_PREPARATION = 'EVENT_PREPARATION',
  HOTEL_RECEPTION = 'HOTEL_RECEPTION',
  INVENTORY_COUNTING = 'INVENTORY_COUNTING',
  INVENTORY_LABELLING = 'INVENTORY_LABELLING',
  INVENTORY_MANAGEMENT = 'INVENTORY_MANAGEMENT',
  INVENTORY_MERCHANDISING = 'INVENTORY_MERCHANDISING',
  INVENTORY_STOCKING = 'INVENTORY_STOCKING',
  INVENTORY_VERIFICATION = 'INVENTORY_VERIFICATION',
  LOAD_LIFTING_MEDIUM_LOAD = 'LOAD_LIFTING_MEDIUM_LOAD',
  LOAD_LIFTING_HEAVY_LOAD = 'LOAD_LIFTING_HEAVY_LOAD',
  LOAD_LIFTING_VERY_HEAVY_LOAD = 'LOAD_LIFTING_VERY_HEAVY_LOAD',
  LOAD_MOVING = 'LOAD_MOVING',
  MARKETING_DEMONSTRATION = 'MARKETING_DEMONSTRATION',
  MARKETING_FLYER_DISTRIBUTION = 'MARKETING_FLYER_DISTRIBUTION',
  MARKETING_GOODIES_DISTRIBUTION = 'MARKETING_GOODIES_DISTRIBUTION',
  MARKETING_PRESENTATION = 'MARKETING_PRESENTATION',
  MARKETING_TASTING = 'MARKETING_TASTING',
  PACKING = 'PACKING',
  PACKING_COUNTING = 'PACKING_COUNTING',
  PACKING_DELIVERY = 'PACKING_DELIVERY',
  PACKING_DELIVERY_RECEPTION = 'PACKING_DELIVERY_RECEPTION',
  PACKING_LABELLING = 'PACKING_LABELLING',
  PROSPECTING_CONTACT_SEARCH = 'PROSPECTING_CONTACT_SEARCH',
  PROSPECTING_EMAILING = 'PROSPECTING_EMAILING',
  PROSPECTING_PHONING = 'PROSPECTING_PHONING',
  PROSPECTING_REPORTING = 'PROSPECTING_REPORTING',
  QUALITY_CONTROL = 'QUALITY_CONTROL',
  SALES_CUSTOMER_ADVICE = 'SALES_CUSTOMER_ADVICE',
  SALES_FOLDING_AND_BENDING = 'SALES_FOLDING_AND_BENDING',
  SALES_ITEM_EXCHANGE = 'SALES_ITEM_EXCHANGE',
  SALES_PETTY_CASH_CHECKING = 'SALES_PETTY_CASH_CHECKING',
  SORTING = 'SORTING',
  TICKETING = 'TICKETING',
  TIDYING_UP_AND_CLEANING = 'TIDYING_UP_AND_CLEANING',
  VALET_BAGGAGE_HANDLING = 'VALET_BAGGAGE_HANDLING',
  VALET_HAND_KEY = 'VALET_HAND_KEY',
}

export interface MissionLocationApi {
  /**
   * Address line 1.
   */
  addressLine1: string;

  /**
   * Zip code.
   */
  zipCode: string;
}

export enum MissionPaymentApiUnit {
  HOUR = 'HOUR',
  MISSION = 'MISSION',
}

export interface MissionPaymentApi {
  /**
   * Amount of remuneration in cents.
   */
  amount: number;

  /**
   * Unit of payment.
   */
  unit: MissionPaymentApiUnit;
}

/**
 * Represents the requirements expected from the doer.
 */
export interface MissionRequirementsApi {
  /**
   * Array of strings describing the expected attributes.
   */
  attributes: string[];

  /**
   * Array of strings describing the skills required.
   */
  skills: string[];

  /**
   * Array of strings describing the tools required.
   */
  tools: string[];
}

/**
 * Represents a mission.
 */
export interface MissionApi {
  /**
   * Timestamp of the datetime when the mission has been created.
   */
  createdAt: number;

  /**
   * Timestamp of the datetime when the mission has been updated for the last time.
   */
  updatedAt: number;

  /**
   * Id of the mission.
   */
  id: string;

  /**
   * Id of the agency associated.
   */
  agency: string;

  /**
   * Id of the client associated.
   */
  client: string;

  /**
   * Type of contract.
   */
  contractType: ContractTypeApi;

  /**
   * Human readable code representing the mission.
   */
  code: string;

  /**
   * Description.
   */
  description: string;

  /**
   * Location of the mission.
   */
  location: MissionLocationApi;

  /**
   * Category of the mission.
   */
  category: MissionCategoryApi;

  /**
   * Tasks to accomplish during the mission.
   */
  tasks: MissionTaskApi[];

  /**
   * Requirements expected from the doers.
   */
  requirements: MissionRequirementsApi;

  /**
   * Work schedule.
   */
  timeTable: TimeTableApi;

  /**
   * Payment.
   */
  payment: MissionPaymentApi;

  /**
   * Amount of doers to hire.
   */
  nbWorkers: number;

  /**
   * Status of the mission in the mission lifecycle.
   */
  status: string;

  /**
   * Amount paid by the client in cents.
   */
  amount: number;

  /**
   * Array of doers ids that have seen the mission from the chatbot.
   */
  seenBy: string[];

  /**
   * Array of doers ids that have applied to the mission.
   */
  applicants: string[];

  /**
   * Array of doers ids that have been hired for the mission.
   */
  hired: string[];
}
