import logoHelloDoeBlack from '@/assets/Logo-Round-Black-Messenger.png';
import { MissionInterface, TimeTableScheduleShift, TimeTableScheduleSlot } from '@/types/mission.interface';
import { Component, Vue, Watch } from 'vue-property-decorator';
import WithRender from './mission-webview-page.html?style=./mission-webview-page.scss';

interface NormalisedSlots {
  [k: string]: { displaySlot: DisplaySlot };
}
interface TextMonth {
  firstText: string;
  secondText: string;
  thirdText: string;
}
interface DisplayMonth {
  type: string;
  timestamp: number;
  textMonth: TextMonth;
  monthShortName: string;
  background: string;
}

interface DisplayWeek {
  type: string;
  timestamp: number;
  beginWeek: number;
  endWeek: number;
  month: string;
}

interface DisplayDay {
  type: string;
  timestamp: number;
  firstDisplayDay: string;
  dayShortName: string;
  dayNumberString: string;
  monthNumberString: string; // 3--> 03
  slot: DisplaySlot;
}

interface DisplaySlot {
  beginTime: number;
  endTime: number;
  type: string;
  timestamp: number;
  backgroundColor: string;
  emojiBegin: string;
  beginHourString: string; // 3-->for display = 03
  beginMinutesString: string; // ''
  emojiEnd: string;
  endHourString: string; // 3-->for display = 03
  endMinutesString: string; //''
}

@WithRender
@Component
export default class MissionTimetablePage extends Vue {
  mission: MissionInterface = null;
  normalisedSlots: NormalisedSlots = {};
  actualMonth = 0;
  calendar = {};
  activeMonth = '';
  listActifMonthPosition = {};
  missionTitle = {};
  timestampeOneDayMicroSec = 86400000;
  categoryEmoji = {
    ACCESS_CONTROL: '🔓',
    ADMIN_HELP: '📈',
    ANIMATION_DEMONSTRATION: '📣',
    ARGICULTURAL_EMPLOYEE: '🍇',
    BABY_SITTING: '👶',
    CASH_AND_CARRY: '💳',
    COMMERCIAL_PROSPECTING: '📞',
    CUSTOMER_SUPPORT: '☎️',
    DATA_ENTRY: '💻',
    DELIVERY: '🚲',
    DISH_WASHING: '🧽',
    DONOR_RECRUITER: '👋',
    FAST_FOOD: '🍔',
    HANDLING: '🔨',
    HOST: '🛎',
    HOST_VISITORS: '🙋‍♀️',
    INVENTORY: '🔡',
    LABELING_STOCK: '🏷',
    LITTLE_HANDS: '✋',
    LUXURY_SALE: '💍',
    MOVING: '💪',
    ONLINE_SEARCH: '🔍',
    PACKING: '📦',
    SAlES_ASSISTANT: '🛍',
    SELF_SERVICE_MERCHANDISING: '🛒',
    SERVICE: '🥂',
    STREET_MARKETING: '🎈',
    TICKETING: '🎟',
    VALET: '🚗',
    WARDROBE: '🎩',
  };
  textMonth = {
    0: {
      firstText: '',
      secondText: 'Janvier',
      thirdText: 'tout le monde mais maintenant, j’envie plus personne.',
    },
    1: { firstText: 'Ce froid, ça me ', secondText: 'février', thirdText: '.' },
    2: { firstText: 'On en a ', secondText: 'mars', thirdText: 'du covid.' },
    3: { firstText: 'En ', secondText: 'avril', thirdText: 'ne te découvre pas d’un string.' },
    4: { firstText: 'Oui ', secondText: 'mai', thirdText: ' gâtés.' },
    5: { firstText: 'Ça doit sûrement être un problème de ', secondText: 'juin', thirdText: '.' },
    6: { firstText: '', secondText: 'Juillet', thirdText: 'dit, mais il me croît pas.' },
    7: { firstText: "C'est", secondText: 'août', thirdText: 'tu veux, quand tu veux' },
    8: { firstText: 'Un, deux, trois, quatre, cinq, six,', secondText: 'septembre', thirdText: '' },
    9: { firstText: 'Quoi de neuf d’', secondText: 'octobre', thirdText: '?' },
    10: { firstText: 'No pain', secondText: 'novembre', thirdText: '' },
    11: { firstText: "Qaund ta mère t'appelle, tu dois", secondText: 'décembre', thirdText: '' },
  };

