import { ImageMessage, ImageMessageParams } from '@domains/image-message';

export class ImageMessageFactory {
  public static create(args?: Partial<ImageMessageParams>): ImageMessage {
    const imageMessage: ImageMessageParams = {
      url: args?.url || '',
    };

    return new ImageMessage(imageMessage);
  }
}
