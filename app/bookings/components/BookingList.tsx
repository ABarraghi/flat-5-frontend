'use client';

import { useEffect, useState } from 'react';
import { Truck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { getBookingList } from '@/services/bookingAPI';
import Link from 'next/link';

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
              <TableHead className="text-right">Broker booking ID</TableHead>
              <TableHead className="text-right">Detail</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking: any) => (
              <TableRow key={booking._id}>
                <TableCell>
                  <div className="font-medium">{booking.broker}</div>
                </TableCell>
                <TableCell className="text-right">{booking.loadId}</TableCell>
                <TableCell className="text-right">{booking.bookingId}</TableCell>
                <TableCell className="text-right">
                  <Button variant="link">
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
