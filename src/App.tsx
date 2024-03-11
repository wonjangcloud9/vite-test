import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useState, useEffect, FormEvent } from "react";
import { setLocalStorage } from "./utils";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "./atoms";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.color};
  height: 100vh;
`;

interface NameProps {
  isDark?: boolean;
}

const Subject = styled.div<NameProps>`
  font-size: 22px;
  margin: 10px 0;
  text-align: start;
  color: ${(props) => (props.isDark ? "white" : "black")};
`;

const CountryListContainer = styled.div``;

const CountryList = styled.ul`
  list-style: none;
  padding: 0;
  text-align: start;
  width: 400px;
`;

const CountryItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
`;

const CountryName = styled.div<NameProps>`
  width: 30%;
  color: ${(props) => (props.isDark ? "white" : "black")};
`;

interface Country {
  name: string;
  type: string;
}

export default function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [errorText, setErrorText] = useState<string>("");
  const countryInput = useForm();
  const isDark = useRecoilValue(isDarkAtom);
  const setDark = useSetRecoilState(isDarkAtom);

  useEffect(() => {
    const localCountries = JSON.parse(
      localStorage.getItem("countries") || "[]"
    );
    setCountries(localCountries);
  }, []);

  const toggleDark = () => {
    setDark((prev) => !prev);
  };

  const moveCountry = (index: number, type: string) => {
    setCountries(countries.map((c, i) => (i === index ? { ...c, type } : c)));
    setLocalStorage(
      "countries",
      JSON.stringify(
        countries.map((c, i) => (i === index ? { ...c, type } : c))
      )
    );
  };

  const removeCountry = (index: number) => {
    setCountries(countries.filter((_, i) => i !== index));
    setLocalStorage(
      "countries",
      JSON.stringify(countries.filter((_, i) => i !== index))
    );
  };

  const onSubmit = (data: Record<string, string>) => {
    if (!data.country) {
      setErrorText("국가명을 입력해주세요.");
      return;
    }

    if (countries.some((country) => country.name === data.country)) {
      setErrorText("이미 등록된 국가입니다.");
      return;
    }

    setCountries([...countries, { name: data.country, type: "want" }]);
    countryInput.reset();
    setLocalStorage("countries", JSON.stringify(countries));
    setErrorText("");
  };

  return (
    <Container
      theme={{
        backgroundColor: isDark ? "transparent" : "white",
        color: isDark ? "white" : "transparent",
      }}
    >
      <button onClick={toggleDark}>{isDark ? "☀️" : "🌊"}</button>
      <Subject isDark={isDark}>내가 가고싶은 나라들</Subject>
      <form
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          onSubmit(countryInput.getValues());
        }}
      >
        <input
          {...countryInput.register("country", {
            required: true,
          })}
          placeholder="국가명"
          style={{
            width: "91%",
            height: "30px",
            borderRadius: "10px",
          }}
        />
        {errorText && <div>{errorText}</div>}
        <button
          type="submit"
          style={{
            width: "300px",
            height: "40px",
            textAlign: "center",
          }}
        >
          가자!!
        </button>
      </form>
      <CountryListContainer>
        <CountryList>
          {countries.map(
            (country, index) =>
              country.type === "want" && (
                <CountryItem key={index}>
                  <CountryName isDark={isDark}>{country.name}</CountryName>
                  <button
                    onClick={() => {
                      moveCountry(index, "been");
                    }}
                  >
                    🛫
                  </button>
                  <button
                    onClick={() => {
                      removeCountry(index);
                    }}
                  >
                    🗑️
                  </button>
                </CountryItem>
              )
          )}
        </CountryList>
      </CountryListContainer>

      <CountryListContainer>
        <Subject isDark={isDark}>내가 가본 나라들</Subject>
        <CountryList>
          {countries.map(
            (country, index) =>
              country.type === "been" && (
                <CountryItem key={index}>
                  <CountryName isDark={isDark}>{country.name}</CountryName>
                  <button
                    onClick={() => {
                      moveCountry(index, "like");
                    }}
                  >
                    ❤️
                  </button>
                  <button
                    onClick={() => {
                      moveCountry(index, "want");
                    }}
                  >
                    ❌
                  </button>
                </CountryItem>
              )
          )}
        </CountryList>
      </CountryListContainer>
      <CountryListContainer>
        <Subject isDark={isDark}>내가 좋아하는 나라들</Subject>
        <CountryList>
          {countries.map(
            (country, index) =>
              country.type === "like" && (
                <CountryItem key={index}>
                  <CountryName isDark={isDark}>{country.name}</CountryName>
                  <button
                    onClick={() => {
                      moveCountry(index, "been");
                    }}
                  >
                    🛫
                  </button>
                </CountryItem>
              )
          )}
        </CountryList>
      </CountryListContainer>
    </Container>
  );
}
