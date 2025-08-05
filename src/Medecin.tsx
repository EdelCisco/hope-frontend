import './App.css';
import { useState, useEffect } from 'react';
import { api } from './function';
import { MdEmail } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export default function Acceuil() {
  type Medecin = {
    id_medecin: number;
    nom: string;
    sexe: string;
    service: string;
    specialite: string;
    jours: string;
    heure_debut: string;
    heure_fin: string;
  };

  type Service = {
    service: string;
  };

  const [medecins, setMedecins] = useState<Medecin[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<string>('Tous');
  const [search, setSearch] = useState<string>(''); // 🔹 recherche
  const navigate = useNavigate();

  // Composant carte contact médecin
  const CarteMedecin = ({ med }: { med: number }) => {
    const goToDiscussion = () => {
      navigate(`/Message`, { state: { id_medecin: med } });
    };
    return (
      <div
        onClick={goToDiscussion}
        className="text-gray-600 bg-gradient-to-r from-[#088cb436] to-[#8bc53f73] flex gap-2 mt-4 py-2 w-full justify-center my-auto rounded-xl cursor-pointer"
      >
        <MdEmail color="gray" className="w-5 h-5 xl:w-6 xl:h-6" />
        <button>Message</button>
      </div>
    );
  };

  // Récupération des médecins et services
  const medecin = async () => {
    try {
      const response = await api.get("/medecins");
      setServices(response.data.service);
      setMedecins(response.data.medecin);
    } catch (error) {
      console.error('Erreur lors de la récupération des médecins', error);
    }
  };

  useEffect(() => {
    medecin();
  }, []);

  // 🔹 Filtrage combiné service + recherche
  const medecinsFiltres = medecins
    .filter((med) =>
      selectedService === 'Tous' || med.service === selectedService
    )
    .filter((med) => {
      const query = search.toLowerCase();
      return (
        med.nom.toLowerCase().includes(query) ||
        med.specialite.toLowerCase().includes(query) ||
        med.service.toLowerCase().includes(query)
      );
    });

  return (
    <div className='px-4 py-8 bg-gray-50 mx-auto'>
      <div className='flex justify-between gap-5'>
        <p className='text-lg lg:text-xl xl:text-2xl font-medium'>Docteurs</p>
        <form 
          onSubmit={(e) => e.preventDefault()} // 🔹 empêcher rechargement
          className='flex p-2 mb-6 bg-white border-2 border-white shadow-md rounded-xl'
        >
          <input
            type="text"
            name="rechercher"
            placeholder='Rechercher par nom, spécialité ou service'
            value={search}
            onChange={(e) => setSearch(e.target.value)} // 🔹 mettre à jour la recherche
            className='pr-4 sm:pr-40 outline-none cursor-pointer'
          />
          <button type="submit"><FaSearch color='gray' className='w-4 h-4' /> </button>
        </form>
      </div>

      {/* 🔹 Filtres services */}
      <div className='mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4 p-1 bg-white border-2 border-white shadow-lg rounded-xl ml-2'>
        <button
          onClick={() => setSelectedService('Tous')}
          className={`p-2 rounded-xl font-medium cursor-pointer hover:scale-105 transition 
          ${selectedService === 'Tous' ? 'bg-[#088cb4] text-white' : 'bg-gray-100 text-gray-600'}`}
        >
          Tous
        </button>
        {services.map((srv, index) => (
          <button
            key={index}
            onClick={() => setSelectedService(srv.service)}
            className={`p-2 rounded-xl font-medium cursor-pointer hover:scale-105 transition 
            ${selectedService === srv.service ? 'bg-[#088cb4] text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            {srv.service}
          </button>
        ))}
      </div>

      {/* 🔹 Liste des médecins filtrés */}
      <div className='grid grid-cols-1 gap-4 py-4 mt-10'>
        {medecinsFiltres.map((med, index) => (
          <div key={index} className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 px-4 pb-4 rounded-md'>
            <div className='bg-white border-2 border-white shadow-xl rounded-xl flex flex-col gap-2 pt-4 items-center text-sm lg:text-lg'>
              <div className='bg-amber-300 border-2 border-white shadow-xl rounded-full w-40 h-40'>
                <img src="/ft.png" alt="" className='rounded-full w-40 h-40' />
              </div>
              <p className='pt-2'>Dr <span className='font-bold'>{med.nom}</span></p>
              <p className='text-gray-600'>{med.service}</p>
              <p className='bg-[#088cb42f] font-medium text-[#088cb4] py-1 px-8 rounded-lg'>{med.specialite}</p>
              <p className='text-gray-600'>{med.jours}</p>
              <p className='text-gray-600'>De {med.heure_debut} À {med.heure_fin}</p>
              <CarteMedecin med={med.id_medecin} />
            </div>
          </div>
        ))}

        {/* 🔹 Message si aucun médecin trouvé */}
        {medecinsFiltres.length === 0 && (
          <p className='text-center text-gray-500 mt-6'>
            Aucun médecin trouvé pour cette recherche.
          </p>
        )}
      </div>
    </div>
  );
}
