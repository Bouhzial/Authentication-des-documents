export enum Role {
  superAdmin = 1,
  issuer = 2,
  verificator = 3,
  student = 4
}

export interface User {
  id?: number;
  nom: string;
  role_id: number;
  email: string;
  matricule: string;
  prenom: string;
  date_naissance: string;
  leui_naissance: string;
  telephone: string;
  image?: {
    name: string;
    size: number;
    lastModified: string;
    type: string;
  };
  departement_id: number;
  faculty_id: number;

  //add the other user fields
}

export interface Diplome {
  id: string;
  signedByDoyen: boolean;
  signedByPresident: boolean;
  student: Student;
  date_obtention: string;
  //add the other diplome fields
}

export interface Student {
  id: string;
  nom: string;
  prenom: string;
  matricule: number;
  filiere: string;
  dipartement: string;
  typeDiplome: string;
  specialite: string;
  email: string;
  date_naissance: string;
  etablissement: string;
  leui_naissance: string;
  telephone: number;
  image: {
    name: string;
    size: number;
    lastModified: number;
    type: string;
  };
  diplomes?: Diplome[];
  //add the other student fields
}
export interface SearchedObejct {
  serached: string;
  type: string;
}