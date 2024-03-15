import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { goals } from "../atoms";

const GoalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
`;

export const Goal = () => {
  const goalsValue = useRecoilValue(goals);
  return (
    <GoalContainer>
      <div>{goalsValue}/12</div>
      <div>GOAL</div>
    </GoalContainer>
  );
};
