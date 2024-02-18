import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class authDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  usual_full_name: string;

  @IsString()
  @IsNotEmpty()
  UId: string;

  @IsString()
  Avatar: string;
}

export class signeinDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;
  
  @IsString()
  @IsNotEmpty()
  password: string;
}
