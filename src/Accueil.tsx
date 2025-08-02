import { useState } from 'react';
import './App.css';
import Medecin from './Medecin';
import Rdv from './Rdv';
import {FaHome,FaUserMd, FaPhoneAlt, FaUser } from "react-icons/fa"
import {MdEmail} from "react-icons/md"
import { Link } from 'react-router';
// import { IoMdClose } from 'react-icons/io';

function Acceuil() {
const [num,setNum]= useState<boolean>(false)
const [medecin,setMedecin]= useState<boolean>(false)
const [rdv, setRdv]= useState<boolean>(false)
  return (
    <>
      <div className='bg-[#f4f4f462] '>
        <div className='relative'>
          <img src="./fd.jpg" alt="bannière" className='w-full h-[150px] sm:h-auto' />
          <div className='absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-[#088cb4] to-transparent pointer-events-none'></div>
          <div className='absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-[#088cb4] to-transparent pointer-events-none'></div>
          <div className='absolute inset-0 flex gap-4 items-end w-full py-2 ml-10 sm:ml-20 lg:ml-28 xl:ml-40 2xl:ml-48 z-10'>
            <FaHome size={40} color='white' />
            <h2 className='text-white text-xl md:text-2xl lg:text-3xl font-bold '> Tableau de bord</h2>
          </div>
          <svg className='absolute bottom-0 w-full h-20' viewBox='0 0 1440 100' preserveAspectRatio='none'>
            <path fill='#59c2e269' d='M0,0 C480,100 960,0 1440,100 L1440,100 L0,100 Z'></path>
          </svg>
        </div>
        <div className='grid grid-cols-1 gap-4'>
          <div className=' text-[#088cb4] border-1 border-[#59c2e2] mx-4 my-4 py-4 px-2 bg-[#59c2e21c] rounded-md sm:mx-12 lg:mx-10 xl:mx-20 2xl:mx-28'>
            <div className="flex">
              <img src="./infomation.png" alt="icone" className='w-8 lg:w-16'/>
              <h2 className='font-semibold text-lg md:text-xl xl:text-2xl lg:mt-4 lg:ml-4'>Informations</h2>
            </div>
            <div className="ml-8 text-sm lg:text-lg lg:ml-18 xl:text-xl xl:ml-28">
              <ul className="list-disc list-inside">
                <li>Bonjour et bienvenue sur votre espace santé personnel, nous vous invitons à completer votre profil dans l'onglet profil.</li>
                <li>Votre messagérie vous permet d'échanger avec vos médécins. Vous trouverez leurs noms dans la liste de vos destinataires.</li>
                <li>Prenez rendez-vous en ligne avec vos medé cins et recevez des rappels et des notifications pour gérer vos rendez-vous de manière efficace.</li>
              </ul>
            </div>
          </div>
          <div className='grid grid-cols-1 gap-5 mx-4 sm:grid-cols-2 sm:mx-12 lg:gap-0 lg:grid-cols-3 lg:mx-0 xl:mx-10 2xl:mx-18'>
            <div className='relative grid grid-cols-1 gap-5 lg:left-10'>
              <div className=" bg-[#8bc53f] rounded-xl flex items-center px-2 py-5">
                <div className="border-r-1 border-white pr-2">
                  <MdEmail color='white' className='w-16 h-16 xl:w-24 xl:h-24'/>
                </div>
                <div className="w-full text-center text-white">
                    <p className='mb-2 font-semibold text-lg md:text-xl lg:text-xl xl:text-2xl '>Messagerie</p>
                    <button  className='bg-white/70 rounded-md px-5 py-2  text-sm mt-2 hover:scale-110 hover:text-md hover:cursor-pointer transition-transform duration-300'><Link  to="/Message">CLIQUER ICI</Link></button>
                </div>
              </div>
              <div className=" bg-[#8bc53f] rounded-xl flex items-center px-4 py-5">
                <div className="border-r-1 border-white pr-4">
                  <img src="./calendar.png" alt="logo"  className='w-16  xl:w-24 '/>
                </div>
                <div className="w-full text-center text-white">
                  <p className='mb-2 font-semibold text-lg md:text-xl xl:text-2xl'>Rechercher ou annuler un rendez-vous</p>
                  <button className='bg-white/70 rounded-md px-5 py-2  text-sm mt-2 hover:scale-110 hover:text-md hover:cursor-pointer transition-transform duration-300'>CLIQUER ICI</button>
                </div>
              </div>
              <div className=" bg-[#8bc53f] rounded-xl flex items-center px-2 py-5">
                <div className="border-r-1 border-white pr-2">
                  <FaUser color='white' className='w-16 h-16 xl:w-24 xl:h-24'/>
                </div>
                <div className="w-full text-center text-white">
                  <p className='mb-2 font-semibold text-lg md:text-xl xl:text-2xl'>Mon profil</p>
                  <button className='bg-white/70 rounded-md px-5 py-2  text-sm mt-2 hover:scale-110 hover:text-md hover:cursor-pointer transition-transform duration-300'><Link to="/Profil">CLIQUER ICI</Link></button>
                </div>
              </div>
            </div>
            {/* div au centre*/}
            <div className='grid grid-cols-1 px-4 gap-5 bg-[#f7941d] rounded-lg  lg:mx-16 text-white'>
              <div className='w-full text-center py-4 border-b-1 border-white font-semibold text-lg md:text-xl xl:text-2xl'>
                <p className=''>Prendre</p>
                <p>rendez-vous</p>
              </div>
              <div>
                <img src="./calendar.png" alt="logo" className='w-28 md:w-44 lg:w-36 xl:w-44 mx-auto'/>
              </div>
              <div className='w-full flex justify-center items-center py-4'>
                <button    className='bg-white/70 rounded-md px-5 py-2  text-sm mt-2 hover:scale-110 hover:text-md hover:cursor-pointer transition-transform'><Link to="/Rendez-vous">CLIQUER ICI</Link></button> 
              </div>

            </div>
            <div className='relative grid grid-cols-1 gap-5 lg:right-10'>
              <div className=" bg-[#59c2e2] rounded-xl flex items-center px-4 py-5">
                <div className="border-r-1 border-white pr-4">
                  <img src="./chat.png" alt="logo" className='w-16 xl:w-24'/>
                </div>
                <div className="w-full text-center text-white">
                  <p className='mb-2 font-semibold text-lg md:text-xl xl:text-2xl'>Mes rendez-vous</p>
                  <button onClick={()=> setRdv(!rdv)} className='bg-white/70 rounded-md px-5 py-2  text-sm mt-2 hover:scale-110 hover:text-md hover:cursor-pointer transition-transform duration-300'>CLIQUER ICI</button>
                </div>
              </div>
              <div className=" bg-[#59c2e2] rounded-xl flex items-center px-3 py-5">
                <div className="border-r-1 border-white pr-3">
                  <FaUserMd color='white' className='w-16 h-16 xl:w-20 xl:h-20'/>
                </div>
                <div className="w-full text-center text-white">
                  <p className='mb-2 font-medium text-lg md:text-xl xl:text-2xl'>Annuaire medecins</p>
                  <button onClick={()=> setMedecin(!medecin)} className='bg-white/70 rounded-md px-5 py-2  text-sm mt-2 hover:scale-110 hover:text-md hover:cursor-pointer transition-transform duration-300'>CLIQUER ICI</button>
                </div>
              </div>
              <div className=" bg-[#59c2e2] rounded-xl flex items-center  px-4 py-5">
                <div className="border-r-1 border-white pr-4">
                  <FaPhoneAlt color='white' className='w-16 h-16 xl:w-20 xl:h-20'/>
                </div>
                <div className="w-full text-center text-white">
                  <p className='mb-2 font-medium text-lg md:text-xl xl:text-2xl'>Numéros d'urgence</p>
                  <button onClick={()=>{setNum(!false)}} className='bg-white/70 rounded-md px-6 py-2  text-sm mt-2 hover:scale-110 hover:text-md hover:cursor-pointer transition-transform duration-300'>CLIQUER ICI</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {
        num &&(
            <><div className='fixed inset-0 bg-black/30 z-40 ' onClick={()=> setNum(false)} />
            <div className=' fixed inset-0  flex justify-center items-center    z-50 '>
               <div className='w-[90%] h-auto  py-2 lg:w-[70%] xl:w-[50%] rounded-md border-1 border-[#088cb4]  bg-[linear-gradient(to_right,#f3d4d6_0%,#f3f4f6_0%,#088cb4_200%,#088cb4_200%)]  shadow-lg  '>

               
                <div className='  w-full px-4 '>
                    
                    <div className='flex w-full justify-end '>
                        
                         <button onClick={()=> setNum(false)}  className='self-end mb-4 text-[#088cb4] hover:underline'> &times;</button>
                    </div>
                    <div className=''>
                       
                      <h2 className='text-center pt-2 pb-10 lg:pb-4 text-2xl xl:text-3xl'> Numéros d'urgence </h2>
                    </div>
                      
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 overflow-y-auto  '>
                    
                      <div className='pb-4'>
                        <div  className='flex gap-4  items-center '>
                         
                           <p className='text-lg xl:text-xl pb-2 text-[#088cb4] font-medium underline'> Pointe-Noire</p>
                        </div>
                       
                        <ul className='grid grid-cols-2 xl:text-lg'>
                          <li>Numéro de l'hôpital: </li>
                          <li className='font-medium'>06 567 67 67</li>
                          <li>Urgences CHU : </li>
                          <li className='font-medium'>06 662 25 84</li>
                          <li>Clinique Océan :</li>
                          <li className='font-medium'> 06 679 58 50</li>
                          
                        </ul>
                      </div>
                       <div>
                        <p className='text-lg xl:text-xl pb-2 text-[#8bc53f] font-medium underline'> Brazzaville</p>
                        <ul className='grid grid-cols-2 xl:text-lg '>
                          
                          
                          <li>Urgences CHU : </li>
                          <li className='font-medium'>06 624 99 25 </li>
                          <li>Clinique Océan :</li>
                          <li className='font-medium'> 06 679 58 50</li>
                          
                        </ul>
                      </div>
                      
                      <p className='xl:text-lg pt-4'> En cas de danger vital contacter le <strong>334</strong> ou rendez-vous au center hospitalier le plus proche</p>
                      <div className='xl:text-lg pt-8 sm:pt-0  lg:pt-4' >
                      
                          <p  className='text-lg xl:text-xl text-[#f7941d] font-medium underline'>Autres:</p>
                          <ul className='grid grid-cols-2 xl:text-lg'>
                            <li>Pompier:</li>
                            <li className='font-medium'>118</li>
                            <li>Police:</li>
                            <li className='font-medium'>117</li>
                          </ul>
                    
                      
           
                      </div>
                  

                    </div>
                </div>
                
                
                
              


            </div>
            </div>
            </>

            
        )
        }
        {
          medecin && (
            <div  className='fixed inset-0 bg-black/30 z-40 ' > 
               <div className='fixed inset-0  flex justify-center items-center    z-50 '>
                <div className='w-[95%] max-h-[98%] pb-2 rounded-md border-1 border-[#088cb4]  bg-[linear-gradient(to_right,#f3d4d6_0%,#f3f4f6_0%,#088cb4_200%,#088cb4_200%)]     shadow-lg  overflow-x-auto ' >
                  <div className='flex w-full justify-end '>
                        
                         <button onClick={()=> setMedecin(false)}  className='self-end mb-4 text-[#088cb4] hover:underline pr-2'> &times;</button>
                    </div>
                    <div>
                      <Medecin/>
                    </div>
                </div>
               </div>
            </div>
          )
        }
     
      
         {
          rdv && (
              <div  className='fixed inset-0 bg-black/30 z-40 ' > 
               <div className='fixed inset-0  flex justify-center items-center  z-50 '>
                <div className='w-[95%] max-h-[98%] bg-gray-100 rounded-md border-1 border-[#088cb4]     shadow-lg  overflow-x-auto ' >
                  <div className='flex w-full justify-end '>
                        
                         <button onClick={()=> setRdv(false)}  className='self-end mb-4 text-[#088cb4] hover:underline pr-2'> &times;</button>
                    </div>
                    <div>
                      
                      <Rdv/>
                    </div>
                </div>
               </div>
            </div>            
          )
        }
      </div>
    </>
  )
}

export default Acceuil
