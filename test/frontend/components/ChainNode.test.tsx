import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ChainNode } from '../../../app/src/components/ChainNode';

describe('ChainNode', () => {
  it('should render completed state', () => {
    render(
      <ChainNode
        word="Test"
        state="completed"
        index={0}
        total={3}
      />
    );
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should render locked state with lock icon', () => {
    render(
      <ChainNode
        word="Hidden"
        state="locked"
        index={1}
        total={3}
      />
    );
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
  });

  it('should render active state with input placeholder', () => {
    render(
      <ChainNode
        word="Active"
        state="active"
        index={1}
        total={3}
        currentInput=""
      />
    );
    expect(screen.getByText(/A_/)).toBeInTheDocument();
  });

  it('should show hint when active and showHint is true', () => {
    render(
      <ChainNode
        word="Test"
        state="active"
        index={1}
        total={3}
        hint="This is a hint"
        showHint={true}
      />
    );
    const hints = screen.getAllByText(/This is a hint/);
    expect(hints.length).toBeGreaterThan(0);
  });

  it('should not show hint when showHint is false', () => {
    render(
      <ChainNode
        word="Test"
        state="active"
        index={1}
        total={3}
        hint="This is a hint"
        showHint={false}
      />
    );
    expect(screen.queryByText(/This is a hint/)).not.toBeInTheDocument();
  });
});
