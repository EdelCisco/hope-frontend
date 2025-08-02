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
 const {user} = useUser()
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
if(!user) return <Navigate to="/Connexion" replace />;

  return (
    <>
    
      <div className=' py-4 ' >
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
                <p className="font-bold text-lg lg:text-xl xl:text-2xl">1</p>
                </div>
                <div>
                <p className="py-2 font-medium text-gray-600">Aujourd'hui</p>
                </div>
            </div>
            <div className=" bg-white/80 shadow-lg border-1 border-emerald-500 rounded-md p-2 cursor-pointer">
                <div className="flex justify-between rounded-full ">
                <p className="bg-emerald-500 rounded-full w-8 h-8 flex justify-center items-center lg:w-10 lg:h-10 ">S</p>
                <p className="font-bold text-lg lg:text-xl xl:text-2xl">3</p>
                </div>
                <div>
                <p className="py-2 font-medium text-gray-600">7-13 juil. 2025</p>
                </div>
            </div>
            <div className=" bg-white/80 shadow-lg border-1 border-blue-500 rounded-md p-2 cursor-pointer">
                <div className=" flex justify-between rounded-full  ">
                <p className="bg-blue-500 rounded-full w-8 h-8 flex justify-center items-center lg:w-10 lg:h-10 ">M</p>
                <p className="font-bold text-lg lg:text-xl xl:text-2xl">5</p>
                </div>
                <div>
                <p className="py-2 font-medium text-gray-600">8 juin-8 juil 2025</p>
                </div>
            </div>
            <div className=" bg-white/80 shadow-lg border-1 border-red-500 rounded-md p-2 cursor-pointer">
                <div className=" flex justify-between rounded-full  ">
                <p className="bg-red-500 rounded-full w-8 h-8 flex justify-center items-center lg:w-10 lg:h-10 ">A</p>
                <p className="font-bold text-lg lg:text-xl xl:text-2xl">25</p>
                </div>
                <div>
                <p className="py-2 font-medium text-gray-600">juillet 2024-juillet 2025</p>
                </div>
                </div>
        </div>
        
      
          <div>
            {rdvs.map((rdv,index)=>(
                <div key={index}>
                      <div className='sm:hidden grid grid-cols-2 gap-4 border-1 border-[#f7941d] p-4 rounded-md mt-4 mx-4  xl:text-lg'>
                                  
                                  <p className='font-medium'>Nom:</p>
                                  <p>{rdv.nom_client}</p>
                                  <p className='font-medium'>Motif</p>
                                  <p>{rdv.motif}</p>
                                  <p className='font-medium'>Type de patient</p>
                                  <p>{rdv.type_de_atient}</p>
                                  <p className='font-medium'>Service:</p>
                                  <p>{rdv.service}</p>
                                  <p className='font-medium'>Medécin</p>
                                  <p>{rdv.medecin_souhaite}</p>
                                  <p className='font-medium'>Date et Heure</p>
                                  <p>{rdv.date_du_rendez_vous}</p>
                                  <p className='font-medium'>Confirmé</p>
                                  <p>{rdv.date_du_rendez_vous=0? "Non": "Oui"}</p>
                                  
                                 
                            </div>

                </div>
            ))}
          </div>
          <div className='hidden sm:block pt-4 mx-4 '>
                    <table className=' p-4 border-1 min-w-[100%] border-[#088cb4] '>
                        <thead className="">
                            <tr className='text-lg xl:text-xl'>
                                <th>Nom</th>
                                <th>Motif</th>
                                <th>Date et Heure</th>
                                <th>Service</th>
                                <th>Medécin</th>
                                <th> X</th>
                            </tr>
                        </thead>
                        <tbody className="">
                              {
                             rdvs.map((rdv,index)=>(

                           <tr key={index}  className='xl:text-lg' >
                            
                                  
                                  <td className='border-1 text-left p-2 w-[150px] border-[#088cb4]'>{rdv.nom_client}</td>
                                  
                                  <td  className='border-1 text-left p-2 w-[150px] border-[#088cb4]'>{rdv.motif}</td>
                                   <td  className='border-1 text-left p-2 w-[150px] border-[#088cb4]'>{rdv.type_de_atient}</td>

                                  <td  className='border-1 text-left p-2 w-[150px] border-[#088cb4]'>{rdv.service}</td>
                             
                                  <td  className='border-1 text-left p-2 w-[150px] border-[#088cb4]'>{rdv.medecin_souhaite}</td>
                                  <td  className='border-1 text-left p-2 w-[150px] border-[#088cb4]'> {rdv.date_du_rendez_vous=0? "Non": "Oui"}</td>
                                    <td  className='border-1 text-left p-2 w-[150px] border-[#088cb4]'>{rdv.date_du_rendez_vous}</td>

                                  <td  className='border-1 text-center p-2 w-[150px] border-[#088cb4]'><button className="bg-red-500 px-3 py-1 rounded-2xl cursor-pointer shadow-md shadow-gray-300 hover:scale-115">Annuler</button></td>
                             
                          
                            </tr>
                                ))
                               }
                        </tbody>
                    </table>
                </div>
      
    </div>
    </>
  )
}

export default Rdv
 