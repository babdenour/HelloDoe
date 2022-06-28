import { Types } from 'mongoose';

export class ConverterUtils {
  public static getDate = (timestamp: number): Date | undefined => {
    return timestamp ? new Date(timestamp) : undefined;
  };

  /**
   * Get the object id of an object.
   * @param obj Object to get the object id from.
   * @returns Object id or undefined.
   */
  public static getObjectId = <T extends { id: string }>(obj: string | T): Types.ObjectId | undefined => {
    if (typeof obj === 'string') {
      return Types.ObjectId(obj);
    } else if (obj?.id) {
      return Types.ObjectId(obj.id);
    }

    return undefined;
  };

  public static getStringId = (objectId: Types.ObjectId | undefined): string | undefined => {
    return objectId ? String(objectId) : undefined;
  };

  /**
   * Create a string mongo id.
   * @returns String mongo id.
   */
  public static newStringId = (): string => {
    return ConverterUtils.getStringId(new Types.ObjectId());
  };

  public static getTimestamp = (date: Date | undefined): number | undefined => {
    return date ? new Date(date).getTime() : undefined;
  };

  public static toArray = <T>(arr?: T[]): T[] => {
    return [...(arr || [])];
  };
}
