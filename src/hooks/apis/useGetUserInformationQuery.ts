import { getUserInformation } from '@/apis/client/getUserInformation';
import { useQuery } from '@tanstack/react-query';

export const useGetUserInformationQuery = () => {
  const { data, isError, isFetching, error } = useQuery({
    queryKey: ['userInformation'],
    queryFn: getUserInformation,
  });
  if (data) {
    const { data: userInformation } = data;
    return { userInformation, isError, error, isFetching };
  }
  return { userInformation: undefined, isError, error, isFetching };
};
