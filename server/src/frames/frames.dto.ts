import { Transform } from 'class-transformer';
import { IsInt, IsString, Max, MaxLength, Min } from 'class-validator';

export class CreateDto {
  @IsString()
  @Transform(({ value }) => (value as string).trim())
  @MaxLength(255)
  filename: string;
  @IsInt()
  @Min(1)
  @Max(255)
  length: number;
  @IsInt()
  @Max(2160)
  index: number;
  @IsString()
  sceneid: number;
}

export class UpdateDto {
  @IsInt()
  @Min(1)
  @Max(255)
  length: number;
  @IsInt()
  @Max(2160)
  index: number;
}
