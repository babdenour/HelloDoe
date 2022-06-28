export class DateUtils {
  public static sorterAsc = (a: Date, b: Date): number =>
    a.getTime() - b.getTime();
}
