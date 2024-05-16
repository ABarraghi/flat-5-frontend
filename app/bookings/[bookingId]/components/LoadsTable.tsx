import dayjs from 'dayjs';
import { ArrowRight, CircleCheck, CircleOff } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { roundStringToNumber } from '@/utils/common';

export default function LoadsTable({ booking }: { booking: any }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Load ID</TableHead>
          <TableHead className="text-right">Broker</TableHead>
          <TableHead className="text-right">Mode</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-right">Distance</TableHead>
          <TableHead className="text-right">Weight</TableHead>
          <TableHead className="text-right">Origin deadhead</TableHead>
          <TableHead className="text-right">Rate</TableHead>
          <TableHead className="text-right">Pickup stop</TableHead>
          <TableHead className="text-right">Delivery stop</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {booking.loadData.loads.map((load: any) => (
          <TableRow key={load.loadId}>
            <TableCell className="font-medium">{load.loadId}</TableCell>
            <TableCell className="text-right">{load.broker}</TableCell>
            <TableCell className="text-right">{load.loadDetails.mode}</TableCell>
            <TableCell className="text-right">
              {Math.round(load.amount)} {load.currency}
            </TableCell>
            <TableCell className="text-right">
              {Math.round(load.distance)} {load.distanceUnit}
            </TableCell>
            <TableCell className="text-right">
              {load.weight} {load.weightUnit}
            </TableCell>
            <TableCell className="text-right">{roundStringToNumber(load.originDeadhead)}</TableCell>
            <TableCell className="text-right">{roundStringToNumber(load.rate)}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end">
                {dayjs(load.pickupStop.appointment.startTime).format('MM/DD/YYYY HH:mm')} <ArrowRight className="w-4" />
                {dayjs(load.pickupStop.appointment.endTime).format('MM/DD/YYYY HH:mm')}
              </div>
              {load.pickupStop.address}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end">
                {dayjs(load.deliveryStop.appointment.startTime).format('MM/DD/YYYY HH:mm')}{' '}
                <ArrowRight className="w-4" />
                {dayjs(load.deliveryStop.appointment.endTime).format('MM/DD/YYYY HH:mm')}
              </div>
              {load.deliveryStop.address}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
