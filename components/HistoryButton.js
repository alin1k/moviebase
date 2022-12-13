import { CalendarIcon } from '@chakra-ui/icons';
import { IconButton, Tooltip } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useSWR, { useSWRConfig } from 'swr';
import { fetcher } from 'utils/api';

export default function HistoryButton() {
  let{ id } = useRouter().query;
  const { data } = useSWR(`/api/history/${id}`);
  const { mutate } = useSWRConfig();

  return (
    <Tooltip label={data?.found ? 'Remove from wathecd movies' : 'Add to wathecd movies'}>
      <IconButton
        isLoading={!data}
        colorScheme={data?.found ? 'purple' : 'gray'}
        size="sm"
        onClick={async () => {
          await mutate(`/api/history/${id}`, async () =>
            await fetcher(`/api/history/${id}`, {
              method: data.found ? 'DELETE' : 'PUT',
            })
          );
        }}
      >
        <CalendarIcon />
      </IconButton>
    </Tooltip>
  );
}
