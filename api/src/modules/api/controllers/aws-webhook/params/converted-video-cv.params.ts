import { IsString, MinLength } from 'class-validator';

import { FileType } from '../file.type';

export class ConvertedVideoCvParams {
  /**
   * Id of the doer whose file has been processed successfully.
   */
  @IsString()
  @MinLength(1)
  doerId: string;

  /**
   * Type of cv processed.
   */
  @IsString()
  @MinLength(1)
  cvType: string;

  /**
   * Type of the file processed.
   */
  @IsString()
  @MinLength(1)
  fileType: FileType;

  /**
   * Url of the file processed.
   */
  @IsString()
  @MinLength(1)
  fileUrl: string;
}
