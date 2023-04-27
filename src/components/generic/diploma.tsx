import { CursusUniversitaire, Diplome, Etudiant } from '@prisma/client';
import React from 'react'
import { QRCodeCanvas } from 'qrcode.react';
import styles from './diplomas.module.css';
interface Props {
  diplome: Diplome & {
    student: Etudiant & {
      CursusUniversitaire: CursusUniversitaire[];
    }
  },
  departement: string | undefined;
}

export default function Diploma ({ diplome, departement }: Props) {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = day + "/" + month + "/" + year;
  return (

    <div className={styles.body}>

      <img className={styles.background} src="/images/diploma/bg.png" />
      <img className={styles.cadre} src="/images/diploma/cadre.png" />
      <div className={styles.content}>
        <div className={styles.entete}>
          <img src="/images/diploma/logo.jpg" className={styles.logo} />
          <p className={styles.republique}>Republic Algerienne Democratique et Populaire</p>

          <p>Ministere de L'Enseignement Superieur et de la Recherche Scientifique</p>

          <p>Université des Science et de la Technologie - HOUARI BOUMEDIENE</p>

          <h1 className={styles.h1}>ATTESTAION PROVISOIRE DE SUCCES</h1>
        </div>
        <div className={styles.contentbody}>
          <div className={styles.entetebody}>
            <p>Le Recteur de l"universite Des Sciences det de la Technologie - HOURAI BOMEDIENE</p>
            <div className={styles.bulletlist}>
              <p className={styles.bulletpoint}>- Vu le derect executif No 08-265 du 18 aout 2008 portant creation du diplome de licence de
                licence
                et de
                master et de
                doctorat,</p>
              <p className={styles.bulletpoint}>- Vu l'arrete No du 24/09/2013 portant habilitation de l'universite a dispenser de la formation
                Licence
              </p>
              <p className={styles.bulletpoint}>- Vu la proces verbal de deliberation en date 20 Juin 2023</p>
            </div>
          </div>

          <div className={styles.etuddata}>
            <div className={styles.nomdatenaissance}>
              <p className={styles.nom}>Atteste, que l'etudinat(e): {diplome.student.nom.toUpperCase() + " " + diplome.student.prenom.toUpperCase()}</p>
              <p className={styles.datenaiss}>Ne(e) le: {diplome.student.date_naissance.toUpperCase()} a {diplome.student.lieu_naissance.toUpperCase()}</p>
            </div>
            <div className={styles.datadiplome}>
              <p>A obtenu le diplome de : {diplome.type.toUpperCase()}</p>
              <p>Domaine : {diplome.student.CursusUniversitaire[0]?.filiere?.toUpperCase()}</p>
              <p>Filiere : {diplome.student.CursusUniversitaire[0]?.filiere?.toUpperCase()}</p>
              <p>Specialité : {diplome.student.CursusUniversitaire[0]?.specialite?.toUpperCase()}</p>
              <p>Departement : {departement?.toUpperCase()}</p>
            </div>
          </div>

          <div className={styles.footer}>
            <div className={styles.signatures}>
              <p>Le Doyen de la faculte:
                <img className={styles.signature} src="/images/diploma/signature.png" alt="" />
              </p>
              <p>Qr d'authentification:
                <div className={styles.qr} >
                  {diplome?.encrypted_hash && <QRCodeCanvas value={diplome?.encrypted_hash} />}
                </div>
              </p>
              <p>Le Recteur de l'universite:
                <img className={styles.signature} src="/images/diploma/signature.png" alt="" />
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
