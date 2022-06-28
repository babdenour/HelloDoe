export class ResourceLocatorService {
  public locateMissionEmojiTorn(missionCategory: string): string {
    try {
      return require(`@assets/mission/emoji-torn/${missionCategory}.png`);
    } catch (e) {
      return require('@assets/mission/emoji-torn/HOST_VISITORS.png');
    }
  }
}
