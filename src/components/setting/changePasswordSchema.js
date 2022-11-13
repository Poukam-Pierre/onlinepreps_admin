// Made by Poukam Ngamaleu

import * as yup from 'yup'

export const ChangePasswordSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .min(5, 'min 5 caractères,au moins 1 lettre et 1 chiffre')
    .max(10, 'Max 10 caratères, au moins 1 lettre et 1 chiffre')
    .matches(/^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{4,10}$/, {
      message: 'Mot de passe incorrect',
    })
    .required('Ancien mot de passe requise'),
  newPassword: yup
    .string()
    .min(5, 'min 5 caractères,au moins 1 lettre et 1 chiffre')
    .max(10, 'Max 10 caratères, au moins 1 lettre et 1 chiffre')
    .matches(/^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{4,10}$/, {
      message: 'Mot de passe incorrect',
    })
    .required('Nouveau mot de passe obligatoire'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Mot de passe non identique')
    .required('Entrer votre nouveau mot de passe'),
})
