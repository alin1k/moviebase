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
  Show,
  Button,
  HStack
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
        <Heading size='md'>Something went wrong</Heading>
      </Center>
    )
  }
  if(!data){
    return(
      <Center h='full'>
        <CircularProgress isIndeterminate />
      </Center>
    )
  }

  return(
    <Box mb='2rem'>
      <Heading as='h1' textAlign='center' mb='2rem'>Recommended based on movies you watched</Heading>
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

export default function Home() {
  return (
    <Layout title="Homepage">
      <Container h="full">
        <DiscoverGenres/>
      </Container>
    </Layout>
  );
}
