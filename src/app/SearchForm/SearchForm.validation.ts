import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name_pattern: Yup.string()
    .required('Это поле обязательно для ввода!')
    .min(3, 'Минимальное количество разрешенных символов - 3!')
    .max(20, 'Максимальное количество разрешенных символов - 20!'),
});
