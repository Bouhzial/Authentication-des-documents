import React, { useRef } from 'react'
import { CursusUniversitaire, Etudiant, Diplome, Departement } from '@prisma/client';
import Diploma from '../generic/diploma';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';


interface Props {
    diplome: Diplome & {
        student: Etudiant & {
            CursusUniversitaire: CursusUniversitaire[];
        }
    },
    close: (val: boolean) => void;
    departements: Departement[];
}

export default function DiplomaTemplate ({ diplome, close, departements }: Props) {
    const depaetment = departements.find((dep) => dep.id === diplome.student.CursusUniversitaire[0]?.departement_id)

    function change () {
        close(false)
    }

    const printRef = React.useRef<HTMLDivElement>(null)
    const handleDownloadPdf = async () => {
        const element = printRef.current;
        if (!element) return;
        const canvas = await html2canvas(element, { scale: 3 });
        const data = canvas.toDataURL('image/png');

        const pdf = new jsPDF('l', 'in', [8.3, 11.7]);
        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight =
            (imgProperties.height * pdfWidth) / imgProperties.width;

        pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('diploma.pdf');
    };


    return (
        <div className='flex absolute top-0 left-0 justify-center items-center h-screen w-screen bg-slate-600 bg-opacity-50 z-[9999]'>
            <div className='top-0 absolute left-0 h-[12.5%] w-screen bg-transparent' onClick={change}></div>
            <div className='absolute top-0 left-0 h-screen w-[12.5%] bg-transparent' onClick={change}></div>
            <div className='absolute bottom-0 right-0 h-screen w-[12.5%] bg-transparent' onClick={change}></div>
            <div className='absolute h-[12.5%] bottom-0 right-0 w-screen bg-transparent' onClick={change}></div>
            <div className='xs:scale-[0.3] sm:scale-[0.4] md:scale-[0.5] lg:scale-[0.75]' ref={printRef}>
                <Diploma diplome={diplome} departement={depaetment?.nom} />
            </div>
            <button className="w-36 h-10 bg-link-text-blue text-white cursor-pointer absolute top-2" onClick={handleDownloadPdf}>Telecharger</button>
        </div>
    )
}