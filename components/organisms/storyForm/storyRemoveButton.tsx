'use client';

import { Button } from '@/atoms/button';
import { api } from '@/src/utils/api';
import { useMutation } from '@tanstack/react-query';
import React from 'react';

export interface StoryRemoveButtonProps {
  id: number;
}

export default function StoryRemoveButton({ id }: StoryRemoveButtonProps) {
  const mutation = useMutation({
    mutationFn: async () => {
      return await api.fetchData(`/stories/${id}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      alert('remove Success');
    },
    onError: () => {},
  });
  const handleRemove = () => {
    mutation.mutate();
  };
  return (
    <Button variant="outline" onClick={handleRemove}>
      스토리 삭제
    </Button>
  );
}
