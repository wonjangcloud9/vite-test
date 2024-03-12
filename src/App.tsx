import styled from "styled-components";
import { useState, useEffect } from "react";
import { getLocalStorage, setLocalStorage } from "./utils";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "./atoms";
import CcountryList from "./components/ccountryList";
import CToGoForm from "./components/ctoGoForm";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.color};
  height: 100vh;
`;

const DarkModeBtn = styled.button``;

export const Subject = styled.div<NameProps>`
  font-size: 22px;
  margin: 10px 0;
  text-align: start;
  color: ${(props) => (props.isDark ? "white" : "black")};
`;

export interface NameProps {
  isDark?: boolean;
}

export type purposeType = "been" | "like" | "want";
interface Country {
  name: string;
  type: string;
}

export default function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const isDark = useRecoilValue(isDarkAtom);
  const setDark = useSetRecoilState(isDarkAtom);

  const loadCountries = () => {
    const localCountries = JSON.parse(getLocalStorage("countries") || "[]");
    setCountries(localCountries);
  };

  useEffect(() => {
    loadCountries();
  }, []);

  const toggleDark = () => {
    setDark((prev) => !prev);
  };

  return (
    <Container
      theme={{
        backgroundColor: isDark ? "transparent" : "white",
        color: isDark ? "white" : "transparent",
      }}
    >
      <DarkModeBtn onClick={toggleDark}>{isDark ? "☀️" : "🌊"}</DarkModeBtn>
      <Subject isDark={isDark}>내가 가고싶은 나라들</Subject>
      <CToGoForm
        countries={countries}
        setCountries={setCountries}
        setLocalStorage={setLocalStorage}
      />
      {["want", "been", "like"].map((type) => (
        <CcountryList
          key={type}
          countries={countries}
          setCountries={setCountries}
          type={type as purposeType}
        />
      ))}
    </Container>
  );
}
