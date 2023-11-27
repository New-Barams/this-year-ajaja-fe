import { getUserInformation } from '@/apis/client/getUserInformation';
import { useQuery } from '@tanstack/react-query';

export const useGetUserInformationQuery = () => {
  const { data, isError, isFetching, error } = useQuery({
    queryKey: ['userInformation'],
    queryFn: getUserInformation,
    staleTime: Infinity,
  });

  return { userInformation: data!.data.data, isError, error, isFetching };
};
