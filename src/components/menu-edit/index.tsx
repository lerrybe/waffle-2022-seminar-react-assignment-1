import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import styles
import {
  HeaderTitle,
  ButtonWrapper,
  MenuImgWrapper,
  MenuImgTitle,
  MenuImgInput,
  ContentWrapper,
  MenuNameWrapper,
  MenuNameLabel,
  MenuNameValue,
  MenuTypeWrapper,
  MenuTypeTitle,
  MenuTypeValue,
  MenuPriceWrapper,
  MenuPriceTitle,
  MenuPriceInput,
  MenuPriceUnit,
  MenuDescriptionTitle,
  MenuDescriptionWrapper,
  MenuDescriptionTextarea,
} from './menu-edit.styled';

// import components
import { toast } from 'react-toastify';
import ButtonNormal from '../button-normal';

// import utils and API functions
import {
  checkValidPrice,
  toNumberWithoutComma,
  toStringNumberWithComma,
} from '../../utils/menu/price';
import { requestUpdateMenu } from '../../api/menus';
import { convertTypeEnToKo } from '../../utils/menu/type';

// import contexts
import { useMenuDataContext } from '../../context/MenuDataContext';
import { useSessionContext } from '../../context/SessionContext';

const MenuEdit: React.FC = () => {
  const navigate = useNavigate();
  const { accessToken } = useSessionContext()!;
  const { selectedMenu } = useMenuDataContext()!;

  const [formData, setFormData] = useState({
    name: selectedMenu?.name,
    price: selectedMenu?.price,
    image: selectedMenu?.image,
    type: selectedMenu?.type,
    description: selectedMenu?.description,
  });

  // DESC: formData 변화 감지, price는 기본적으로 number로 관리
  const handleChangeFormData = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const target = {
        name: e.target.name,
        value: e.target.value,
      };
      if (target.name === 'price') {
        target.value = String(
          toNumberWithoutComma(String(e.target.value.replace(/[^0-9]/g, ''))),
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
    const { isValidPrice, announcement } = checkValidPrice(
      String(formData.price),
    );

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
      <ContentWrapper>
        <HeaderTitle>메뉴 수정</HeaderTitle>
        <MenuNameWrapper>
          <MenuNameLabel>이름</MenuNameLabel>
          <MenuNameValue>{selectedMenu?.name}</MenuNameValue>
        </MenuNameWrapper>
        <MenuTypeWrapper>
          <MenuTypeTitle>종류</MenuTypeTitle>
          <MenuTypeValue>{convertTypeEnToKo(selectedMenu!.type)}</MenuTypeValue>
        </MenuTypeWrapper>

        <MenuPriceWrapper>
          <MenuPriceTitle>가격</MenuPriceTitle>
          <MenuPriceInput
            name="price"
            placeholder="5,000"
            value={toStringNumberWithComma(String(formData.price))}
            onChange={handleChangeFormData}
          />
          <MenuPriceUnit>원</MenuPriceUnit>
        </MenuPriceWrapper>

        <MenuImgWrapper>
          <MenuImgTitle>상품 이미지</MenuImgTitle>
          <MenuImgInput
            name="image"
            placeholder="이미지 주소를 입력해주세요"
            value={formData.image}
            onChange={handleChangeFormData}
          />
        </MenuImgWrapper>

        <MenuDescriptionWrapper>
          <MenuDescriptionTitle>설명</MenuDescriptionTitle>
          <MenuDescriptionTextarea
            name="description"
            value={formData.description}
            onChange={handleChangeFormData}
            placeholder="상품에 대한 자세한 설명을 입력해주세요"
          />
        </MenuDescriptionWrapper>
      </ContentWrapper>

      <ButtonWrapper>
        <ButtonNormal
          text="저장"
          bgColor="#D3FFC3"
          handleClick={handleSubmit}
        />
        <ButtonNormal text="취소" handleClick={() => navigate(-1)} />
      </ButtonWrapper>
    </>
  );
};

export default MenuEdit;
