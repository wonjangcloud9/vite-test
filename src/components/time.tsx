import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { time } from "../atoms";

const TimeContainer = styled.div`
  font-size: 60px;
  font-weight: bold;
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Separator = styled.div`
  font-size: 60px;
  font-weight: bold;
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Time = () => {
  const timeValue = useRecoilValue(time);
  const minutes = Math.floor(timeValue / 60);
  const seconds = timeValue % 60;
  return (
    <TimeContainer>
      <Card>{minutes}</Card>
      <Separator>:</Separator>
      <Card>{seconds >= 10 ? seconds : `0${seconds}`}</Card>
    </TimeContainer>
  );
};
