import { object, string } from 'yup';

const TEXT_REGEX = /^[0-9\s!"'(),\-./:;_А-Яа-яA-Za-z]+$/;

export const reviewSchema = object({
  title: string()
    .required('Введите данные')
    .matches(TEXT_REGEX, 'Данные введены неверно')
    .default('')
    .min(1, 'Введите данные')
    .max(50, 'Максимальное количество символов - 50'),
  comment: string()
    .required('Введите данные')
    .matches(TEXT_REGEX, 'Данные введены неверно')
    .default('')
    .min(1, 'Введите данные')
    .max(100, 'Максимальное количество символов - 100'),
});
