import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRecordDto {
  @IsString()
  @IsNotEmpty()
  id1: string;

  @IsString()
  @IsNotEmpty()
  id2: string;
}
