import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';
import useSWR from 'swr';
import { buildImageUrl } from 'utils/api';
import {
  Badge,
  Box,
  Button,
  Center,
  CircularProgress,
  Container,
  Heading,
  HStack,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/react';
import Layout from 'components/Layout';
import MovieButtons from 'components/MovieButtons';
import Link from 'next/link';

const MovieContent = () => {
  const { id } = useRouter().query;
  const { data, error } = useSWR(id && `/api/movies/${id}`);

  if (error) {
    return (
      <Text color="red">
        Error fetching movie with ID {id}: {JSON.stringify(error)}
      </Text>
    );
  }
  if (!data) {
    return (
      <Center h="full">
        <CircularProgress isIndeterminate />
      </Center>
    );
  }
  if (data.success === false) {
    return <Text color="red">{data.status_message}</Text>;
  }
  return (
    <Stack direction={['column', 'row']} spacing={4}>
      <Head>
        <title>{data.title}</title>
      </Head>
      <Box minW="300px" pos="relative">
        <Image
          src={buildImageUrl(data.poster_path, 'w300')}
          alt="Movie poster"
          layout="responsive"
          width="300"
          height="450"
          objectFit="contain"
          unoptimized
        />
      </Box>
      <Stack>
        <HStack justify="space-between">
          <Heading as="h2">{data.title}</Heading>
          <Box>
            <Tag colorScheme="purple" variant="solid">
              {data.release_date}
            </Tag>
          </Box>
        </HStack>
        <Box>{data.tagline}</Box>

        <Stack direction="row">
          {data.genres?.map((genre) => (
            <Link passHref legacyBehavior key={genre.id} href={`/search/${genre.id}?page=1`}>
              <Badge colorScheme="purple" variant="outline"  _hover={{ cursor: 'pointer' }}>
                {genre.name}
              </Badge>
            </Link>
          ))}
        </Stack>
        <Text>Rating: <Badge colorScheme={data.vote_average > 8 ? 'green' : data.vote_average > 5 ? 'yellow' : 'red'} variant="solid" fontSize='1rem'>{data.vote_average}</Badge></Text>
        <Text>Runtime: {data.runtime} min</Text>
        <Box>{data.overview}</Box>
        {data.status === 'Released'?
          <MovieButtons/>
        :
          <Heading color={'red.600'}>THIS MOVIE IS UNRELEASED</Heading>
        }
      </Stack>
    </Stack>
  );
};

export default function Movie() {
  return (
    <Layout>
      <Container h="full">
        <MovieContent />
      </Container>
    </Layout>
  );
}
