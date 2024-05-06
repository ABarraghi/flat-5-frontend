import axios from 'axios';
import { type BookLoadRequest } from '@/types/request';
import { type BrokerName } from '@/types/common';

export const submitBookingRequest = async ({ requestData }: { requestData: BookLoadRequest }): Promise<any> => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/loads/book`;

  const { data: result } = await axios.post(url, requestData);

  return result?.data;
};

export const getBookingStatus = async ({
  broker,
  bookingId,
}: {
  broker: BrokerName;
  bookingId: string;
}): Promise<any> => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/bookings/${broker}/${bookingId}/status`;

  const { data: result } = await axios.get(url);

  return result?.data;
};