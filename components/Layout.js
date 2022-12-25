import Head from 'next/head';
import Link from 'next/link';
import {
  Box,
  Heading,
  Button,
  Container,
  useDisclosure,
  HStack,
  Stack,
  Spacer,
  VStack,
  Grid,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

const MenuItem = ({ href, children, ...props }) => (
  <Link href={href} passHref legacyBehavior>
    <Button as="a" variant="link" {...props}>
      {children}
    </Button>
  </Link>
);

function Header() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box bg="purple.500">
      <Container>
        <Stack
          as="nav"
          direction={['column', , 'row']}
          justify="space-between"
          wrap="wrap"
          py="1rem"
        >
          <HStack justify="space-between">
            <MenuItem href="/" mr={8}  _hover={{ color: 'purple.300' }}>
              <Heading size="lg">Moviebase</Heading>
            </MenuItem>

            <Box display={['block', , 'none']} onClick={onToggle}>
              <Button variant="outline">
                <HamburgerIcon />
              </Button>
            </Box>
          </HStack>

          <Stack
            direction={['column', , 'row']}
            justify="start"
            align={['start', , 'center']}
            display={[isOpen ? 'flex' : 'none', , 'flex']}
            spacing={10}
          >
            <MenuItem href="/search" _hover={{ color: 'purple.300' }}>Search</MenuItem>
            <MenuItem href="/watch-list" _hover={{ color: 'purple.300' }}>
              Watch List
            </MenuItem>
            <MenuItem href="/history" _hover={{ color: 'purple.300' }}>
              Watched movies
            </MenuItem>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        {title && <title>{title}</title>}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid minH="100vh">
        <VStack w="full" align="stretch" spacing={8}>
          <Header />
          <Box as="main" h="full">
            {children}
          </Box>
        </VStack>
      </Grid>
    </>
  );
}
