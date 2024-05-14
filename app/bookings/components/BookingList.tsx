'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getBookingList } from '@/services/bookingAPI';

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
              <TableHead className="text-right">Load ID</TableHead>
              <TableHead className="text-right">Booking ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking: any) => (
              <TableRow key={booking.bookingId}>
                <TableCell>
                  <div className="font-medium">{booking.broker}</div>
                </TableCell>
                <TableCell className="text-right">{booking.loadId}</TableCell>
                <TableCell className="text-right">{booking.bookingId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
