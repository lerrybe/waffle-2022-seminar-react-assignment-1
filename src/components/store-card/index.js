import './store-card.css';

function StoreCard({ storeName, username, storeDesc, starRating, handleClick }) {
  return (
    <div className="card-wrapper" onClick={handleClick}>
      <h1 className="store-name">{storeName}</h1>
      <h6 className="user-name">{username}</h6>
      <h4 className="store-desc">{storeDesc}</h4>
      <div className="stars">{'★'.repeat(starRating) + '☆'.repeat(5 - starRating)}</div>
    </div>
  );
}

export default StoreCard;
