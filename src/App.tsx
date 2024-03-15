import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { Play } from "./components/play";
import { Time } from "./components/time";

import styled from "styled-components";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function App() {
  return (
    <AppContainer>
      <Header />
      <Time />
      <Play />
      <Footer />
    </AppContainer>
  );
}
