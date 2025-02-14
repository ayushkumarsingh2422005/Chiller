import React from 'react'
import { Footer, TopBar } from '../../components';
import { Box, Typography, Button, Grid2, Card, CardContent, Accordion, AccordionSummary, AccordionDetails, Avatar } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useMediaQuery from "@mui/material/useMediaQuery";
import dasboardhero from "../../assets/images/dasboardhero.png"
import Slider from "react-slick";
import bg3 from "../../assets/images/bg3.webp"
import { deepOrange, deepPurple, blue } from '@mui/material/colors';
import faq from "../../assets/images/faq.png"
import d1 from '../../assets/images/d1.jpg'
import d3 from '../../assets/images/d3.jpg'
import d4 from '../../assets/images/d4.jpg'


export default function Dashboard() {
    return (
        <>
            <TopBar />
            <Hero />
            {/* <Statistics /> */}
            <Features />
            {/* <Testimonials /> */}
            <Faq />
            <Footer />
        </>
    )
}

function Hero() {
    const isSmallScreen = useMediaQuery("(max-width:600px)");
    return (
        <div className="bg-left-top bg-no-repeat bg-[length:800px]" style={{ backgroundImage: `url(${bg3})` }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: isSmallScreen ? "column-reverse" : "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    px: { xs: 3, md: 8 },
                    py: { xs: 6, md: 10 },
                    maxWidth: "1300px",
                    mx: "auto",
                }}
            >
                {/* Left Content */}
                <Grid2
                    container
                    direction="column"
                    alignItems={isSmallScreen ? "center" : "flex-start"}
                    sx={{ flex: 1, textAlign: isSmallScreen ? "center" : "left" }}
                >
                    <Typography
                        variant="h3"
                        component="h1"
                        sx={{
                            fontWeight: "bold",
                            color: "text.primary",
                            fontSize: { xs: "1.8rem", md: "2.5rem" },
                        }}
                    >
                        Maximize Event ROI: <br /> Track, Analyze, Grow
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            mt: 2,
                            color: "text.secondary",
                            fontSize: { xs: "0.9rem", md: "1rem" },
                            borderLeft: "4px solid",
                            borderColor: "primary.main",
                            pl: 2,
                            py: 2
                        }}
                    >
                        Data-Driven Insights to Optimize <br /> User Engagement and Payment Tracking
                        for Your Events.
                    </Typography>
                    <Button
                        href={'/coming-soon'}
                        variant="contained"
                        color="primary"
                        sx={{
                            mt: 4,
                            px: 3,
                            py: 1,
                            fontSize: "1rem",
                            borderRadius: "10000px",
                        }}
                    >
                        Try Now
                    </Button>
                </Grid2>

                {/* Right Image */}
                <Box
                    component="img"
                    src={dasboardhero}
                    alt="Dashboard Illustration"
                    sx={{
                        flex: 1,
                        maxWidth: { xs: "100%", md: "600px" },
                        height: "auto",
                        mx: "auto",
                    }}
                />
            </Box>
        </div>
    );
}

function Statistics() {
    const stats = [
        { number: "10K+", text: "Active users across multiple colleges" },
        { number: "500+", text: "Events successfully managed and tracked" },
        { number: "₹1M+", text: "Total payments processed securely" },
        { number: "50+", text: "Partner colleges and institutions" }
    ];

    return (
        <Box sx={{ 
            py: 8,
            px: { xs: 3, md: 8 },
            background: "radial-gradient(circle, #4992F2, #2A548C 80%)",
            color: 'white'
        }}>
            <Box 
                maxWidth="1300px" 
                mx="auto"
            >
                <Grid2 
                    container 
                    spacing={2}
                    columns={{ xs: 4, md: 12 }}
                >
                    {stats.map((stat, index) => (
                        <Grid2 key={index} xs={2} md={3}>
                            <Box 
                                sx={{
                                    height: { xs: '120px', md: '140px' },
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    p: { xs: 1.5, md: 3 },
                                    textAlign: "center",
                                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                                    borderRadius: '12px',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                                        transform: 'translateY(-5px)'
                                    }
                                }}
                            >
                                <Typography 
                                    variant="h3" 
                                    fontWeight="bold" 
                                    mb={0.5}
                                    sx={{ 
                                        fontSize: { 
                                            xs: '1.25rem', 
                                            sm: '1.75rem', 
                                            md: '2rem' 
                                        } 
                                    }}
                                >
                                    {stat.number}
                                </Typography>
                                <Typography 
                                    variant="body2"
                                    sx={{ 
                                        color: 'rgba(255, 255, 255, 0.8)',
                                        fontSize: { 
                                            xs: '0.7rem', 
                                            sm: '0.75rem', 
                                            md: '0.875rem' 
                                        },
                                        lineHeight: 1.3,
                                        px: 1
                                    }}
                                >
                                    {stat.text}
                                </Typography>
                            </Box>
                        </Grid2>
                    ))}
                </Grid2>
            </Box>
        </Box>
    );
}

