import { createNote, sortNotes, filterNotes, formatDate } from './noteStorage';
import { Note } from '../models/Note';

describe('createNote', () => {
  it('creates a note with trimmed title and content', () => {
    const note = createNote('  Test Title  ', '  Test Content  ');
    expect(note.title).toBe('Test Title');
    expect(note.content).toBe('Test Content');
    expect(note.isPinned).toBe(false);
    expect(note.id).toBeTruthy();
    expect(note.createdAt).toBeGreaterThan(0);
    expect(note.updatedAt).toBe(note.createdAt);
  });

  it('creates a pinned note when specified', () => {
    const note = createNote('Title', 'Content', true);
    expect(note.isPinned).toBe(true);
  });
});

describe('sortNotes', () => {
  const makeNote = (overrides: Partial<Note>): Note => ({
    id: '1',
    title: '',
    content: '',
    isPinned: false,
    createdAt: 1000,
    updatedAt: 1000,
    ...overrides,
  });

  it('puts pinned notes first', () => {
    const notes = [
      makeNote({ id: '1', isPinned: false, updatedAt: 3000 }),
      makeNote({ id: '2', isPinned: true, updatedAt: 1000 }),
    ];
    const sorted = sortNotes(notes);
    expect(sorted[0].id).toBe('2');
    expect(sorted[1].id).toBe('1');
  });

  it('sorts by updatedAt descending within same pin status', () => {
    const notes = [
      makeNote({ id: '1', updatedAt: 1000 }),
      makeNote({ id: '2', updatedAt: 3000 }),
      makeNote({ id: '3', updatedAt: 2000 }),
    ];
    const sorted = sortNotes(notes);
    expect(sorted.map((n) => n.id)).toEqual(['2', '3', '1']);
  });

  it('does not mutate original array', () => {
    const notes = [makeNote({ id: '1' }), makeNote({ id: '2' })];
    const sorted = sortNotes(notes);
    expect(sorted).not.toBe(notes);
  });
});

describe('filterNotes', () => {
  const notes: Note[] = [
    { id: '1', title: 'Shopping List', content: 'Buy milk', isPinned: false, createdAt: 1000, updatedAt: 1000 },
    { id: '2', title: 'Meeting Notes', content: 'Discuss budget', isPinned: false, createdAt: 2000, updatedAt: 2000 },
    { id: '3', title: 'Ideas', content: 'New app concept', isPinned: true, createdAt: 3000, updatedAt: 3000 },
  ];

  it('returns all notes when query is empty', () => {
    expect(filterNotes(notes, '')).toHaveLength(3);
    expect(filterNotes(notes, '   ')).toHaveLength(3);
  });

  it('filters by title', () => {
    const result = filterNotes(notes, 'shopping');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });

  it('filters by content', () => {
    const result = filterNotes(notes, 'budget');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('2');
  });

  it('is case insensitive', () => {
    expect(filterNotes(notes, 'IDEAS')).toHaveLength(1);
    expect(filterNotes(notes, 'ideas')).toHaveLength(1);
  });

  it('returns empty array when no match', () => {
    expect(filterNotes(notes, 'xyz123')).toHaveLength(0);
  });
});

describe('formatDate', () => {
  it('formats a timestamp to a readable date string', () => {
    const result = formatDate(1700000000000);
    expect(result).toBeTruthy();
    expect(typeof result).toBe('string');
  });
});