  get logoHelloDoe(): string {
    return logoHelloDoeBlack;
  }

  objetCreneaux = [
    { nom: 'chocolat', beginTime: 0, endTime: 21600000, emoji: '🍫' },
    { nom: 'café', beginTime: 21600000, endTime: 32400000, emoji: '☕' },
    { nom: 'croissant', beginTime: 32400000, endTime: 43200000, emoji: '🥐' },
    { nom: 'hot-dog', beginTime: 43200000, endTime: 54000000, emoji: '🌭' },
    { nom: 'cookie', beginTime: 54000000, endTime: 64800000, emoji: '🍪' },
    { nom: 'tea', beginTime: 64800000, endTime: 75600000, emoji: '🍵' },
    { nom: 'pizza', beginTime: 75600000, endTime: 86399000, emoji: '🍕' },
  ];

  get missionId(): string {
    return this.$route.params.missionId;
  }

  get i18n() {
    return {
      calendar: {
        day: {
          fullName: {
            0: this.$i18nSvc.t('calendar.day.full-name.0').toString(),
            1: this.$i18nSvc.t('calendar.day.full-name.1').toString(),
            2: this.$i18nSvc.t('calendar.day.full-name.2').toString(),
            3: this.$i18nSvc.t('calendar.day.full-name.3').toString(),
            4: this.$i18nSvc.t('calendar.day.full-name.4').toString(),
            5: this.$i18nSvc.t('calendar.day.full-name.5').toString(),
            6: this.$i18nSvc.t('calendar.day.full-name.6').toString(),
          },
          abbrev: {
            0: this.$i18nSvc.t('calendar.day.abbrev.0').toString(),
            1: this.$i18nSvc.t('calendar.day.abbrev.1').toString(),
            2: this.$i18nSvc.t('calendar.day.abbrev.2').toString(),
            3: this.$i18nSvc.t('calendar.day.abbrev.3').toString(),
            4: this.$i18nSvc.t('calendar.day.abbrev.4').toString(),
            5: this.$i18nSvc.t('calendar.day.abbrev.5').toString(),
            6: this.$i18nSvc.t('calendar.day.abbrev.6').toString(),
          },
        },
        month: {
          fullName: {
            0: this.$i18nSvc.t('calendar.month.full-name.0').toString(),
            1: this.$i18nSvc.t('calendar.month.full-name.1').toString(),
            2: this.$i18nSvc.t('calendar.month.full-name.2').toString(),
            3: this.$i18nSvc.t('calendar.month.full-name.3').toString(),
            4: this.$i18nSvc.t('calendar.month.full-name.4').toString(),
            5: this.$i18nSvc.t('calendar.month.full-name.5').toString(),
            6: this.$i18nSvc.t('calendar.month.full-name.6').toString(),
            7: this.$i18nSvc.t('calendar.month.full-name.7').toString(),
            8: this.$i18nSvc.t('calendar.month.full-name.8').toString(),
            9: this.$i18nSvc.t('calendar.month.full-name.9').toString(),
            10: this.$i18nSvc.t('calendar.month.full-name.10').toString(),
            11: this.$i18nSvc.t('calendar.month.full-name.11').toString(),
          },
          abbrev: {
            0: this.$i18nSvc.t('calendar.month.abbrev.0').toString(),
            1: this.$i18nSvc.t('calendar.month.abbrev.1').toString(),
            2: this.$i18nSvc.t('calendar.month.abbrev.2').toString(),
            3: this.$i18nSvc.t('calendar.month.abbrev.3').toString(),
            4: this.$i18nSvc.t('calendar.month.abbrev.4').toString(),
            5: this.$i18nSvc.t('calendar.month.abbrev.5').toString(),
            6: this.$i18nSvc.t('calendar.month.abbrev.6').toString(),
            7: this.$i18nSvc.t('calendar.month.abbrev.7').toString(),
            8: this.$i18nSvc.t('calendar.month.abbrev.8').toString(),
            9: this.$i18nSvc.t('calendar.month.abbrev.9').toString(),
            10: this.$i18nSvc.t('calendar.month.abbrev.10').toString(),
            11: this.$i18nSvc.t('calendar.month.abbrev.11').toString(),
          },
        },
      },
      category: {
        HOST_VISITORS: this.$i18nSvc.t('mission.category.HOST_VISITORS').toString(),
        SERVICE: this.$i18nSvc.t('mission.category.SERVICE').toString(),
        TICKETING: this.$i18nSvc.t('mission.category.TICKETING').toString(),
        ACCESS_CONTROL: this.$i18nSvc.t('mission.category.ACCESS_CONTROL').toString(),
        WARDROBE: this.$i18nSvc.t('mission.category.WARDROBE').toString(),
        VALET: this.$i18nSvc.t('mission.category.VALET').toString(),
        HOST: this.$i18nSvc.t('mission.category.HOST').toString(),
        STREET_MARKETING: this.$i18nSvc.t('mission.category.STREET_MARKETING').toString(),
        ANIMATION_DEMONSTRATION: this.$i18nSvc.t('mission.category.ANIMATION_DEMONSTRATION').toString(),
        BABY_SITTING: this.$i18nSvc.t('mission.category.BABY_SITTING').toString(),
        INVENTORY: this.$i18nSvc.t('mission.category.INVENTORY').toString(),
        MOVING: this.$i18nSvc.t('mission.category.MOVING').toString(),
        HANDLING: this.$i18nSvc.t('mission.category.HANDLING').toString(),
        PACKING: this.$i18nSvc.t('mission.category.PACKING').toString(),
        LITTLE_HANDS: this.$i18nSvc.t('mission.category.LITTLE_HANDS').toString(),
        ARGICULTURAL_EMPLOYEE: this.$i18nSvc.t('mission.category.ARGICULTURAL_EMPLOYEE').toString(),
        LABELING_STOCK: this.$i18nSvc.t('mission.category.LABELING_STOCK').toString(),
        SALES_ASSISTANT: this.$i18nSvc.t('mission.category.SALES_ASSISTANT').toString(),
        LUXURY_SALE: this.$i18nSvc.t('mission.category.LUXURY_SALE').toString(),
        SELF_SERVICE_MERCHANDISING: this.$i18nSvc.t('mission.category.SELF_SERVICE_MERCHANDISING').toString(),
        CASH_AND_CARRY: this.$i18nSvc.t('mission.category.CASH_AND_CARRY').toString(),
        COMMERCIAL_PROSPECTING: this.$i18nSvc.t('mission.category.COMMERCIAL_PROSPECTING').toString(),
        CUSTOMER_SUPPORT: this.$i18nSvc.t('mission.category.CUSTOMER_SUPPORT').toString(),
        DATA_ENTRY: this.$i18nSvc.t('mission.category.DATA_ENTRY').toString(),
        ADMIN_HELP: this.$i18nSvc.t('mission.category.ADMIN_HELP').toString(),
        ONLINE_SEARCH: this.$i18nSvc.t('mission.category.ONLINE_SEARCH').toString(),
        DONOR_RECRUITER: this.$i18nSvc.t('mission.category.DONOR_RECRUITER').toString(),
        DELIVERY: this.$i18nSvc.t('mission.category.DELIVERY').toString(),
        DISH_WASHING: this.$i18nSvc.t('mission.category.DISH_WASHING').toString(),
        FAST_FOOD: this.$i18nSvc.t('mission.category.FAST_FOOD').toString(),
      },
    };
  }
  @Watch('missionId', { immediate: true })
  async onMissionIdUpdated(): Promise<void> {
    if (this.missionId) {
      this.mission = await this.$missionsService.getOneByIdForWebview(this.missionId);
      let mCategory = this.mission.category;
      this.missionTitle = {
        title: this.i18n.category[mCategory],
        emoji: this.categoryEmoji[mCategory],
      };
      let normalisedSlots = this.normaliseScheduleSlots(this.mission.timeTable.schedule.slots);
      let normalisedShift = this.normaliseShift(this.mission.timeTable.schedule.shifts, normalisedSlots);
      this.calendar = this.buildDisplayItems(normalisedShift);
    }
  }

