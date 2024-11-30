import React, { useState } from 'react';
import { Box, Card, CardContent, CardActions, Button, Typography, Grid, TextField, IconButton, Snackbar, Alert } from '@mui/material';
import { CopyAll as CopyIcon, Share as ShareIcon } from '@mui/icons-material';

const dummyTransactions = [
  {
    id: 1,
    eventName: "Music Festival",
    transactionId: "T12345",
    paymentLink: "https://example.com/pay/T12345",
    eventLink: "/events/music-festival", // Link to view full event details
  },
  {
    id: 2,
    eventName: "Tech Meetup",
    transactionId: "T12346",
    paymentLink: "https://example.com/pay/T12346",
    eventLink: "/events/tech-meetup", // Link to view full event details
  },
  {
    id: 3,
    eventName: "Art Exhibition",
    transactionId: "T12347",
    paymentLink: "https://example.com/pay/T12347",
    eventLink: "/events/art-exhibition", // Link to view full event details
  },
];

export default function PaymentLink() {
  const [filteredTransactions, setFilteredTransactions] = useState(dummyTransactions);
  const [searchText, setSearchText] = useState('');
  const [copySuccess, setCopySuccess] = useState('');

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchText(query);
    setFilteredTransactions(dummyTransactions.filter(transaction => 
      transaction.eventName.toLowerCase().includes(query)
    ));
  };

  const handleCopyLink = (paymentLink) => {
    navigator.clipboard.writeText(paymentLink).then(
      () => setCopySuccess('Payment link copied to clipboard!'),
      () => setCopySuccess('Failed to copy link.')
    );
  };

  const handleShare = (paymentLink) => {
    // You can implement a share functionality here
    console.log('Share link:', paymentLink);
  };

  return (
    <Box sx={{ px: 3, py: 4 }}>
      {/* Search Bar */}
      <TextField
        fullWidth
        label="Search by Event Name"
        variant="outlined"
        value={searchText}
        onChange={handleSearchChange}
        sx={{ mb: 3 }}
      />

      <Grid container spacing={3}>
        {filteredTransactions.map((transaction) => (
          <Grid item xs={12} key={transaction.id}>
            <Card sx={{ display: 'flex', justifyContent: 'space-between', padding: 3 }}>
              {/* Left Side: Event Name and ID */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6">{transaction.eventName}</Typography>
                <Typography variant="body2" color="textSecondary">Event ID: {transaction.transactionId}</Typography>
              </Box>

              {/* Right Side: View Event Button, Share, and Copy Link */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  href={transaction.eventLink}
                  sx={{ mr: 2 }}
                >
                  View Event
                </Button>

                <IconButton
                  color="primary"
                  onClick={() => handleShare(transaction.paymentLink)}
                  sx={{ mr: 2 }}
                >
                  <ShareIcon />
                </IconButton>

                <IconButton
                  color="primary"
                  onClick={() => handleCopyLink(transaction.paymentLink)}
                >
                  <CopyIcon />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Snackbar for Copy Link Success */}
      <Snackbar
        open={!!copySuccess}
        autoHideDuration={3000}
        onClose={() => setCopySuccess('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setCopySuccess('')} severity="success" sx={{ width: '100%' }}>
          {copySuccess}
        </Alert>
      </Snackbar>
    </Box>
  );
}
