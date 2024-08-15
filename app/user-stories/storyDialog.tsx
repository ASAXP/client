'use client';

import { Button } from '@/components/atoms/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/atoms/dialog';
import StoryForm from '@/components/organisms/storyForm/storyForm';
import React from 'react';

export default function StoryDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Story</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>User Story</DialogHeader>
        <StoryForm />
      </DialogContent>
    </Dialog>
  );
}