  normaliseScheduleSlots(slots: TimeTableScheduleSlot[]): NormalisedSlots {
    let normalisedSlots = {};
    slots.forEach((slot, index: number) => {
      let displaySlot = {
        type: 'slot',
        timestamp: 0,
        backgroundColor: 'colorShift' + index.toString(),
        beginTime: slot.beginTime,
        endTime: slot.endTime,
        emojiBegin: this.chooseEmojiTimestamp(slot.beginTime),
        emojiEnd: this.chooseEmojiTimestamp(slot.endTime),
        beginHourString: this.convertNumberToSize2string(this.getSpecialTypeFromTimestamp(slot.beginTime, 'hours')),
        beginMinutesString: this.convertNumberToSize2string(this.getSpecialTypeFromTimestamp(slot.beginTime, 'minutes')),
        endHourString: this.convertNumberToSize2string(this.getSpecialTypeFromTimestamp(slot.endTime, 'hours')),
        endMinutesString: this.convertNumberToSize2string(this.getSpecialTypeFromTimestamp(slot.endTime, 'minutes')),
      };
      normalisedSlots[slot.id] = { displaySlot: displaySlot };
      index++;
    });
    return normalisedSlots;
  }

  getSpecialTypeFromTimestamp(timestamp: number, type: string): number {
    let date = new Date(timestamp);
    let number = 0;
    if (type == 'hours') {
      number = date.getHours() - 1;
    }
    if (type == 'minutes') {
      number = date.getMinutes();
    }
    if (type == 'weekDays') {
      number = date.getDay();
    }
    if (type == 'monthDays') {
      number = date.getDate();
    }
    if (type == 'year') {
      number = date.getFullYear();
    }
    if (type == 'week') {
      number = this.getWeekNumber(timestamp);
    }
    if (type == 'month') {
      number = date.getMonth();
    }
    return number;
  }

