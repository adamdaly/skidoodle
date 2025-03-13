import { Transform } from 'class-transformer';
import { IsInt, IsNumber, IsString, Max, MaxLength } from 'class-validator';

export class CreateDto {
  @IsString()
  @Transform(({ value }) => value.trim())
  @MaxLength(255)
  name: string;
  @IsInt()
  @Max(3840)
  width: number;
  @IsInt()
  @Max(2160)
  height: number;
  @IsInt()
  @Max(120)
  framerate: number;
  @IsString()
  userid: string;
}

export class UpdateDto {
  @IsString()
  @Transform(({ value }) => value.trim())
  @MaxLength(255)
  name: string;
  @IsInt()
  @Max(3840)
  width: number;
  @IsInt()
  @Max(2160)
  height: number;
  @IsInt()
  @Max(120)
  framerate: number;
}
