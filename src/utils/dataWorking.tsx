import { NorthWest } from '@mui/icons-material'
import panel from '../asset/paneaux_test.png'

interface Pays {
  paysId?: number
  label: string
  code: string
}

interface Department {
  departmentId?: number
  name: string
  pays: Pays
}
interface CategoryOfLicence {
  catId?: number
  label: string
}

export const countries: readonly Pays[] = [
  { code: 'CM', label: 'Cameroun' },
  { code: 'GA', label: 'Gabon' },
]

export const department: Department[] = [
  { departmentId: 1, name: 'Haute-Sanaga', pays: countries[1] },
  { departmentId: 2, name: 'Lekié', pays: countries[1] },
  { departmentId: 3, name: 'Mbam-et-Inoubou', pays: countries[1] },
  { departmentId: 4, name: 'Mbam-et-Kim', pays: countries[1] },
  { departmentId: 5, name: 'Méfou-et-Afamba', pays: countries[1] },
  { departmentId: 6, name: 'Méfou-et-Akono', pays: countries[1] },
  { departmentId: 7, name: 'Mfoundi', pays: countries[1] },
  { departmentId: 8, name: 'Nyong-et-Kellé', pays: countries[1] },
  { departmentId: 9, name: 'Nyong-et-Mfoumou', pays: countries[1] },
  { departmentId: 10, name: "Nyong-et-So'o", pays: countries[1] },
  { departmentId: 11, name: 'Diamaré', pays: countries[1] },
  { departmentId: 12, name: 'Logone-et-Chari', pays: countries[1] },
  { departmentId: 13, name: 'Mayo-Danay', pays: countries[1] },
  { departmentId: 14, name: 'Mayo-Kani', pays: countries[1] },
  { departmentId: 15, name: 'Mayo-Sava', pays: countries[1] },
  { departmentId: 16, name: 'Mayo-Tsanaga', pays: countries[1] },
  { departmentId: 17, name: 'Djérem', pays: countries[1] },
  { departmentId: 18, name: 'Faro-et-Déo', pays: countries[1] },
  { departmentId: 19, name: 'Mayo-Banyo', pays: countries[1] },
  { departmentId: 20, name: 'Mbéré', pays: countries[1] },
  { departmentId: 21, name: 'Vina', pays: countries[1] },
  { departmentId: 22, name: 'Boumba-et-Ngoko', pays: countries[1] },
  { departmentId: 23, name: 'Haut-Nyong', pays: countries[1] },
  { departmentId: 24, name: 'Kadey', pays: countries[1] },
  { departmentId: 25, name: 'Lom-et-Djérem', pays: countries[1] },
  { departmentId: 26, name: 'Moungo', pays: countries[1] },
  { departmentId: 27, name: 'Nkam', pays: countries[1] },
  { departmentId: 28, name: 'Sanaga-Maritime', pays: countries[1] },
  { departmentId: 29, name: 'Wouri', pays: countries[1] },
  { departmentId: 30, name: 'Bénoué', pays: countries[1] },
  { departmentId: 31, name: 'Faro', pays: countries[1] },
  { departmentId: 32, name: 'Mayo-Louti', pays: countries[1] },
  { departmentId: 33, name: 'Mayo-rey', pays: countries[1] },
  { departmentId: 34, name: 'Boyo', pays: countries[1] },
  { departmentId: 35, name: 'Bui', pays: countries[1] },
  { departmentId: 36, name: 'Donga-Mantung', pays: countries[1] },
  { departmentId: 37, name: 'Menchum', pays: countries[1] },
  { departmentId: 38, name: 'Mezam', pays: countries[1] },
  { departmentId: 39, name: 'Momo', pays: countries[1] },
  { departmentId: 40, name: 'Ngo-Ketunjia', pays: countries[1] },
  { departmentId: 41, name: 'Bamboutos', pays: countries[1] },
  { departmentId: 42, name: 'Haut-Nkam', pays: countries[1] },
  { departmentId: 43, name: 'Hauts-Plateaux', pays: countries[1] },
  { departmentId: 44, name: 'Koung-Khi', pays: countries[1] },
  { departmentId: 45, name: 'Menoua', pays: countries[1] },
  { departmentId: 46, name: 'Mifi', pays: countries[1] },
  { departmentId: 47, name: 'Ndé', pays: countries[1] },
  { departmentId: 48, name: 'Noun', pays: countries[1] },
  { departmentId: 49, name: 'Dja-et-Lobo', pays: countries[1] },
  { departmentId: 50, name: 'Mvila', pays: countries[1] },
  { departmentId: 51, name: 'Océan', pays: countries[1] },
  { departmentId: 52, name: 'Vallée-du-Ntem', pays: countries[1] },
  { departmentId: 53, name: 'Fako', pays: countries[1] },
  { departmentId: 54, name: 'Koupé-Manengouba', pays: countries[1] },
  { departmentId: 55, name: 'Lebialem', pays: countries[1] },
  { departmentId: 56, name: 'Manyu', pays: countries[1] },
  { departmentId: 57, name: 'Mene', pays: countries[1] },
  { departmentId: 58, name: 'Ndian', pays: countries[1] },
]

