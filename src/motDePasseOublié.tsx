import { useState } from 'react'
import './App.css'
import {MdEmail} from "react-icons/md"
import { api } from "./function";
import {useNavigate } from "react-router-dom"

function MotDePasseOublié() {


  const [data, setData] = useState({
    email: "",
   
  
  });

  const [bloque, setBloque] = useState(false); // Gère l'état de blocage du formulaire
 const [error, setError] = useState<string>('')
 
  const navigate = useNavigate();


  const Change = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submit = async (e: React.FormEvent) => {
   
    e.preventDefault();
    setError('');
    // Réinitialise les messages d'erreur et de succès
   
    try {
      setBloque(true);
      
      const response = await api.post("/MotDePasseOublie", data);

       if(response.data.errors==null){
      
      navigate(`${response.data.route}?msg=${encodeURIComponent(response.data.msg)}&email=${encodeURIComponent(response.data.email)}&code=${encodeURIComponent(response.data.code)}&objet=${encodeURIComponent(response.data.objet)}`);

      setData({
        email: "",
       
      
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
      <div className='min-h-screen bg-cover bg-center flex flex-col justify-center items-center ' style={{backgroundImage: "url('/ft.png')"}}>
        <div className='backdrop-blur-xs w-[90%] 2xl:w-[60%] bg-white/10 rounded-2xl border-1 border-[#088cb4] grid grid-cols-1 sm:grid-cols-2 py-4'>
            <div className='flex flex-col justify-center items-center'>
              <div className='flex justify-center items-center'>
                <img src="/infomation.png" alt="loogo" className='w-24'/>
              </div>
            <div className='mx-8 py-8 sm:text-center '>
                <h1 className='text-3xl '> Mot de passe oublié</h1>
                <p className='lg:text-xl '> Entrez votre email, un code de modification vous sera envoyé</p>
            </div>
            <div className="relative w-[80%] bottom-6 xl:bottom-3 text-red-500 text-sm min-h-[16px] break-words h-auto">
              {error ? (
                         
                            <p  className="w-auto h-auto">{error}</p>
                        
                        ) : null}

                </div>
            </div>
           
            <form onSubmit={submit} className='grid grid-cols-1 gap-4 mx-8 lg:text-lg '>
              <div className='flex gap-4 items-start border-1 border-[#088cb4] rounded-sm p-2  bg-[#f4f4f462] '>

                <MdEmail size={30} />
                <div className='w-full'>
                    <p className='font-medium '>Email</p>
                    <input type="email" value={data.email} onChange={Change} name='email' placeholder='entrez votre email' className='outline-none w-full ' required/>
                </div>
               
              </div>
             
              <button disabled={bloque} className='rounded-sm text-white font-medium text-center bg-[#8bc53f] py-2 shadow-md shadow-gray-300 hover:scale-105 cursor-pointer'> Envoyer</button>
              
            </form>
            
            
       

        </div>
        <div className='text-xs pt-4 text-center lg:text-sm'>
                <p> Conditions et politiques de confidentialiés</p>
        </div>
    </div>
    </>
  )
}

export default MotDePasseOublié
 