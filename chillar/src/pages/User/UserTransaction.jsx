import React from "react";
import { Box, Typography, InputBase, Chip, Menu, MenuItem, Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import LockIcon from "@mui/icons-material/Lock";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function UserTransaction() {
  // State for Sorting Menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // Dummy transaction data
  const transactions = [
    {
      id: 1,
      title: "Break a Leg : Beat Breakers",
      date: "31st Nov'23",
      amount: "Rs. 540 /-",
      logo: "https://via.placeholder.com/100", // Replace with actual logo URL
    },
    {
      id: 2,
      title: "Break a Leg : Beat Breakers",
      date: "31st Nov'23",
      amount: "Rs. 540 /-",
      logo: "https://via.placeholder.com/100", // Replace with actual logo URL
    },
  ];

  return (
    <Box sx={{ p: 3, bgcolor: "#f9f9f9", minHeight: "100vh" }}>
      {/* Top Bar */}
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        Registrations
      </Typography>

      {/* Search and Filter Section */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        {/* Search Bar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: "#fff",
            borderRadius: 2,
            p: "4px 8px",
            flexGrow: 1,
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <SearchIcon sx={{ color: "gray", mr: 1 }} />
          <InputBase
            placeholder="Search your registrations"
            fullWidth
            sx={{ fontSize: 14 }}
          />
        </Box>

        {/* Filter Chips */}
        <Chip
          label="All"
          icon={<CheckCircleIcon sx={{
            // backgroundColor:"white",
            color: "#fff",
            "&:hover": { color:"#2986f2" },
          }}/>}
          clickable
          sx={{
            bgcolor: "#2986f2",
            color: "#fff",
            "&:hover": { bgcolor: "#1976d2" },
          }}
        />
        <Chip
          label="Live"
          icon={<LiveTvIcon />}
          clickable
          sx={{
            bgcolor: "#f5f5f5",
            color: "#000",
            "&:hover": { bgcolor: "#e0e0e0" },
          }}
        />
        <Chip
          label="Closed"
          icon={<LockIcon />}
          clickable
          sx={{
            bgcolor: "#f5f5f5",
            color: "#000",
            "&:hover": { bgcolor: "#e0e0e0" },
          }}
        />

        {/* Sort Menu */}
        <Chip
          label="Sort by"
          icon={<FilterListIcon />}
          clickable
          onClick={handleMenuOpen}
          sx={{
            bgcolor: "#f5f5f5",
            color: "#000",
            "&:hover": { bgcolor: "#e0e0e0" },
          }}
        />
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem onClick={handleMenuClose}>Date</MenuItem>
          <MenuItem onClick={handleMenuClose}>Amount</MenuItem>
        </Menu>
      </Box>

      {/* Transaction List */}
      <Box sx={{ bgcolor: "#fff", borderRadius: 2, p: 2, boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
        {transactions.map((transaction) => (
          <Box
            key={transaction.id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 2,
              mb: 2,
              borderRadius: 2,
              border: "1px solid #e0e0e0",
              "&:last-child": { mb: 0 },
            }}
          >
            {/* Left Section */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                src={transaction.logo}
                alt={transaction.title}
                sx={{ width: 50, height: 50 }}
              />
              <Box>
                <Typography variant="body1" fontWeight="bold">
                  {transaction.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Registered on: {transaction.date}
                </Typography>
              </Box>
            </Box>

            {/* Right Section */}
            <Typography variant="body1" fontWeight="bold" color="text.primary">
              {transaction.amount}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