  convertNumberToSize2string(number: number): string {
    let stringNumber = number.toString();
    if (number < 10) {
      stringNumber = '0' + number.toString();
    }
    return stringNumber;
  }

  normaliseShift(timeTableScheduleShift: TimeTableScheduleShift[], normalisedSlots: NormalisedSlots): DisplayDay[] {
    let listnormalisedShift = [];
    for (const shift of timeTableScheduleShift) {
      let slots = shift.slots;
      let firstInState = 0;
      for (const slot of slots) {
        let firstDisplayDay = 'off';
        if (firstInState == 0) {
          firstDisplayDay = 'on';
          firstInState = 1;
        }
        let id = slot;
        let timestamp = shift.date;
        let displayDay = {
          type: 'day',
          firstDisplayDay: firstDisplayDay,
          timestamp: timestamp,
          dayShortName: this.i18n.calendar.day.abbrev[this.getSpecialTypeFromTimestamp(timestamp, 'weekDays')],
          dayNumberString: this.convertNumberToSize2string(this.getSpecialTypeFromTimestamp(timestamp, 'monthDays')),
          monthNumberString: this.convertNumberToSize2string(this.getSpecialTypeFromTimestamp(timestamp, 'month')),
          slot: normalisedSlots[id]['displaySlot'],
        };
        listnormalisedShift.push(displayDay);
      }
    }
    return listnormalisedShift;
  }

  chooseEmojiTimestamp(timestamp: number): string {
    let emoji = '';
    for (let i = 0; i < this.objetCreneaux.length; i++) {
      if (this.between(timestamp, this.objetCreneaux[i].beginTime, this.objetCreneaux[i].endTime)) {
        emoji = this.objetCreneaux[i].emoji;
      }
    }
    return emoji;
  }

