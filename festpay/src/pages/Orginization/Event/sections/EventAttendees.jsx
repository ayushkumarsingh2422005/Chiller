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
  Avatar,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Grid,
  Stack,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

export default function EventAttendees({ event }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Mock data - replace with actual attendees data from your backend
  const attendees = event.attendees || [];

  const filteredAttendees = attendees.filter(attendee =>
    attendee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    attendee.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const renderMobileView = () => (
    <Stack spacing={2}>
      {filteredAttendees
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((attendee) => (
          <Card key={attendee._id}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ mr: 2 }}>{attendee.name[0]}</Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1">{attendee.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {attendee.email}
                  </Typography>
                </Box>
                {attendee.attended ? (
                  <CheckCircleIcon color="success" />
                ) : (
                  <CancelIcon color="error" />
                )}
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CalendarTodayIcon sx={{ fontSize: '0.9rem', mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {new Date(attendee.registrationDate).toLocaleDateString()}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Chip
                  label={attendee.paymentStatus}
                  color={attendee.paymentStatus === 'paid' ? 'success' : 'warning'}
                  size="small"
                />
                <Box>
                  <IconButton color="primary" size="small">
                    <MailIcon />
                  </IconButton>
                  <IconButton color="success" size="small">
                    <WhatsAppIcon />
                  </IconButton>
                </Box>
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
            <TableCell>Attendee</TableCell>
            <TableCell>Registration Date</TableCell>
            <TableCell>Payment Status</TableCell>
            <TableCell>Attendance</TableCell>
            <TableCell>Contact</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredAttendees
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((attendee) => (
              <TableRow key={attendee._id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ mr: 2 }}>{attendee.name[0]}</Avatar>
                    <Box>
                      <Typography variant="subtitle2">{attendee.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {attendee.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  {new Date(attendee.registrationDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Chip
                    label={attendee.paymentStatus}
                    color={attendee.paymentStatus === 'paid' ? 'success' : 'warning'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {attendee.attended ? (
                    <CheckCircleIcon color="success" />
                  ) : (
                    <CancelIcon color="error" />
                  )}
                </TableCell>
                <TableCell>
                  <IconButton color="primary" size="small">
                    <MailIcon />
                  </IconButton>
                  <IconButton color="success" size="small">
                    <WhatsAppIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          {filteredAttendees.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <Typography variant="subtitle1" sx={{ py: 3 }}>
                  No attendees found
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
      {/* Header */}
      <Paper sx={{ p: { xs: 2, sm: 3 }, mb: { xs: 2, sm: 3 }, bgcolor: 'primary.main', color: 'white' }}>
        <Typography variant={isMobile ? "h6" : "h5"} gutterBottom>
          Event Attendees
        </Typography>
        <Typography variant="body1">
          Total Registrations: {event.totalRegistrations} | Spots Available: {
            event.maxAttendees === -1 ? 'Unlimited' : 
            Math.max(0, event.maxAttendees - event.totalRegistrations)
          }
        </Typography>
      </Paper>

      {/* Search and Filters */}
      <Paper sx={{ p: { xs: 2, sm: 3 }, mb: { xs: 2, sm: 3 } }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search attendees..."
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

      {/* Attendees List */}
      {isMobile ? renderMobileView() : renderDesktopView()}

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredAttendees.length}
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