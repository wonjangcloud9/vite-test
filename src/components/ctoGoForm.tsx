import { useForm } from "react-hook-form";
import { useState, FormEvent } from "react";

interface CToGoFormProps {
  countries: { name: string; type: string }[];
  setCountries: (countries: { name: string; type: string }[]) => void;
  setLocalStorage: (key: string, value: string) => void;
}

const CToGoForm = ({
  countries,
  setCountries,
  setLocalStorage,
}: CToGoFormProps) => {
  const [errorText, setErrorText] = useState<string>("");
  const countryInput = useForm();

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
  );
};

export default CToGoForm;
