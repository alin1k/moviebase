import {Button, HStack, Box} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useSWR, { useSWRConfig } from 'swr';
import { fetcher } from 'utils/api';

function WatchListButton(){
    let{ id } = useRouter().query;
    const {data} = useSWR(`/api/watch-list/${id}`);
    const {data: history} = useSWR(`/api/history/${id}`);
    const { mutate } = useSWRConfig();

    return(
        <Box>
            {! history?.found ? 
                <Button
                    isLoading={!data}
                    colorScheme={data?.found ? 'purple' : 'gray'}
                    onClick={async ()=>{
                        await mutate(`/api/watch-list/${id}`, async () =>
                            await fetcher(`/api/watch-list/${id}`, {method: data.found ? 'DELETE' : 'POST',})
                        )
                    }}
                >
                    {data?.found ? 'Remove from watch list' : 'Add to watch list'}
                </Button>
            :
                null
            }
        </Box>
    )
}

function HistoryButton() {
    let{ id } = useRouter().query;
    const { data } = useSWR(`/api/history/${id}`);
    const { mutate } = useSWRConfig();
  
    return(
      <Button
          isLoading={!data}
          colorScheme={data?.found ? 'purple' : 'gray'}
          onClick={async ()=>{
              await mutate(`/api/history/${id}`, async () =>
                  await fetcher(`/api/history/${id}`, {method: data.found ? 'DELETE' : 'POST',})
              ).then(async ()=>{
                if(!data.found){
                    await mutate(`/api/watch-list/${id}`, async () =>
                        await fetcher(`/api/watch-list/${id}`, {method: 'DELETE',})
                    )
                }
              })
          }}
      >
          {data?.found ? 'Remove from watched movies' : 'Add to watched movies'}
      </Button>
  )
  }

export default function MovieButtons(){
    return(
        <HStack>
          <WatchListButton/>
          <HistoryButton />
        </HStack>
    )
}