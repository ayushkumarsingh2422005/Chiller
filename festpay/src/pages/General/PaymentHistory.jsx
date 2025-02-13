import React from 'react';
import { TopBar, Footer } from '../../components';
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Card,
  Grid,
  TextField,
  InputAdornment,
  Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PaidIcon from '@mui/icons-material/Paid';
import DownloadIcon from '@mui/icons-material/Download';
import Slider from "react-slick";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import FilterListIcon from '@mui/icons-material/FilterList';
import SecurityIcon from '@mui/icons-material/Security';
import paymentDashboard from '../../assets/images/dasboardhero.png'; // You'll need to add appropriate image

export default function PaymentHistoryPreview() {
  return (
    <>
      <TopBar />
      <Box sx={{ mt: 7 }}>
        <HeroSection />
        <FeaturesSlider />
        <TransactionSummary />
        <TransactionHistory />
      </Box>
      <Footer />
    </>
  );
}

function HeroSection() {
  return (
    <Box
      sx={{
        background: "radial-gradient(circle, #4992F2, #2A548C 80%)",
        color: 'white',
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container alignItems="center" spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              Track Your Payments
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, mb: 4 }}>
              Comprehensive payment tracking and analysis for all your event transactions
            </Typography>
            <Button 
              variant="contained" 
              color="secondary"
              size="large"
              sx={{ 
                borderRadius: '28px',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem'
              }}
            >
              View History
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={paymentDashboard}
              alt="Payment Dashboard"
              sx={{
                width: '100%',
                maxWidth: 500,
                height: 'auto',
                borderRadius: 2,
                boxShadow: 3
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

function FeaturesSlider() {
  const features = [
    {
      title: "Comprehensive Transaction History",
      description: "Access detailed records of all your payments, refunds, and pending transactions in one place.",
      icon: <ReceiptLongIcon sx={{ fontSize: 40 }} />,
      image: paymentDashboard
    },
    {
      title: "Advanced Analytics",
      description: "Visualize your spending patterns with intuitive charts and get insights into your payment history.",
      icon: <AnalyticsIcon sx={{ fontSize: 40 }} />,
      image: paymentDashboard
    },
    {
      title: "Easy Downloads",
      description: "Download payment receipts and transaction statements with just one click.",
      icon: <DownloadIcon sx={{ fontSize: 40 }} />,
      image: paymentDashboard
    },
    {
      title: "Smart Filtering",
      description: "Filter and search transactions by date, amount, event, or status to find what you need quickly.",
      icon: <FilterListIcon sx={{ fontSize: 40 }} />,
      image: paymentDashboard
    },
    {
      title: "Secure Transactions",
      description: "Bank-grade security ensures your payment information and transaction history are always protected.",
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      image: paymentDashboard
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  return (
    <Box sx={{ px: { xs: 3, md: 8 }, py: { xs: 6, md: 10 }, textAlign: "center" }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            mb: 6,
            color: "primary.main"
          }}
        >
          Payment History Features
        </Typography>

        <Slider {...settings}>
          {features.map((feature, index) => (
            <Card
              key={index}
              elevation={0}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                p: 4,
                boxShadow: 0,
                bgcolor: "#deedfc",
                borderRadius: "24px",
              }}
            >
              <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' }, mb: { xs: 4, md: 0 } }}>
                <Box 
                  sx={{ 
                    color: 'primary.main',
                    mb: 2,
                    display: 'inline-flex',
                    p: 2,
                    borderRadius: 2,
                    bgcolor: 'white'
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    mb: 2,
                    color: "text.primary",
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ 
                    color: "text.secondary",
                    fontSize: '1.1rem',
                    maxWidth: '500px',
                    mx: { xs: 'auto', md: 0 }
                  }}
                >
                  {feature.description}
                </Typography>
              </Box>
              <Box
                component="img"
                src={feature.image}
                alt={feature.title}
                sx={{
                  width: { xs: "100%", md: "50%" },
                  maxWidth: "500px",
                  height: "auto",
                  borderRadius: "12px",
                  boxShadow: 3
                }}
              />
            </Card>
          ))}
        </Slider>
      </Container>
    </Box>
  );
}

function TransactionSummary() {
  const summaryCards = [
    {
      title: "Total Spent",
      amount: "₹12,450",
      icon: <PaidIcon sx={{ fontSize: 40 }} />,
      color: "#2196f3"
    },
    {
      title: "Recent Transaction",
      amount: "₹2,500",
      icon: <ReceiptIcon sx={{ fontSize: 40 }} />,
      color: "#4caf50"
    },
    {
      title: "Pending Amount",
      amount: "₹500",
      icon: <AccountBalanceWalletIcon sx={{ fontSize: 40 }} />,
      color: "#ff9800"
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Grid container spacing={3}>
        {summaryCards.map((card, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              sx={{
                p: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                bgcolor: `${card.color}15`,
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 3
                }
              }}
            >
              <Box>
                <Typography color="text.secondary" variant="h6" gutterBottom>
                  {card.title}
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  {card.amount}
                </Typography>
              </Box>
              <Box sx={{ color: card.color }}>
                {card.icon}
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

function TransactionHistory() {
  const transactions = [
    {
      id: "TXN001",
      date: "2024-03-15",
      event: "Tech Fest 2024",
      amount: "₹2,500",
      status: "Completed",
      type: "Debit"
    },
    {
      id: "TXN002",
      date: "2024-03-14",
      event: "Cultural Night",
      amount: "₹1,000",
      status: "Pending",
      type: "Debit"
    },
    {
      id: "TXN003",
      date: "2024-03-12",
      event: "Workshop Registration",
      amount: "₹500",
      status: "Completed",
      type: "Debit"
    },
    {
      id: "TXN004",
      date: "2024-03-10",
      event: "Refund - Cancelled Event",
      amount: "₹1,500",
      status: "Completed",
      type: "Credit"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'Pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getTypeColor = (type) => {
    return type === 'Credit' ? 'primary' : 'error';
  };

  return (
    <Container maxWidth="lg" sx={{ my: 4, pb: 8 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" fontWeight="bold">
          Recent Transactions
        </Typography>
        <TextField
          size="small"
          placeholder="Search transactions..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: 250 }}
        />
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'background.default' }}>
              <TableCell><Typography fontWeight="bold">Transaction ID</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">Date</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">Event</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">Amount</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">Status</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">Type</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">Receipt</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id} hover>
                <TableCell>{transaction.id}</TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.event}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>
                  <Chip
                    label={transaction.status}
                    color={getStatusColor(transaction.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={transaction.type}
                    color={getTypeColor(transaction.type)}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    color="primary"
                    disabled={transaction.status === 'Pending'}
                  >
                    <DownloadIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
