import React from 'react';
import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Chip,
  Box,
} from '@mui/material';
import PushPinIcon from '@mui/icons-material/PushPin';
import { Note } from '../models/Note';
import { formatDate } from '../utils/noteStorage';

interface NoteCardProps {
  note: Note;
  onClick: (note: Note) => void;
  onLongPress: (note: Note) => void;
}

export default function NoteCard({ note, onClick, onLongPress }: NoteCardProps) {
  const longPressTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const didLongPress = React.useRef(false);

  const handlePointerDown = () => {
    didLongPress.current = false;
    longPressTimer.current = setTimeout(() => {
      didLongPress.current = true;
      onLongPress(note);
    }, 600);
  };

  const handlePointerUp = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const handleClick = () => {
    if (!didLongPress.current) {
      onClick(note);
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{
        backgroundColor: note.isPinned ? 'action.selected' : 'background.paper',
        borderRadius: 3,
        transition: 'box-shadow 0.2s',
        '&:hover': { boxShadow: 3 },
        breakInside: 'avoid',
        mb: 1.5,
      }}
    >
      <CardActionArea
        onClick={handleClick}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        sx={{ p: 0 }}
      >
        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
          {note.isPinned && (
            <Box sx={{ display: 'flex', mb: 0.5 }}>
              <Chip
                icon={<PushPinIcon sx={{ fontSize: 14 }} />}
                label="Pinned"
                size="small"
                color="primary"
                variant="outlined"
                sx={{ height: 22, '& .MuiChip-label': { px: 0.5, fontSize: 11 } }}
              />
            </Box>
          )}

          {note.title && (
            <Typography
              variant="subtitle1"
              fontWeight={600}
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {note.title}
            </Typography>
          )}

          {note.content && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 0.5,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 6,
                WebkitBoxOrient: 'vertical',
                whiteSpace: 'pre-wrap',
              }}
            >
              {note.content}
            </Typography>
          )}

          <Typography variant="caption" color="text.disabled" sx={{ mt: 1, display: 'block' }}>
            {formatDate(note.updatedAt)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