function Features() {
    const features = [
        {
            title: "Easy Event Creation",
            description: "Create and customize events in minutes with our intuitive interface, flexible scheduling options, and automated setup tools.",
            image: d1,
        },
        {
            title: "Smart Transaction Handling",
            description: "Process transactions seamlessly with real-time tracking, automated reconciliation, and secure payment gateway integration.",
            image: d3,
        },
        {
            title: "Payment Link Generation",
            description: "Generate secure payment links instantly for your events, making it easy to collect payments and track transactions.",
            image: d4,
        },
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

            {/* Carousel */}
            <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
                <Slider {...settings}>
                    {features.map((feature, index) => (

                        <Card
                            key={index}
                            elevation={0}
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", md: "row" },
                                alignItems: "center",
                                p: 2,
                                // boxShadow: 0,
                                // bgcolor: "#deedfc",
                                borderRadius: "50px",
                                // border: "solid 1px lightgray"
                            }}
                        >
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
                                sx={{ color: "text.secondary", mb: 4, maxWidth: "600px", mx: "auto" }}
                            >
                                {feature.description}
                            </Typography>
                            {/* Feature Image */}
                            <Box
                                component="img"
                                src={feature.image}
                                alt={feature.title}
                                sx={{
                                    width: { xs: "400px", md: "800px" },
                                    borderRadius: "8px",
                                    objectFit: "contain",
                                    mb: { xs: 2, md: 0 },
                                    mx: "auto",
                                    border: "solid 1px lightgray",
                                    padding: 2
                                }}
                            />
                        </Card>
                    ))}
                </Slider>
            </Box>
        </Box>
    );
}

function Testimonials() {
    const testimonials = [
        {
            name: "Rahul Sharma",
            role: "Cultural Club President",
            content: "Festpay has revolutionized how we manage our club events. The payment tracking and analytics features are game-changers!",
            bgColor: deepOrange[500],
            initials: "RS"
        },
        {
            name: "Priya Patel",
            role: "Event Coordinator",
            content: "Managing multiple events simultaneously has never been easier. The dashboard provides all the insights we need.",
            bgColor: deepPurple[500],
            initials: "PP"
        },
        {
            name: "Arun Kumar",
            role: "Technical Club Lead",
            content: "The automated payment reconciliation saves us hours of manual work. Highly recommended for all college clubs!",
            bgColor: blue[500],
            initials: "AK"
        }
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
    };

    return (
        <Box 
            sx={{ 
                py: 10, 
                px: { xs: 3, md: 8 },
                bgcolor: 'background.paper',
                position: 'relative',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '50%',
                    bgcolor: 'primary.main',
                    zIndex: 0,
                }
            }}
        >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography 
                    variant="h3" 
                    textAlign="center" 
                    fontWeight="bold" 
                    mb={6}
                    color="white"
                >
                    What Our Users Say
                </Typography>
                <Box 
                    maxWidth="900px" 
                    mx="auto"
                    sx={{
                        '& .slick-dots li button:before': {
                            color: 'white'
                        },
                        '& .slick-dots li.slick-active button:before': {
                            color: 'white'
                        }
                    }}
                >
                    <Slider {...settings}>
                        {testimonials.map((testimonial, index) => (
                            <Box key={index} textAlign="center" px={4}>
                                <Card
                                    elevation={3}
                                    sx={{
                                        p: 4,
                                        borderRadius: 4,
                                        bgcolor: 'background.paper',
                                        position: 'relative',
                                        mt: 5
                                    }}
                                >
                                    <Avatar
                                        sx={{
                                            width: 80,
                                            height: 80,
                                            bgcolor: testimonial.bgColor,
                                            fontSize: '2rem',
                                            position: 'absolute',
                                            top: -40,
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            border: '4px solid white'
                                        }}
                                    >
                                        {testimonial.initials}
                                    </Avatar>
                                    <Box sx={{ pt: 4 }}>
                                        <Typography 
                                            variant="body1" 
                                            fontSize="1.2rem" 
                                            mb={3}
                                            color="text.secondary"
                                            sx={{ 
                                                fontStyle: 'italic',
                                                '&::before': {
                                                    content: '"❝"',
                                                    marginRight: 1,
                                                    color: 'primary.main',
                                                    fontSize: '1.5rem'
                                                },
                                                '&::after': {
                                                    content: '"❞"',
                                                    marginLeft: 1,
                                                    color: 'primary.main',
                                                    fontSize: '1.5rem'
                                                }
                                            }}
                                        >
                                            {testimonial.content}
                                        </Typography>
                                        <Typography variant="h6" fontWeight="bold" color="primary.main">
                                            {testimonial.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {testimonial.role}
                                        </Typography>
                                    </Box>
                                </Card>
                            </Box>
                        ))}
                    </Slider>
                </Box>
            </Box>
        </Box>
    );
}

