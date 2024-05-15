import Layout from '@/components/layout';
import BookingDetail from './components/BookingDetail';

export default async function Booking({ params }: { params: { bookingId: string } }) {
  return (
    <Layout>
      <BookingDetail bookingId={params.bookingId} />
    </Layout>
  );
}
