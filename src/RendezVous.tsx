// import { useState } from 'react'
import { FaUserMd, FaPhoneAlt, FaBirthdayCake, FaUser, FaTag,FaFileAlt,FaStethoscope, FaInfoCircle, FaRegStickyNote} from "react-icons/fa"
import { MdAccessTime } from "react-icons/md"
import { useState } from 'react'
import { api } from "./function";
import {useNavigate} from "react-router-dom"

function RendezVous() {

 const [bloque, setBloque] = useState(false); // Gère l'état de blocage du formulaire
  
 const [file, setFile] = useState<File | null>(null);



  const [data, setData] = useState({
    nom: "",
    ddn: "",
    sexe: "M",
    telephone: "",
    specialite: "cardiologie",
    motif: "",
    medecin: "",
    DateHeure: "",
    typeDePatient: "Suivi",
    informations: ""
  
  });
// Gère l'état de blocage du formulaire

 
  const navigate = useNavigate();


  const Change = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  const selectedFile = event.target.files?.[0];
  if (selectedFile) {
    setFile(selectedFile);
  }
};

const submit = async (e: React.FormEvent) => {
  e.preventDefault();
  setBloque(true);

  try {
    const formData = new FormData();
    
    // Ajoute tous les champs texte
    for (const key in data) {
      formData.append(key, data[key as keyof typeof data]);
    }

    // Ajoute le fichier s'il existe
    if (file) {
      formData.append("fichier", file); // "fichier" est le nom utilisé côté backend (req.file)
    }

    const response = await api.post("/Souscription", formData);

    if (response.data.errors == null) {
      navigate(response.data.route);

      setData({
        nom: "",
        ddn: "",
        sexe: "M",
        telephone: "",
        specialite: "cardiologie",
        motif: "",
        medecin: "",
        DateHeure: "",
        typeDePatient: "Suivi",
        informations: ""
      });

      setFile(null); // Reset le fichier
    } else {
      setBloque(false);
    }

  } catch (error) {
    console.error("Erreur lors de la soumission du formulaire :", error);
    setBloque(false);
  }
};


  return (
    <>
    
      <div className='min-h-full bg-cover  bg-center flex flex-col justify-center items-center py-4' style={{backgroundImage: "url('/rdv1.jpeg')"}}>
        <div className='backdrop-blur-xs w-[90%] lg:w-[70%] xl:w-[60%]  bg-white/50 rounded-2xl border-1 border-[#088cb4] grid grid-cols-1  py-4'>
            <div className='flex flex-col justify-center items-center'>
              <div className='flex justify-center items-center'>
                <img src="/infomation.png" alt="loogo" className='w-24'/>
              </div>
            <div className='mx-8 pb-8 text-center'>
                <h1 className='text-3xl xl:text-4xl'> Bienvenue</h1>
                <p className='lg:text-xl xl:text-2xl'> Prenez votre rendez-vous !</p>
                <p>Nb: les champs possedant un asteris sont obligatoires</p>
            </div>
            </div>
        
            <form onSubmit={submit} onClick={(e) => e.stopPropagation()} className='grid grid-cols-1  gap-4 mx-8 lg:text-lg '>
            <div className='grid grid-cols-1  gap-4 sm:grid-cols-2'>
             <div className='flex gap-4 items-start border-1 border-[#088cb4] rounded-sm p-2 bg-[#f4f4f462] '>
                <FaUser size={22} />
                <div className='w-full'>
                    <p className='font-medium '>Nom complet <span className=" text-red-400">*</span></p>
                    <div className='flex '>
                    <input type='text' name='nom' value={data.nom} onChange={Change} placeholder='Nom complet'  className='outline-none w-full' required />
                    </div>
                </div>
               
              </div>
                <div className='flex gap-4 items-start border-1 border-[#088cb4] rounded-sm p-2 bg-[#f4f4f462] '>
                <FaBirthdayCake size={22}/>
                <div className='w-full'>
                    <p className='font-medium'>Date de naissance<span className=" text-red-400">*</span></p>
                    <div className='flex '>
                    <input type='date' name='ddn' min="1900-01-01" max="2007-08-09" value={data.ddn} onChange={Change} placeholder='Date de naissance'  className='outline-none w-full' required />
                    </div>
                </div>
               
              </div>
                 <div className='flex gap-4 items-start border-1 border-[#088cb4] rounded-sm p-2 bg-[#f4f4f462] '>
                <FaBirthdayCake size={22}/>
                <div className='w-full'>
                    <p className='font-medium'>Sexe<span className=" text-red-400">*</span></p>
                    <select name="sexe" value={data.sexe} onChange={Change} className="outline-none" required>
                      <option value="M">Masculin</option>
                      <option value="F">Feminin</option>
                    
                    </select>
                </div>
               
              </div>
              <div className='flex gap-4 items-start border-1 border-[#088cb4] rounded-sm p-2 bg-[#f4f4f462] '>
                <FaPhoneAlt size={22} />
                <div className='w-full'>
                    <p className='font-medium'>Téléphone <span className=" text-red-400">*</span></p>
                    <div className='flex '>
                    <input type='tel' name='telephone' value={data.telephone} onChange={Change} placeholder='Téléphone '  className='outline-none w-full' required />
                    </div>
                </div>
               
              </div>
              <div className='flex gap-4 items-start border-1 border-[#088cb4] rounded-sm p-2  bg-[#f4f4f462] '>

                <FaStethoscope size={22} />
                <div className='w-full'>
                    <p className='font-medium '>Spécialité ou service souhaité<span className=" text-red-400">*</span></p>
                    <select name="specialite" value={data.specialite} onChange={Change} className="outline-none">
                      <option value="Cardiologie">Cardiologie</option>
                      <option value="Pédiatrie">Pédiatrie</option>
                      <option value="Dermatologie">Dermatologie</option>
                    </select>
                </div>
               
              </div>
              <div className='flex gap-4 items-start border-1 border-[#088cb4] rounded-sm p-2  bg-[#f4f4f462] '>

                <FaRegStickyNote size={22} />
                <div className='w-full'>
                    <p className='font-medium '>Motif de rendez-vous<span className=" text-red-400">*</span></p>
                    <select name="motif" value={data.motif} onChange={Change} className="outline-none"   required>
                     
                      <option value="Cardiologie">Cardiologie</option>
                      <option value="Pédiatrie">Pédiatrie</option>
                      <option value="Dermatologie">Dermatologie</option>
                    </select>
                </div>
               
              </div>
              <div className='flex gap-4 items-start border-1 border-[#088cb4] rounded-sm p-2  bg-[#f4f4f462] '>

                <FaUserMd size={22} />
                <div className='w-full'>
                    <p className='font-medium '>Medecin souhaité</p>
                    <select name="medecin" value={data.medecin} onChange={Change} className="outline-none" >
                       <option value="">facultatif</option>
                      <option value="Cardiologie">Cardiologie</option>
                      <option value="Pédiatrie">Pédiatrie</option>
                      <option value="Dermatologie">Dermatologie</option>
                    </select>
                </div>
               
              </div>
             
                 
              
              <div className='flex gap-4 items-start border-1 border-[#088cb4] rounded-sm p-2 bg-[#f4f4f462] '>
                <MdAccessTime  size={22} />
                <div className='w-full'>
                    <p className='font-medium'>Date et Heure</p>
                    <div className='flex '>
                    <input type='datetime-local' name='DateHeure' value={data.DateHeure} onChange={Change} placeholder='Date et Heure'  className='outline-none w-full' />
                    </div>
              
               
              </div>
              </div>
                <div className='flex gap-4 items-start border-1 border-[#088cb4] rounded-sm p-2 bg-[#f4f4f462] '>
                <FaFileAlt size={22} />
                <div className='w-full'>
                    <p className='font-medium'>Document</p>
                    <div className='flex '>
                    <input type='file' name='fichier' onChange={handleUpload} placeholder='ordonance,resulatt ...'  className='outline-none w-full' />
                    </div>
              
               
              </div>
              </div>
                 <div className='flex gap-4 items-start border-1 border-[#088cb4] rounded-sm p-2  bg-[#f4f4f462] '>

                <FaTag size={22} />
                <div className='w-full'>
                    <p className='font-medium '>Type de patient<span className=" text-red-400">*</span></p>
                    <select name="typeDePatient" value={data.typeDePatient} onChange={Change} required>
                      
                      <option value="Suivi">Suivi</option>
                      <option value="Nouveau">Nouveau</option>
                 
                    </select>
                </div>
               
              </div>
                <div className='flex gap-4 items-start border-1 border-[#088cb4] rounded-sm p-2 bg-[#f4f4f462] '>
                <FaInfoCircle size={22} />
                <div className='w-full'>
                    <p className='font-medium'>Plus d'Informations</p>
                    <div className='flex '>
                    <textarea name='informations' value={data.informations} onChange={Change} placeholder='entrez les details de votre rendez-vous'  className='outline-none w-full'  />
                    </div>
              
               
              </div>
              </div>
              
              </div>
             
              <button disabled={bloque} className='rounded-sm text-white font-medium text-center bg-gradient-to-r from-[#088cb4] to-[#f7941d]  py-2 shadow-md shadow-gray-300 hover:scale-105 hover:from-[#f7941d] hover:to-[#088cb4] cursor-pointer mx-[30%]'>Prendre rendez-vous</button>
         
           
            </form>
         
            
       

        </div>
      
    </div>
    </>
  )
}

export default RendezVous
 