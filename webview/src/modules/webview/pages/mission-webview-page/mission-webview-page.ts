import logoHelloDoeBlack from '@/assets/Logo-Round-Black-Messenger.png';
import { Mission } from '@domains/mission';
import { TimeTableShift, TimeTableSlot } from '@domains/time-table';
import { MissionFactory } from '@factories/mission.factory';
import { Component, Ref, Vue, Watch } from 'vue-property-decorator';
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
  index: number;
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

type DisplayItem = DisplayMonth | DisplayWeek | DisplayDay;

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

interface SliceOfDay {
  emoji: string;
  beginTime: number;
  endTime: number;
}

const DAY_IN_MS: number = 86400000;

@WithRender
@Component
export default class MissionTimetablePage extends Vue {
  mission: Mission = MissionFactory.create();
  normalisedSlots: NormalisedSlots = {};
  actualMonth: number = 0;
  calendar: DisplayItem[] = [];
  activeMonthIdx: number = -1;
  displayedMonthNames: { nameI18n: string; index: number }[] = [];

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

  slicesOfDay: SliceOfDay[] = [
    { beginTime: 0, endTime: 21600000, emoji: '🍫' },
    { beginTime: 21600000, endTime: 32400000, emoji: '☕' },
    { beginTime: 32400000, endTime: 43200000, emoji: '🥐' },
    { beginTime: 43200000, endTime: 54000000, emoji: '🌭' },
    { beginTime: 54000000, endTime: 64800000, emoji: '🍪' },
    { beginTime: 64800000, endTime: 75600000, emoji: '🍵' },
    { beginTime: 75600000, endTime: 86399000, emoji: '🍕' },
  ];

  @Ref('host')
  readonly hostRef: HTMLDivElement;

  @Ref('nav')
  readonly navRef: HTMLDivElement;

  get logoHelloDoe(): string {
    return logoHelloDoeBlack;
  }

  get missionId(): string {
    return this.$route.params.missionId;
  }

  get i18n(): { [k: string]: string } {
    return {
      missionCategory: this.$i18nSvc.t(`mission.category.${this.mission.category}`),
      missionEmoji: this.$i18nSvc.t(`mission.category.emoji.${this.mission.category}`),
    };
  }

  getDayAbbrevI18n(dayIdx: number): string {
    return this.$i18nSvc.t(`calendar.day.abbrev.${dayIdx}`);
  }

  getMonthAbbrevI18n(monthIdx: number): string {
    return this.$i18nSvc.t(`calendar.month.abbrev.${monthIdx}`);
  }

  getMonthFullNameI18n(monthIdx: number): string {
    return this.$i18nSvc.t(`calendar.month.full-name.${monthIdx}`);
  }

  buildMonthNavHtmlId(monthIdx: string | number): string {
    return `month-nav-${monthIdx}`;
  }

  buildMonthHtmlId(monthIdx: number): string {
    return `month-${monthIdx}`;
  }

  @Watch('missionId', { immediate: true })
  async onMissionIdUpdated(): Promise<void> {
    if (this.missionId) {
      this.mission = await this.$missionsService.getOneByIdForWebview(this.missionId);
      const normalisedSlots = this.normaliseScheduleSlots(this.mission.timeTable.slots);
      const normalisedShift = this.normaliseShift(this.mission.timeTable.shifts, normalisedSlots);
      this.calendar = this.buildDisplayItems(normalisedShift);
      this.activeMonthIdx = this.displayedMonthNames?.[0]?.index || -1;
    }
  }

  selectActiveMonth(monthIdx: number): void {
    this.teleportToActiveMonth(monthIdx);
  }

  teleportToActiveMonth(monthIdx: number): void {
    const monthRefList: (HTMLElement | undefined)[] = this.$refs[this.buildMonthHtmlId(monthIdx)] as (HTMLElement | undefined)[];
    const monthRef: HTMLElement | undefined = monthRefList?.[0];

    if (monthRef) {
      this.hostRef.scrollTop = monthRef.offsetTop - this.navRef.clientHeight;
    }
  }

