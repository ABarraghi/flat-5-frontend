import dayjs from 'dayjs';
import { CircleCheck, CircleOff } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function StopPointsTable({ booking }: { booking: any }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>City</TableHead>
          <TableHead>State</TableHead>
          <TableHead>Country</TableHead>
          <TableHead>Load</TableHead>
          <TableHead>Radius</TableHead>
          <TableHead>From</TableHead>
          <TableHead>To</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {booking.loadData.stopPoints.map((stopPoint: any, index: number) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{stopPoint.location.city}</TableCell>
            <TableCell>{stopPoint.location.state}</TableCell>
            <TableCell>{stopPoint.location.country}</TableCell>
            <TableCell>
              {stopPoint.hadLoad ? <CircleCheck className="text-green-500" /> : <CircleOff className="text-red-500" />}
            </TableCell>
            <TableCell>
              {stopPoint.radius} {stopPoint.unit}
            </TableCell>
            <TableCell>{dayjs(stopPoint.stopDate.from).format('MM/DD/YYYY HH:mm')}</TableCell>
            <TableCell>{dayjs(stopPoint.stopDate.to).format('MM/DD/YYYY HH:mm')}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
