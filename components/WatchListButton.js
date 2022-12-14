import {Button} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useSWR, { mutate, useSWRConfig } from 'swr';
import { fetcher } from 'utils/api';

export default function WatchListButton(){
    let{ id } = useRouter().query;
    const {data} = useSWR(`/api/watch-list/${id}`);

    return(
        <Button
            isLoading={!data}
            colorScheme={data?.found ? 'purple' : 'gray'}
            onClick={async ()=>{
                await mutate(`/api/watch-list/${id}`, async () =>
                    await fetcher(`/api/watch-list/${id}`, {method: data.found ? 'DELETE' : 'POST',}).then(console.log)
                )
            }}
        >
            {data?.found ? 'Remove from watch list' : 'Add to watch list'}
        </Button>
    )
}