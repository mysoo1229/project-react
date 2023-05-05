import styled from "styled-components";

const HeaderWrap = styled.header`
  display: flex;
  padding: 40px 0;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 26px;
  font-weight: bold;
`;

interface IHeaderProps {
  title: string;
}

function Header({ title }: IHeaderProps) {
  return (
    <HeaderWrap>
      <Title>{title}</Title>
    </HeaderWrap>
  )
}

export default Header;
