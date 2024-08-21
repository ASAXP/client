'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/atoms/form';
import { useToast } from '@/components/atoms/use-toast';
import { Button } from '@/components/atoms/button';
import { z } from 'zod';
import { Input } from '@/components/atoms/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
  SelectGroup,
} from '@/components/atoms/select';
import { api } from '@/src/utils/api';
import { revalidatePath } from 'next/cache';

const storyFormSchema = z.object({
  type: z.enum(['story', 'spike', 'epic']),
  title: z.string().min(1, '스토리에는 타이틀을 입력해야 합니다.'),
  point: z
    .union([z.string(), z.number()])
    .pipe(
      z.coerce
        .number()
        .min(0, { message: '스토리 포인트는 0 이상이어야 합니다.' })
        .max(10, { message: '스토리 포인트는 10 이하여야 합니다.' }),
    ),
});

type TStoryForm = z.infer<typeof storyFormSchema> & {
  id?: number;
  variant: 'create' | 'edit';
};

export default function StoryForm({
  id,
  type,
  title,
  point,
  variant,
}: Partial<TStoryForm>) {
  const { toast } = useToast();
  const form = useForm<TStoryForm>({
    mode: 'onChange',
    resolver: zodResolver(storyFormSchema),
    defaultValues: {
      type: type ?? 'story',
      title: title ?? '',
      point: point ?? 1,
    },
  });

  const onSubmit = async (data: TStoryForm) => {
    if (variant === 'create') {
      await api.fetchData(`/stories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } else if (variant === 'edit') {
      await api.fetchData(`/stories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } else {
      throw Error('invalid data');
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid items-end gap-4"
        data-testid="story-form"
      >
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select
                name={field.name}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="story"></SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="story">story</SelectItem>
                    <SelectItem value="spike">spike</SelectItem>
                    <SelectItem value="epic">epic</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="기업은 채용공고를 게시할 수 있다"
                  data-testid="story-title"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="point"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Story Point</FormLabel>
              <FormControl>
                <Input
                  inputMode="numeric"
                  {...field}
                  data-testid="story-point"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={!form.formState.isValid || form.formState.isSubmitting}
          data-testid="story-submit"
        >
          submit
        </Button>
      </form>
    </Form>
  );
}
