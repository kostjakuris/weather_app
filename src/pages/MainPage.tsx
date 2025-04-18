import React from 'react';
import { Container } from '@chakra-ui/react';
import { Header } from '../components/header/Header';
import { toJS } from 'mobx';
import { mobxStore } from '../store/mobx';
import { WeatherComponent } from '../components/weatherComponent/WeatherComponent';

const MainPage = () => {
  // console.log(toJS(mobxStore.weatherData));
  
  return (
    <Container maxWidth='1100px'>
      <Header />
      <WeatherComponent />
    </Container>
  );
};

export default MainPage;