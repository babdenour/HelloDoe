export interface Converter<M, D> {
  toDocument: (model: M) => D;
  toDomain: (document: D) => M;
}
