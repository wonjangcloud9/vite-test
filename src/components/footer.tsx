import styled from "styled-components";
import { Goal } from "./goal";
import { Round } from "./round";

const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Separator = styled.div`
  font-size: 60px;
  font-weight: bold;
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Footer = () => {
  return (
    <FooterContainer>
      <Round />
      <Separator />
      <Goal />
    </FooterContainer>
  );
};
