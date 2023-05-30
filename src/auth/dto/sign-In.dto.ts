import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SignInDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
