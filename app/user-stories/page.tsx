import React from 'react';
import StoryDialog from './storyDialog';
import StoryTable from '@/components/molecules/storyTable/storyTable';
import { storyColumns } from '@/components/atoms/storyTable/columns';

export default async function Page() {
  const mock = [
    {
      // id: '01A',
      key: 't01A',
      type: 'story' as 'story' | 'epic' | 'spike',
      title: 'sample',
      point: 0,
    },

    {
      // id: '02A',
      key: 't02A',
      type: 'spike' as 'story' | 'epic' | 'spike',
      title: 'sample',
      point: 0,
    },
    {
      // id: '03A',
      key: 't03A',
      type: 'epic' as 'story' | 'epic' | 'spike',
      title: 'sample',
      point: 0,
    },
  ];

  return (
    <main>
      page
      <StoryDialog />
      <StoryTable data={mock} columns={storyColumns} />
    </main>
  );
}
