import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginAuthDto {
    @IsEmail({}, { message: 'Debe ser un correo electrónico válido' })
    email: string;

    @IsString({ message: 'La contraseña debe ser un texto' })
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    password: string;
}
