export interface User {
    id: string;
    nom: string;
    role_id: number;
    email: string;
    matricule: number;
    prenom: string;
    date_naissance: string;
    leui_naissance: string;
    telephone: number;
    image: {
      name: string;
      size: number;
      lastModified: number;
      type: string;
    };
    //add the other user fields
  }

  export interface Diplome{
    id: string;
    signedByDoyen: boolean;
    signedByRector: boolean;
    student : Student;
    student_id: number;
    date_obtention: string;
    //add the other diplome fields
  }

  export interface Student{
    id: string;
    nom: string;
    prenom: string;
    matricule: number;
    filiere: string;
    departement: string;
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