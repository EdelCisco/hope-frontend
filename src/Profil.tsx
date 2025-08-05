import {  useState } from 'react'
import './App.css'
import { FaBirthdayCake, FaUser, FaKey,FaEye,FaEyeSlash} from "react-icons/fa"
import {MdEmail} from "react-icons/md"
import { useUser } from './Users';
import { api } from "./function";
import {Navigate, useNavigate } from "react-router-dom"

function Profil() {
 const [oeil, setOeil]= useState<boolean>(false)
const [bloque, setBloque]= useState<boolean>(false)
  const [erreur, setError] = useState<string []>([]);
const {user,setUser,loading}= useUser()


  const [data, setData] = useState({
    nom:"",
    sexe:"M",
    ddn:"",
    rang:"",
    email: "",
    password: "",
    confirmpassword:""
  
  });
// Gère l'état de blocage du formulaire

 
  const navigate = useNavigate();


  const Change = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };


  const supprimer = async()=>{
    try{
 const response = await api.post("/Suppression", data);

       if(response.data.errors==null){
      setUser(null)
     navigate(response.data.route);
    }
    }
    catch(e){
      console.error("Erreur lors de la soumission du formulaire :", e);
     
    }
  }
  const submit = async (e: React.FormEvent) => {

    e.preventDefault();
    setError([]);
    // Réinitialise les messages d'erreur et de succès
   
    try {
      setBloque(true);
     
      const response = await api.post("/Modification", data);

       if(response.data.errors==null){
         const userRes = await api.post("/Token");

      if (userRes.data && userRes.data.Email) {
        setUser(userRes.data); // ← mise à jour du contexte
      }
     navigate(response.data.route);

      setData({
     nom:"",
    sexe:"M",
    ddn:"",
    rang:"",
    email: "",
    password: "",
    confirmpassword:""
      
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

if (loading) return <div>Chargement...</div>; 
if (!user) return <Navigate to="/Connexion" replace />;

  return (
    <>
    <div className='min-h-screen  flex flex-col justify-center px-4 bg-[#f4f4f462] '>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-0'>
        <div>
        <div className=' bg-cover bg-center flex flex-col justify-center items-center text-white rounded-md ' style={{backgroundImage: "url('/r.jpeg')"}}>
          <div className='backdrop-brightness-50 w-full h-full flex flex-col justify-center items-center py-8 rounded-md'>
            <img src="/buser.png" alt="profil" className='w-24 h-24 rounded-full border-1 border-[#088cb4] my-4 ' />
            <h1 className='font-bold text-2xl xl:text-3xl'> {user.Nom}</h1>
            <p className='py-2 mx-10 text-center lg:text-lg xl:text-xl '>Votre espace profil, où vous pouvez comsulter et modifier vos Informations selon votre convenance</p>
          </div>
          
        </div>
        <div className='flex items-center justify-center'>
          <button onClick={supprimer} className='mx-10 rounded-sm text-white font-medium text-center  bg-red-600 shadow-lg py-2 px-4 my-4'> Supprimer le compte</button>
        </div>
        </div>
        <form   className='grid grid-cols-1 gap-4 text-black relative bottom-8 mx-4   lg:text-lg'>
             <div className="relative w-[80%] py-2 text-red-500 text-sm break-words h-auto">
              {erreur.length > 0 ? (
                          erreur.map((er, i) => (
                            <p key={i} className="w-auto h-auto">{er}</p>
                          ))
                        ) : null}

                </div>
           
            <div className='bg-white  rounded-md border-1 border-[#088cb4] p-2'>
                 <div className='flex gap-4 items-start p-2  '>

                <FaUser size={22} />
                <div>
                    <p className='font-medium '>Nom&Prénoms</p>
                    { bloque ? 
                    <input type="text" value={data.nom} onChange={Change} name='nom' placeholder='entrez un nom' className='outline-none ' required/> 
                :<p> {user?.Nom}</p>
                }
                </div>
               
              </div>
                 <div className='flex gap-4 items-start border-t-1 border-[#088cb4] p-2   '>

                <FaUser size={22} />
                <div>
                  
                    <p className='font-medium '>Sexe</p>
                      {bloque ? 
                     <select name="sexe" value={data.sexe} onChange={Change}  required>
                      
                      <option value="M">Masculin</option>
                      <option value="F">Féminin</option>
                 
                    </select>:
                    <p> {user?.Sexe}</p>}
                </div>
               
              </div>
               <div className='flex gap-4 items-start border-t-1 border-[#088cb4]  p-2  '>

                <FaBirthdayCake size={22}/>
                <div>
                  
                    <p className='font-medium '>Date de naissance</p>
                      {bloque ? 
                    <input type="date" name='ddn' value={data.ddn} onChange={Change}  placeholder='entrez une date de naissance' className='outline-none ' required/>:
                    <p> {user?.ddn}</p>}
                </div>
               
              </div>
              <div className='flex gap-4 items-start border-t-1 border-[#088cb4]  p-2  '>

                <FaBirthdayCake size={22}/>
                <div>
                  
                    <p className='font-medium'>Profession</p>
                      {bloque ? 
                    <input type="text"  name='rang' value={data.rang} onChange={Change}  placeholder='entrez une profession' className='outline-none ' required/>:
                    <p>{user?.Rang}</p>}
                </div>
               
              </div>

            </div>
            <div className={`bg-white rounded-md border-1 border-[#088cb4] p-2 ${user?.complet === 0 ? 'hidden' : 'block'}`}>
                 <div className='flex gap-4 items-start p-2   '>

                <MdEmail size={28} />
                <div>
                    
                    <p className='font-medium '>Email</p>
                    {bloque ? 
                    <input type="email" name='email' value={data.email} onChange={Change}   placeholder='entrez un email' className='outline-none ' />:
                    <p> {user?.Email}</p>}
                </div>
               
              </div>
                 <div className='flex gap-4 items-start border-t-1 border-[#088cb4] p-2   '>

                <FaKey size={22} />
                <div className='w-full'>
                    
                    <p className='font-medium '>Mot de passe</p>
                    {bloque ? 
                    <input type="password" name='password' value={data.password} onChange={Change}  placeholder='entrez un mot de passe ' className='outline-none w-full ' /> :
                    <p> {user?.MotDePasse}</p>}
                </div>
               
              </div>
              
              

            </div>
            
             { bloque && <div className=' '>
                <p className='text-[#088cb4]'> entrez  votre mot de passe pour  valider les modifications</p>
                <div className='bg-white rounded-md flex gap-4 items-start border-1 border-[#088cb4] p-2  '>

                
                  <FaKey size={22} />
                <div className='w-full'>
                    
                    <p className='font-medium '>Confirmation</p>
                   
                    <div className='flex '>
                    <input type={oeil ? "text": "password"} name='confirmpassword' value={data.confirmpassword} onChange={Change}  placeholder='mot de passe de confirmation'  className='outline-none w-full'  required/>
                    <p  onClick={()=> setOeil(!oeil)}>{oeil? <FaEye/> : <FaEyeSlash/>}</p>
                    </div>
                    
                </div>
               
              </div>
             </div>}
            <p onClick={()=> setBloque(!bloque)} className='mx-10 rounded-sm text-white font-medium text-center bg-gradient-to-r from-[#088cb4] to-[#f7941d]  py-2 px-4  shadow-md shadow-gray-300 hover:scale-105 hover:from-[#f7941d] hover:to-[#088cb4] cursor-pointer'> {bloque ? 'Retour' : 'Compléter ou modifier le profil'}</p>
            {bloque && (
              <button onClick={submit}  className="mx-10 rounded-sm text-white font-medium flex justify-center-safe items-center r bg-gradient-to-r from-[#088cb4] to-[#f7941d] py-2 shadow-md shadow-gray-300 hover:scale-105 hover:from-[#f7941d] hover:to-[#088cb4] cursor-pointer">
                Confirmer
              </button>
            )}


        </form>
    </div>
    </div>
    </>
  )
}

export default Profil
 