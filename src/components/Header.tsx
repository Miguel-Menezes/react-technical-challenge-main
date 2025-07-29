import { useAuth } from '../context/AuthContext';
import whatTheTruckLogo from '../assets/what_the_truck_logo.svg';
import UserIcon  from '../assets/user_red_icon.svg';

export default function Header() {
  const { logout } = useAuth();

  return (
    <header className="flex justify-between items-center w-full bg-white py-3 px-[48px] h-[56px]">
      <img src={whatTheTruckLogo} alt="Logo" className="h-[30px]" />

      <button
        onClick={logout}
        className="logout-button flex items-center hover:text-red text-[#999999] text-[11px] transition-colors duration-200"
      >
        <img src={UserIcon} alt="Logo" className='pr-[4px]' />
        Logout
      </button>
    </header>
  );
}
