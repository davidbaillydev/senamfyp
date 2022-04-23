//export const eventTypes = ["Soirée", "Afterwork", "Gala", "Conférence"];
export const eventTypes = [
    { label: "Tout type", value: '1' },
    { label: "Bar", value: '2' },
    { label: "Boîte de nuit", value: '3' },
    { label: "Festival", value: '4' },
    { label: "Concert", value: '5' },
    { label: "Apéro", value: '6' },
    { label: "Appartement", value: '7' },
    { label: "Maison", value: '8' },
    { label: "Anniversaire", value: '9' },
    { label: "Scène ouverte", value: '10' },
    { label: "DJ Set", value: '11' }
  ];
export const eventCategories = [
    {name : "Evènements festifs", img:require('../assets/CreateEvent/TypeFestif.png')},
    // {name : "Evènements culturels", img:require('../assets/CreateEvent/TypeCulturel.png')},
    {name : "Autres évènements", img:require('../assets/CreateEvent/TypeAutre.png')},
];

export const eventTypesAllFestifs = [
    {name:"Gala",selected:false},
    {name:"Bar",selected:false},
    {name:"Boîte de nuit",selected:false},
    {name:"Festival",selected:false},
    {name:"Concert",selected:false},
    {name:"Appartement",selected:false},
    {name:"Maison",selected:false},
    {name:"Anniversaire",selected:false},
    {name:"Scène ouverte",selected:false},
    {name:"Dj Set",selected:false}
];

export const eventTypesAllOthers = [
    {name:"Culturel",selected:false},
    {name:"Sportif",selected:false},
    {name:"Associatif",selected:false},
    {name:"Politique",selected:false},
    {name:"Séminaire",selected:false},
    {name:"Spectacle",selected:false},
    {name:"Vide grenier",selected:false}
]

export const moodsAllFestifs = [
    {name:"Pop",selected:false},
    {name:"Rock",selected:false},
    {name:"Rap",selected:false},
    {name:"Hip-Hop",selected:false},
    {name:"Techno",selected:false},
    {name:"Electro",selected:false},
    {name:"Trance",selected:false},
    {name:"Minimal",selected:false},
    {name:"Afro",selected:false},
    {name:"Dancehall/Zook",selected:false},
    {name:"Latino",selected:false},
    {name:"Années 60",selected:false},
    {name:"Années 70",selected:false},
    {name:"Années 80",selected:false},
    {name:"Années 90",selected:false},
    {name:"Années 2000",selected:false},
    {name:"Métal",selected:false},
];

export const moodsAllOthers = [
    {name:"Pédagogique",selected:false},
    {name:"Humoristique",selected:false},
    {name:"Rencontre",selected:false},
    {name:"Détente",selected:false},
    {name:"Réseau",selected:false},
];

export const characsAllFestifs = [
    {name:"Espace fumeur",selected:false},
    {name:"Piscine",selected:false},
    {name:"Rooftop",selected:false},
    {name:"Soirée déguisée",selected:false},
    {name:"Repas inclus",selected:false},
    {name:"Soirée à thème",selected:false},
    {name:"Insolite",selected:false},
    {name:"Sans alcool",selected:false},
    {name:"Jeux de société",selected:false},
    {name:"Dress code \"chic\"",selected:false},
    {name:"Intérieur",selected:false},
    {name:"Extérieur",selected:false},
    {name:"LGBTQ+ Friendly",selected:false},
    {name:"Safe space",selected:false},
];

export const characsAllOthers = [
    {name:"Espace fumeur",selected:false},
    {name:"Extérieur",selected:false},
    {name:"Intérieur",selected:false},
    {name:"Avec alcool",selected:false},
    {name:"LGBTQ+ Friendly",selected:false},
    {name:"Safe space",selected:false},
    {name:"Restauration sur place",selected:false},
    {name:"Espèce uniquement",selected:false},
    {name:"Tout public",selected:false},
    {name:"18+",selected:false},
    {name:"Quertier/Voisinage",selected:false},
    {name:"Places assises limitées",selected:false},
    {name:"Communautaire",selected:false},
];

export const defaultEvent = eventTypes[1];
export const sex = ["Femme","Homme","Non défini"]; 
export const roles = ["Indéterminé","Personne physique","Personne morale"];
export const hoursAddressVisible = ["1h avant","2h avant","1 jour avant"];
export const roleCollaborator = ["Admin","Editeur","Scanneur"];