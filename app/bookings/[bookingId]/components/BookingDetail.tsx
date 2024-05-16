'use client';

import { useEffect, useState } from 'react';
import { Truck } from 'lucide-react';
import dayjs from 'dayjs';
import { getBookingDetail, getBookingStatus } from '@/services/bookingAPI';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import StopPointsTable from './StopPointsTable';
import LoadsTable from './LoadsTable';
import { roundStringToNumber } from '@/utils/common';
import CarrierLogo from '@/app/routes/components/common/CarrierLogo';

const Detail = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{title}</span>
      <span>{value}</span>
    </div>
  );
};

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
      <CardHeader className="flex flex-row items-center bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            <CarrierLogo name={booking.broker} /> Booking {booking.broker}
          </CardTitle>
          {bookingStatus && <CardDescription>Status: {bookingStatus.status}</CardDescription>}
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
            <Detail title="Type" value={booking.loadData.type} />
            <Detail title="Broker booking ID" value={booking.bookingId} />
            <Detail title="Load ID" value={booking.loadId} />
            <Detail title="Amount" value={`${booking.loadData.amount} ${booking.loadData.currency}`} />
            <Detail
              title="Distance"
              value={`${roundStringToNumber(booking.loadData.distance)} ${booking.loadData.distanceUnit}`}
            />
          </div>
        </div>
        {booking.loadData && (
          <>
            <Separator className="my-4" />
            <div className="grid gap-3">
              <div className="font-semibold">Stop points</div>
              <div className="grid gap-3">
                <StopPointsTable booking={booking} />
              </div>
            </div>

            <Separator className="my-4" />
            <div className="grid gap-3">
              <div className="font-semibold">Loads</div>
              <div className="grid gap-3">
                <LoadsTable booking={booking} />
              </div>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="block border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          Created at <time dateTime="2023-11-23">{dayjs(booking.createdAt).format('MM/DD/YYYY HH:mm')}</time>
        </div>
        <div className="text-xs text-muted-foreground">
          Updated at <time dateTime="2023-11-23">{dayjs(booking.updatedAt).format('MM/DD/YYYY HH:mm')}</time>
        </div>
      </CardFooter>
    </Card>
  );
}
