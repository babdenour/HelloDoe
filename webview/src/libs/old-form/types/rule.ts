import { TranslateResult } from 'vue-i18n';

type RuleTrigger = 'blur' | 'change';
type RuleType = 'array' | 'date' | 'email' | 'number';
export type RuleValidator<T> = (rule: Rule<T>, value: T, callback: (error?: Error) => void) => void;

export interface Rule<T> {
  max?: number;
  message?: string | TranslateResult;
  min?: number;
  required?: boolean;
  trigger: RuleTrigger | RuleTrigger[];
  type?: RuleType;
  validator?: RuleValidator<T>;
}
