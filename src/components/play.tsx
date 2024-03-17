/* eslint-disable */

import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isRunning, time, rounds, goals } from "../atoms";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

const PlayContainer = styled(motion.button)`
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  height: 100px;
  width: 100px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 80px 0;
`;

const PauseBtn = styled(motion.svg)`
  fill: currentColor;
  width: 100px;
  height: 100px;
`;

const PlayBtn = styled(motion.svg)`
  fill: currentColor;
  width: 100px;
  height: 100px;
  margin-left: 5px;
`;

export const Play = () => {
  const timeValue = useRecoilValue<number>(time);
  const setTimeValue = useSetRecoilState<number>(time);

  const isRunningValue = useRecoilValue<boolean>(isRunning);
  const setIsRunning = useSetRecoilState<boolean>(isRunning);

  const roundsValue = useRecoilValue<number>(rounds);
  const setRounds = useSetRecoilState<number>(rounds);

  const setGoals = useSetRecoilState<number>(goals);

  const timerRef = useRef<number>();

  const handlePlay = () => {
    setIsRunning((prev) => !prev);

    if (!isRunningValue) {
      timerRef.current = setInterval(() => {
        setTimeValue((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    if (timeValue === 0) {
      setIsRunning(false);
      clearInterval(timerRef.current);
      setTimeValue(1500);
      if (roundsValue === 3) {
        setRounds(0);
        setGoals((prev) => prev + 1);
      } else {
        setRounds((prev) => prev + 1);
      }
    }
  }, [timeValue]);

  return (
    <PlayContainer
      onClick={handlePlay}
      whileHover={{ scale: 1.2 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      {isRunningValue ? (
        <PauseBtn
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          data-slot="icon"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M5.75 3a.75.75 0 0 0-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75V3.75A.75.75 0 0 0 7.25 3h-1.5ZM12.75 3a.75.75 0 0 0-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75V3.75a.75.75 0 0 0-.75-.75h-1.5Z"></path>
        </PauseBtn>
      ) : (
        <PlayBtn
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          data-slot="icon"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z"></path>
        </PlayBtn>
      )}
    </PlayContainer>
  );
};
