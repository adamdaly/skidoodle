import { Transform } from 'class-transformer';
import { IsInt, IsString, MaxLength } from 'class-validator';

export class CreateDto {
  @IsString()
  @Transform(({ value }) => (value as string).trim())
  @MaxLength(255)
  name: string;
  @IsInt()
  index: number;
  // @IsString()
  // userid: string;
  @IsInt()
  animationid: number;
}

export class UpdateDto {
  @IsString()
  @Transform(({ value }) => (value as string).trim())
  @MaxLength(255)
  name: string;
  @IsInt()
  index: number;
}
