import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface GameModalProps {
  open: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

export default function GameModal({ open, onClose, url, title }: GameModalProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle sx={{ pr: 6 }}>
        {title}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 0, height: '80vh' }}>
        <iframe
          src={url}
          title={title}
          width="100%"
          height="100%"
          style={{ border: 'none', display: 'block' }}
        />
      </DialogContent>
    </Dialog>
  );
}
