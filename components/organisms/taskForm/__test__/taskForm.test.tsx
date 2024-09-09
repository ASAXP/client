import TaskForm from '../taskForm';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('태스크 폼 테스트', () => {
  test('테스크는 description을 작성해야 제출할 수 있습니다.', () => {
    render(<TaskForm storyID={1} variant="create" />);
    const submitButton = screen.getByTestId('task-submit');
    expect(submitButton).toBeDisabled();
  });
});
