import { FormInput, FormLabel, FormUnit, Wrapper } from './form-item.styled';

interface FormItem {
  name?: string;
  type?: 'password' | 'text';
  label?: string;
  content?: string;
  required: boolean;
  placeholder?: string;
  handleChangeContent?: () => void;
}

function FormItem({
  name,
  type,
  label,
  content,
  required,
  placeholder,
  handleChangeContent,
}: FormItem) {
  return (
    <Wrapper>
      <FormLabel>{label}</FormLabel>
      <FormInput
        name={name}
        value={content}
        required={required}
        placeholder={placeholder}
        onChange={handleChangeContent}
        type={type === 'password' ? 'password' : 'text'}
      />
      {label === '가격' && <FormUnit>원</FormUnit>}
    </Wrapper>
  );
}

export default FormItem;
