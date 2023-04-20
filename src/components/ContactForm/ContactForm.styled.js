import styled from '@emotion/styled';
import InputMask from 'react-input-mask';

export const Form = styled.form`
  border-bottom: 2px solid green;
`;

export const InputWraper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
`;

export const Input = styled(InputMask)`
  border: 3px solid #549668;

  border-radius: 20px;
  padding: 5px;

  :focus {
    background-color: white;
  }
`;

export const Button = styled.button`
  /* text-align: center; */

  min-width: 100px;
  padding: 10px;
  margin: 10px 0;
  border-radius: 20px;
  background-color: #78c4c8;
`;
