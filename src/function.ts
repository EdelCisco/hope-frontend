import axios from 'axios'
import { io } from "socket.io-client";

export const socket = io("https://hope-backend-production-813f.up.railway.app"); // adapte à ton backend


export const api= axios.create({
  baseURL: 'https://hope-backend-production-813f.up.railway.app',
 
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  

 
})

export type AdminDB = {
  id_admin: number;
  nom: string;
  initial: string;
  email: string;
  MotDePasse: string;
  image: string;
  role: string;
  description: string;
  competences: string;
  qualites: string;
  couleur: string;
};

export type Admin = Omit<AdminDB, 'competences' | 'qualites'> & {
  competences: string[];
  qualites: string[];
};
