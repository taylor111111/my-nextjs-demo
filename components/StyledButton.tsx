'use client';

import styled from 'styled-components';

const Button = styled.button`
  padding: 8px 16px;
  font-size: 16px;
  color: white;
  background-color: #0070f3;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background-color: #0059c1;
  }

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
`;

type StyledButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
};

export default function StyledButton({ children, onClick, disabled }: StyledButtonProps) {
    return (
        <Button onClick={onClick} disabled={disabled}>
            {children}
        </Button>
    );
}
