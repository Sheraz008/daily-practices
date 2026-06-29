import { fireEvent, render, screen } from '@testing-library/react-native';
import { Button } from '.';

describe('<Button />', () => {
  it('renders its label', async () => {
    await render(<Button label="Mark complete" onPress={() => {}} />);
    expect(screen.getByText('Mark complete')).toBeOnTheScreen();
  });

  it('calls onPress when tapped', async () => {
    const onPress = jest.fn();
    await render(<Button label="Tap me" onPress={onPress} />);
    await fireEvent.press(screen.getByText('Tap me'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', async () => {
    const onPress = jest.fn();
    await render(<Button label="Disabled" onPress={onPress} disabled />);
    await fireEvent.press(screen.getByText('Disabled'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('shows a spinner and blocks presses while loading', async () => {
    const onPress = jest.fn();
    await render(<Button label="Saving" onPress={onPress} loading testID="btn" />);
    expect(screen.queryByText('Saving')).toBeNull();
    await fireEvent.press(screen.getByTestId('btn'));
    expect(onPress).not.toHaveBeenCalled();
  });
});
