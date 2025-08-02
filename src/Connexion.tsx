import { useState } from 'react'
import './App.css'
import {FaKey, FaEye, FaEyeSlash} from "react-icons/fa"
import {MdEmail} from "react-icons/md"
import { api } from "./function";
import { useUser } from './Users';
import {useNavigate ,Link} from "react-router-dom"

function Connexion() {
    const [oeil, setOeil]= useState<boolean>(false)
 const {setUser} = useUser()

  const [data, setData] = useState({
    email: "",
    password: "",
  
  });

  const [bloque, setBloque] = useState(false); // Gère l'état de blocage du formulaire
  const [erreur, setError] = useState<string []>([]);
 
  const navigate = useNavigate();


  const Change = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submit = async (e: React.FormEvent) => {
   
    e.preventDefault();
    setError([]);
    // Réinitialise les messages d'erreur et de succès
   
    try {
      setBloque(true);
      
      const response = await api.post("/Connexion", data);

       if(response.data.errors==null){
         const userRes = await api.post("/Token");

      if (userRes.data && userRes.data.Email) {
        setUser(userRes.data); // ← mise à jour du contexte
      }
     navigate(response.data.route);

      setData({
        email: "",
        password: "",
      
      });
    }
     else{
      
      const res=response.data.errors;
     
      setError(res);
      
      setBloque(false);
    }
      
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire :", error);
      setBloque(false);
        
    }
  };




  return (
    <>
      <div className='min-h-screen bg-cover bg-center flex flex-col justify-center items-center ' style={{backgroundImage: "url('/inscri.jpeg')"}}>
        <div className='backdrop-blur-xs w-[90%] 2xl:w-[60%] bg-white/10 rounded-2xl border-1 border-[#088cb4] grid grid-cols-1 sm:grid-cols-2 py-4'>
            <div className='flex flex-col justify-center items-center'>
              <div className='flex justify-center items-center'>
                <img src="/infomation.png" alt="loogo" className='w-24'/>
              </div>
            <div className='mx-8 py-8 sm:text-center'>
                <h1 className='text-3xl xl:text-4xl'> Bon retour</h1>
                <p className='lg:text-xl xl:text-2xl'> Connectez-vous pour continuer</p>
            </div>
            <div className="relative w-[80%] bottom-6 xl:bottom-3 text-red-500 text-sm min-h-[16px] break-words h-auto">
              {erreur.length > 0 ? (
                          erreur.map((er, i) => (
                            <p key={i} className="w-auto h-auto">{er}</p>
                          ))
                        ) : null}

                </div>
            </div>
           
            <form  onSubmit={submit} onClick={(e) => e.stopPropagation()} className='grid grid-cols-1 gap-4 mx-8 lg:text-lg '>
              <div className='flex gap-4 items-start border-1 border-[#088cb4] rounded-sm p-2  bg-[#f4f4f462] '>

                <MdEmail size={30} />
                <div className='w-full'>
                    <p className='font-medium '>Email</p>
                    <input type="email" name='email' value={data.email} onChange={Change} placeholder='entrez votre email' className='outline-none w-full' required/>
                </div>
               
              </div>
              <div className='flex gap-4 items-start border-1 border-[#088cb4] rounded-sm p-2 bg-[#f4f4f462] '>
                <FaKey size={20}  />
                <div className='w-full'>
                    <p className='font-medium '>Mot de passe</p>
                    <div className='flex '>
                    <input type={oeil ? "text": "password"} name='password' value={data.password} onChange={Change} placeholder='entrez votre mot de passe'  className='outline-none w-full' required/>
                   <button type='button' onClick={()=> setOeil(!oeil)} className='w-4 h-4 -translate-y-0.5 cursor-pointer' > {oeil? <FaEye/> : <FaEyeSlash/>}</button>                    
                   </div>
                </div>
               
              </div>
              <div className='flex justify-between items-center text-sm lg:text-lg'>
                <div className='flex justify-center items-center gap-2 '>
                    <input type="checkbox" name='checkbox' className=' h-4 w-4 text-[#088cb4] border-[#088cb4] bg-[#f4f4f462]  cursor-pointer' />
                  <p>Se souvenir de moi</p>
                </div>
                
                <Link to="/MotDePasseOublié"className='text-[#088cb4]  cursor-pointer'> Mot de passe oublié</Link>
              </div>
              <button className='rounded-sm text-white font-medium text-center bg-gradient-to-r from-[#088cb4] to-[#8bc53f]  py-2 shadow-md shadow-gray-300 hover:scale-105 hover:from-[#8bc53f] hover:to-[#088cb4] cursor-pointer'> Se connecter</button>
              <p className='text-center text-sm lg:text-lg'> Pas encore de compte?</p>
              <button disabled={bloque} type='button' className='rounded-sm text-white font-medium text-center bg-[#8bc53f] py-2 shadow-md shadow-gray-300 hover:scale-105 cursor-pointer'> <Link to="/Inscription">Créer un compte</Link></button>
               <button className='rounded-sm text-white font-medium text-center bg-[#8bc53f] py-2 shadow-md shadow-gray-300 hover:scale-105 cursor-pointer'> Continuer avec Google</button>
            </form>       

        </div>
        <div className='text-xs pt-4 text-center lg:text-sm'>
                <p> Conditions et politiques de confidentialiés</p>
        </div>
    </div>
    </>
  )
}

export default Connexion
 