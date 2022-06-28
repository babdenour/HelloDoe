export const DateNotPassedValidator: (value: number) => boolean = (value: number): boolean => value < new Date().setHours(0, 0, 0, 0);
