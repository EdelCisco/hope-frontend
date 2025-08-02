import './App.css';
import { useState, useEffect } from 'react';
import { api } from './function';

export default function Acceuil() {
  type Medecin = {
    id_medecin: number;
    nom: string;
    sexe: string;
    service: string;
    specialite: string; // ✅ corrigé ici
    jours: string;
    heure_debut: string;
    heure_fin: string;
  };

  const [medecins, setMedecins] = useState<Medecin[]>([]);

  const medecin = async () => {
    try {
      const response = await api.get("/medecins");
      setMedecins(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des médecins', error);
    }
  };

  useEffect(() => {
    medecin();
  }, []);

  return (
    <div className='px-4'>
      <div className='max-h-screen bg-cover bg-center flex flex-col justify-center items-center relative' style={{ backgroundImage: "url('/inscri.jpeg')" }}>
        <div className='my-auto py-20 px-4 md:py-36'>
          <h2 className='text-center pb-4 text-xl md:text-2xl lg:text-3xl font-bold my-auto'>Annuaire médecins de l'hôpital</h2>
          <p className='xl:text-lg text-center'>Ici, vous pouvez consulter la liste de tous nos médecins, ainsi que leur spécialité et horaires journaliers.</p>
        </div>
      </div>

      <div className='grid grid-cols-1 gap-4 py-4 mt-4 border-t-2 border-[#088cb4]'>
        {medecins.map((med, index) => (
          <div key={index}>
            <div className='grid grid-cols-1 gap-4 border-1 border-[#f7941d] sm:border-none px-4 pb-4 rounded-md'>

              {/* Affichage mobile */}
              <div className='sm:hidden'>
                <div className='grid grid-cols-2 border-1 border-[#f7941d] p-4 rounded-md mt-4 xl:text-lg'>
                  <p className='font-medium'>Nom:</p>
                  <p>{med.nom}</p>
                  <p className='font-medium'>Sexe:</p>
                  <p>{med.sexe}</p>
                  <p className='font-medium'>Service:</p>
                  <p>{med.service}</p>
                  <p className='font-medium'>Spécialité:</p>
                  <p>{med.specialite}</p> {/* ✅ corrigé ici */}
                  <p className='font-medium'>Jours:</p>
                  <p>{med.jours}</p>
                  <p className='font-medium'>De:</p>
                  <p>{med.heure_debut}</p>
                  <p className='font-medium'>À:</p>
                  <p>{med.heure_fin}</p>
                </div>
              </div>

              {/* Affichage bureau */}
              <div className='hidden sm:block pt-4'>
                <table className='p-4 border-1 min-w-[100%]'>
                  <thead>
                    <tr className='text-lg xl:text-xl'>
                      <th>Nom</th>
                      <th>Sexe</th>
                      <th>Service</th>
                      <th>Spécialité</th>
                      <th>Jours</th>
                      <th>De</th>
                      <th>À</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr key={index} className='xl:text-lg'>
                      <td className='border-1 text-left p-2 w-[150px]'>{med.nom}</td>
                      <td className='border-1 text-left p-2 w-[150px]'>{med.sexe}</td>
                      <td className='border-1 text-left p-2 w-[150px]'>{med.service}</td>
                      <td className='border-1 text-left p-2 w-[150px]'>{med.specialite}</td> {/* ✅ corrigé ici */}
                      <td className='border-1 text-left p-2 w-[150px]'>{med.jours}</td>
                      <td className='border-1 text-left p-2 w-[150px]'>{med.heure_debut}</td>
                      <td className='border-1 text-left p-2 w-[150px]'>{med.heure_fin}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
