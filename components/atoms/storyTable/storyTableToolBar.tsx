'use client';

import React from 'react';
import { Table } from '@tanstack/react-table';
import StoryTableFacetedFilter from './storyTableFacetedFilter';
import StoryDialog from '@/app/user-stories/storyDialog';

export interface StoryTableToolBarProps<TData> {
  table: Table<TData>;
}

export default function StoryTableToolBar<TData>({
  table,
}: StoryTableToolBarProps<TData>) {
  return (
    <div className="flex items-center justify-between flex-1 space-x-2">
      <StoryDialog variant="create" text="스토리 만들기" />
      {table.getColumn('type') && (
        <StoryTableFacetedFilter
          column={table.getColumn('type')}
          title="StoryType"
          options={[
            {
              value: 'story',
              label: 'story',
            },
            {
              value: 'epic',
              label: 'epic',
            },
            {
              value: 'spike',
              label: 'spike',
            },
          ]}
        />
      )}
    </div>
  );
}
