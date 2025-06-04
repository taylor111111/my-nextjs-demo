'use client'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '@/store'
import { login, logout } from '@/store/userSlice'
import styled from 'styled-components';
import StyledButton from '@/components/StyledButton';

const Title = styled.h1`
  color: hotpink;
  font-size: 32px;
`;

export default function HomePage() {
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch<AppDispatch>()

  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">

        <h1 className="text-4xl font-bold mb-4">Redux Toolkit 测试</h1>
        {user.isLoggedIn ? (
            <div>
              <p>欢迎，{user.username} ({user.email})</p>
              <button
                  onClick={() => dispatch(logout())}
                  className="px-4 py-2 bg-red-500 text-white rounded"
              >
                退出登录
              </button>
            </div>
        ) : (
            <button
                onClick={() => dispatch(login({ username: 'Taylor', email: 'taylor@example.com' }))}
                className="px-4 py-2 bg-green-500 text-white rounded"
            >
              登录
            </button>
        )}
          <Title>Hello styled-components!</Title>
          <StyledButton onClick={() => alert('Clicked!')}>Click Me</StyledButton>
      </div>
  )
}
