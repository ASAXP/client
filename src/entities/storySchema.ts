import { z } from 'zod';

const storyZodSchema = z.object({
  storyID: z.number().nullish(),
  // TODO: remove nullish
  projectID: z.number().nullish(),
  sprintID: z.number().nullish(),
  epicID: z.number().nullish(),

  type: z.enum(['story', 'spike', 'epic']),
  title: z.string().min(1, '스토리에는 타이틀을 입력해야 합니다.'),
  point: z
    .union([z.string(), z.number()])
    .pipe(
      z.coerce
        .number()
        .positive({ message: '음수는 입력할 수 없습니다.' })
        .int({ message: '스토리 포인트는 정수값이어야 합니다.' })
        .min(0, { message: '스토리 포인트는 0 이상이어야 합니다.' })
        .max(10, { message: '스토리 포인트는 10 이하여야 합니다.' }),
    )
    .default(0),
  progress: z.enum(['ready', 'ongoing', 'done']).default('ready'),
});

type TStoryEntity = z.infer<typeof storyZodSchema>;

export { storyZodSchema, type TStoryEntity };
