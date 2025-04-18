import React, { FormEvent, useState } from 'react';
import { Box, Button, Flex, Heading, Image, Input, Text } from '@chakra-ui/react';
import { errorText, input, titleOne } from '../../asserts/globalStyles';
import { getCoordinates } from '../../pages/api';
import { mobxStore } from '../../store/mobx';
import { observer } from 'mobx-react-lite';

const HeaderComponent = () => {
  const [cityName, setCityName] = useState<string>('');
  const [isInputEmpty, setIsInputEmpty] = useState<boolean>(false);
  
  const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!cityName) {
      setIsInputEmpty(true);
    } else {
      await getCoordinates(cityName);
      setCityName('');
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(event.target.value);
    if (!event.target.value) {
      setIsInputEmpty(true);
    } else {
      setIsInputEmpty(false);
    }
  };
  
  return (
    <Box>
      <Flex justifyContent='space-between' align={'center'} pt={'50px'}>
        <Heading as={'h1'} css={{...titleOne}}>WeatherApp</Heading>
        <form onSubmit={handleSubmit}>
          <Flex align={'center'}>
            <Input
              variant={'outline'}
              mr={'20px'}
              placeholder={'Enter city name'}
              borderColor={isInputEmpty ? 'red.500' : 'white'}
              css={{...input}}
              type={'text'}
              value={cityName}
              onChange={(event) => handleChange(event)}
              onBlur={(event) => setIsInputEmpty(false)}
            />
            <Button type={'submit'} background={'white'} width={'55px'} height={'55px'} borderRadius={'50%'}>
              <Image objectFit={'contain'} width={'55px'} height={'30px'} src={'/images/search.svg'} alt={'search'} />
            </Button>
          </Flex>
          {
            isInputEmpty ?
              <Text css={{...errorText}}>City name required</Text>
              : null
          }
        </form>
      </Flex>
    </Box>
  );
};

export const Header = observer(HeaderComponent);