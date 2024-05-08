'use server';
import axios from 'axios';

export async function onLogin(values: any): Promise<any> {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`;

  const { data: result } = await axios.post(url, {
    ...values,
  });

  return result?.data;
}
