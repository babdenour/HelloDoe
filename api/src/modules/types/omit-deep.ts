// eslint-disable-next-line @typescript-eslint/ban-types
type Primitive = string | Function | number | boolean | symbol | undefined | null;

type OmitDeepArray<T, PropertyKeys extends keyof any, OwnPrimitives> = {
  [P in keyof T]: OmitDeep<T[P], PropertyKeys, OwnPrimitives>;
};

export type OmitDeep<T, PropertyKeys extends keyof any, OwnPrimitives = never> = Omit<
  {
    [k in keyof T]: T[k] extends infer TP
      ? TP extends Primitive | Array<Primitive> | OwnPrimitives | Array<OwnPrimitives>
        ? TP
        : TP extends Array<any>
        ? OmitDeepArray<T[k], PropertyKeys, OwnPrimitives>
        : OmitDeep<TP, PropertyKeys, OwnPrimitives>
      : never;
  },
  PropertyKeys
>;
