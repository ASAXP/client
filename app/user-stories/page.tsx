import React from 'react';
import StoryDialog from './storyDialog';
import StoryTable from '@/components/molecules/storyTable/storyTable';
import { storyColumns } from '@/components/atoms/storyTable/columns';
import { api } from '@/src/utils/api';

type TStory = {
  type: 'story' | 'epic' | 'spike';
  title: string;
  point: number;
};

export default async function Page() {
  const stories = await api.get<TStory[]>('/stories');
  return (
    <main>
      page
      <StoryDialog />
      <StoryTable data={stories} columns={storyColumns} />
    </main>
  );
}
