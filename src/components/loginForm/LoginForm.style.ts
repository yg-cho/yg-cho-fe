import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

export const Title = styled.a`
  font-size: 48px;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  padding: 0 20px 40px;
  gap: 16px;
`;


type InputType = {
  wrong: boolean;
};

export const TextInput = styled.input<InputType>`

  background-color: ${({ wrong }) => (wrong ? '#fdedee' : '#f7f7fa')};
  color: ${({ wrong }) => (wrong ? '#fff' : '#000')};
  border: 0;
  margin-top: 8px;
  padding: 16px;
  border-radius: 12px;
  width: 100%;
`;

export const LoginButton = styled.button`
  margin-top: 40px;
  padding: 20px;
  border-radius: 12px;
  background-color: #222;
  color: #fff;

  &:disabled {
    background-color: #e2e2ea;
  }
`;

export const Id = styled.div`
  font-weight: 700;
  font-size: 13px;
  color: #6c6c7d;
`
export const Pwd = styled.div`
  font-weight: 700;
  font-size: 13px;
  color: #6c6c7d;
`

export const ValidationInfo = styled.div`
  margin-top: 8px;
  font-weight: 400;
  font-size: 13px;
  color: #ED4E5C;
`
