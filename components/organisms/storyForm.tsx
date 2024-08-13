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

const storyFormSchema = z.object({
  type: z.enum(['story', 'spike', 'epic']),
  title: z.string(),
  point: z.number({ message: 'not number' }),
});

export default function StoryForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof storyFormSchema>>({
    resolver: zodResolver(storyFormSchema),
    defaultValues: {
      type: 'story',
      title: '',
      point: 0,
    },
  });

  const onSubmit = (data: z.infer<typeof storyFormSchema>) => {
    toast({
      title: 'success',
      description: JSON.stringify(data),
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-[1fr_1fr_1fr_150px] items-end gap-4"
      >
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              <FormLabel>UserStory Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="기업은 채용공고를 게시할 수 있다"
                  {...field}
                />
              </FormControl>
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
                  type="number"
                  inputMode="numeric"
                  {...field}
                  pattern="/d"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">submit</Button>
      </form>
    </Form>
  );
}
