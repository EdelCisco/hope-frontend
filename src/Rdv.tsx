// import { useState } from 'react'
// import { FaUserMd, FaPhoneAlt, FaBirthdayCake, FaUser, FaTag,FaFileAlt,FaStethoscope, FaInfoCircle, FaRegStickyNote} from "react-icons/fa"
// import { MdAccessTime } from "react-icons/md"

import {useState, useEffect } from 'react';
import { api } from './function';
import { useUser } from './Users';
import { Navigate } from 'react-router';
function Rdv() {
  // const [oeil, setOeil]= useState<boolean>(false);
  type rdv ={
    id:number;
    nom_client: string;
    medecin_souhaite:string;
    service: string;
    motif: string;
    type_de_atient: string;
    date_du_rendez_vous: string;
    confimation:number;

}



 const [rdvs, setRdvs] = useState<rdv[]>([]);
 const {user,loading} = useUser()
  const rdv = async () => {
      try {
        const response = await api.get("/rdv");
        if(response.data.errors==null){
        setRdvs(response.data.infos);
        }
       else{ Navigate(response.data.route)}
      } catch (error) {
        console.error('Erreur lors de la récupération des services', error);
      }
    };
    
useEffect(()=>{
    rdv()
})
if (loading) return <div>Chargement...</div>; 
if (!user) return <Navigate to="/Connexion" replace />;

  return (
    <>
    
      <div className=' py-4 bg-gray-50' >
        <div className="h-20 relative  text-xl lg:text-3xl xl:text-4xl">
            <p className="absolute  inset-0 flex w-full h-20 justify-center items-center">Mes rendez-vous médicaux</p>
          <svg className='absolute   h-20 w-full ' viewBox='0 0 1440 100' preserveAspectRatio='none'>
            <path fill='#59c2e269' d='M0,0 C441,150 390,10 2500,150 L1440,120 L0,100 Z'></path>
          </svg>
        </div>
        <div className="grid grid-cols-2 gap-4 border-t-2 border-[#088cb4] px-4 py-4 xl:text-lg lg:px-[20%]">
            <div  className="bg-white/80 shadow-lg border-1 border-yellow-500 rounded-md p-2 cursor-pointer">
                <div className="flex justify-between rounded-full  ">
                <p className="bg-yellow-500 rounded-full w-8 h-8 flex justify-center items-center lg:w-10 lg:h-10 ">J</p>
                <p className="font-bold text-lg lg:text-xl xl:text-2xl text-gray-800">1</p>
                </div>
                <div>
                <p className="py-2 font-medium text-gray-600">Aujourd'hui</p>
                </div>
            </div>
            <div className=" bg-white/80 shadow-lg border-1 border-emerald-500 rounded-md p-2 cursor-pointer">
                <div className="flex justify-between rounded-full ">
                <p className="bg-emerald-500 rounded-full w-8 h-8 flex justify-center items-center lg:w-10 lg:h-10 ">S</p>
                <p className="font-bold text-lg lg:text-xl xl:text-2xl text-gray-800">3</p>
                </div>
                <div>
                <p className="py-2 font-medium text-gray-600">7-13 juil. 2025</p>
                </div>
            </div>
            <div className=" bg-white/80 shadow-lg border-1 border-blue-500 rounded-md p-2 cursor-pointer">
                <div className=" flex justify-between rounded-full  ">
                <p className="bg-blue-500 rounded-full w-8 h-8 flex justify-center items-center lg:w-10 lg:h-10 ">M</p>
                <p className="font-bold text-lg lg:text-xl xl:text-2xl text-gray-800">5</p>
                </div>
                <div>
                <p className="py-2 font-medium text-gray-600">8 juin-8 juil 2025</p>
                </div>
            </div>
            <div className=" bg-white/80 shadow-lg border-1 border-red-500 rounded-md p-2 cursor-pointer">
                <div className=" flex justify-between rounded-full  ">
                <p className="bg-red-500 rounded-full w-8 h-8 flex justify-center items-center lg:w-10 lg:h-10 ">A</p>
                <p className="font-bold text-lg lg:text-xl xl:text-2xl text-gray-800">25</p>
                </div>
                <div>
                <p className="py-2 font-medium text-gray-600">juillet 2024-juillet 2025</p>
                </div>
                </div>
        </div>
        <div className='mx-20 mt-10 flex gap-10'>
                  <p className='text-gray-800 font-bold text-sm lg:text-lg xl:text-xl ' >Aujourd'hui</p>
                   <p className='text-gray-600 font-medium text-sm lg:text-md xl:text-lg ' >3</p>
        </div>

        <div className='mx-20 bg-white border-2 border-[#088cb4]/10 shadow-lg rounded-xl mt-8 p-5'>
          <div className='grid grid-cols-7 gap-4 p-5  font-medium  text-gray-800'>
          <p>Nom</p>
          <p>Motif</p>
          <p>Service</p>
          <p>Médecin</p>
          <p>Date et Heure</p>
          <p>Confirmation</p>
          <p></p>

        </div>
      
          <div>
            {rdvs.map((rdv,index)=>(
                <div key={index} className='grid grid-cols-1 gap-2 text-gray-700'>
                      <div className='grid grid-cols-7 gap-4 p-4 border-t-2 border-gray-200'>
                          <p>{rdv.nom_client}</p>
                          <p>{rdv.motif}</p>
                          <p>{rdv.service}</p>
                          <p>{rdv.medecin_souhaite}</p>
                          <p className='text-gray-800 font-medium'>{rdv.date_du_rendez_vous}</p>
                          <p>{rdv.confimation}</p>
                          <button className='bg-red-500 mx-10 px-3 py-1 text-gray-600 rounded-2xl cursor-pointer shadow-md shadow-gray-300 hover:scale-105'> Annuler</button>
                      </div>
                      <div className='grid grid-cols-7 p-4 gap-4 border-t-2 border-gray-200'>
                          <p>{rdv.nom_client}</p>
                          <p>{rdv.motif}</p>
                          <p>{rdv.service}</p>
                          <p>{rdv.medecin_souhaite}</p>
                          <p className='text-gray-800 font-medium'>{rdv.date_du_rendez_vous}</p>
                          <p>{rdv.confimation}</p>
                          <button className='bg-red-500 mx-10 px-3 py-1 text-gray-600 rounded-2xl cursor-pointer shadow-md shadow-gray-300 hover:scale-105'> Annuler</button>
                      </div>
                </div>
            ))}
          </div>
        </div>
 
      
    </div>
    </>
  )
}

export default Rdv
 