import searchImg from '../../assets/search-icon.svg';
import {
  Input,
  Label,
  Wrapper,
  SearchIcon,
  InputWrapper,
} from './search-bar.styled';

interface SearchBar {
  label: string;
  keyword: string;
  handleChangeKeyword: (e: React.ChangeEvent) => void;
}

const SearchBar: React.FC<SearchBar> = ({
  label,
  keyword,
  handleChangeKeyword,
}: SearchBar) => {
  return (
    <Wrapper>
      <Label>{label}</Label>
      <InputWrapper>
        <Input
          value={keyword}
          placeholder="검색어 입력"
          onChange={(e) => handleChangeKeyword(e)}
        />
        <SearchIcon alt="search" src={searchImg} />
      </InputWrapper>
    </Wrapper>
  );
};

export default SearchBar;
