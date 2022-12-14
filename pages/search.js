import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useSWR from 'swr';
import {
  Input,
  IconButton,
  Container,
  UnorderedList,
  ListItem,
  Progress,
  Text,
  InputGroup,
  InputRightElement,
  VStack,
  Button,
  Badge,
  SimpleGrid,
  Card,
  CardBody,
  Image,
  Box,
  Stack,
  Heading,
  HStack
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import Layout from 'components/Layout';
import {buildImageUrl} from 'utils/api.js'
import { disconnect } from 'mongoose';

function SearchBar() {
  const router = useRouter();
  const { terms } = router.query;
  const [text, setText] = useState('');

  // Update text input when route changes (ex when user goes back/forward)
  useEffect(() => {
    setText(terms || '');
  }, [terms]);

  // Update router history if a search was performed
  const handleSearch = (event) => {
    event.preventDefault();
    if (text !== terms) {
      router.push(`/search/?terms=${text}&page=1`, undefined, { shallow: true });
    }
  };

  return (
    <InputGroup as="form" onSubmit={handleSearch}>
      <Input
        placeholder="Search for a movie..."
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <InputRightElement>
        <IconButton
          aria-label="Search for a movie"
          icon={<SearchIcon />}
          type="submit"
        />
      </InputRightElement>
    </InputGroup>
  );
}

function SearchResults() {
  const router = useRouter();
  const { terms, page } = router.query;
  const { data, error } = useSWR(terms && `/api/search?terms=${terms}&page=${page}`);

  if (!terms) {
    return <Text>Type some terms and submit for a quick search</Text>;
  }
  if (error) {
    return (
      <Text color="red">
        Error fetching movies for {terms}: {JSON.stringify(error)}
      </Text>
    );
  }
  if (!data) {
    return <Progress size="xs" isIndeterminate />;
  }
  if(page==='0') {
    router.push(`/search/?terms=${terms}&page=1`, undefined, { shallow: true });
  };
  if (!data.results?.length) {
    return <Text>No results</Text>;
  }
  return (
    <Stack>
      <SimpleGrid columns={[2, 3, 4, 5]} gap={4} mb='2rem'>
        {data.results.map(({ id, title, release_date, poster_path, vote_average }) => (
            <Link href={`/movies/${id}`} passHref legacyBehavior key={id}>
              <Card boxShadow='md' textAlign="center" style={{cursor: 'pointer'}} _hover={{bg: 'purple.500'}}>
                <CardBody>
                  {poster_path !== null?
                    <Image
                      src={buildImageUrl(poster_path)}
                    />
                  :
                    null
                  }
                  <Heading size={['sm', 'md']} my='1rem'>{(title.length > 25) ? title.slice(0, 25-1) + '...' : title}</Heading>
                  <Text>Rating: <Badge colorScheme="green" variant="outline">{vote_average}</Badge></Text>
                </CardBody>
              </Card>
            </Link>
        ))}
      </SimpleGrid>

      <HStack justify='center'>
        <Button
          disabled={page === '1'}
          onClick={()=>{
            const nextPage = parseInt(page) - 1;
            router.push(`/search/?terms=${terms}&page=${nextPage}`, undefined, { shallow: true })
          }}
        >
          Previous Page
        </Button>
        <Button
          disabled={page >= data.total_pages}
          onClick={()=>{
            const nextPage = parseInt(page) + 1;
            router.push(`/search/?terms=${terms}&page=${nextPage}`, undefined, { shallow: true })
          }}
        >
          Next Page
        </Button>
      </HStack>
    </Stack>
  );
}

export default function Search() {
  return (
    <Layout title="Search">
      <Container>
        <VStack spacing={4} align="stretch" mb='2rem'>
          <SearchBar />
          <SearchResults />
        </VStack>
      </Container>
    </Layout>
  );
}
