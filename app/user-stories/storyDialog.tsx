'use client';

import { Button } from '@/components/atoms/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/atoms/dialog';
import StoryForm from '@/components/organisms/storyForm/storyForm';
import { TStoryEntity } from '@/src/entities/storySchema';
import React from 'react';

export interface StoryDialogProps extends TStoryEntity {
  storyID?: number;
  text: string;
  variant: 'create' | 'edit';
}

export default function StoryDialog({
  storyID,
  text,
  type,
  title,
  point,
  variant,
}: Partial<StoryDialogProps>) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{text}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>User Story</DialogTitle>
        <DialogDescription>사용자 스토리를 생성/수정 합니다</DialogDescription>
        <StoryForm
          id={storyID}
          variant={variant}
          type={type}
          title={title}
          point={point}
        />
      </DialogContent>
    </Dialog>
  );
}
