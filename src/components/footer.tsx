import styled from "styled-components";
import { Goal } from "./goal";
import { Round } from "./round";

const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Footer = () => {
  return (
    <FooterContainer>
      <Round />
      <Goal />
    </FooterContainer>
  );
};
