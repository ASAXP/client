import React from 'react';
import StoryTable from '@/components/molecules/storyTable/storyTable';
import { storyColumns } from '@/components/atoms/storyTable/columns';
import { api } from '@/src/utils/api';

type TStory = {
  storyID: number;
  type: 'story' | 'epic' | 'spike';
  title: string;
  point: number;
};

export default async function Page() {
  const stories = await api.fetchData<TStory[]>('/stories', {
    cache: 'no-cache',
  });
  return (
    <main className="p-4">
      <h1 className="text-4xl pb-6">백로그</h1>
      <StoryTable data={stories} columns={storyColumns} />
    </main>
  );
}
