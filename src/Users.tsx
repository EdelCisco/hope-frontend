// UserContext.tsx
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  type ReactNode
} from 'react';
import { api,socket } from './function';

// Types
type user = {
  id_client: number,
  Nom: string,
  ddn: string,
  MotDePasse: string,
  Email: string,
  Sexe: string,
  Rang: string,
  complet:number
};

type Notification = {
   id: number;
  message: string;
  lien: string;
  is_read: boolean;
  created_at: string;
};

// Interface du contexte
interface userContextType {
  user: user | null;
  setUser: React.Dispatch<React.SetStateAction<user | null>>;
  loading: boolean;

  notifs: Notification[];
  setNotifs: React.Dispatch<React.SetStateAction<Notification[]>>;
}

const UserContext = createContext<userContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  
  const [user, setUser] = useState<user | null>(null);
  const [notifs, setNotifs] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    api
      .post<user>('/Token')
      .then((res) => {
        if (res.data && typeof res.data === 'object' && 'Email' in res.data) {
          setUser(res.data);
        } else {
          setUser(null);
        }
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (user) {
      // Charger les notifications utilisateur
      api
        .get<Notification[]>(`/notifications/${user.id_client}`)
        .then((res) => {
          setNotifs(res.data);
        })
        .catch(() => {
          setNotifs([]); // En cas d'erreur, vide la liste
        });
    }
  }, [user]);
 useEffect(() => {
   
  socket.on('supUser', (id: number)=>{
  setUser(prev =>
   id === 0
    ? null
    : (prev?.id_client === id ? null : prev)
);


  })
   return () => {
        socket.off('supUser');
      };
  }, [])
  return (
    <UserContext.Provider
      value={{ user, setUser, loading, notifs, setNotifs }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): userContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser doit être utilisé dans UserProvider');
  }
  return context;
};
