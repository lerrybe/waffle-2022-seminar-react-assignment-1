import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './menu-new.css';
import { toast } from 'react-toastify';
import ButtonNormal from '../button-normal';

import {
  checkValidPrice,
  toStringNumberWithComma,
  toNumberWithoutComma,
} from '../../utils/menu/price';
import { requestCreateMenu } from '../../api/menus';
import { checkValidName } from '../../utils/menu/name';

import { useSessionContext } from '../../context/SessionContext';

function MenusNewPage() {
  const navigate = useNavigate();
  const { accessToken } = useSessionContext();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    type: '',
    description: '',
  });

  // DESC: formData 변화 감지, price는 기본적으로 number로 관리
  const handleChangeFormData = useCallback(
    (e) => {
      const target = {
        name: e.target.name,
        value: e.target.value,
      };
      if (target.name === 'price') {
        target.value = toNumberWithoutComma(
          String(e.target.value.replace(/[^0-9]/g, '')),
        );
      }
      setFormData({
        ...formData,
        [target.name]: target.value,
      });
    },
    [formData],
  );

  // DESC: 메뉴 추가 등록하기
  const handleSubmit = useCallback(() => {
    const { isValidName, announcement: nameAnnouncement } = checkValidName(
      formData.name,
    );
    const { isValidPrice, announcement: priceAnnouncement } = checkValidPrice(
      String(formData.price),
    );

    if (!isValidName) {
      toast.error(nameAnnouncement);
      return;
    }
    if (!isValidPrice) {
      toast.error(priceAnnouncement);
      return;
    }

    // DESC: 요청
    (async () => {
      const res = await requestCreateMenu(formData, accessToken);
      if (res) {
        toast.success('메뉴가 생성되었습니다!');
        navigate(`/menus/${res.id}}`);
      }
    })();

    // DESC: 생성한 메뉴 상세보기로 이동
  }, [formData, navigate]);

  return (
    <>
      <div className="menu-new-wrapper">
        <h1 className="menu-new-header">새 메뉴 추가</h1>
        <div className="menu-field-wrapper">
          <label className="menu-field-label">이름</label>
          <input
            className="menu-field-input"
            name="name"
            value={formData.name}
            placeholder="맛있는 와플"
            onChange={handleChangeFormData}
          />
        </div>
        <div className="menu-field-wrapper">
          <label className="menu-field-label">종류</label>
          <select
            required
            className="menu-field-input"
            name="type"
            value={formData.type}
            onChange={handleChangeFormData}
            placeholder="상품의 종류를 선택하세요"
          >
            <option value="" disabled hidden>
              상품의 종류를 선택하세요
            </option>
            <option value="waffle">와플</option>
            <option value="beverage">음료</option>
            <option value="coffee">커피</option>
          </select>
        </div>
        <div className="menu-field-wrapper">
          <label className="menu-field-label">가격</label>
          <input
            className="menu-field-input"
            name="price"
            placeholder="5,000"
            value={toStringNumberWithComma(String(formData.price))}
            onChange={handleChangeFormData}
          />
          <span className="menu-field-input-unit">원</span>
        </div>
        <div className="menu-field-wrapper">
          <label className="menu-field-label">상품 이미지</label>
          <input
            className="menu-field-input"
            name="image"
            placeholder="이미지 주소를 입력해주세요"
            value={formData.image}
            onChange={handleChangeFormData}
          />
        </div>
        <div className="menu-field-wrapper">
          <label className="menu-field-label">설명</label>
          <textarea
            className="menu-field-textarea"
            name="description"
            value={formData.description}
            onChange={handleChangeFormData}
            placeholder="상품에 대한 자세한 설명을 입력해주세요"
          />
        </div>
      </div>

      <div className="menu-new-button-wrapper">
        <ButtonNormal
          text="추가"
          bgColor="#D3FFC3"
          handleClick={handleSubmit}
        />
        <ButtonNormal text="취소" handleClick={() => navigate(-1)} />
      </div>
    </>
  );
}

export default MenusNewPage;
