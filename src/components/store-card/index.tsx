import { Rating } from '@mui/material';
import {
  Wrapper,
  Username,
  Storename,
  StoreDescription,
} from './store-card.styled';

interface StoreCard {
  storeName: string;
  username: string;
  storeDesc: string;
  rating: number;
  handleClick: () => void;
}

const StoreCard: React.FC<StoreCard> = ({
  storeName,
  username,
  storeDesc,
  rating,
  handleClick,
}: StoreCard) => {
  return (
    <Wrapper onClick={handleClick}>
      <Storename>{storeName}</Storename>
      <Username>{username}</Username>
      <StoreDescription>{storeDesc}</StoreDescription>
      <Rating
        name="half-rating-read"
        value={Number((rating / 2).toFixed(1))}
        precision={0.5}
        readOnly
      />
    </Wrapper>
  );
};

export default StoreCard;
