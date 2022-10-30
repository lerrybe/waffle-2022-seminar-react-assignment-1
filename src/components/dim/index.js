import './dim.css';

// DESC: 커스텀 모달 띄웠을 때 모달 뒤 dim 처리를 위한 컴포넌트
function Dim({ handleCloseModal }) {
  return <div className="dim-wrapper" onClick={handleCloseModal} />;
}

export default Dim;