function Faq() {
    const accordionData = [
        {
            title: "How can I access my dashboard?",
            content: "You can access your dashboard by logging into your account and clicking on the 'Dashboard' option in the navigation menu. The dashboard provides a centralized view of all your event management tools and analytics."
        },
        {
            title: "What features are available on the dashboard?",
            content: "Our dashboard offers comprehensive features including event creation and management, real-time analytics, participant tracking, payment processing, communication tools, and customizable reporting options all in one place."
        },
        {
            title: "How do I create a new event from the dashboard?",
            content: "To create a new event, simply click the 'Create Event' button on your dashboard. Follow the step-by-step wizard to input event details, set up ticketing, and customize your event page with all necessary information."
        },
        {
            title: "Can I manage multiple events simultaneously from the dashboard?",
            content: "Yes, the dashboard allows you to manage multiple events simultaneously. You can easily switch between different events, track their performance, and handle operations for all your events from a single interface."
        },
        {
            title: "How can I view my event's performance metrics?",
            content: "The dashboard provides detailed analytics and performance metrics for each event. You can view ticket sales, attendance rates, revenue generated, and other key metrics through intuitive charts and graphs in the analytics section."
        },
        {
            title: "How do I export reports from my dashboard?",
            content: "You can export various reports by navigating to the 'Reports' section in your dashboard. Select the type of report you need (sales, attendance, etc.), choose your preferred format (PDF, Excel, etc.), and click 'Export' to download your data."
        }
    ];

    return (
        <div className="flex flex-col lg:flex-row gap-8 p-4 max-w-[1200px] mx-auto mb-36">
            {/* Accordion Section */}
            <div className="lg:w-1/2">
                <Typography
                    variant="h2"
                    sx={{
                        fontWeight: "bold",
                        mb: 2,
                        color: "primary.main",
                        fontSize: { xs: "2rem", md: "2.5rem" },
                    }}
                >
                    Frequently asked questions
                </Typography>
                <Typography
                    variant="h5"
                    sx={{
                        mb: 3,
                        maxWidth: "800px",
                        color: "text.secondary",
                        fontSize: { xs: "1rem", md: "1.25rem" },
                        borderLeft: "4px solid",
                        borderLeftColor: "primary.main",
                        pl: 2,
                    }}
                >
                    Get answers to common questions about using our dashboard to manage your events effectively.
                </Typography>
                <br />
                {accordionData.map((item, index) => (
                    <Accordion key={index} sx={{ mb: 2, borderRadius: "8px", boxShadow: 0 }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${index}-content`}
                            id={`panel${index}-header`}
                            sx={{ bgcolor: "background.paper" }}
                        >
                            <Typography variant="h6" sx={{ fontWeight: "bold" }}>{item.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ bgcolor: "background.default" }}>
                            <Typography>{item.content}</Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>

            {/* Image/Preview Section */}
            <div className="lg:w-1/2 flex justify-center">
                <div className="w-full max-w-md rounded-lg bg-white  flex items-center justify-center p-2">
                    <img
                        src={faq}
                        alt="Placeholder"
                        className="rounded-lg mb-4 w-full"
                    />
                </div>
            </div>
        </div>
    );
}
