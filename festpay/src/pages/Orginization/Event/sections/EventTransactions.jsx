import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Grid,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ReceiptIcon from '@mui/icons-material/Receipt';
import DownloadIcon from '@mui/icons-material/Download';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PaymentsIcon from '@mui/icons-material/Payments';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';

export default function EventTransactions({ event }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Mock data - replace with actual transactions data from your backend
  const transactions = event.transactions || [];

  const filteredTransactions = transactions.filter(transaction =>
    transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.attendee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Calculate total revenue
  const totalRevenue = transactions.reduce((sum, transaction) => 
    sum + (transaction.amount || 0), 0
  );

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  const renderMobileView = () => (
    <Stack spacing={2}>
      {filteredTransactions
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((transaction) => (
          <Card key={transaction.id}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ReceiptIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="body2" color="text.secondary">
                    {transaction.id}
                  </Typography>
                </Box>
                <Chip
                  label={transaction.status}
                  color={getStatusColor(transaction.status)}
                  size="small"
                />
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <PersonIcon sx={{ fontSize: '1rem', mr: 1, color: 'text.secondary' }} />
                <Typography variant="subtitle2">
                  {transaction.attendee.name}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CalendarTodayIcon sx={{ fontSize: '1rem', mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {new Date(transaction.date).toLocaleDateString()}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Amount
                  </Typography>
                  <Typography variant="subtitle1" color="success.main" sx={{ fontWeight: 'bold' }}>
                    ${transaction.amount}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" align="right" display="block">
                    Payment Method
                  </Typography>
                  <Typography variant="body2">
                    {transaction.paymentMethod}
                  </Typography>
                </Box>
                <IconButton 
                  color="primary" 
                  size="small"
                  title="Download Receipt"
                >
                  <DownloadIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))}
    </Stack>
  );

  const renderDesktopView = () => (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Transaction ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Attendee</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredTransactions
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ReceiptIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2">
                      {transaction.id}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  {new Date(transaction.date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">
                    {transaction.attendee.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {transaction.attendee.email}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" color="success.main">
                    ${transaction.amount}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={transaction.status}
                    color={getStatusColor(transaction.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {transaction.paymentMethod}
                </TableCell>
                <TableCell>
                  <IconButton 
                    color="primary" 
                    size="small"
                    title="Download Receipt"
                  >
                    <DownloadIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          {filteredTransactions.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} align="center">
                <Typography variant="subtitle1" sx={{ py: 3 }}>
                  No transactions found
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box>
      {/* Header with Stats */}
      <Grid container spacing={2} sx={{ mb: { xs: 2, sm: 3 } }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: 'primary.main', color: 'white' }}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccountBalanceWalletIcon sx={{ mr: 1 }} />
                <Typography variant={isMobile ? "h6" : "h5"}>Total Revenue</Typography>
              </Box>
              <Typography variant={isMobile ? "h5" : "h4"}>${totalRevenue.toFixed(2)}</Typography>
              <Typography variant="body2" sx={{ opacity: 0.7, mt: 1 }}>
                From {transactions.length} transactions
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: 'success.main', color: 'white' }}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUpIcon sx={{ mr: 1 }} />
                <Typography variant={isMobile ? "h6" : "h5"}>Success Rate</Typography>
              </Box>
              <Typography variant={isMobile ? "h5" : "h4"}>
                {Math.round((transactions.filter(t => t.status === 'completed').length / 
                  (transactions.length || 1)) * 100)}%
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7, mt: 1 }}>
                Successful transactions
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: 'info.main', color: 'white' }}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PaymentsIcon sx={{ mr: 1 }} />
                <Typography variant={isMobile ? "h6" : "h5"}>Average Transaction</Typography>
              </Box>
              <Typography variant={isMobile ? "h5" : "h4"}>
                ${(totalRevenue / (transactions.length || 1)).toFixed(2)}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7, mt: 1 }}>
                Per transaction
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Search */}
      <Paper sx={{ p: { xs: 2, sm: 3 }, mb: { xs: 2, sm: 3 } }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search transactions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size={isMobile ? "small" : "medium"}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      {/* Transactions List */}
      {isMobile ? renderMobileView() : renderDesktopView()}

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredTransactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          '.MuiTablePagination-select': {
            minWidth: isMobile ? 40 : 'auto'
          }
        }}
      />
    </Box>
  );
} 