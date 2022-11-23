import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import styles and components
import {
  Header,
  Wrapper,
  ButtonWrapper,
  MenuFieldInput,
  MenuFieldInputUnit,
  MenuFieldLabel,
  MenuFieldSelect,
  MenuFieldTextArea,
  MenuFieldWrapper,
} from './menu-new.styled';
import { toast } from 'react-toastify';
import ButtonNormal from '../button-normal';

// import utils and API functions
import {
  checkValidPrice,
  toNumberWithoutComma,
  toStringNumberWithComma,
} from '../../utils/menu/price';
import { requestCreateMenu } from '../../api/menus';
import { checkValidName } from '../../utils/menu/name';

// import contexts
import { useSessionContext } from '../../context/SessionContext';

const MenusNew: React.FC = () => {
  const navigate = useNavigate();
  const { accessToken } = useSessionContext()!;

  const [formData, setFormData] = useState({
    name: '',
    type: 'waffle',
    price: 0,
    image: undefined as string | undefined,
    description: undefined as string | undefined,
  });

  // DESC: formData 변화 감지, price는 기본적으로 number로 관리
  const handleChangeFormData = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      const target = {
        name: e.target.name,
        value: e.target.value,
      };
      if (target.name === 'price') {
        target.value = String(
          toNumberWithoutComma(String(e.target.value.replace(/[^0-9]/g, ''))),
        );
      }
      setFormData((prev) => ({
        ...prev,
        [target.name]: target.value,
      }));

      // DESC: set image & description undefined when ''
      if (!formData.image) {
        setFormData((prev) => ({
          ...prev,
          image: undefined,
        }));
      }
      if (!formData.description) {
        setFormData((prev) => ({
          ...prev,
          description: undefined,
        }));
      }
    },
    [formData],
  );

  // DESC: 메뉴 추가 등록하기
  const handleSubmit = useCallback(() => {
    // DESC: formData 유효성 검증
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
    if (accessToken) {
      (async () => {
        const res = await requestCreateMenu(formData, accessToken);

        if (res) {
          toast.success('메뉴가 생성되었습니다!');
          navigate(`/menus/${res.data?.id}}`);
        }
      })();
    } else {
      toast.error('토큰이 필요합니다.');
    }

    // DESC: 생성한 메뉴 상세보기로 이동
  }, [formData]);

  return (
    <>
      <Wrapper>
        <Header>새 메뉴 추가</Header>
        <MenuFieldWrapper>
          <MenuFieldLabel>이름</MenuFieldLabel>
          <MenuFieldInput
            name="name"
            value={formData.name}
            placeholder="맛있는 와플"
            onChange={handleChangeFormData}
          />
        </MenuFieldWrapper>

        <MenuFieldWrapper>
          <MenuFieldLabel>종류</MenuFieldLabel>
          <MenuFieldSelect
            required
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
          </MenuFieldSelect>
        </MenuFieldWrapper>

        <MenuFieldWrapper>
          <MenuFieldLabel>가격</MenuFieldLabel>
          <MenuFieldInput
            name="price"
            placeholder="5,000"
            value={toStringNumberWithComma(String(formData.price))}
            onChange={handleChangeFormData}
          />
          <MenuFieldInputUnit>원</MenuFieldInputUnit>
        </MenuFieldWrapper>

        <MenuFieldWrapper>
          <MenuFieldLabel>상품 이미지</MenuFieldLabel>
          <MenuFieldInput
            name="image"
            placeholder="이미지 주소를 입력해주세요"
            value={formData.image}
            onChange={handleChangeFormData}
          />
        </MenuFieldWrapper>

        <MenuFieldWrapper>
          <MenuFieldLabel>설명</MenuFieldLabel>
          <MenuFieldTextArea
            name="description"
            value={formData.description}
            onChange={handleChangeFormData}
            placeholder="상품에 대한 자세한 설명을 입력해주세요"
          />
        </MenuFieldWrapper>
      </Wrapper>

      <ButtonWrapper>
        <ButtonNormal
          text="추가"
          bgColor="#D3FFC3"
          handleClick={handleSubmit}
        />
        <ButtonNormal text="취소" handleClick={() => navigate(-1)} />
      </ButtonWrapper>
    </>
  );
};

export default MenusNew;
