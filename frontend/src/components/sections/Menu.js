import { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  const menuItems = [
    { id: 'about', label: 'אודות' },
    { id: 'tools', label: 'צפייה בכלים' },
    { id: 'contact', label: 'צור קשר' }
  ];

  return (
    <>
      <div className="hidden lg:flex gap-6 justify-start items-center">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className="cursor-pointer text-black text-lg font-bold hover:text-haskurit-yellow transition-all duration-200 border-b-2 border-transparent hover:border-haskurit-yellow pb-2"
            onClick={() => scrollToSection(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 right-4 z-50 bg-haskurit-yellow text-haskurit-gray p-2 rounded-lg shadow-lg hover:bg-opacity-90 transition"
          aria-label="תפריט"
        >
          {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
            />
            <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-40 transform transition-transform duration-300">
              <div className="flex flex-col gap-6 p-8 mt-16">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    className="text-right text-haskurit-gray text-xl font-bold hover:text-haskurit-yellow transition-all duration-200 border-b-2 border-transparent hover:border-haskurit-yellow pb-2"
                    onClick={() => scrollToSection(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Menu;