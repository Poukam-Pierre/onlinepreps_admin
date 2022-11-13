// Made by Poukam Ngamaleu

import * as yup from 'yup'

export const LoginSchema = yup.object().shape({
  name: yup.string().required('Nom nécéssaire'),
  email: yup
    .string()
    .email('Entrer une email valide')
    .required('Email nécéssaire'),
  phoneNumber: yup.string().required('Numéro de téléphone nécéssaire'),
  adresse: yup.string().required('Adresse nécéssaire'),
})
