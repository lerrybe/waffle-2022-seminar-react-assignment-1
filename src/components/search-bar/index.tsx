import useThrottle from '../../hooks/useThrottle';

import {
  Input,
  Label,
  Wrapper,
  SearchIcon,
  InputWrapper,
} from './search-bar.styled';
import searchImg from '../../assets/search-icon.svg';
import useSyncedState from '../../hooks/useSyncedState';

interface SearchBar {
  label: string;
  search: (keyword: string | null) => void;
}

const SearchBar: React.FC<SearchBar> = ({ label, search }: SearchBar) => {
  const throttle = useThrottle();
  const [keyword, setKeyword] = useSyncedState<string | null>(null);

  // DESC: 검색어 변화 감지 이벤트 핸들러 함수
  const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length) {
      setKeyword(e.target.value);
    } else {
      setKeyword(null);
    }
  };

  return (
    <Wrapper>
      <Label>{label}</Label>
      <InputWrapper>
        <Input
          value={keyword ?? ''}
          placeholder="검색어 입력"
          onChange={(e) => {
            handleChangeKeyword(e);
            throttle(() => search(keyword), 500);
          }}
        />
        <SearchIcon alt="search" src={searchImg} />
      </InputWrapper>
    </Wrapper>
  );
};

export default SearchBar;
