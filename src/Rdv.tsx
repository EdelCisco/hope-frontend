import { useState, useEffect, useMemo } from 'react';
import { api } from './function';
import { useUser } from './Users';
import { Navigate } from 'react-router';

type RdvType = {
  id_rendez_vous: number;
  nom_du_client: string;
  medecin_souhaite: string;
  service: string;
  motif: string;
  type_de_atient: string;
  date_du_rendez_vous: string; // ISO string
  confirmation: number;
};

type FilterType = 'jour' | 'semaine' | 'mois' | 'annee';

function Rdv() {
  const [rdvs, setRdvs] = useState<RdvType[]>([]);
  const [filter, setFilter] = useState<FilterType>('jour'); // par défaut "jour"
  const { user, loading } = useUser();

  const fetchRdv = async () => {
    try {
      const response = await api.get("/rdv");
      if (response.data.errors == null) {
        setRdvs(response.data.infos);
      } else {
        Navigate(response.data.route);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des rendez-vous', error);
    }
  };

  const Annuler = async (id: number) => {
    try {
      const response = await api.post(`/Annuler/${id}`);
      if (response.data.errors == null) {
        setRdvs(prev => prev.filter(r => r.id_rendez_vous !== id));
      } else {
        Navigate(response.data.route);
      }
    } catch (error) {
      console.error('Erreur lors de l’annulation', error);
    }
  };

  useEffect(() => {
    fetchRdv();
  }, []);

  // --- LOGIQUE DE FILTRAGE ---
  const today = new Date();

  const filteredRdvs = useMemo(() => {
    return rdvs.filter((rdv) => {
      const date = new Date(rdv.date_du_rendez_vous);
      switch (filter) {
        case 'jour':
          return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
          );
        case 'semaine': {
          const startOfWeek = new Date(today);
          startOfWeek.setDate(today.getDate() - today.getDay()); // dimanche
          startOfWeek.setHours(0, 0, 0, 0);

          const endOfWeek = new Date(startOfWeek);
          endOfWeek.setDate(endOfWeek.getDate() + 6);
          endOfWeek.setHours(23, 59, 59, 999);

          return date >= startOfWeek && date <= endOfWeek;
        }
        case 'mois':
          return (
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
          );
        case 'annee':
          return date.getFullYear() === today.getFullYear();
        default:
          return true;
      }
    });
  }, [rdvs, filter]);

  // --- CALCUL INFOS D'AFFICHAGE ---
  const weekNumber = Math.ceil((today.getDate() - today.getDay()) / 7) + 1;
  const monthName = today.toLocaleString('fr-FR', { month: 'long' });
  const year = today.getFullYear();

  if (loading) return <div>Chargement...</div>;
  if (!user) return <Navigate to="/Connexion" replace />;

  return (
    <div className='py-4 bg-gray-50'>
      <div className="h-20 relative text-xl lg:text-3xl xl:text-4xl">
        <p className="absolute inset-0 flex w-full h-20 justify-center items-center">
          Mes rendez-vous médicaux
        </p>
        <svg className='absolute h-20 w-full' viewBox='0 0 1440 100' preserveAspectRatio='none'>
          <path fill='#59c2e269' d='M0,0 C441,150 390,10 2500,150 L1440,120 L0,100 Z'></path>
        </svg>
      </div>

      {/* BOUTONS DE FILTRE */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t-2 border-[#088cb4] px-4 py-4 xl:text-lg lg:px-[20%]">
        <div onClick={() => setFilter('jour')}
          className={`bg-white/80 shadow-lg rounded-md p-2 cursor-pointer border-2 ${filter === 'jour' ? 'border-yellow-500' : 'border-transparent'}`}>
          <div className="flex justify-between rounded-full">
            <p className="bg-yellow-500 rounded-full w-8 h-8 flex justify-center items-center lg:w-10 lg:h-10">J</p>
            <p className="font-bold text-lg lg:text-xl xl:text-2xl text-gray-800">{today.getDate()}</p>
          </div>
          <p className="py-2 font-medium text-gray-600">Aujourd'hui</p>
        </div>

        <div onClick={() => setFilter('semaine')}
          className={`bg-white/80 shadow-lg rounded-md p-2 cursor-pointer border-2 ${filter === 'semaine' ? 'border-emerald-500' : 'border-transparent'}`}>
          <div className="flex justify-between rounded-full">
            <p className="bg-emerald-500 rounded-full w-8 h-8 flex justify-center items-center lg:w-10 lg:h-10">S</p>
            <p className="font-bold text-lg lg:text-xl xl:text-2xl text-gray-800">{weekNumber}</p>
          </div>
          <p className="py-2 font-medium text-gray-600">Semaine {weekNumber} - {year}</p>
        </div>

        <div onClick={() => setFilter('mois')}
          className={`bg-white/80 shadow-lg rounded-md p-2 cursor-pointer border-2 ${filter === 'mois' ? 'border-blue-500' : 'border-transparent'}`}>
          <div className="flex justify-between rounded-full">
            <p className="bg-blue-500 rounded-full w-8 h-8 flex justify-center items-center lg:w-10 lg:h-10">M</p>
            <p className="font-bold text-lg lg:text-xl xl:text-2xl text-gray-800">{today.getMonth() + 1}</p>
          </div>
          <p className="py-2 font-medium text-gray-600">{monthName} {year}</p>
        </div>

        <div onClick={() => setFilter('annee')}
          className={`bg-white/80 shadow-lg rounded-md p-2 cursor-pointer border-2 ${filter === 'annee' ? 'border-red-500' : 'border-transparent'}`}>
          <div className="flex justify-between rounded-full">
            <p className="bg-red-500 rounded-full w-8 h-8 flex justify-center items-center lg:w-10 lg:h-10">A</p>
            <p className="font-bold text-lg lg:text-xl xl:text-2xl text-gray-800">{year}</p>
          </div>
          <p className="py-2 font-medium text-gray-600">Année {year}</p>
        </div>
      </div>

      {/* TITRE LISTE */}
      <div className='mx-20 mt-10 flex gap-10'>
        <p className='text-gray-800 font-bold text-sm lg:text-lg xl:text-xl'>
          {filter === 'jour' && `Aujourd'hui`}
          {filter === 'semaine' && `Semaine ${weekNumber}`}
          {filter === 'mois' && `${monthName} ${year}`}
          {filter === 'annee' && `Année ${year}`}
        </p>
        <p className='text-gray-600 font-medium text-sm lg:text-md xl:text-lg'>
          {filteredRdvs.length} rendez-vous
        </p>
      </div>

      {/* TABLEAU RDVS */}
      <div className='mx-20 bg-white border-2 border-[#088cb4]/10 shadow-lg rounded-xl mt-8 p-5'>
        <div className='grid grid-cols-7 gap-4 p-5 font-medium text-gray-800'>
          <p>Nom</p>
          <p>Motif</p>
          <p>Service</p>
          <p>Médecin</p>
          <p>Date et Heure</p>
          <p>Confirmation</p>
          <p></p>
        </div>

        {filteredRdvs.map((rdv) => (
          <div key={rdv.id_rendez_vous} className='grid grid-cols-7 gap-4 p-4 border-t-2 border-gray-200 text-gray-700'>
            <p>{rdv.nom_du_client}</p>
            <p>{rdv.motif}</p>
            <p>{rdv.service}</p>
            <p>{rdv.medecin_souhaite}</p>
            <p className='text-gray-800 font-medium'>
              {new Date(rdv.date_du_rendez_vous).toLocaleString('fr-FR')}
            </p>
            <p>{rdv.confirmation === 0 ? 'non' : 'oui'}</p>
            <button
              onClick={() => Annuler(rdv.id_rendez_vous)}
              className='bg-red-500 mx-10 px-3 py-1 text-gray-600 rounded-2xl cursor-pointer shadow-md hover:scale-105'
            >
              Annuler
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rdv;
