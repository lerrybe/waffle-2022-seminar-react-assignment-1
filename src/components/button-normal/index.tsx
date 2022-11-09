import { Button } from './button-normal.styled';

interface ButtonNormal {
  text: string;
  bgColor?: string;
  handleClick: () => void;
}

function ButtonNormal({ text, bgColor, handleClick }: ButtonNormal) {
  return (
    <Button onClick={handleClick} bgColor={bgColor || '#fff'}>
      {text}
    </Button>
  );
}

export default ButtonNormal;
