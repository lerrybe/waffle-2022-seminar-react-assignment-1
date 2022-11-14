import './search-bar.css';
import searchImg from '../../assets/search-icon.svg';

function SearchBar({ label, keyword, handleChangeKeyword }) {
  return (
    <div className="search-wrapper">
      <span className="search-label">{label}</span>
      <div className="search-input-wrapper">
        <input
          className="search-input"
          value={keyword}
          placeholder="검색어 입력"
          onChange={(e) => handleChangeKeyword(e)}
        />
        <img className="search-icon" alt="search" src={searchImg} />
      </div>
    </div>
  );
}

export default SearchBar;
