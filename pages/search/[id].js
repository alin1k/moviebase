import Layout from "components/Layout"
import { useRouter } from "next/router";
import { 
    Heading, 
    Container,
    Box,
    SimpleGrid,
    Card, CardBody,
    Image,
    Center, 
    CircularProgress,
    Button,
    HStack, Stack
} from "@chakra-ui/react";
import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "utils/api";
import { buildImageUrl } from "utils/api";

function GenreContent(){
    const router = useRouter();
    const { id, page } = router.query;
    const {data, error} = useSWR(id && `/api/genres?id=${id}&page=${page}`, fetcher);

    if(page === '0') {
        router.push(`/search/${id}&page=1`, undefined, { shallow: true });
    };
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
    if(!data.results?.length){
        return(
            <Center h="full">
                <Heading>Couldn't find any movies from this genre</Heading>
            </Center>
        )
    }

    return(
        <Stack mb='2rem'>
            <Heading as='h1' mb='1rem'>Popular movies from this genre</Heading>
            <SimpleGrid columns={[1, 2, 3, 4]} gap={4}>
                {data.results?.map((val, index)=>
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
                )}
            </SimpleGrid>
            <HStack justify='center' mt='2rem !important'>
                <Button
                disabled={page === '1'}
                onClick={()=>{
                    const nextPage = parseInt(page) - 1;
                    router.push(`/search/${id}?page=${nextPage}`, undefined, { shallow: true })
                }}
                >
                Previous Page
                </Button>
                <Button
                disabled={page >= data.total_pages || parseInt(page) === 500}
                onClick={()=>{
                    const nextPage = parseInt(page) + 1;
                    router.push(`/search/${id}?page=${nextPage}`, undefined, { shallow: true })
                }}
                >
                Next Page
                </Button>
            </HStack>
        </Stack>
    )
}

export default function Page(){
    return (
        <Layout title='Discover movies'>
            <Container h="full">
                <GenreContent />
            </Container>
        </Layout>
    )
}