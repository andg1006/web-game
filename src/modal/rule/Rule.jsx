import "./Rule.css";

function Rule({ RuleOpen, RuleClose }) {

    return (
        <>
            <div className='rule' style={{ display: RuleOpen ? "block" : "none" }}>
                <h1>게임 설명</h1>
                <ul>
                    <h2>플레이 방법</h2>
                    <li style={{ paddingLeft: '10px' }}>텍스트와 일러스트, CG 등의 이미지로 묘사된 스토리를 <br />
                        중간중간 등장하는 선택지를 골라 진행합니다.</li>
                    <br />
                    <li>이 게임은 비주얼 노벨, 공포 장르입니다.</li>
                    <li>이 게임은 반응형을 지원하지 않습니다.</li>
                    <li>이 게임은 아직 개발 단계이며 불편한 오류가 많습니다.</li>
                    <li>이 게임은 오류를 방지하기 위해 새로고침을 막았습니다.</li>
                    <br />
                    <li style={{ fontSize: '18px', color: 'red' }}>※이 게임은 점프 스케어가 있습니다.※</li>
                    <li style={{ fontSize: '18px', color: 'red' }}>※이미지와 내용은 실제와 다를 수 있습니다.※</li>
                </ul>
                <button onClick={RuleClose}>닫기</button>
            </div>
        </>
    )
}

export default Rule