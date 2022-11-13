// Made by Poukam Ngamaleu

import * as yup from 'yup'

export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Entrer une email valide')
    .required('Email nécéssaire'),
  password: yup
    .string()
    .min(5, 'minimum 5 caractères, au moins 1 lettre et 1 chiffre')
    .max(10, 'Maximum 10 caratères, au moins 1 lettre et 1 chiffre')
    .required('Mot de passe nécéssaire'),
})
