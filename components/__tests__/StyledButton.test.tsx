import { render, screen, fireEvent } from '@testing-library/react';
import StyledButton from '../StyledButton';

describe('StyledButton', () => {
    it('renders the button with correct text', () => {
        render(<StyledButton>Click Me</StyledButton>);
        expect(screen.getByRole('button')).toHaveTextContent('Click Me');
    });

    it('calls onClick when clicked', () => {
        const handleClick = jest.fn();
        render(<StyledButton onClick={handleClick}>Click Me</StyledButton>);

        fireEvent.click(screen.getByRole('button'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('disables the button when disabled is true', () => {
        render(<StyledButton disabled>Click Me</StyledButton>);
        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
    });

    it('has correct styles', () => {
        const { container } = render(<StyledButton>Click Me</StyledButton>);
        expect(container.firstChild).toHaveStyleRule('background-color', '#0070f3');
        expect(container.firstChild).toHaveStyleRule('border-radius', '6px');
    });
});
