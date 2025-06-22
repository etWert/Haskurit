import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <header> {/* תפריט או לוגו וכו' */} </header>
      
      <main>
        <Outlet />
      </main>
      
      <footer> {/* ... */} </footer>
    </div>
  );
};

export default Layout;
