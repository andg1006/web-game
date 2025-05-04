import { useState } from 'react';
import MenuModal from '../modal/menu/menu';

function Menu() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const MenuOpen = () => setIsMenuOpen(true);
    const MenuClose = () => setIsMenuOpen(false);

    return (
        <>  
            <MenuModal MenuOpen={isMenuOpen} MenuClose={MenuClose}/>
            <div className="header">
                <div className="menu">
                    <button onClick={MenuOpen}><img src={import.meta.env.BASE_URL + "images/menu.png"} alt="메뉴" /></button>
                </div>
            </div>
        </>
    )
}

export default Menu;