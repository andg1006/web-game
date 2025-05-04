import { useState } from 'react';
import Setting from '../modal/setting/setting';

function Setting_menu() {
    const [isSettingOpen, setIsSettingOpen] = useState(false);
    const SettingOpen = () => setIsSettingOpen(true);
    const SettingClose = () => setIsSettingOpen(false);

    return (
        <>
            <Setting SettingOpen={isSettingOpen} SettingClose={SettingClose} />
            <div className="header">
                <div className="logo">
                    <button onClick={SettingOpen}>
                        <img src={import.meta.env.BASE_URL + "images/settings.png"} alt="settings" />
                    </button>
                </div>
            </div>
        </>
    );
}

export default Setting_menu;