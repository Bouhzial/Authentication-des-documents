export interface User {
    id: string;
    nom: string;
    role: string;
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