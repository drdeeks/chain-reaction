import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GameControls } from '../../../app/src/components/GameControls';

describe('GameControls Component', () => {
  const mockProps = {
    onGuess: vi.fn(),
    onHint: vi.fn(),
    onReset: vi.fn(),
    inputValue: '',
    setInputValue: vi.fn(),
    hintsUsed: 0,
    isGameWon: false,
    onNextLevel: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render input and buttons when game is not won', () => {
    render(<GameControls {...mockProps} />);

    expect(screen.getByPlaceholderText(/type your guess/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /hint/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
  });

  it('should call onGuess when form is submitted with valid input', () => {
    const { rerender } = render(
      <GameControls {...mockProps} inputValue="House" />
    );

    const form = screen.getByPlaceholderText(/type your guess/i).closest('form');
    fireEvent.submit(form!);

    expect(mockProps.onGuess).toHaveBeenCalledWith('House');
  });

  it('should not call onGuess with empty input', () => {
    render(<GameControls {...mockProps} inputValue="" />);

    const form = screen.getByPlaceholderText(/type your guess/i).closest('form');
    fireEvent.submit(form!);

    expect(mockProps.onGuess).not.toHaveBeenCalled();
  });

  it('should call onHint when hint button is clicked', () => {
    render(<GameControls {...mockProps} />);

    const hintButton = screen.getByRole('button', { name: /hint/i });
    fireEvent.click(hintButton);

    expect(mockProps.onHint).toHaveBeenCalled();
  });

  it('should call onReset when reset button is clicked', () => {
    render(<GameControls {...mockProps} />);

    const resetButton = screen.getByRole('button', { name: /reset/i });
    fireEvent.click(resetButton);

    expect(mockProps.onReset).toHaveBeenCalled();
  });

  it('should display hints used count', () => {
    render(<GameControls {...mockProps} hintsUsed={3} />);

    expect(screen.getByText(/3/i)).toBeInTheDocument();
  });

  it('should show win message and next level button when game is won', () => {
    render(<GameControls {...mockProps} isGameWon={true} />);

    expect(screen.getByText(/chain completed/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next puzzle/i })).toBeInTheDocument();
    expect(screen.queryByPlaceholderText(/type your guess/i)).not.toBeInTheDocument();
  });

  it('should call onNextLevel when next puzzle button is clicked', () => {
    render(<GameControls {...mockProps} isGameWon={true} />);

    const nextButton = screen.getByRole('button', { name: /next puzzle/i });
    fireEvent.click(nextButton);

    expect(mockProps.onNextLevel).toHaveBeenCalled();
  });

  it('should update input value when typing', () => {
    render(<GameControls {...mockProps} />);

    const input = screen.getByPlaceholderText(/type your guess/i);
    fireEvent.change(input, { target: { value: 'Test' } });

    expect(mockProps.setInputValue).toHaveBeenCalledWith('Test');
  });
});
