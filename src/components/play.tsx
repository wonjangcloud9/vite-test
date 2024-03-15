import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isRunning, time } from "../atoms";

const PlayContainer = styled.button`
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

export const Play = () => {
  const isRunningValue = useRecoilValue(isRunning);
  const timeValue = useRecoilValue(time);
  const setIsRunning = useSetRecoilState(isRunning);

  const handlePlay = () => {};
  return (
    <PlayContainer onClick={handlePlay}>
      {isRunningValue ? (
        <svg
          data-slot="icon"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M5.75 3a.75.75 0 0 0-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75V3.75A.75.75 0 0 0 7.25 3h-1.5ZM12.75 3a.75.75 0 0 0-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75V3.75a.75.75 0 0 0-.75-.75h-1.5Z"></path>
        </svg>
      ) : (
        <svg
          data-slot="icon"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          style={{ marginLeft: "5px" }}
        >
          <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z"></path>
        </svg>
      )}
    </PlayContainer>
  );
};
