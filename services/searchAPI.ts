import { type RouteInfo } from '@/types/route';
import axios from 'axios';
import { type SearchLoadRequest } from '@/types/request';

export const getSearchLoad = async (requestData: SearchLoadRequest, routeOption: string): Promise<RouteInfo[]> => {
  let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/loads/standard`;

  if (routeOption === 'enRoute') {
    url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/loads/en-route`;
  } else if (routeOption === 'routeMyTruck') {
    url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/loads/route-my-truck`;
  }

  const { data: result } = await axios.post(url, requestData);

  return result?.data?.routes || [];
};
