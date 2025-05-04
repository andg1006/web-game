import "./Rule.css";

function Rule({ RuleOpen, RuleClose }) {

    return (
        <>
            <div className='rule' style={{ display: RuleOpen ? "block" : "none" }}>
                <h1>게임 설명</h1>
                <ul>
                    <li>이건 게임 설명 창입니다.</li>
                    <li>설명1</li>
                    <li>설명2</li>
                    <li>설명3</li>
                    <li>설명4</li>
                    <li>설명5</li>
                </ul>
                <button onClick={RuleClose}>닫기</button>
            </div>
        </>
    )
}

export default Rule