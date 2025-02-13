import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Card,
  CardContent,
  TextField,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  FormControlLabel,
  InputAdornment,
  Chip,
  useTheme,
  useMediaQuery,
  Stack,
  Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ShareIcon from '@mui/icons-material/Share';
import QrCodeIcon from '@mui/icons-material/QrCode';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export default function EventPaymentLinks({ event }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [newLink, setNewLink] = useState({
    name: '',
    amount: '',
    description: '',
    expiryDate: '',
    isActive: true,
    maxUses: '',
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedLink, setSelectedLink] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Mock data - replace with actual payment links data from your backend
  const paymentLinks = event.paymentLinks || [];

  const handleCreateLink = () => {
    // Implement create link logic
    setOpenDialog(false);
  };

  const handleCopyLink = (link) => {
    navigator.clipboard.writeText(link.url);
    // Show success notification
  };

  const handleShare = (link) => {
    if (navigator.share) {
      navigator.share({
        title: `Payment Link for ${event.name}`,
        text: link.description,
        url: link.url,
      });
    }
  };

  const handleMenuOpen = (event, link) => {
    setAnchorEl(event.currentTarget);
    setSelectedLink(link);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedLink(null);
  };

  const getLinkStatus = (link) => {
    if (!link.isActive) return { label: 'Inactive', color: 'error' };
    if (link.expiryDate && new Date(link.expiryDate) < new Date()) {
      return { label: 'Expired', color: 'error' };
    }
    if (link.maxUses && link.uses >= link.maxUses) {
      return { label: 'Limit Reached', color: 'warning' };
    }
    return { label: 'Active', color: 'success' };
  };

  return (
    <Box>
      {/* Header */}
      <Paper sx={{ p: { xs: 2, sm: 3 }, mb: { xs: 2, sm: 3 }, bgcolor: 'primary.main', color: 'white' }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between', 
          alignItems: isMobile ? 'flex-start' : 'center',
          gap: isMobile ? 2 : 0
        }}>
          <Box>
            <Typography variant={isMobile ? "h6" : "h5"} gutterBottom={isMobile}>
              Payment Links
            </Typography>
            <Typography variant="body1">
              Create and manage payment links for your event
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
            size={isMobile ? "small" : "medium"}
            sx={{ 
              bgcolor: 'white', 
              color: 'primary.main',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.9)',
              }
            }}
          >
            Create New Link
          </Button>
        </Box>
      </Paper>

      {/* Payment Links Grid */}
      <Grid container spacing={2}>
        {paymentLinks.map((link) => {
          const status = getLinkStatus(link);
          return (
            <Grid item xs={12} md={6} key={link.id}>
              <Card>
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Box>
                      <Typography variant="h6" sx={{ mb: 1 }}>{link.name}</Typography>
                      <Chip label={status.label} color={status.color} size="small" />
                    </Box>
                    {isMobile ? (
                      <IconButton 
                        size="small"
                        onClick={(e) => handleMenuOpen(e, link)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    ) : (
                      <Box>
                        <Tooltip title="Share">
                          <IconButton onClick={() => handleShare(link)} size="small">
                            <ShareIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Show QR Code">
                          <IconButton size="small">
                            <QrCodeIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton size="small">
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton color="error" size="small">
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    )}
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {link.description}
                  </Typography>
                  
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="subtitle2" color="primary">
                        Amount: ${link.amount}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Uses: {link.uses || 0} {link.maxUses ? `/ ${link.maxUses}` : ''}
                      </Typography>
                      {link.expiryDate && (
                        <Typography variant="body2" color="text.secondary">
                          Expires: {new Date(link.expiryDate).toLocaleDateString()}
                        </Typography>
                      )}
                    </Box>

                    <TextField
                      fullWidth
                      size="small"
                      value={link.url}
                      InputProps={{
                        readOnly: true,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip title="Copy Link">
                              <IconButton 
                                edge="end"
                                onClick={() => handleCopyLink(link)}
                                size="small"
                              >
                                <ContentCopyIcon />
                              </IconButton>
                            </Tooltip>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Mobile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
          },
        }}
      >
        <MenuItem onClick={() => { handleShare(selectedLink); handleMenuClose(); }}>
          <ListItemIcon>
            <ShareIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Share</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <QrCodeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Show QR Code</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>

      {/* Create New Link Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)} 
        maxWidth="sm" 
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle>Create Payment Link</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Link Name"
              value={newLink.name}
              onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}
              sx={{ mb: 2 }}
              size={isMobile ? "small" : "medium"}
            />
            <TextField
              fullWidth
              label="Amount"
              type="number"
              value={newLink.amount}
              onChange={(e) => setNewLink({ ...newLink, amount: e.target.value })}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              sx={{ mb: 2 }}
              size={isMobile ? "small" : "medium"}
            />
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              value={newLink.description}
              onChange={(e) => setNewLink({ ...newLink, description: e.target.value })}
              sx={{ mb: 2 }}
              size={isMobile ? "small" : "medium"}
            />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Expiry Date"
                  type="date"
                  value={newLink.expiryDate}
                  onChange={(e) => setNewLink({ ...newLink, expiryDate: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                  size={isMobile ? "small" : "medium"}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Maximum Uses"
                  type="number"
                  value={newLink.maxUses}
                  onChange={(e) => setNewLink({ ...newLink, maxUses: e.target.value })}
                  helperText="Leave empty for unlimited"
                  size={isMobile ? "small" : "medium"}
                />
              </Grid>
            </Grid>
            <FormControlLabel
              control={
                <Switch
                  checked={newLink.isActive}
                  onChange={(e) => setNewLink({ ...newLink, isActive: e.target.checked })}
                />
              }
              label="Active"
              sx={{ mt: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: { xs: 2, sm: 3 } }}>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateLink} variant="contained">
            Create Link
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 