export const dataCategoryOfLicence: CategoryOfLicence[] = [
  { catId: 1, label: 'A' },
  { catId: 2, label: 'B' },
  { catId: 3, label: 'C' },
  { catId: 4, label: 'D' },
  { catId: 5, label: 'G' },
]

export const dataTest = {
  dataTestInfos: {
    langueType: 'fr',
    epreuveId: 'cgdho-21548-gdiys',
    session: Date(),
    department: 'Haute-Sanaga',
    category: 'B',
    user_created: 'agent | Mifi',
    creation_date: '10/03/2021',
    is_in_production: true,
  },
  questions: [
    {
      questionBody:
        'Le genre de type de batterie utilisée dans la plupart des voitures pour démarrer un moteur est',
      propositionAnswers: [
        {
          proposition: '12 volts',
          is_answer: true,
        },
        {
          proposition: '24 volts',
          is_answer: false,
        },
        {
          proposition: '36 volts',
          is_answer: false,
        },
      ],
      open: false,
      answer: false,
      feedback:
        "Les batteries utilisées par les voitures en général ont besoin d'une tension élevée pour fonctionner. La réponse a correspond à la tension utilisée pour les battéries de voiture de tourisme. ",
    },
    {
      questionBody:
        'A quelle vitesse votre véhicule optimise-t-il son (rendement énergétique)',
      propositionAnswers: [
        {
          proposition: 'Vitesse réduite (moin de 30km/h)',
          is_answer: true,
        },
        {
          proposition: 'Vitesse moyenne (40 à 60 km/h)',
          is_answer: false,
        },
        {
          proposition: 'Vitesse élevée (60 à 100 km/h)',
          is_answer: false,
        },
      ],
      open: false,
      answer: false,
      feedback: `Plus un véhicule roule à basse vitesse, plus sa consommation est basse. Nous optons pour la réponse 'a'`,
    },
    {
      questionBody: 'Le stationnement est interdit sur:',
      propositionAnswers: [
        {
          proposition: 'Une voie à sens unique',
          is_answer: false,
        },
        {
          proposition: 'Les routes secondaires',
          is_answer: false,
        },
        {
          proposition: 'Trottoirs et les feux tricolores',
          is_answer: true,
        },
      ],
      open: false,
      answer: false,
      feedback: `Il est interdit de stationner sur des espaces amenagés pour d'autres usagers de la route. Egalement à des endroits où vous pouvez être génant pour les usagers de la route. Nous opton pour la solution 'c'`,
    },
    {
      questionBody:
        'Choisissez les éléments qui ne sont pas obligatoires dans votre véhicule',
      propositionAnswers: [
        {
          proposition: 'La trousse de sécours',
          is_answer: false,
        },
        {
          proposition: 'Au moins un triangle de signalisation',
          is_answer: false,
        },
        {
          proposition: 'La torche',
          is_answer: true,
        },
        {
          proposition: 'Aucune des réponses',
          is_answer: false,
        },
      ],
      open: false,
      answer: false,
      feedback: `La réponse est belle et bien 'c'`,
    },
    {
      questionBody:
        "En cas d'accident en campagne, pour alerter la gendarmerie j'appelle",
      questionImg: panel,
      propositionAnswers: [
        {
          proposition: '17/117',
          is_answer: true,
        },
        {
          proposition: '18/118',
          is_answer: false,
        },
        {
          proposition: '13/113',
          is_answer: false,
        },
      ],
      open: false,
      answer: false,
      feedback: `La réponse est 'a'`,
    },
    {
      questionBody:
        "Est-ce que le véhicule d'urgence peut-il traverser le feux rouge?",
      propositionAnswers: [
        {
          proposition: 'Oui',
          is_answer: true,
        },
        {
          proposition: 'Non',
          is_answer: false,
        },
      ],
      open: false,
      answer: false,
      feedback: `Les véhicules d'urgences, lorsqu'ils sont en activités (sirène et girophare activés), ne respectent plus le code de la route. Ils en est de même pour les véhicules dit prioritaires. La réponse ici est 'a'`,
    },
    {
      questionBody:
        "Si un véhicule transportant de l'essence ou combustible de chauffage ou de l'acide, est impliqué dans un accident, vous devez:",
      propositionAnswers: [
        {
          proposition: "Rester à bonne distance di lieu de l'accident",
          is_answer: false,
        },
        {
          proposition: 'Avertir les autres usagers de la route du danger',
          is_answer: false,
        },
        {
          proposition:
            "Permettre aux services d'urgence d'apporter de l'assistance",
          is_answer: false,
        },
        {
          proposition: 'Toutes les trois',
          is_answer: true,
        },
      ],
      open: false,
      answer: false,
      feedback: `La réponse ici est 'd'`,
    },
    {
      questionBody: 'Les marques sur la chaussé',
      propositionAnswers: [
        {
          proposition:
            "Sont des indications que le conducteur n'est pas tenu de respecter",
          is_answer: false,
        },
        {
          proposition:
            'Ont force de loi seulement si elles sont accompagnées de panneaux de signalisation',
          is_answer: false,
        },
        {
          proposition:
            "Font partie de la signalisation, tout conducteur doit s'y conformer",
          is_answer: true,
        },
      ],
      open: false,
      answer: false,
      feedback: `Les marques sur la chaussé entre dans la signalisation verticale. Et en tant que signalisation routière, elle fait partie intégrante des différentes règles du code de la route. Nous optons pour la réponse 'c'`,
    },
    {
      questionBody:
        "En cas d'évacuation après un accident, laquelle des victimes est prioritaire:",
      propositionAnswers: [
        {
          proposition: "Celle qui présente les signes d'hémorragie interne",
          is_answer: true,
        },
        {
          proposition: 'Celle qui a plusieurs fractures',
          is_answer: false,
        },
        {
          proposition: 'Celle qui a une hémorragie externe',
          is_answer: false,
        },
      ],
      open: false,
      answer: false,
      feedback: `Les causes de mortalité en cas d'accident de la route sont pour la plus part l'asphyxie et l'hémorragie. Par contre il existe deux types d'hémorragie (externe et interne). Celui interne nécéssite une évacuation sanitaire d'urgence. La réponse 'a' est la bonne`,
    },
    {
      questionBody:
        'Le bouchon du radiateur type à pression selon certains fabricants, doit être enlevé uniquement :',
      propositionAnswers: [
        {
          proposition: 'Lorsque le moteur est chaud',
          is_answer: false,
        },
        {
          proposition: 'Pour refroidir un moteur surchauffé',
          is_answer: false,
        },
        {
          proposition: 'Lorsque le moteur est froid',
          is_answer: true,
        },
      ],
      open: false,
      answer: false,
      feedback: `La réponse est 'c'`,
    },
    {
      questionBody:
        'Signaler votre intention ne vous donne pas le droit de priorité',
      propositionAnswers: [
        {
          proposition: 'Vrai',
          is_answer: true,
        },
        {
          proposition: 'Faux',
          is_answer: false,
        },
      ],
      open: false,
      answer: false,
      feedback: `La réponse est 'a'`,
    },
    {
      questionBody: "L'amélioration des véhicules 4 x 4 est pour :",
      propositionAnswers: [
        {
          proposition: 'Son confort',
          is_answer: true,
        },
        {
          proposition: 'Son adhésion sur la route',
          is_answer: false,
        },
        {
          proposition: "Sa capacité d'arrêt",
          is_answer: false,
        },
      ],
      open: false,
      answer: false,
      feedback: `L'amélioration du'un véhicule 4 x 4 est d'avantage pour son confort car se sont des véhicules conçus pour des routes extrèmes et très enclavées. Nous optons pour la réponse 'a'`,
    },
    {
      questionBody: 'Que doit-on faire pour combattre la fatigue au volant ?',
      propositionAnswers: [
        {
          proposition: 'Engager une conversation animée',
          is_answer: false,
        },
        {
          proposition: "Laisser pénétrer beaucoup d'air dans la voiture",
          is_answer: false,
        },
        {
          proposition: "S'arrêter et se reposer",
          is_answer: true,
        },
        {
          proposition: 'Tout se qui précéde',
          is_answer: false,
        },
      ],
      open: false,
      answer: false,
      feedback: `Le seul remède de la fatigue au volant c'est le repos. Donc la réponse est 'c'`,
    },
    {
      questionBody:
        'Peut-on circuler sur une propriété privé pour éviter de se conformer à une signalisation ?',
      propositionAnswers: [
        {
          proposition: 'Non, la loi le défend',
          is_answer: true,
        },
        {
          proposition: 'Oui, si cela accelère la circulation',
          is_answer: false,
        },
        {
          proposition: "Non, sauf s'il y a embouteillage",
          is_answer: false,
        },
      ],
      open: false,
      answer: false,
      feedback: `La réponse est la 'a'`,
    },
    {
      questionBody:
        "Si deux véhicules s'approchent d'une intersection en même temps dans un angle droit, lequel devrait ceder le droit de passage ?",
      propositionAnswers: [
        {
          proposition: 'Le véhicule qui va plus vite',
          is_answer: false,
        },
        {
          proposition: 'Le véhicule à droite',
          is_answer: false,
        },
        {
          proposition: 'Le véhicule à gauche',
          is_answer: true,
        },
      ],
      open: false,
      answer: false,
      feedback: `La priorité à droite est une règle du code la route qui dans une intersection d'égale valeur vous demande de laisser passer tous les autres conducteurs venant de votre droite. Nous opton pour la réponse 'c'`,
    },
    {
      questionBody: "Il est illégal qu'un véhicule routier soit muni:",
      propositionAnswers: [
        {
          proposition: "D'un avertisseur sonore",
          is_answer: false,
        },
        {
          proposition: 'De feux de recul',
          is_answer: false,
        },
        {
          proposition: "D'un détecteur de radar de vitesse",
          is_answer: true,
        },
      ],
      open: false,
      answer: false,
      feedback: `La réponse est 'c'`,
    },
    {
      questionBody:
        "L'arbre qui actionne l'ouverture et la fermeture des soupapes s'appelle:",
      propositionAnswers: [
        {
          proposition: 'Le vilebrequin',
          is_answer: false,
        },
        {
          proposition: "L'arbre de transmission",
          is_answer: false,
        },
        {
          proposition: "L'arbre à cames",
          is_answer: true,
        },
      ],
      open: false,
      answer: false,
      feedback: `La réponse est 'c'`,
    },
    {
      questionBody:
        "Quels sont les effets de l'alcool sur l'organisme et le comportement de l'homme ?",
      propositionAnswers: [
        {
          proposition: "L'alcool affaiblit la vue et ralentit les reflexes",
          is_answer: true,
        },
        {
          proposition:
            "L'alcool diminue graduellement la maitrise des nerfs et déprime",
          is_answer: false,
        },
        {
          proposition: 'Les deux',
          is_answer: false,
        },
      ],
      open: false,
      answer: false,
      feedback: `La réponse est 'a'`,
    },
    {
      questionBody:
        "Si la vitesse d'un véhicule est triplée, de combien de force d'impact serait-elle supérieur advenant une collision avec un autre objet ? ",
      propositionAnswers: [
        {
          proposition: '9 fois',
          is_answer: true,
        },
        {
          proposition: '3 fois',
          is_answer: false,
        },
        {
          proposition: '2 fois',
          is_answer: false,
        },
      ],
      open: false,
      answer: false,
      feedback: `La réponse est 'a'`,
    },
    {
      questionBody: 'Est classé en troisième classe la contrevention suivante',
      questionImg: panel,
      propositionAnswers: [
        {
          proposition: 'Ouverture dangereuses des portières',
          is_answer: false,
        },
        {
          proposition: "Défaut d'indicateur de vitesse",
          is_answer: true,
        },
        {
          proposition: 'Non présentation du permis de conduire',
          is_answer: false,
        },
      ],
      open: false,
      answer: false,
      feedback: `La réponse est 'b'`,
    },
    {
      questionBody: 'Que signifie ce panneau ?',
      questionImg: panel,
      propositionAnswers: [
        {
          proposition: "Panneau de service général d'un hôtel",
          is_answer: false,
        },
        {
          proposition: "Panneau de service général d'un hôspital",
          is_answer: true,
        },
        {
          proposition: 'Panneau routier Route H',
          is_answer: false,
        },
      ],
      open: false,
      answer: false,
      feedback: `La réponse est 'b'`,
    },
    {
      questionBody:
        'Dans cette intersection, le panneau cédez passage concerne les véhicules qui sont à : ',
      questionImg: panel,
      propositionAnswers: [
        {
          proposition: 'Droite',
          is_answer: false,
        },
        {
          proposition: 'Les deux',
          is_answer: true,
        },
        {
          proposition: 'Gauche',
          is_answer: false,
        },
      ],
      open: false,
      answer: false,
      feedback: `Selon l'image, le panneau cédez passage (J2) est mis des deux côté de la route. Nous concluons alors que la réponse 'b' est la bonne`,
    },
    {
      questionBody: 'Que signifie ce panneau ?',
      questionImg: panel,
      propositionAnswers: [
        {
          proposition: 'Passage à niveau',
          is_answer: false,
        },
        {
          proposition: 'Intersection en T',
          is_answer: false,
        },
        {
          proposition: 'Aucune',
          is_answer: true,
        },
      ],
      open: false,
      answer: false,
      feedback: `La réponse est 'c'`,
    },
    {
      questionBody: "En cas d'accident la balisage de la route permet de :",
      questionImg: panel,
      propositionAnswers: [
        {
          proposition: 'Rendre la route plus libre',
          is_answer: false,
        },
        {
          proposition: 'Tracter les véhicules',
          is_answer: false,
        },
        {
          proposition: "Eviter qu'un autre accident se produise",
          is_answer: true,
        },
      ],
      open: false,
      answer: false,
      feedback: `Lors d'un accident, il faut appliquer la règle PAS(Protéger, Alerter, Sécourir). Protéger consiste à baliser les lieu pour éviter d'autre accident causé par celui où vous intervenez. Nous optons pour la réponse 'c'`,
    },
    {
      questionBody:
        'Image du panneau de danger (circulation dans les doubles sens)',
      questionImg: panel,
      propositionAnswers: [
        {
          proposition: 'Le trafic que vous approchez est prioritaire',
          is_answer: false,
        },
        {
          proposition: 'Route a double sens de circulation',
          is_answer: false,
        },
        {
          proposition: 'Aucune',
          is_answer: true,
        },
      ],
      open: false,
      answer: false,
      feedback: `La réponse est 'c'`,
    },
    {
      questionBody:
        "En sécourisme cette victime d'un accident est placé en position de choque",
      questionImg: panel,
      propositionAnswers: [
        {
          proposition: 'Vrai',
          is_answer: true,
        },
        {
          proposition: 'Faux',
          is_answer: false,
        },
      ],
      open: false,
      answer: false,
      feedback: `La réponse est 'a'`,
    },
    {
      questionBody: 'Ce marquage sur la route apparaît juste avant',
      questionImg: panel,
      propositionAnswers: [
        {
          proposition: "Un panneau d'arrêt",
          is_answer: false,
        },
        {
          proposition: 'Un panneau cédez passage',
          is_answer: true,
        },
        {
          proposition: 'Aucun panneau de signalisation',
          is_answer: false,
        },
      ],
      open: false,
      answer: false,
      feedback: `Chaque signalisation verticale est matérialisé au sol par un marquage horizontal.Cette image correspond au marquage horizontal de la balise J2. Nous opton pour la réponse 'b'`,
    },
    {
      questionBody: "Ce panonceau d'indicatoin diverse me rappelle que :",
      questionImg: panel,
      propositionAnswers: [
        {
          proposition:
            'La vitesse est limitée à 50 km/h avant le panneau uniquement',
          is_answer: false,
        },
        {
          proposition:
            'La vitesse est limitée à 50 km/h après le panneau uniquement',
          is_answer: false,
        },
        {
          proposition:
            'La vitesse est limitée à 50km/h avant et après le panneau',
          is_answer: true,
        },
      ],
      open: false,
      answer: false,
      feedback: `La réponse est 'c'`,
    },
    {
      questionBody: 'Quelle est la signification de ce panneau?',
      questionImg: panel,
      propositionAnswers: [
        {
          proposition: 'Fin de zone de routes urbaines',
          is_answer: true,
        },
        {
          proposition: 'A partir de là, il est interdit de stationner',
          is_answer: true,
        },
        {
          proposition: 'A partir de là, le stationnement est autorisé',
          is_answer: false,
        },
      ],
      open: false,
      answer: false,
      feedback: `La réponse est  'b'`,
    },
    {
      questionBody:
        'Selon ce panneau, une moto est autorisée à doubler un véhicule de passagers privé uniquement que pendant la journée',
      questionImg: panel,
      propositionAnswers: [
        {
          proposition: 'Non',
          is_answer: true,
        },
        {
          proposition: 'Oui',
          is_answer: false,
        },
      ],
      open: false,
      answer: false,
      feedback: `La réponse est 'a'`,
    },
    {
      questionBody:
        "Quel panneau placé sur la route, informe d'un changement du nombre de voies sur la chaussée ?",
      questionImg: panel,
      propositionAnswers: [
        {
          proposition: 'Tous les quatre panneaux',
          is_answer: false,
        },
        {
          proposition: '622',
          is_answer: true,
        },
        {
          proposition: '109',
          is_answer: false,
        },
        {
          proposition: '145',
          is_answer: false,
        },
      ],
      open: false,
      answer: false,
      feedback: `La réponse est 'b'`,
    },
    {
      questionBody:
        'Quel panneau prévient que la chaussée où vous voulez roulez rejoint une autre chaussée ?',
      questionImg: panel,
      propositionAnswers: [
        {
          proposition: '620',
          is_answer: false,
        },
        {
          proposition: '145',
          is_answer: false,
        },
        {
          proposition: '307',
          is_answer: false,
        },
        {
          proposition: '124',
          is_answer: true,
        },
      ],
      open: false,
      answer: false,
      feedback: `La réponse est 'd'`,
    },
    {
      questionBody:
        'Temoin indicateur de dysfonctionnement du contrôle de la traction',
      questionImg: panel,
      propositionAnswers: [
        { proposition: '1', is_answer: false },
        { proposition: '2', is_answer: false },
        { proposition: '3', is_answer: true },
        { proposition: '4', is_answer: false },
        { proposition: '5', is_answer: false },
        { proposition: '6', is_answer: false },
        { proposition: '7', is_answer: false },
        { proposition: '8', is_answer: false },
        { proposition: '9', is_answer: false },
        { proposition: '10', is_answer: false },
      ],
      open: false,
      answer: false,
      feedback: `La réponse est le c`,
    },
    {
      questionBody: 'Indicateur de liquide de lave-glace',
      questionImg: panel,
      propositionAnswers: [
        { proposition: '1', is_answer: false },
        { proposition: '2', is_answer: false },
        { proposition: '3', is_answer: false },
        { proposition: '4', is_answer: true },
        { proposition: '5', is_answer: false },
        { proposition: '6', is_answer: false },
        { proposition: '7', is_answer: false },
        { proposition: '8', is_answer: false },
        { proposition: '9', is_answer: false },
        { proposition: '10', is_answer: false },
      ],
      open: false,
      answer: false,
      feedback: `La réponse est le d`,
    },
    {
      questionBody: 'Témoin indicateur du correcteur de site des projecteurs',
      questionImg: panel,
      propositionAnswers: [
        { proposition: '1', is_answer: false },
        { proposition: '2', is_answer: false },
        { proposition: '3', is_answer: false },
        { proposition: '4', is_answer: false },
        { proposition: '5', is_answer: false },
        { proposition: '6', is_answer: true },
        { proposition: '7', is_answer: false },
        { proposition: '8', is_answer: false },
        { proposition: '9', is_answer: false },
        { proposition: '10', is_answer: false },
      ],
      open: false,
      answer: false,
      feedback: `La réponse est le f`,
    },
    {
      questionBody: 'Indicateur du système de verouillage automatique',
      questionImg: panel,
      propositionAnswers: [
        { proposition: '1', is_answer: false },
        { proposition: '2', is_answer: false },
        { proposition: '3', is_answer: false },
        { proposition: '4', is_answer: false },
        { proposition: '5', is_answer: false },
        { proposition: '6', is_answer: false },
        { proposition: '7', is_answer: false },
        { proposition: '8', is_answer: false },
        { proposition: '9', is_answer: true },
        { proposition: '10', is_answer: false },
      ],
      open: false,
      answer: false,
      feedback: `La réponse est le i`,
    },
    {
      questionBody: 'Que signifie ce panneau',
      questionImg: panel,
      propositionAnswers: [
        {
          proposition: 'Route inondée',
          is_answer: false,
        },
        {
          proposition: 'Falaise',
          is_answer: false,
        },
        {
          proposition: 'Aucune',
          is_answer: true,
        },
      ],
      open: false,
      answer: false,
      feedback: `La réponse est 'c'`,
    },
    {
      questionBody: 'Où aprecevriez-vous ce marquage routier ?',
      questionImg: panel,
      propositionAnswers: [
        {
          proposition: "Au niveau d'une intersection",
          is_answer: true,
        },
        {
          proposition: "Sur une bretelle d'autoroute",
          is_answer: false,
        },
        {
          proposition: 'Sur une partie de la route surélevée',
          is_answer: false,
        },
      ],
      open: false,
      answer: false,
      feedback: `La réponse est 'a'`,
    },
    {
      questionBody:
        'Vous êtes à une intersection en T. Un véhicule vient de a gauche avec son clignotant droit activé. Que devrez vous faire?',
      questionImg: panel,
      propositionAnswers: [
        {
          proposition: 'Sortir rapidement',
          is_answer: false,
        },
        {
          proposition: "Attendre jusqu'à ce que le véhicule commence à tourner",
          is_answer: true,
        },
        {
          proposition: 'Aucune',
          is_answer: false,
        },
      ],
      open: false,
      answer: false,
      feedback: `La réponse est 'b'`,
    },
    {
      questionBody:
        "Quelle est la forme du panneau d'arrêt à une intersection?",
      questionImg: panel,
      propositionAnswers: [
        {
          proposition: 'Forme A',
          is_answer: true,
        },
        {
          proposition: 'Forme B',
          is_answer: false,
        },
        {
          proposition: 'Forme C',
          is_answer: false,
        },
        {
          proposition: 'Forme D',
          is_answer: false,
        },
      ],
      open: false,
      answer: false,
      feedback: `La réponse est 'a'`,
    },
  ],
}
