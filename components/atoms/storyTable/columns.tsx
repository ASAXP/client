'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/atoms/badge';
import { Checkbox } from '@/components/atoms/checkbox';

type Story = {
  type: 'story' | 'epic' | 'spike';
  title: string;
  point: number;
};

export const storyColumns: ColumnDef<Story>[] = [
  {
    id: 'select',
    accessorKey: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select Row"
        className="translate-y-[2px]"
      />
    ),
  },
  {
    id: 'type',
    accessorKey: 'type',
    header: () => <div>Type</div>,
    cell: ({ row }) => (
      <div className="flex space-x-2">{row.getValue('type')}</div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: 'title',
    accessorKey: 'title',
    header: () => <div>Title</div>,
    cell: ({ row }) => (
      <div className="flex space-x-2">{row.getValue('title')}</div>
    ),
  },
  {
    id: 'point',
    accessorKey: 'point',
    header: () => <div>point</div>,
    cell: ({ row }) => <div>{row.getValue('point')}</div>,
  },
];
