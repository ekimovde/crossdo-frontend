import { object, string } from 'yup';

const TEXT_REGEX = /^[0-9\s!"'(),\-./:;_А-Яа-яA-Za-z]+$/;

export const courseSchema = object({
  title: string()
    .required('Введите данные')
    .matches(TEXT_REGEX, 'Данные введены неверно')
    .default('')
    .min(1, 'Введите данные')
    .max(50, 'Максимальное количество символов - 50'),
  description: string()
    .required('Введите данные')
    .matches(TEXT_REGEX, 'Данные введены неверно')
    .default('')
    .min(1, 'Введите данные')
    .max(100, 'Максимальное количество символов - 100'),
  courseUrl: string().required('Введите данные').default('').min(1, 'Введите данные'),
});
