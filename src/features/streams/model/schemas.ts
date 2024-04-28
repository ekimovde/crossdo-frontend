import { object, string, number } from 'yup';

import type { Course } from 'features/courses';

const TEXT_REGEX = /^[0-9\s!"'(),\-./:;_А-Яа-яA-Za-z]+$/;

export const streamSchema = object({
  course: object<Course>()
    .shape({
      id: number().nullable(),
      title: string().min(1, 'Введите данные').required('Введите данные'),
    })
    .default(undefined)
    .required('Поле обязательно для заполнения'),
  name: string()
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
  totalCost: string().required('Введите данные').default('').min(1, 'Введите данные'),
  minParticipants: string().required('Введите данные').default('').min(1, 'Введите данные'),
  maxParticipants: string().required('Введите данные').default('').min(1, 'Введите данные'),
  durationWeeks: string().required('Введите данные').default('').min(1, 'Введите данные'),
  schedule: string()
    .required('Введите данные')
    .matches(TEXT_REGEX, 'Данные введены неверно')
    .default('')
    .min(1, 'Введите данные')
    .max(50, 'Максимальное количество символов - 50'),
});
