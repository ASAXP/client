import StoryForm from '../storyForm';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('스토리 폼 테스트', () => {
  beforeEach(() => {
    render(<StoryForm />);
  });
  test('스토리에는 타이틀을 입력해야 합니다.', async () => {
    const submitButton = screen.getByTestId('story-submit');
    expect(submitButton).toBeDisabled();
  });

  test('포인트는 0~10사이의 숫자여야 합니다.', async () => {
    const pointInput = screen.getByTestId('story-point');
    await userEvent.type(pointInput, '15');
    expect(
      await screen.findByText('스토리 포인트는 10 이하여야 합니다.'),
    ).toBeInTheDocument();
  });

  test('submit시점에서 사용자가 입력하지 않았다면 type:"story", point: 0의 기본값을 가집니다.', async () => {
    const form = screen.getByTestId('story-form');
    expect(form).toHaveFormValues({
      type: 'story',
      point: '0',
    });
  });
});
