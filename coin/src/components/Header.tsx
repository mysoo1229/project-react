import iconHome from "../resources/icon-home.png";
import iconSun from "../resources/icon-sun.png";
import iconMoon from "../resources/icon-moon.png";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isLightAtom } from "../atoms";

const HeaderWrap = styled.header`
  display: flex;
  position: relative;
  padding: 50px 0;
  justify-content: center;
`;

const HomeLinkWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 4px;
  transform: translate3D(0, -50%, 0);

  a {
    display: block;
    width: 34px;
    height: 34px;
    background: ${(props) => props.theme.fillColor} url(${iconHome}) no-repeat center 6px / 20px auto;
    border: none;
    border-radius: 50%;
    box-shadow: 0 0 5px 2px ${(props) => props.theme.shadowColor};
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
`;

const ThemeButton = styled.button<{ isLight: boolean }>`
  position: absolute;
  top: 50%;
  right: 4px;
  transform: translate3D(0, -50%, 0);
  width: 34px;
  height: 34px;
  background: ${(props) => props.theme.fillColor} no-repeat center / 20px auto;
  background-image: ${(props) => props.isLight ? `url(${iconSun})` : `url(${iconMoon})`};
  border: none;
  border-radius: 50%;
  box-shadow: 0 0 5px 2px ${(props) => props.theme.shadowColor};
  cursor: pointer;
`;

interface IHeaderProps {
  title: string;
  hasHomeLink?: boolean;
}

function Header({ title, hasHomeLink = false }: IHeaderProps) {
  const isLight = useRecoilValue(isLightAtom);
  const setLightAtom = useSetRecoilState(isLightAtom);
  const toggleThemeColor = () => setLightAtom((prev) => !prev);

  return (
    <HeaderWrap>
      { hasHomeLink ? (
        <HomeLinkWrap>
          <Link to={"/"} />
        </HomeLinkWrap>
      ) : null }
      <Title>{title}</Title>
      <ThemeButton
        onClick={toggleThemeColor}
        isLight={isLight}
      />
    </HeaderWrap>
  )
}

export default Header;
