import React, { useEffect } from 'react';
import { Button, Flex, Image, Text } from '@chakra-ui/react';
import { mobxStore } from '../../store/mobx';
import { observer } from 'mobx-react-lite';
import { bodyText, titleOne, updateButton, weatherComponent } from '../../asserts/globalStyles';
import { FadeLoader } from 'react-spinners';
import { getWeather } from '../../pages/api';

const WeatherData = () => {
  const weatherIconCode = mobxStore.weatherData?.current.weather[0].icon;
  const weatherDescription = mobxStore.weatherData?.current.weather[0].main;
  const latitude = mobxStore.weatherData?.lat;
  const longitude = mobxStore.weatherData?.lon;
  
  const countTimeDifference = () => {
    const [targetHour, targetMinute] = mobxStore.updateTime.split(':').map(Number);
    const currentTime = new Date();
    const targetTime = new Date();
    targetTime.setHours(targetHour, targetMinute, 0, 0);
    const dif = Number(currentTime) - Number(targetTime);
    return Math.floor(dif / 60000);
  };
  
  useEffect(() => {
    const timeDifference = countTimeDifference();
    
    if (timeDifference >= 5) {
      getWeather(Number(latitude), Number(longitude));
    }
  }, [latitude, longitude]);
  
  if (mobxStore.isLoading) {
    return (
      <Flex justifyContent={'center'} align={'center'} height={'73vh'}>
        <FadeLoader height={20} color={'white'} loading />
      </Flex>
    );
  }
  
  if (mobxStore.wrongCity) {
    return (
      <Flex justifyContent={'center'} align={'center'} height={'73vh'}>
        <Text css={{...titleOne}} color={'red.500'}>City not found</Text>
      </Flex>
    );
  }
  
  if (mobxStore.weatherData) {
    return (
      <Flex css={{...weatherComponent}} justifyContent={'center'} align={'center'} direction={'column'}>
        <Text css={{...bodyText}}>{mobxStore.currentCity}</Text>
        <Image
          src={weatherDescription === 'Clear' ? '/images/sunny.svg' :
            `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`}
          alt={' weather'}
        />
        <Text css={{...bodyText}}>{mobxStore.weatherData?.current.temp}°C</Text>
        <Text css={{...bodyText}}>{weatherDescription}</Text>
        <Flex pt={'60px'} width={'100%'} justifyContent={'flex-end'} align={'center'}>
          <Text css={{...bodyText}} mr={'20px'}>{mobxStore.updateTime}</Text>
          <Button
            css={{...updateButton}}
            onClick={async() => await getWeather(Number(latitude), Number(longitude))}>
          </Button>
        </Flex>
      </Flex>
    );
  }
  
  return (
    <Flex justifyContent={'center'} align={'center'} height={'73vh'}>
      <Text css={{...bodyText}}>Please, enter your favorite city name in the form above</Text>
    </Flex>
  );
  
};

export const WeatherComponent = observer(WeatherData);