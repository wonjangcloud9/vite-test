import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { setLocalStorage } from "./utils";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Subject = styled.h2`
  font-size: 20px;
  margin: 10px 0;
  text-align: start;
`;

interface Country {
  name: string;
  type: string;
}

export default function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const countryInput = useForm();

  useEffect(() => {
    const localCountries = JSON.parse(
      localStorage.getItem("countries") || "[]"
    );
    setCountries(localCountries);
  }, []);

  return (
    <Container>
      <Subject>내가 가고싶은 나라들</Subject>
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
      <ul
        style={{
          listStyle: "none",
          padding: "0",
          textAlign: "start",
          width: "300px",
        }}
      >
        {countries.map(
          (country, index) =>
            country.type === "want" && (
              <li
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  height: "40px",
                  marginBottom: "10px",
                }}
              >
                <div>{country.name}</div>
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
              </li>
            )
        )}
      </ul>
      <Subject>내가 가본 나라들</Subject>
      <ul
        style={{
          listStyle: "none",
          padding: "0",
          textAlign: "start",
          width: "300px",
        }}
      >
        {countries.map(
          (country, index) =>
            country.type === "been" && (
              <li
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  height: "40px",
                  marginBottom: "10px",
                }}
              >
                <div>{country.name}</div>
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
                ️
              </li>
            )
        )}
      </ul>
      <Subject>내가 좋아하는 나라들</Subject>
      <ul
        style={{
          listStyle: "none",
          padding: "0",
          textAlign: "start",
          width: "300px",
        }}
      >
        {countries.map(
          (country, index) =>
            country.type === "like" && (
              <li
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  height: "40px",
                  marginBottom: "10px",
                }}
              >
                <div>{country.name}</div>
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
              </li>
            )
        )}
      </ul>
    </Container>
  );
}
