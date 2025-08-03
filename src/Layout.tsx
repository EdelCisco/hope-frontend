import {useLocation} from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';

interface Pros {
    children : React.ReactNode;
}
export default function Layout({ children } : Pros) {
    const location = useLocation();
    const bg = () => {
      switch(location.pathname) {
          case "/":
              return 'bg-white';
          case "/Accueil":
              return 'bg-white';
          default:
              return 'bg-none'; 
      }
  }
    //La liste des routes où la Navbar et le Footer ne doivent pas apparaître
    const routesNav = [ '/Inscription', '/Connexion', '/RenouvelerLemdp','/MotDePasseOublie'];
    const routesFoot = [ '/Inscription', '/Connexion', '/RenouvelerLemdp','/MotDePasseOublié']
    //Verifier si la route actuelle est dans la liste
    const hiddenNav = routesNav.includes(location.pathname);
    const hiddenFoot = routesFoot.includes(location.pathname);
  return (
    <div className={`${bg()}`}>
        {!hiddenNav && <Navigation/>}
        <main>{children}</main>
        {!hiddenFoot && <Footer/>}
    </div>
  )
}