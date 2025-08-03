
import { useState} from 'react'
import './App.css'
// import { api } from "./function";
import { useUser } from './Users';
import {Navigate} from "react-router-dom"

function Message() {
    const {user,loading}= useUser()

    type Historiques= {
        id:number;
        sender:'patient' | 'medecin';
        msg: string;
        heure:string

    }
    type Messages={
        id: number;
        nomDr:string;
        nomPt:string;
        historique: Historiques[]
        nonlue:number;
    }
    const [msg, setMsg]= useState<Messages| null>(null)
    const [modal, setModal]= useState<boolean>(false)

   const messages: Messages[]= [
    {
        id:1,
     nomDr:'Dr Robert',
     nomPt:'moi',
     historique:[{id:1, sender:'patient', msg:'bonjour', heure:'11h:00'} ,{id:2, sender:'medecin', msg:'comment-allez vous', heure:'11h:02'}],
     nonlue:2
    },
   
    {
        id:2,
     nomDr:'Dr Violethe',
     nomPt:'moi',
  historique:[{id:2, sender:'medecin', msg:'bien bien', heure: '10h:00'}],
    nonlue:1},
    {
        id:3,
     nomDr:'Dr Ravisse',
     nomPt:'moi',
     historique:[{id:2, sender:'patient', msg:'bonjour', heure: '10h:00'}],
    nonlue:4}
   ]
const Historique = (msg: Messages)=>{
    setMsg(msg)
    setModal(true)
}
const closeHistorique= ()=>{
    setMsg(null)
    setModal(false)
}
if (loading) return <div>Chargement...</div>; 
if (!user) return <Navigate to="/Connexion" replace />;
  return (
    <>
    <div className='bg-[#f4f4f462] h-screen'>
        
        <div>
        <div className='grid grid-cols-1 bg-[#088cb4] py-4'>
            <h1 className='text-2xl font-medium mx-10 py-4 lg:text-3xl xl:text-4xl'> Chats</h1>
            <div className='bg-white/40 flex gap-2  items-center  rounded-xl mx-10 p-2 '>
            <img src="/buser.png" alt="rechercher" className='w-4 h-4 lg:w-6 lg:h-6 xl:w-8 xl:h-8' />
            <input className='outline-none w-full' placeholder='recherche' />

            </div>

        </div>
        <div className='grid grid-cols-1'>
            {
                messages.map ((msg,index)=>(
                    <div key={index} onClick={()=> Historique(msg)} className='flex justify-between border-b-1 border-[#8bc53f] mx-4 py-4'> 
                    <div className='flex gap-4'>
                    <div><img src="/buser.png" alt="compte" className='w-8 h-8 xl:w-10 xl:h-10 rounded-full ' /></div>
                    <div>
                    <h3 className='font-medium text-lg lg:text-xl xl:text-2xl'>{msg.nomDr}</h3>
                    <p className='lg:text-lg xl:text-xl'> {msg.historique[Historique.length-1].msg}</p>
                    <p>{msg.historique[Historique.length-1].heure}</p>
                    </div>
                    </div>
                    
                    <div className='rounded-full bg-red-600 flex justify-center items-center font-medium w-6 h-6 lg:w-8 lg:h-8 xl:text-lg xl:w-10 xl:h-10 '> {msg.nonlue}</div>
                  
                    </div>
                ))
            }

        </div>
        </div>

        {
        msg && modal &&(
            <><div className='fixed inset-0 bg-black/30 z-40' onClick={closeHistorique} />
            <div className='fixed top-0 right-0 w-[100%] sm:w-[50%] h-full bg-gray-100 shadow-lg  z-50 flex flex-col'>
               
                <div className='flex gap-4 bg-[#088cb4] py-14 w-full pl-8'>
                    <div><img src="/buser.png" alt="compte" className='w-8 h-8 xl:w-10 xl:h-10 rounded-full ' /></div>
                    <div className='flex w-full justify-between px-4'>
                        <h3 className='font-medium text-lg lg:text-xl xl:text-2xl'>{msg.nomDr}</h3>
                         <button onClick={closeHistorique} className='self-end mb-4 text-white hover:underline'> &times;</button>
                    </div>
                    </div>
                
                <div className='space-y-2 flex-1 overflow-y-auto  '>
                    {
                        msg.historique.map((ligne,index)=>(
                            <div key={index} className={`m-6 flex ${ligne.sender =='medecin' ? 'justify-start': 'justify-end'} lg:text-lg xl:text-xl`} >
                          
                                 <div className={`  ${ligne.sender =='medecin' ? 'bg-white': 'bg-[#8bc53f]/50'} p-2 rounded  w-[50%]`}>
                                 
                                 {ligne.msg}
                                  <p> {ligne.heure}</p>
                                </div>
                               
                               
                               
                            </div>
                        ))
                    }

                </div>
                <div className='border-1 border-[#8bc53f] flex justify-center items-center rounded-md mx-10 lg:mx-20 p-2 my-5 bg-white'>
                    <input className='outline-none w-full ' name='message' placeholder='Envoyer un message' />
                    <img src="/buser.png" alt="envoyer" className='w-4 h-4' />
                </div>
              


            </div>
            </>

            
        )
        }
    </div>
    </>
  )
}

export default Message
 