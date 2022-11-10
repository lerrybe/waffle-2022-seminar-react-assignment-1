import { Rating } from '@mui/material';
import './store-card.css';

function StoreCard({ storeName, username, storeDesc, rating, handleClick }) {
  return (
    <div className="card-wrapper" onClick={handleClick}>
      <h1 className="store-name">{storeName}</h1>
      <h6 className="user-name">{username}</h6>
      <h4 className="store-desc">{storeDesc}</h4>
      <Rating
        name="half-rating-read"
        value={Number((Number(rating) / 2).toFixed(1))}
        precision={0.5}
        readOnly
      />
    </div>
  );
}

export default StoreCard;
