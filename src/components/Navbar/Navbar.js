import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';

export default function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        AuthService.logout();
        navigate('/login');
    }


    return (
        <div className="navbar bg-[#0C0068] text-white">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl" href='/'>SPS Group</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <button
                            className="btn btn-ghost"
                            onClick={() => handleLogout()}
                        >
                            Sair
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}