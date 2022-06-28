import { Message } from 'element-ui';
import { ElMessageOptions } from 'element-ui/types/message';

interface Settings {
  duration?: number;
}

const DEFAULT_SETTINGS: Settings = {
  duration: 8000,
};

export class ToastService {
  info(message: string, settings: Settings = {}): void {
    Message.info(this.formatMessage(message, settings));
  }

  success(message: string, settings: Settings = {}): void {
    Message.success(this.formatMessage(message, settings));
  }

  error(message: string, settings: Settings = {}): void {
    Message.error(this.formatMessage(message, settings));
  }

  private formatMessage(message: string, settings?: Settings): ElMessageOptions {
    return {
      message,
      ...DEFAULT_SETTINGS,
      ...settings,
    };
  }
}
