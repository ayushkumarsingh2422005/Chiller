import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupIcon from '@mui/icons-material/Group';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AssessmentIcon from '@mui/icons-material/Assessment';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function EventStatistics({ event }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Mock data - replace with actual statistics from your backend
  const registrationData = [
    { name: 'Week 1', registrations: 12 },
    { name: 'Week 2', registrations: 19 },
    { name: 'Week 3', registrations: 15 },
    { name: 'Week 4', registrations: 25 },
  ];

  const paymentMethodData = [
    { name: 'Credit Card', value: 45 },
    { name: 'UPI', value: 30 },
    { name: 'Net Banking', value: 15 },
    { name: 'Other', value: 10 },
  ];

  const calculateProgress = () => {
    if (event.maxAttendees === -1) return 100;
    return Math.round((event.totalRegistrations / event.maxAttendees) * 100);
  };

  const CustomPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
    if (isMobile) return null;
    
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${name} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Box>
      {/* Header */}
      <Paper sx={{ p: { xs: 2, sm: 3 }, mb: { xs: 2, sm: 3 }, bgcolor: 'primary.main', color: 'white' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <AssessmentIcon sx={{ mr: 2 }} />
          <Typography variant={isMobile ? "h6" : "h5"}>
            Event Statistics
          </Typography>
        </Box>
        <Typography variant="body1">
          Analytics and insights for your event
        </Typography>
      </Paper>

      {/* Key Metrics */}
      <Grid container spacing={2} sx={{ mb: { xs: 2, sm: 3 } }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <GroupIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant={isMobile ? "h6" : "h5"}>Registration Progress</Typography>
              </Box>
              <Typography variant={isMobile ? "h5" : "h4"} gutterBottom>
                {calculateProgress()}%
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={calculateProgress()} 
                sx={{ height: 10, borderRadius: 5 }}
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {event.totalRegistrations} out of {event.maxAttendees === -1 ? '∞' : event.maxAttendees} spots filled
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AttachMoneyIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant={isMobile ? "h6" : "h5"}>Revenue Generated</Typography>
              </Box>
              <Typography variant={isMobile ? "h5" : "h4"} gutterBottom>
                ${(event.totalRegistrations * event.registrationFee).toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Average per registration: ${event.registrationFee}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUpIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant={isMobile ? "h6" : "h5"}>Conversion Rate</Typography>
              </Box>
              <Typography variant={isMobile ? "h5" : "h4"} gutterBottom>
                {Math.round((event.totalRegistrations / event.totalViews) * 100 || 0)}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {event.totalViews || 0} total page views
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={2}>
        {/* Registration Trend */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography variant="h6" gutterBottom>
                Registration Trend
              </Typography>
              <Box sx={{ width: '100%', height: isMobile ? 200 : 300 }}>
                <ResponsiveContainer>
                  <BarChart
                    data={registrationData}
                    margin={{
                      top: 5,
                      right: isMobile ? 10 : 30,
                      left: isMobile ? 0 : 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: isMobile ? 12 : 14 }}
                      interval={isMobile ? 1 : 0}
                    />
                    <YAxis 
                      tick={{ fontSize: isMobile ? 12 : 14 }}
                      width={isMobile ? 30 : 40}
                    />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: isMobile ? 12 : 14 }} />
                    <Bar dataKey="registrations" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Payment Methods Distribution */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography variant="h6" gutterBottom>
                Payment Methods
              </Typography>
              <Box sx={{ width: '100%', height: isMobile ? 200 : 300 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={paymentMethodData}
                      cx="50%"
                      cy="50%"
                      labelLine={!isMobile}
                      label={isMobile ? null : CustomPieLabel}
                      outerRadius={isMobile ? 60 : 80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {paymentMethodData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend 
                      wrapperStyle={{ fontSize: isMobile ? 12 : 14 }}
                      layout={isMobile ? "horizontal" : "vertical"}
                      align={isMobile ? "center" : "right"}
                      verticalAlign={isMobile ? "bottom" : "middle"}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Additional Statistics */}
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography variant="h6" gutterBottom>
                Additional Insights
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Average Registration Time
                    </Typography>
                    <Typography variant={isMobile ? "h6" : "h5"}>
                      3.5 minutes
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Most Active Registration Time
                    </Typography>
                    <Typography variant={isMobile ? "h6" : "h5"}>
                      2:00 PM - 4:00 PM
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Incomplete Registrations
                    </Typography>
                    <Typography variant={isMobile ? "h6" : "h5"}>
                      15
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
} 