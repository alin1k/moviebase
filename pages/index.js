import { 
  Center, 
  Container, 
  Heading, 
  CircularProgress,
  Text,
  Box,
  SimpleGrid,
  Card, CardBody,
  Image,
  Button,
  HStack,
  VStack
} from '@chakra-ui/react';
import Link from 'next/link';
import Layout from 'components/Layout';
import useSWR from 'swr';
import { fetcher } from 'utils/api';
import { buildImageUrl } from 'utils/api';
import { useState } from 'react';

function DiscoverGenres(){
  const {data, error} = useSWR('/api/genres', fetcher);
  const [display, setDisplay] = useState(8);

  if(error){
    return(
      <Center h='full'>
        <Heading size='md'>Something went wrong with you recomendations</Heading>
      </Center>
    )
  }
  if(!data){
    return(
      <Center h='full' mb='2rem'>
        <VStack>
          <CircularProgress isIndeterminate />
          <Text>Recommendations are loading...</Text>
        </VStack>
      </Center>
    )
  }

  return(
    <Box>
      <Heading as='h1' mb='2rem'>Recommended movies</Heading>
      <SimpleGrid columns={[1, 2, 3, 4]} gap={4} mb='2rem'>
        {data?.map((val, index)=>
            index < display ?
            <Link href={`/movies/${val.id}`} passHref legacyBehavior key={val.id} >
                <Card boxShadow='md' textAlign="center" style={{cursor: 'pointer'}} _hover={{bg: 'purple.500'}}>
                    <CardBody>
                        <Image
                        src={buildImageUrl(val.poster_path)}
                        alt={val.title + " poster image"}
                        />
                        <Heading my="1rem" size="md">{val.title}</Heading>
                    </CardBody>
                </Card>
            </Link>
            :
            null
        )}
      </SimpleGrid>
      <HStack justify='center'>
        <Button
          disabled={display === data.length}
          onClick={()=>{
            if(display+5 > data.length){
              setDisplay(data.length);
            }else{
              setDisplay(prev=>prev+8);
            }
          }}
        >See more</Button>
      </HStack>
    </Box>
  )
}

function WatchList(){
  let {data, error} = useSWR('/api/watch-list?count=4', fetcher);

    if(error){
        return(
            <Center h="full">
                <Heading as='h2'>Something went wrong. Try again later</Heading>
            </Center>
        ) 
    } 
    if(!data){
        return(
          <VStack>
            <CircularProgress isIndeterminate />
            <Text>Watch list is loading...</Text>
          </VStack>
        )
    }

    return(
        <Box>
          {data.length ? 
            <Box mb='2rem'>
            <Heading as='h1' mb='2rem'>Watch the movies you saved</Heading>
              <SimpleGrid columns={[1, 2, 3, 4]} gap={4} mb='2rem'>
                  {data.map(val=>
                      <Link href={`/movies/${val.id}`} passHref legacyBehavior key={val.id}>
                          <Card boxShadow='md' textAlign="center" style={{cursor: 'pointer'}} _hover={{bg: 'purple.500'}}>
                              <CardBody>
                                  <Image
                                  src={buildImageUrl(val.poster)}
                                  alt={val.title + " poster image"}
                                  />
                                  <Heading my="1rem" size="md">{val.title}</Heading>
                              </CardBody>
                          </Card>
                      </Link>
                  )}
              </SimpleGrid>
            </Box>
          :
              null
          }
        </Box>
    )
}

export default function Home() {
  return (
    <Layout title="Homepage">
      <Container h="full">
        <VStack>
          <Text fontSize='8xl' fontWeight='extrabold'
            bgGradient='linear(180deg, rgba(128,90,213,1) 40%, rgba(252,70,236,1) 100%)'
            bgClip='text'
          >MOVIEBASE</Text>
          <DiscoverGenres/>
          <WatchList/>
        </VStack>
      </Container>
    </Layout>
  );
}