  normaliseScheduleSlots(slots: TimeTableSlot[]): NormalisedSlots {
    const normalisedSlots = {};
    slots.forEach((slot: TimeTableSlot, index: number) => {
      const displaySlot = {
        type: 'slot',
        timestamp: 0,
        backgroundColor: 'colorShift' + index.toString(),
        beginTime: slot.beginTime,
        endTime: slot.endTime,
        emojiBegin: this.findEmojiForTimestamp(slot.beginTime),
        emojiEnd: this.findEmojiForTimestamp(slot.endTime),
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
    const date = new Date(timestamp);
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

  normaliseShift(timeTableScheduleShift: TimeTableShift[], normalisedSlots: NormalisedSlots): DisplayDay[] {
    const listnormalisedShift = [];
    for (const shift of timeTableScheduleShift) {
      let firstInState = 0;
      let firstDisplayDay = 'off';
      if (firstInState == 0) {
        firstDisplayDay = 'on';
        firstInState = 1;
      }
      const slotId = shift.slot;
      const timestamp = shift.date;
      const displayDay = {
        type: 'day',
        firstDisplayDay: firstDisplayDay,
        timestamp: timestamp,
        dayShortName: this.getDayAbbrevI18n(this.getSpecialTypeFromTimestamp(timestamp, 'weekDays')),
        dayNumberString: this.convertNumberToSize2string(this.getSpecialTypeFromTimestamp(timestamp, 'monthDays')),
        monthNumberString: this.convertNumberToSize2string(this.getSpecialTypeFromTimestamp(timestamp, 'month')),
        slot: normalisedSlots[slotId]['displaySlot'],
      };
      listnormalisedShift.push(displayDay);
    }

    return listnormalisedShift;
  }

  findEmojiForTimestamp(timestamp: number): string {
    const sliceOfDay = this.slicesOfDay.find((sliceOfDay: SliceOfDay) => this.isDateBetween(timestamp, sliceOfDay.beginTime, sliceOfDay.endTime));

    return sliceOfDay.emoji;
  }

  isDateBetween(timestamp: number, begin: number, end: number): boolean {
    return begin <= timestamp && timestamp < end;
  }

  getWeekNumber(timestamp: number): number {
    const d = new Date(timestamp);
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil(((d.getTime() - yearStart.getTime()) / DAY_IN_MS + 1) / 7);

    return weekNo;
  }

  createDisplayMonth(timestamp: number): DisplayMonth {
    const monthIdx = this.getSpecialTypeFromTimestamp(timestamp, 'month');
    const displayMonth = {
      type: 'month',
      timestamp: timestamp,
      textMonth: this.textMonth[monthIdx],
      monthShortName: this.getMonthAbbrevI18n(monthIdx),
      background: 'backgroundMonth' + monthIdx.toString(),
      index: monthIdx,
    };

    return displayMonth;
  }

  createDisplayWeek(timestamp: number): DisplayWeek {
    const datecurrent = new Date(timestamp);
    const dateFirstDayWeek = new Date(datecurrent.getTime() + DAY_IN_MS * (1 - datecurrent.getDay()));
    const dateLastDayWeek = new Date(datecurrent.getTime() + DAY_IN_MS * (7 - datecurrent.getDay()));
    const month = this.getSpecialTypeFromTimestamp(dateLastDayWeek.getTime(), 'month');
    const displayMonth = {
      type: 'week',
      timestamp: timestamp,
      month: this.getMonthFullNameI18n(month),
      beginWeek: dateFirstDayWeek.getDate(),
      endWeek: dateLastDayWeek.getDate(),
    };

    return displayMonth;
  }

  buildDisplayItems(listDisplayDay: DisplayDay[]): DisplayItem[] {
    listDisplayDay.sort(function (a: DisplayDay, b: DisplayDay) {
      return a.timestamp - b.timestamp;
    });
    const listDisplayCalendar: DisplayItem[] = [];
    const beginTimestamp = listDisplayDay[0].timestamp;

    const endTimestamp = listDisplayDay[listDisplayDay.length - 1].timestamp;
    let actualTimestamp = beginTimestamp;
    let actualMonth = -1;
    let actualWeek = -1;
    while (actualTimestamp < endTimestamp) {
      const newMonth = this.getSpecialTypeFromTimestamp(actualTimestamp, 'month');
      const newWeek = this.getSpecialTypeFromTimestamp(actualTimestamp, 'week');
      if (newMonth != actualMonth) {
        listDisplayCalendar.push(this.createDisplayMonth(actualTimestamp));
        actualMonth = newMonth;
        this.displayedMonthNames.push({
          nameI18n: this.getMonthAbbrevI18n(newMonth),
          index: newMonth,
        });
      }
      if (newWeek != actualWeek) {
        listDisplayCalendar.push(this.createDisplayWeek(actualTimestamp));
        actualWeek = newWeek;
      }
      actualTimestamp = actualTimestamp + DAY_IN_MS;
    }
    listDisplayDay.forEach((displayDay: DisplayDay) => {
      listDisplayCalendar.push(displayDay);
    });

    listDisplayCalendar.sort(function (a: DisplayItem, b: DisplayItem) {
      return a.timestamp - b.timestamp;
    });

    return listDisplayCalendar;
  }

  scrollMonthNav(): void {
    const listActifMonthPosition: { top: number; index: number }[] = [];
    for (const month of this.displayedMonthNames) {
      const monthRefList: (HTMLElement | undefined)[] = this.$refs[this.buildMonthHtmlId(month.index)] as (HTMLElement | undefined)[];
      const monthRef: HTMLElement | undefined = monthRefList?.[0];

      if (monthRef != null) {
        listActifMonthPosition.push({
          top: monthRef.getBoundingClientRect().top,
          index: month.index,
        });
      }
    }

    const activeMonth = listActifMonthPosition.find((month) => month.top >= 0);
    if (activeMonth) {
      this.activeMonthIdx = activeMonth.index;
      this.scrollActiveMonthNavIntoView(activeMonth.index);
    }
  }

  scrollActiveMonthNavIntoView(monthIdx: number): void {
    const monthNavRefList: (HTMLElement | undefined)[] = this.$refs[this.buildMonthNavHtmlId(monthIdx)] as (HTMLElement | undefined)[];
    const monthNavRef: HTMLElement | undefined = monthNavRefList?.[0];

    if (monthNavRef) {
      monthNavRef.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
