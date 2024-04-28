import { object, string } from 'yup';

export const loginSchema = object({
  email: string()
    .default('')
    .max(50, 'Максимальное количество символов - 50')
    .email('Данные введены неверно')
    .required('Введите Email'),
  password: string()
    .default('')
    .max(50, 'Максимальное количество символов - 50')
    .required('Введите пароль'),
});
