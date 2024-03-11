import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
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
        onSubmit={countryInput.handleSubmit((data) => {
          setCountries([...countries, { name: data.country, type: "want" }]);
          countryInput.reset();
          setLocalStorage("countries", JSON.stringify(countries));
        })}
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
                      setCountries(
                        countries.map((c, i) =>
                          i === index ? { ...c, type: "been" } : c
                        )
                      );
                      setLocalStorage(
                        "countries",
                        JSON.stringify(
                          countries.map((c, i) =>
                            i === index ? { ...c, type: "been" } : c
                          )
                        )
                      );
                    }}
                  >
                    🛫
                  </button>
                  <button
                    onClick={() => {
                      setCountries(countries.filter((_, i) => i !== index));
                      setLocalStorage(
                        "countries",
                        JSON.stringify(countries.filter((_, i) => i !== index))
                      );
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
                      setCountries(
                        countries.map((c, i) =>
                          i === index ? { ...c, type: "like" } : c
                        )
                      );
                      setLocalStorage(
                        "countries",
                        JSON.stringify(
                          countries.map((c, i) =>
                            i === index ? { ...c, type: "like" } : c
                          )
                        )
                      );
                    }}
                  >
                    ❤️
                  </button>
                  <button
                    onClick={() => {
                      setCountries(
                        countries.map((c, i) =>
                          i === index ? { ...c, type: "want" } : c
                        )
                      );
                      setLocalStorage(
                        "countries",
                        JSON.stringify(
                          countries.map((c, i) =>
                            i === index ? { ...c, type: "want" } : c
                          )
                        )
                      );
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
                      setCountries(
                        countries.map((c, i) =>
                          i === index ? { ...c, type: "been" } : c
                        )
                      );
                      setLocalStorage(
                        "countries",
                        JSON.stringify(
                          countries.map((c, i) =>
                            i === index ? { ...c, type: "been" } : c
                          )
                        )
                      );
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
