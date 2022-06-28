import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import WithRender from './logger.html?style=./logger.scss';

type ConsoleMethod = 'warn' | 'error';

interface Log {
  type: ConsoleMethod;
  message: string;
}

@WithRender
@Component
export default class ConsoleLogger extends Vue {
  logs: Log[] = [];

  get warningCount(): number {
    return this.logs.filter((log: Log) => log.type === 'warn').length;
  }

  get errorCount(): number {
    return this.logs.filter((log: Log) => log.type === 'error').length;
  }

  get shouldDisplayIndicator(): boolean {
    return this.warningCount > 0 || this.errorCount > 0;
  }

  get indicatorCssClass(): string {
    return this.errorCount > 0 ? 'logger__indicator--error' : this.warningCount > 0 ? 'logger__indicator--warning' : '';
  }

  created(): void {
    window.addEventListener('error', this.logWindowError);
    window.addEventListener('unhandledrejection', this.logWindowUnhandledRejection);
    this.wrapConsoleMethod('warn', 'warn');
    this.wrapConsoleMethod('error', 'error');
  }

  beforeDestroy(): void {
    window.removeEventListener('error', this.logWindowError);
    window.removeEventListener('unhandledrejection', this.logWindowUnhandledRejection);
  }

  logWindowError(event: { message: string }): void {
    this.logs.push({
      type: 'error',
      message: event.message,
    });
  }

  logWindowUnhandledRejection(ev: PromiseRejectionEvent): void {
    this.logs.push({
      type: 'error',
      message: ev.reason,
    });
  }

  wrapConsoleMethod(methodName: string, type: ConsoleMethod): void {
    // eslint-disable-next-line no-console
    const originalMethod: () => void = console[methodName];
    // eslint-disable-next-line no-console, @typescript-eslint/no-explicit-any
    console[methodName] = (...args: any[]) => {
      const message: string = [].join.call(args, ' ');
      this.logs.push({
        type,
        message,
      });
      originalMethod.apply(console, args);
    };
  }
}
