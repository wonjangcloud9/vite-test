import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { time } from "../atoms";
import { motion } from "framer-motion";

const TimeContainer = styled.div`
  font-size: 60px;
  font-weight: bold;
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled(motion.div)`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: rgb(226, 56, 26);
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
      <Card
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1.1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        key={`${minutes}-minutes`}
      >
        {minutes >= 10 ? minutes : `0${minutes}`}
      </Card>
      <Separator>:</Separator>
      <Card
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1.1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        key={`${seconds}-seconds`}
      >
        {seconds >= 10 ? seconds : `0${seconds}`}
      </Card>
    </TimeContainer>
  );
};
