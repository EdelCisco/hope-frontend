import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { api, socket } from './function';
import { FaTrashAlt } from "react-icons/fa";

interface Notification {
  id: number;
  message: string;
  date: string;
  lu: boolean;
}

interface Props {
  id_client: number;
}

export default function Notifications({ id_client }: Props) {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Récupérer les notifications
  const fetchNotifications = async () => {
    try {
      const res = await api.get(`/notifications/${id_client}`);
      setNotifications(res.data);
    } catch (err) {
      console.error("Erreur lors du chargement des notifications :", err);
    }
  };

  // Marquer toutes les notifications comme lues
  const markAsRead = async () => {
    try {
      await api.post(`/notifications/${id_client}/mark-as-read`);
      setNotifications(prev => prev.map(n => ({ ...n, lu: true })));
    } catch (err) {
      console.error("Erreur lors de la mise à jour des notifications :", err);
    }
  };

  // Supprimer toutes les notifications
  const deleteAllNotifications = async () => {
    if (!confirm("Voulez-vous vraiment tout supprimer ?")) return;

    try {
      await api.post(`/notifications/${id_client}/delete-all`);
      setNotifications([]);
    } catch (err) {
      console.error("Erreur lors de la suppression des notifications :", err);
    }
  };

  // Supprimer une notification individuelle
  const deleteNotification = async (id: number) => {
    try {
      await api.post(`/notifications/${id_client}/delete/${id}`);
      setNotifications(prev => prev.filter(n => n.id !== id));
    } catch (err) {
      console.error("Erreur lors de la suppression de la notification :", err);
    }
  };

  const handleToggle = async () => {
    const nextOpen = !open;
    setOpen(nextOpen);
    if (nextOpen) {
      await fetchNotifications();
      await markAsRead();
    }
  };

  const unreadCount = notifications.filter(n => !n.lu).length;
 useEffect(() => {
    // Quand une nouvelle souscription arrive
    socket.on("nouveau_rdv", (data) => {

      setNotifications(data);
    });

    // Nettoyage à la déconnexion du composant
    return () => {
      socket.off("nouveau_rdv");
    };
  }, []);
  return (
    <div className="relative inline-block text-left">
      <button onClick={handleToggle} className="relative p-2">
        <Bell className="w-6 h-6 text-white" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-white bg-red-600 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
          <div className="flex justify-between items-center p-4 font-semibold border-b border-[#8bc53f]/50 mx-2 text-gray-500">
            <p>Notifications</p>
            <button
              onClick={deleteAllNotifications}
              title="Supprimer toutes les notifications"
              className="hover:text-red-600 transition"
            >
              <FaTrashAlt color="red" className="w-5 h-5" />
            </button>
          </div>

          <ul className="max-h-60 overflow-y-auto">
            {notifications.length === 0 ? (
              <li className="p-4 text-sm text-gray-500">Aucune notification</li>
            ) : (
              notifications.map((notif) => (
                <li
                  key={notif.id}
                  className={`p-3 text-sm border-b border-[#8bc53f]/50 hover:bg-gray-100 ${
                    notif.lu ? 'text-gray-500' : 'text-black font-semibold'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div>{notif.message}</div>
                      <div className="text-xs text-gray-400">{notif.date}</div>
                    </div>
                    <button
                      onClick={() => deleteNotification(notif.id)}
                      title="Supprimer cette notification"
                      className="hover:text-red-600 transition"
                    >
                      <FaTrashAlt color="red" className="w-4 h-4" />
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
