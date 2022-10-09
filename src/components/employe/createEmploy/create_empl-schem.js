// Made by Poukam Ngamaleu

import * as yup from 'yup'

export const CreateEmployeSchema = yup.object().shape({
  name: yup.string().required('Nom obligatoire'),
  userName: yup.string().required("Entrez nom d'utilisateur"),
  email: yup
    .string()
    .email('Entrer une email valide')
    .required('Email obligatoire'),
  password: yup
    .string()
    .min(5, 'min 5 caractères,au moins 1 lettre et 1 chiffre')
    .max(10, 'Max 10 caratères, au moins 1 lettre et 1 chiffre')
    .matches(/^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{4,10}$/, {
      message: 'Mot de passe incorrect',
    })
    .required('Mot de passe obligatoire'),
  poste: yup.string().required('Poste obligatoire'),
  Adresse: yup.string().required("Indiquez l'adresse"),
  phoneNumber: yup.number().required('numéro obligatoire'),
})
