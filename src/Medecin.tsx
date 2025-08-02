import './App.css';
import { useState, useEffect } from 'react';
import { api } from './function';
import {MdEmail} from "react-icons/md"
import {FaSearch} from "react-icons/fa"
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
    <div className='px-4 py-8 bg-gray-50 mx-auto'>
      <div className='flex justify-between gap-3'>
        <p className='text-lg lg:tex-xl xl:text-2xl font-medium '> Docteurs</p>
        <form className=' flex p-2 mb-6 bg-white border-2 border-white shadow-md rounded-xl'>
        <input type="text" name="rechercher" placeholder='rechercher un docteur' className='pr-10 sm:pr-40  outline-none cursor-pointor' required />
          <button><FaSearch color='gray' className='w-4 h-4'/> </button>
        </form>
         
      </div>
     
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4 p-1 bg-white border-2 border-white shadow-lg rounded-xl ml-2 ' >
        <p className='bg-gradient-to-r from-[#088cb4] to-[#8bc53f73] hover:scale-105 hover:from-[#8bc53f73] hover:to-[#088cb4] cursor-pointer p-2 rounded-xl text-center text-white font-medium'>Tous</p>
      </div>

      <div className='grid grid-cols-1 gap-4 py-4 mt-10'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  2xl:grid-cols-4 gap-4  s px-4 pb-4 rounded-md'>

              {/* Affichage mobile */}
              <div className='bg-white border-2 border-white shadow-xl rounded-xl flex flex-col gap-2 pt-4 items-center text-sm lg:text-lg '>
               <div className='bg-amber-300 border-2 border-white shadow-xl rounded-full w-40 h-40 '>
                <img src="/ft.png" alt="" className='rounded-full w-40 h-40'/>
               </div>
               <p className='pt-2'>Dr <span className='font-bold'>Robert</span></p>
               <p className='text-gray-600'>cardiologie</p>
               <p className='bg-[#088cb42f] font-medium text-[#088cb4] py-1 px-8 rounded-lg'>cardiologue</p>
               <p className='text-gray-600'>lundi au samedi</p>
               <p className='text-gray-600'>De 8h À 16h</p>
               <div className='text-gray-600 bg-gradient-to-r from-[#088cb436] to-[#8bc53f73]  flex gap-2 mt-4 py-2  w-full justify-center my-auto rounded-xl cursor-pointer'> <MdEmail color='gray' className='w-5 h-5 xl:w-6 xl:h-6'/>
               <button> Message</button></div>
              </div>


            </div>
        {medecins.map((med, index) => (
          <div key={index}>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  2xl:grid-cols-4 gap-4  s px-4 pb-4 rounded-md'>

              {/* Affichage mobile */}
              <div className='bg-white border-2 border-white shadow-xl rounded-xl flex flex-col gap-2 pt-4 items-center text-sm lg:text-lg '>
               <div className='bg-amber-300 border-2 border-white shadow-xl rounded-full w-40 h-40 '>
                <img src="/ft.png" alt="" className='rounded-full w-40 h-40'/>
               </div>
               <p className='pt-2'>Dr <span className='font-bold'>{med.nom}</span></p>
               <p className='text-gray-600'>{med.service}cardiologie</p>
               <p className='bg-[#088cb42f] font-medium text-[#088cb4] py-1 px-8 rounded-lg'>{med.specialite}cardiologue</p>
               <p className='text-gray-600'>{med.jours}</p>
               <p className='text-gray-600'>De {med.heure_debut} À {med.heure_fin}</p>
               <div className='text-gray-600 bg-gradient-to-r from-[#088cb436] to-[#8bc53f73]  flex gap-2 mt-4 py-2  w-full justify-center my-auto rounded-xl cursor-pointer'> <MdEmail color='gray' className='w-5 h-5 xl:w-6 xl:h-6'/>
               <button> Message</button></div>
              </div>


            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
