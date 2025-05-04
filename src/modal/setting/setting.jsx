import "./setting.css"

function Setting({ SettingOpen, SettingClose }) {

    return (
        <>
            <div className='setting' style={{ display: SettingOpen ? "block" : "none" }}>
                <h1>설정</h1>
                <ul>
                    <li>이건 게임 설정 창입니다.</li>
                    <li>설정1</li>
                    <li>설정2</li>
                    <li>설정3</li>
                    <li>설정4</li>
                    <li>설정5</li>
                </ul>
                <button onClick={SettingClose}>닫기</button>
            </div>
        </>
    )
}

export default Setting