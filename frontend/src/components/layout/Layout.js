import { Outlet } from 'react-router-dom';
import PopupMessage from '../../features/popupMessages/PopupMessage';

const Layout = () => {
  return (
    <div>
      <header> {/* תפריט או לוגו וכו' */} </header>

      <main>
        <Outlet />
      </main>

      <footer> {/* ... */} </footer>

      <PopupMessage />

    </div>
  );
};

export default Layout;
