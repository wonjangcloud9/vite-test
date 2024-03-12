import styled from "styled-components";
import { setLocalStorage } from "../utils";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";
import { NameProps, Subject, purposeType } from "../App";

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

const subjectTitles = {
  been: "내가 가본 나라들",
  like: "내가 좋아하는 나라들",
  want: "",
};

const ButtonActions = {
  want: [
    { actionType: "been", emoji: "🛫" },
    { actionType: "delete", emoji: "🗑️" },
  ],
  been: [
    { actionType: "like", emoji: "❤️" },
    { actionType: "want", emoji: "❌" },
  ],
  like: [{ actionType: "been", emoji: "🛫" }],
};

interface CountryListProps {
  countries: { name: string; type: string }[];
  setCountries: (countries: { name: string; type: string }[]) => void;
  type: purposeType;
}

const CcountryList = ({ countries, setCountries, type }: CountryListProps) => {
  const isDark = useRecoilValue<boolean>(isDarkAtom);

  const actionCountry = (index: number, actionType: string) => {
    if (actionType === "delete") {
      removeCountry(index);
    }
    if (
      actionType === "been" ||
      actionType === "like" ||
      actionType === "want"
    ) {
      moveCountry(index, actionType);
    }
    return;
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

  return (
    <CountryListContainer>
      <Subject isDark={isDark}>{subjectTitles[type]}</Subject>
      <CountryList>
        {countries.map((country, index) => {
          if (country.type !== type) return null;

          return (
            <CountryItem key={index}>
              <CountryName isDark={isDark}>{country.name}</CountryName>
              <>
                {ButtonActions[type].map((action, i) => (
                  <button
                    key={i}
                    onClick={() => actionCountry(index, action.actionType)}
                  >
                    {action.emoji}
                  </button>
                ))}
              </>
            </CountryItem>
          );
        })}
      </CountryList>
    </CountryListContainer>
  );
};

export default CcountryList;
