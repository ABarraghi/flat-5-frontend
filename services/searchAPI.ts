import { type RouteInfo } from '@/types/route';
import axios from 'axios';
import { type SearchLoadRequest } from '@/types/request';

export const getSearchLoad = async (requestData: SearchLoadRequest): Promise<RouteInfo[]> => {
  const { data: result } = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/loads/available`, requestData);
  return result?.data?.routes || [];
};
