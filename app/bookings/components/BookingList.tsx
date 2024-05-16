'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Truck } from 'lucide-react';
import dayjs from 'dayjs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { getBookingList } from '@/services/bookingAPI';
import CarrierLogo from '@/app/routes/components/common/CarrierLogo';

export default function BookingList() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const data = await getBookingList();

      setBookings(data);
    };

    fetchBookings();
  }, []);

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Bookings</CardTitle>
        <CardDescription>Recent bookings</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Broker</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Distance</TableHead>
              <TableHead className="text-right">Stop points</TableHead>
              <TableHead className="text-right">Created at</TableHead>
              <TableHead className="text-right">Broker booking ID</TableHead>
              <TableHead className="text-right">Detail</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking: any) => (
              <TableRow key={booking._id}>
                <TableCell className="flex gap-x-2 font-medium">
                  <CarrierLogo name={booking.broker} /> {booking.broker}
                </TableCell>
                <TableCell className="text-right">
                  {Math.round(booking.loadData.amount)} {booking.loadData.currency}
                </TableCell>
                <TableCell className="text-right">
                  {Math.round(booking.loadData.distance)} {booking.loadData.distanceUnit}
                </TableCell>
                <TableCell className="text-right">{booking.loadData.stopPoints.length}</TableCell>
                <TableCell className="text-right">{dayjs(booking.createdAt).format('MM/DD/YYYY HH:mm')}</TableCell>
                <TableCell className="text-right">{booking.bookingId}</TableCell>
                <TableCell className="text-right">
                  <Button variant="link" className="p-0">
                    <Link href={`/bookings/${booking._id}`}>
                      <Truck />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
