// import "./App.css";
import styled from "@emotion/styled";

const Container = styled.div`
  background-color: #ededed;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WeatherCard = styled.div`
  min-width: 360px;
  box-shadow: 0 1px 3px 0 #999999;
  background-color: #f9f9f9;
`;

function App() {
  return (
    <Container>
      <WeatherCard></WeatherCard>
    </Container>
  );
}

export default App;
