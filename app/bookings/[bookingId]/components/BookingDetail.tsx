'use client';

import { useEffect, useState } from 'react';
import { Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getBookingDetail, getBookingStatus } from '@/services/bookingAPI';

export default function BookingDetail({ bookingId }: { bookingId: string }) {
  const [booking, setBooking] = useState<any>();
  const [bookingStatus, setBookingStatus] = useState<any>();

  useEffect(() => {
    const fetchBooking = async () => {
      const data = await getBookingDetail({ bookingId });

      setBooking(data);
    };

    fetchBooking();
  }, []);

  if (!booking) return;

  const checkBookingStatus = async () => {
    const bookingStatus = await getBookingStatus({ broker: booking.broker, bookingId: booking.bookingId });

    setBookingStatus(bookingStatus);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">Booking</CardTitle>
          <CardDescription>Broker: Coyote</CardDescription>
          <CardDescription>Broker booking ID: {booking.bookingId}</CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <Button size="sm" variant="outline" className="h-8 gap-1" onClick={checkBookingStatus}>
            <Truck className="h-3.5 w-3.5" />
            <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">Check status</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">Booking Details</div>
          <div className="grid gap-3">
            {bookingStatus && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Status</span>
                <span>{bookingStatus.status}</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Load ID</span>
              <span>{booking.loadId}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          Updated <time dateTime="2023-11-23">just now</time>
        </div>
      </CardFooter>
    </Card>
  );
}
