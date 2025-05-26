import './Ranking.css'

// Ranking.jsx
function Ranking({ RankingOpen, RankingClose, children }) {
  if (!RankingOpen) return null;

  return (
    <div className="ranking-modal" style={{ display: 'block' }}>
      <div className="modal-content">
        <h2>🏆 랭킹</h2>
        {children} {/* ✅ 여기 있어야 RankingBoard 들어감 */}
        <button onClick={RankingClose}>닫기</button>
      </div>
    </div>
  );
}

export default Ranking;
