import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './menu-edit.css';
import { toast } from 'react-toastify';

import ButtonNormal from '../button-normal';

import {
  checkValidPrice,
  toStringNumberWithComma,
  toNumberWithoutComma,
} from '../../utils/menu/price';
import { convertTypeEnToKo } from '../../utils/menu/type';
import { requestUpdateMenu } from '../../api/menus';

import { useMenuDataContext } from '../../context/MenuDataContext';
import { useSessionContext } from '../../context/SessionContext';

function MenuEdit() {
  const navigate = useNavigate();
  const { accessToken } = useSessionContext();
  const { selectedMenu } = useMenuDataContext();

  const [formData, setFormData] = useState({
    name: selectedMenu?.name,
    price: selectedMenu?.price,
    image: selectedMenu?.image,
    type: selectedMenu?.type,
    description: selectedMenu?.description,
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
          e.target.value.replace(/[^0-9]/g, ''),
        );
      }
      setFormData({
        ...formData,
        [target.name]: target.value,
      });
    },
    [formData],
  );

  // DESC: 메뉴 수정 저장하기
  const handleSubmit = useCallback(() => {
    const { isValidPrice, announcement } = checkValidPrice(formData.price);

    if (!isValidPrice) {
      toast.error(announcement);
      return;
    }

    (async () => {
      const res = await requestUpdateMenu(
        selectedMenu?.id,
        formData,
        accessToken,
      );
      if (res) {
        toast.success('메뉴가 수정되었습니다!');
        navigate(`/menus/${res.id}}`);
      }
    })();
  }, [formData, navigate, selectedMenu?.id]);

  return (
    <>
      <div className="menu-edit-wrapper">
        <h1 className="menu-edit-header">메뉴 수정</h1>
        <div className="menu-field-fixed-wrapper">
          <label className="menu-field-label-fixed">이름</label>
          <span className="menu-field-value-fixed">{selectedMenu?.name}</span>
        </div>
        <div className="menu-field-fixed-wrapper">
          <label className="menu-field-label-fixed">종류</label>
          <span className="menu-field-value-fixed">
            {convertTypeEnToKo(selectedMenu?.type)}
          </span>
        </div>
        <div className="menu-field-wrapper">
          <label className="menu-field-label">가격</label>
          <input
            className="menu-field-input"
            name="price"
            placeholder="5,000"
            value={toStringNumberWithComma(formData.price)}
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

      <div className="menu-edit-button-wrapper">
        <ButtonNormal
          text="저장"
          bgColor="#D3FFC3"
          handleClick={handleSubmit}
        />
        <ButtonNormal text="취소" handleClick={() => navigate(-1)} />
      </div>
    </>
  );
}

export default MenuEdit;
