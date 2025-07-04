import { Transform } from 'class-transformer';
import { IsString, Length } from 'class-validator';

export class ConfirmDto {
  @IsString()
  @Transform(({ value }) => (value as string).trim())
  inviteid: string;

  @IsString()
  @Transform(({ value }) => (value as string).trim())
  @Length(6)
  pin: string;
}
