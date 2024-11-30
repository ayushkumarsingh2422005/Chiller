import React, { useState } from 'react';
import { Box, Card, CardContent, CardActions, Button, Typography, Grid, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const dummyTransactions = [
  {
    id: 1,
    eventName: "Music Festival",
    transactionId: "T12345",
    amount: 5000,
    date: "2024-12-01",
    paymentMethod: "Credit Card",
    status: "Completed",
    details: "Ticket for general admission to the music festival.",
  },
  {
    id: 2,
    eventName: "Tech Meetup",
    transactionId: "T12346",
    amount: 1500,
    date: "2024-12-10",
    paymentMethod: "PayPal",
    status: "Pending",
    details: "Ticket for networking session at the tech meetup.",
  },
  {
    id: 3,
    eventName: "Art Exhibition",
    transactionId: "T12347",
    amount: 2000,
    date: "2024-12-15",
    paymentMethod: "Debit Card",
    status: "Completed",
    details: "VIP ticket for the art exhibition.",
  },
];

export default function Transaction() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTransaction(null);
  };

  const handleViewDetails = (transaction) => {
    setSelectedTransaction(transaction);
    setOpenDialog(true);
  };

  const handleGenerateReceipt = (transactionId) => {
    // Logic for generating receipt (you can download as PDF or print the details)
    console.log(`Generating receipt for transaction ID: ${transactionId}`);
  };

  return (
    <Box sx={{ px: 3, py: 4 }}>
      <Grid container spacing={3}>
        {dummyTransactions.map((transaction) => (
          <Grid item xs={12} sm={6} md={4} key={transaction.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {transaction.eventName}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Transaction ID: {transaction.transactionId}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Amount: ₹{transaction.amount}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Date: {transaction.date}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Status: {transaction.status}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Payment Method: {transaction.paymentMethod}
                </Typography>
              </CardContent>

              <CardActions>
                <Button size="small" color="primary" onClick={() => handleViewDetails(transaction)}>
                  View Details
                </Button>
                <Button
                  size="small"
                  color="secondary"
                  onClick={() => handleGenerateReceipt(transaction.transactionId)}
                >
                  Generate Receipt
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog for Transaction Details */}
      {selectedTransaction && (
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle>Transaction Details</DialogTitle>
          <DialogContent>
            <Typography variant="h6">{selectedTransaction.eventName}</Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              <strong>Transaction ID:</strong> {selectedTransaction.transactionId}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              <strong>Amount:</strong> ₹{selectedTransaction.amount}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              <strong>Date:</strong> {selectedTransaction.date}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              <strong>Status:</strong> {selectedTransaction.status}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              <strong>Payment Method:</strong> {selectedTransaction.paymentMethod}
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              <strong>Details:</strong> {selectedTransaction.details}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}
