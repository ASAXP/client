'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/atoms/checkbox';
import StoryDialog from '@/app/user-stories/storyDialog';
import StoryRemoveButton from '@/components/organisms/storyForm/storyRemoveButton';

type Story = {
  storyID: number;
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
    id: 'storyID',
    accessorKey: 'storyID',
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
  {
    id: 'edit',
    accessorKey: 'edit',
    cell: ({ row }) => {
      const id: number = row.getValue('storyID');
      const type = row.getValue('type') as 'story' | 'epic' | 'spike';
      const title = row.getValue('title') as string;
      const point = row.getValue('point') as number;
      return (
        <div className="flex gap-2">
          <StoryDialog
            storyID={id}
            text="스토리 수정하기"
            type={type}
            title={title}
            point={point}
            progress="ready"
            variant="edit"
          />
          <StoryRemoveButton id={id} />
        </div>
      );
    },
  },
];
