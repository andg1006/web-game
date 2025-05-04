import { useState } from 'react';
import './menu.css'
import Again from './again';


function MenuModal({ MenuOpen, MenuClose }) {

    const [isAgainOpen, setIsAgainOpen] = useState(false);
    const AgainOpen = () => setIsAgainOpen(true);
    const AgainClose = () => setIsAgainOpen(false);

    return (
        <>
            <div className='menu-modal' style={{ display: MenuOpen ? "block" : "none" }}>
                <h1>메뉴</h1>
                <ul>
                    <li><button onClick={MenuClose}>계속하기</button></li>
                    <li><button onClick={ () => { MenuClose(); AgainOpen(); }}>돌아가기</button></li>
                </ul>
            </div>
            <Again AgainOpen={isAgainOpen} AgainClose={AgainClose} />
        </>
    )
}

export default MenuModal;