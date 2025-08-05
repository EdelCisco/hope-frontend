import { useState } from 'react';
import { Link } from 'react-router';
import { api } from './function';
import { useUser } from './Users';
import {FaHome,FaCalendarAlt, FaEnvelope, FaUserCircle} from "react-icons/fa"
import {useNavigate} from "react-router-dom"
import Notifications from './Notifications';
export default function Navigation() {
    const [more, setMore]= useState<boolean>(false)
     const {user, setUser} = useUser()
      const navigate = useNavigate();
     const liens = (lien : string) => {
        if(location.pathname === lien){
            return "bg-white text-black"
        } else {
            return "";
        }
    }

       const icon = (lien : string) => {
        if(location.pathname === lien){
            return 'black'
        } else {
            return "white";
        }
    }

  const handleLogout = async () => {
        
        try {
            const response = await api.get("/Deconnexion"); 
            setUser(null)      
            navigate(response.data.route);         
       
        } catch (error) {
            console.error('Erreur lors de la déconnexion', error)
        }
    }
 


    return (
        <div>
            <div className='w-full bg-[#59c2e2] border-b border-[#088cb4] text-sm  flex gap-8 text-white py-2 px-4 mb-10 justify-end  md:pr-22 lg:text-lg xl:text-xl'>
               {user? (
                <div className='flex justify-center items-center gap-6'>
                    <p className=''> Bienvenu Mr/Mme   <span className='pl-4'>{user?.Nom}</span> </p>
                 <button  onClick={handleLogout} className='hover:cursor-pointer hover:scale-110 hover:text-black'>Déconnexion</button>
                <p><Notifications id_client={user.id_client} /></p>
                </div> 
              ): ( <Link to="/Connexion" className='hover:cursor-pointer hover:scale-110 hover:text-black'>Connexion</Link>)}
                
            </div>
            <nav>
                <div className='w-full'>
                    <button onClick={()=>setMore(!more)}><img src="/more.png" alt="more" className=' md:hidden w-8 h-8' /></button>
                    { more &&  
                    <div className=" absolute z-20 grid grid-cols-1 gap-2 text-sm  text-white font-medium bg-[#59c2e2be] px-1">
                        <div className="">
                        <p>HOPE</p>
                        </div>
                    <Link to="/" className={`group ${liens('/')} ${liens('/Accueil')} bg-[#088cb4] text-black flex  gap-2  px-1  rounded-t-sm  hover:bg-none  py-1  transition-all duration-300 hover:cursor-pointer hover:text-black`}>
                         <FaHome size={12} color={`${icon('/')} `} className=' group-hover:hidden' />
                        <FaHome size={12} color='black'  className='hidden  group-hover:block' />
                        <p>Tableau de bord</p>
                    </Link>
                    <Link to="/Rendez-vous" className={`group ${liens('/Rendez-vous')} flex   gap-2 px-1   rounded-t-sm border-[#088cb4] bg-[#088cb4] border-r-1 hover:text-black hover:bg-none border-l-1 border-t-1 py-1   transition-all duration-300 hover:cursor-pointer`}>
                        <FaCalendarAlt size={12} color={`${icon('/Rendez-vous')} `} className='  group-hover:hidden' />
                        <FaCalendarAlt size={12} color='black' className='hidden   group-hover:block' />
                        <p>Prendre un rendez vous</p>
                    </Link>
                    <Link to="/Message"  className={`group ${liens('/Message')} flex   gap-2 px-1   rounded-t-sm border-[#088cb4] bg-[#088cb4] border-r-1 hover:text-black hover:bg-none border-l-1 border-t-1 py-1  transition-all duration-300 hover:cursor-pointer`}>               
                        <FaEnvelope size={12} color={`${icon('/Message')} `} className='  group-hover:hidden' />
                        <FaEnvelope size={12} color='black' className='hidden   group-hover:block' />
                        <p>Ma messagérie</p>
                    </Link>
                    <Link to="/Profil" className={`group ${liens('/Profil')} flex gap-2 px-1   rounded-t-sm border-[#088cb4] bg-[#088cb4] border-r-1 hover:text-black hover:bg-none border-l-1 border-t-1 py-1   transition-all duration-300 hover:cursor-pointer`}>
                        <FaUserCircle size={12} color={`${icon('/Profil')} `} className=' group-hover:hidden' />
                        <FaUserCircle size={12} color='black' className='hidden  group-hover:block' />
                        <p>Mon profil</p>
                    </Link>
                    </div>}
                </div>
                <div className='hidden  md:flex justify-between items-center border-b-1 border-[#088cb4] px-12 xl:px-20 2xl:px-28'>
                    <div className="font-bold text-4xl pr-4 2xl:pr-0">
                    <p>HOPE</p>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-sm lg:text-lg text-white font-medium">
                    <Link to="/" className={`group ${liens('/')} ${liens('/Accueil')}   bg-[#088cb4] flex justify-center  items-center gap-2 lg:gap-4 px-1 lg:px-4 rounded-t-sm border-[#088cb4] border-r-1 hover:bg-white border-l-1 border-t-1 py-1 xl:py-2  transition-all duration-300 hover:cursor-pointer hover:text-black`}>
                        <FaHome size={26} color={`${icon('/')} `} className=' group-hover:hidden' />
                        <FaHome size={26} color='black'  className='hidden  group-hover:block' />
                        <p>Tableau de bord</p>
                    </Link>
                    <Link to="/Rendez-vous" className={`group ${liens('/Rendez-vous')} flex items-center justify-center  gap-2 lg:gap-4 px-1 lg:px-4  rounded-t-sm border-[#088cb4] bg-[#088cb4] border-r-1 hover:text-black hover:bg-white border-l-1 border-t-1 py-1 xl:py-2  transition-all duration-300 hover:cursor-pointer`}>
                           <FaCalendarAlt size={26} color={`${icon('/Rendez-vous')} `} className='  group-hover:hidden' />
                        <FaCalendarAlt size={26} color='black' className='hidden   group-hover:block' />
                        <p>Prendre un rendez vous</p>
                    </Link>
                    <Link to="/Message" className={`group ${liens('/Message')} flex items-center justify-center  gap-2 lg:gap-4 px-1 lg:px-4   rounded-t-sm border-[#088cb4] bg-[#088cb4] border-r-1 hover:text-black hover:bg-white border-l-1 border-t-1 py-1 xl:py-2  transition-all duration-300 hover:cursor-pointer`}>               
                          <FaEnvelope size={26} color={`${icon('/Message')} `} className='  group-hover:hidden' />
                        <FaEnvelope size={26} color='black' className='hidden   group-hover:block' />
                        <p>Ma messagérie</p>
                    </Link>
                    <Link to="/Profil" className={`group ${liens('/Profil')} flex items-center justify-center gap-2 lg:gap-4 px-1 lg:px-4   rounded-t-sm border-[#088cb4] bg-[#088cb4] border-r-1 hover:text-black hover:bg-white border-l-1 border-t-1 py-1 xl:py-2   transition-all duration-300 hover:cursor-pointer`}>
                        <FaUserCircle size={26} color={`${icon('/Profil')} `} className=' group-hover:hidden' />
                        <FaUserCircle size={26} color='black' className='hidden  group-hover:block' />
                        <p>Mon profil</p>
                    </Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}