  between(val, begin, end) {
    if (val < end && val >= begin) {
      return true;
    } else {
      return false;
    }
  }

  getWeekNumber(timestamp) {
    let d = new Date(timestamp);
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    let yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    let weekNo = Math.ceil(((d.getTime() - yearStart.getTime()) / this.timestampeOneDayMicroSec + 1) / 7);
    return weekNo;
  }

  createDisplayMonth(timestamp: number): DisplayMonth {
    let month = this.getSpecialTypeFromTimestamp(timestamp, 'month');
    let displayMonth = {
      type: 'month',
      timestamp: timestamp,
      textMonth: this.textMonth[month],
      monthShortName: this.i18n.calendar.month.abbrev[month],
      background: 'backgroundMonth' + month.toString(),
    };
    return displayMonth;
  }

  createDisplayWeek(timestamp: number): DisplayWeek {
    let datecurrent = new Date(timestamp);
    let dateFirstDayWeek = new Date(datecurrent.getTime() + this.timestampeOneDayMicroSec * (1 - datecurrent.getDay()));
    let dateLastDayWeek = new Date(datecurrent.getTime() + this.timestampeOneDayMicroSec * (7 - datecurrent.getDay()));
    let month = this.getSpecialTypeFromTimestamp(dateLastDayWeek.getTime(), 'month');
    let displayMonth = {
      type: 'week',
      timestamp: timestamp,
      month: this.i18n.calendar.month.fullName[month],
      beginWeek: dateFirstDayWeek.getDate(),
      endWeek: dateLastDayWeek.getDate(),
    };
    return displayMonth;
  }
  listMonth = [];
  buildDisplayItems(listDisplayDay: DisplayDay[]) {
    listDisplayDay.sort(function (a, b) {
      return a.timestamp - b.timestamp;
    });
    let listDisplayCalendar = [];
    let beginTimestamp = listDisplayDay[0].timestamp;

    let endTimestamp = listDisplayDay[listDisplayDay.length - 1].timestamp;
    let actualTimestamp = beginTimestamp;
    let actualMonth = -1;
    let actualWeek = -1;
    while (actualTimestamp < endTimestamp) {
      let newMonth = this.getSpecialTypeFromTimestamp(actualTimestamp, 'month');
      let newWeek = this.getSpecialTypeFromTimestamp(actualTimestamp, 'week');
      if (newMonth != actualMonth) {
        listDisplayCalendar.push(this.createDisplayMonth(actualTimestamp));
        actualMonth = newMonth;
        this.listMonth.push(this.i18n.calendar.month.abbrev[newMonth]);
      }
      if (newWeek != actualWeek) {
        listDisplayCalendar.push(this.createDisplayWeek(actualTimestamp));
        actualWeek = newWeek;
      }
      actualTimestamp = actualTimestamp + this.timestampeOneDayMicroSec;
    }
    listDisplayDay.forEach((displayDay) => {
      listDisplayCalendar.push(displayDay);
    });

    listDisplayCalendar.sort(function (a, b) {
      return a.timestamp - b.timestamp;
    });
    return listDisplayCalendar;
  }

  scrollActiveButton() {
    this.listActifMonthPosition = {};
    for (const monthOff in this.i18n.calendar.month.abbrev) {
      if (document.getElementById(this.i18n.calendar.month.abbrev[monthOff]) != null) {
        this.listActifMonthPosition[monthOff] = document.getElementById(this.i18n.calendar.month.abbrev[monthOff]).getBoundingClientRect().top;
      }
    }
    for (let monthId in this.listActifMonthPosition) {
      if (
        (this.listActifMonthPosition[parseInt(monthId) + 1] > 51 || parseInt(monthId) == Object.keys(this.listActifMonthPosition).length) &&
        this.listActifMonthPosition[monthId] < 51
      ) {
        this.activeMonth = this.i18n.calendar.month.abbrev[monthId];
      }
    }
  }
}
