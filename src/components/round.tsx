import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { rounds } from "../atoms";

const RoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
`;

export const Round = () => {
  const roundsValue = useRecoilValue(rounds);
  return (
    <RoundContainer>
      <div>{roundsValue}/4</div>
      <div>Round</div>
    </RoundContainer>
  );
};
