import { useState } from 'react'
import './App.css'
import { FaEye, FaEyeSlash, FaKey } from 'react-icons/fa'
import { api } from "./function";
import { useSearchParams, useNavigate } from 'react-router-dom';
function RenouvelerLemdp() {

const [searchParams] = useSearchParams();
const email = searchParams.get('email') || '';
const [oeil, setOeil]= useState<boolean>(false)
const [data, setData] = useState({
    email: email,
    password:"",
    confirmPassword:""
   
  
  });

  const [bloque, setBloque] = useState(false); // Gère l'état de blocage du formulaire
 const [error, setError] = useState<string[]>([])
 
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
      
      const response = await api.post("/Modifier", data);

       if(response.data.errors==null){
      
      navigate(response.data.route);

      setData({
        email: "",
        password:"",
        confirmPassword:""
      
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
        <div className='backdrop-blur-xs w-[90%] lg:w-[80%] xl:w-[70%] 2xl:w-[60%] bg-white/10 rounded-2xl border-1 border-[#088cb4] grid grid-cols-1 sm:grid-cols-2 py-4'>
            <div className='flex flex-col justify-center items-center'>
              <div className='flex justify-center items-center'>
                <img src="/infomation.png" alt="loogo" className='w-52'/>
              </div>
            <div className='mx-8 py-8 text-center '>
                <h1 className='text-3xl'> Renouveler votre mot de passe</h1>
                <p className='xl:text-xl '> Veuillez-entrer un nouveau mot de passe <br></br> <span className='underline text-red-700'>Nb:</span> le mot de passe doit contenir au moins 8 caractères dont au moins une minuscule, une majuscule, un caractère spéciale et un chiffre</p>
            </div>
             <div className="relative w-[80%] bottom-6 xl:bottom-3 text-red-500 text-sm min-h-[16px] break-words h-auto">
              {error.length > 0 ? (
                          error.map((er, i) => (
                            <p key={i} className="w-auto h-auto">{er}</p>
                          ))
                        ) : null}

                </div>
            </div>
           
            <form onSubmit={submit} className='grid grid-cols-1 gap-4 mx-8 lg:text-lg '>
                 <div className='flex gap-4 items-start border-1 border-[#088cb4] rounded-sm p-2 bg-[#f4f4f462] '>
                <FaKey size={20}   />
                <div className='w-full'>
                    <p className='font-medium '>Mot de passe</p>
                    <div className='flex '>
                    <input type={oeil ? "text": "password"} name='password' value={data.password} onChange={Change} placeholder='entrez un  mot de passe'  className='outline-none w-full' required />
                    <button type='button' onClick={()=> setOeil(!oeil)} className='w-4 h-4 -translate-y-0.5 cursor-pointer' > {oeil? <FaEye/> : <FaEyeSlash/>}</button>
                    </div>
                </div>
               
              </div>
               <div className='flex gap-4 items-start border-1 border-[#088cb4] rounded-sm p-2 bg-[#f4f4f462] '>
                <FaKey size={20}   />
                <div className='w-full'>
                    <p className='font-medium '>Confirmer le mot de passe</p>
                    <div className='flex '>
                    <input type={oeil ? "text": "password"} name='confirmPassword' value={data.confirmPassword} onChange={Change} placeholder='confirmer le mot de passe'  className='outline-none w-full'  required/>
                    <button type='button' onClick={()=> setOeil(!oeil)} className='w-4 h-4 -translate-y-0.5 cursor-pointer' > {oeil? <FaEye/> : <FaEyeSlash/>}</button>                    </div>
                </div>
               
              </div>
             
              <button disabled={bloque} className='rounded-sm text-white font-medium text-center bg-[#8bc53f] py-2 shadow-md shadow-gray-300 hover:scale-105 cursor-pointer'> Modifier</button>
              
            </form>
            
            
       

        </div>
        <div className='text-xs pt-4 text-center lg:text-sm'>
                <p> Conditions et politiques de confidentialiés</p>
        </div>
    </div>
    </>
  )
}

export default RenouvelerLemdp
 