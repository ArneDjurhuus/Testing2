import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders Pixel Notes heading', () => {
  render(<App />);
  expect(screen.getByText('Pixel Notes')).toBeInTheDocument();
});

test('shows empty state message', () => {
  render(<App />);
  expect(screen.getByText('No notes yet')).toBeInTheDocument();
  expect(screen.getByText('Tap + to create your first note')).toBeInTheDocument();
});

test('has search field', () => {
  render(<App />);
  expect(screen.getByPlaceholderText('Search notes')).toBeInTheDocument();
});

test('has add note button', () => {
  render(<App />);
  expect(screen.getByLabelText('Add note')).toBeInTheDocument();
});

test('opens editor when add button clicked', () => {
  render(<App />);
  fireEvent.click(screen.getByLabelText('Add note'));
  expect(screen.getByText('New Note')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Start typing...')).toBeInTheDocument();
});

test('navigates back from editor', () => {
  render(<App />);
  fireEvent.click(screen.getByLabelText('Add note'));
  fireEvent.click(screen.getByLabelText('back'));
  expect(screen.getByText('Pixel Notes')).toBeInTheDocument();
});
