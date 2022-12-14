import { 
    Text, 
    Container,
    Center,
    Heading,
    CircularProgress,
    Box,
    Card, CardBody,
    SimpleGrid,
    Image, 
    Button,
} from "@chakra-ui/react"
import Link from "next/link";
import Layout from "components/Layout"
import useSWR from 'swr';
import { fetcher } from "utils/api.js";
import { buildImageUrl } from "utils/api.js";

function WatchListContent(){
    const {data, error} = useSWR('/api/watch-list', fetcher);

    if(error){
        return(
            <Center h="full">
                <Heading as='h2'>Something went wrong. Try again later</Heading>
            </Center>
        ) 
    } 
    if(!data){
        return(
            <Center h="full">
                <CircularProgress isIndeterminate />
            </Center>
        )
    }

    return(
        <Box mb='2rem'>
            <Heading as='h1' textAlign='center' mb='2rem'>Your watch list</Heading>
            {data.length ? 
                <SimpleGrid columns={[1, 2, 3, 4]} gap={4}>
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
            :
                <Center h="full">
                    <Heading size='md'>Try adding some movies and check this page later</Heading>
                </Center>
            }
        </Box>
    )
}

export default function Page(){
    return(
        <Layout title="Watch List">
            <Container h='full'>
                <WatchListContent/>
            </Container>
        </Layout>
    )
}