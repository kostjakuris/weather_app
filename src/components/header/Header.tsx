import React, { FormEvent, useState } from 'react';
import { Box, Button, Flex, Heading, Image, Input } from '@chakra-ui/react';
import { input, titleOne } from '../../asserts/globalStyles';
import { getCoordinates } from '../../pages/api';

const Header = () => {
  const [cityName, setCityName] = useState<string>('');
  const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await getCoordinates(cityName);
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
              css={{...input}}
              type={'text'}
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
            />
            <Button type={'submit'} background={'white'} width={'55px'} height={'55px'} borderRadius={'50%'}>
              <Image objectFit={'contain'} width={'55px'} height={'30px'} src={'/images/search.svg'} alt={'search'} />
            </Button>
          </Flex>
          {/*<Text>City name required</Text>*/}
        </form>
      </Flex>
    </Box>
  );
};

export default Header;