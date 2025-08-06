import { useState, useEffect, useRef } from 'react';
import './App.css';
import { useUser } from './Users';
import { Navigate } from "react-router-dom";
import { api } from './function';
import { FaSearch, FaPaperPlane, FaTrash, FaTrashAlt } from "react-icons/fa";
import { io } from 'socket.io-client';
import { useLocation } from "react-router-dom";

function Message() {
  const location = useLocation();
  const { id_medecin } = location.state || {};

  useEffect(() => {
    if (id_medecin) {
      Historique(id_medecin); 
      setModal(true);
    }
  }, [id_medecin]);

  const { user, loading } = useUser();

  type Historiques = {
    id_message: number;
    sender: 'client' | 'medecin';  
    msg: string;
    date_envoi: string;
  }

  type Messages = {
    id_message: number;
    id_medecin: number;
    id_client: number;
    nom_client: string;
    nom: string;
    historique: Historiques[];
    non_lu: number;
  }

  const [msg, setMsg] = useState<Messages | null>(null);
  const [messages, setMessages] = useState<Messages[]>([]);
  const [modal, setModal] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [search, setSearch] = useState('');

  const socket = useRef<any>(null);

  useEffect(() => {
    if (!user) return;

    socket.current = io('https://hope-backend-production-813f.up.railway.app');

    socket.current.emit('register', user.id_client.toString());

    socket.current.on('new_message', (messageData: any) => {
      setMsg(prev => {
        if (!prev) return prev;
        if (
          prev.id_medecin === messageData.id_medecin &&
          prev.id_client === messageData.id_client
        ) {
          return {
            ...prev,
            historique: [
              ...prev.historique,
              {
                id_message: messageData.id_message,
                msg: messageData.contenu,
                sender: messageData.envoyeur,
                date_envoi: messageData.date_envoi,
              }
            ]
          }
        }
        return prev;
      });
    });

    return () => {
      socket.current.disconnect();
    }
  }, [user]);


  const closeHistorique = () => {
    setMsg(null);
    setModal(false);
  }

  const Historique = async (id_medecin: number) => {
    try {
      const response = await api.get("/historique", {
        params: { id: id_medecin }
      });
      setMsg(response.data);
      setModal(true);
    } catch (error) {
      console.error('Erreur lors de la récupération de l’historique', error);
    }
  };

  const message = async () => {
    try {
      const response = await api.get("/messages");
      setMessages(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des messages', error);
    }
  };

  useEffect(() => {
    message();
  }, []);

  const EnvoieMessage = async () => {
    if (!newMessage.trim() || !msg) return;

    try {
      await api.post('/envoieMessage', {
        contenu: newMessage.trim(),
        id_medecin: msg.id_medecin,
        id_client: msg.id_client,
        envoyeur: user?.role === 'medecin' ? 'medecin' : 'client'
      });

      setNewMessage('');
      await Historique(msg.id_medecin);
      await message();
    } catch (error) {
      console.error('Erreur lors de l’envoi du message', error);
    }
  };


  const SupprimerMessage = async (id_message: number) => {
    alert(id_message)
    if (!msg) return;
    try {
      await api.post('/deleteMessage', { data: { id_message } });  
      await Historique(msg.id_medecin);
      await message();
    } catch (error) {
      console.error('Erreur lors de la suppression du message', error);
    }
  };


  const SupprimerConversation = async () => {
    if (!msg) return;
    if (!window.confirm("Voulez-vous vraiment supprimer toute la conversation ?")) return;
    try {
      await api.post('/deleteAllMessages', { data: { id_medecin: msg.id_medecin, id_client: msg.id_client } });
      closeHistorique();
      await message();
    } catch (error) {
      console.error('Erreur lors de la suppression de la conversation', error);
    }
  };


   const ToutSupprimer = async () => {
    if (!msg) return;
    if (!window.confirm("Voulez-vous vraiment supprimer toute vos conversations ?")) return;
    try {
      await api.post('/deleteAllCon', { data: { id_client: msg.id_client } });
      closeHistorique();
      await message();
    } catch (error) {
      console.error('Erreur lors de la suppression de la conversation', error);
    }
  };

  const messagesFiltres = messages.filter(msg => {
    const query = search.toLowerCase();
    const nomMedecin = msg.nom.toLowerCase();
    const lastMsg = msg.historique.length > 0 ? msg.historique[msg.historique.length - 1].msg.toLowerCase() : "";
    return nomMedecin.includes(query) || lastMsg.includes(query);
  });

  if (loading) return <div>Chargement...</div>;
  if (!user) return <Navigate to="/Connexion" replace />;

  return (
    <div className='bg-[#f4f4f462] h-screen'>
      <div>
        <div className='grid grid-cols-1 bg-[#088cb4] py-4'>
          <h1 className='text-2xl font-medium mx-10 py-4 lg:text-3xl xl:text-4xl'>Chats</h1>
          <div className='bg-white/40 flex gap-2 items-center rounded-xl mx-10 p-2'>
            <FaSearch className='w-4 h-4' />
            <input 
              className='outline-none w-full' 
              placeholder='Recherche'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
          <button
                      onClick={ToutSupprimer}
                      title="Supprimer toutes les notifications"
                      className="hover:text-red-600 transition"
                    >
                      <FaTrashAlt color="red" className="w-5 h-5" />
                    </button>
        <div className='grid grid-cols-1'>
          {
            messagesFiltres.map((msg, index) => {
              const lastMsg = msg.historique.length > 0 ? msg.historique[msg.historique.length - 1] : null;
              return (
                <div
                  key={index}
                  onClick={() => Historique(msg.id_medecin)}
                  className='flex justify-between border-b border-[#8bc53f] mx-4 py-4 cursor-pointer'
                >
                  <div className='flex gap-4'>
                    <img src="/buser.png" alt="compte" className='w-8 h-8 xl:w-10 xl:h-10 rounded-full' />
                    <div>
                      <h3 className='font-medium text-lg lg:text-xl xl:text-2xl'>{msg.nom}</h3>
                      <p className='lg:text-lg xl:text-xl'>{lastMsg?.msg || "Aucun message"}</p>
                      <p className='text-sm text-gray-600'>{lastMsg ? new Date(lastMsg.date_envoi).toLocaleString() : ""}</p>
                    </div>
                  </div>
                  {
                    msg.non_lu > 0 &&
                    <div className='rounded-full bg-red-600 text-white flex justify-center items-center font-medium w-6 h-6 lg:w-8 lg:h-8 xl:text-lg xl:w-10 xl:h-10'>
                      {msg.non_lu}
                    </div>
                  }
                </div>
              )
            })
          }
        </div>
      </div>

      {
        msg && modal && (
          <>
            <div className='fixed inset-0 bg-black/30 z-40' onClick={closeHistorique} />
            <div className='fixed top-0 right-0 w-[100%] sm:w-[50%] h-full bg-gray-100 shadow-lg z-50 flex flex-col'>

              <div className='flex gap-4 bg-[#088cb4] py-14 w-full pl-8'>
                <img src="/buser.png" alt="compte" className='w-8 h-8 xl:w-10 xl:h-10 rounded-full' />
                <div className='flex w-full justify-between px-4'>
                  <h3 className='font-medium text-lg lg:text-xl xl:text-2xl'>{msg.nom}</h3>
                  <div className="flex gap-4 items-center">
                    {/* Bouton Tout Supprimer */}
                    <button
                      onClick={SupprimerConversation}
                      className='text-white hover:underline'
                      title="Supprimer toute la conversation"
                    >
                      <FaTrash />
                    </button>
                    <button onClick={closeHistorique} className='self-end mb-4 text-white hover:underline'>&times;</button>
                  </div>
                </div>
              </div>

              <div className='space-y-2 flex-1 overflow-y-auto px-4'>
                {
                  msg.historique.map((ligne, index) => (
                    <div
                      key={index}
                      className={`flex ${ligne.sender === 'medecin' ? 'justify-start' : 'justify-end'} lg:text-lg xl:text-xl relative`}
                    >
                      <div className={`${ligne.sender === 'medecin' ? 'bg-white' : 'bg-[#8bc53f]/50'} p-2 rounded w-[50%]`}>
                        {ligne.msg}
                        <p className='text-sm text-gray-500'>{new Date(ligne.date_envoi).toLocaleString()}</p>
                      </div>
                      {/* Bouton supprimer message individuel */}
                      <button
                        onClick={() => SupprimerMessage(ligne.id_message)}
                        className="absolute top-0 right-0 p-1 text-red-600 hover:text-red-800"
                        title="Supprimer ce message"
                        style={{marginLeft: '4px', fontSize: '12px'}}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))
                }
              </div>

              <div className='border border-[#8bc53f] flex items-center rounded-md mx-10 lg:mx-20 p-2 my-5 bg-white'>
                <input
                  className='outline-none w-full'
                  name='message'
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder='Envoyer un message'
                  onKeyDown={e => {
                    if (e.key === 'Enter') EnvoieMessage();
                  }}
                />
                <button onClick={EnvoieMessage}>
                  <FaPaperPlane className='w-4 h-4 cursor-pointer' />
                </button>
              </div>
            </div>
          </>
        )
      }
    </div>
  )
}

export default Message;
