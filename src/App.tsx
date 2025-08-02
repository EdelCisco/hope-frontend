import Accueil from  './Accueil';
import Connexion from './Connexion'
import Inscription from './Inscription'
import MotDePasseOublié from './motDePasseOublié';
import Profil  from './Profil'
import RenouvelerLemdp from './RenouvelerLemdp';
import RendezVous from './RendezVous';
import Message from './Message';
import Medecin from './Medecin';
import Code from './code'
import Layout from './Layout';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

function App() {
    function AnimationRoutes() {
    const location = useLocation();
    return(
      <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path='/'             	         element={<Accueil/>}/>
            <Route path="/Profil"       	         element={<Profil/>}/>
            <Route path='/Connexion'      	         element={<Connexion/>}/>
            <Route path='/Inscription'      	         element={<Inscription/>}/>
            <Route path='/MotDePasseOublié'      	         element={<MotDePasseOublié/>}/> 
            <Route path='/RenouvelerLemdp'      	         element={<RenouvelerLemdp/>}/> 
            <Route path='/Message'      	         element={<Message/>}/> 
            <Route path='/Medecin'      	         element={<Medecin/>}/>
            <Route path='/Rendez-vous' element={<RendezVous/>} />
            <Route path='/Code' element={<Code/>} />
                        
          </Routes>
      </AnimatePresence> 
    )
  }
  return (
    <div className='overflow-x-hidden'>
    <Router>
      <Layout>
        <AnimationRoutes/>
      </Layout>
    </Router>
  </div>
  )

}

export default App
