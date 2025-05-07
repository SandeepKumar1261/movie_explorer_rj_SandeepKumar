import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Card, CardContent, CardActions, Button, Radio,
  List, ListItem, ListItemIcon, ListItemText, Container, Grid,
  useMediaQuery, useTheme
} from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

// Stripe publishable key

interface Plan {
  name: string;
  price: string;
  priceId: string;
  features: string[];
}

const SubscriptionPlans: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string>('Basic');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const plans: Plan[] = [
    {
      name: 'Basic',
      price: '$2.12/month',
      priceId: 'price_1...', // Replace with actual Stripe price ID
      features: ['Search by title, genre etc', 'View ratings'],
    },
    {
      name: 'Standard',
      price: '$5.66/month',
      priceId: 'price_2...', // Replace with actual Stripe price ID
      features: ['View Movie Details', 'Add Movie to watchlist', 'Filter by rating, duration'],
    },
    {
      name: 'Premium',
      price: '$8.99/month',
      priceId: 'price_3...', // Replace with actual Stripe price ID
      features: ['View Trending movies etc', 'Get notifications', 'Comment on movies', 'Premium Content & Exclusive Articles'],
    },
  ];

  const handleSelectPlan = (planName: string) => {
    setSelectedPlan(planName);
  };

  const handlePayNow = async (planName: string) => {
    const selected = plans.find(p => p.name === planName);
    navigate('/stripe', { state: { plan: selected } });
    
  };

  return (
    <Box sx={{ bgcolor: '#000', minHeight: '100vh', display: 'flex', justifyContent: 'center', pt: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" align="center" fontWeight="bold" color="white" sx={{ mb: 4 }}>
          Select Your Plan to {isMobile && <br />} STAY INFORMED & CONNECTED
        </Typography>

        <Grid container direction={isMobile ? 'column' : 'row'} spacing={4} justifyContent="space-between" alignItems="stretch">
          {plans.map((plan) => (
            <Grid item xs={12} md={4} key={plan.name}>
              <Card
                elevation={3}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  border: selectedPlan === plan.name ? 2 : 0,
                  borderColor: '#f44336',
                  transform: selectedPlan === plan.name ? 'scale(1.05)' : 'scale(1)',
                  transition: 'transform 0.2s ease-in-out',
                  bgcolor: '#333333',
                  color: 'white'
                }}
              >
                <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
                  <Radio
                    checked={selectedPlan === plan.name}
                    onChange={() => handleSelectPlan(plan.name)}
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      '&.Mui-checked': { color: '#f44336' }
                    }}
                  />
                </Box>

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" fontWeight="bold" gutterBottom color="white">
                    {plan.name}
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" color="rgba(255, 255, 255, 0.8)" gutterBottom>
                    {plan.price}
                  </Typography>

                  <List>
                    {plan.features.map((feature, index) => (
                      <ListItem key={index} sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 30 }}>
                          <FiberManualRecordIcon sx={{ color: 'white', fontSize: 10 }} />
                        </ListItemIcon>
                        <ListItemText primary={feature} sx={{ color: 'white' }} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>

                <CardActions sx={{ p: 2 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      bgcolor: '#f44336',
                      color: 'white',
                      '&:hover': { bgcolor: '#d32f2f' },
                      py: 1.5,
                      fontWeight: 'bold'
                    }}
                    onClick={() => handlePayNow(plan.name)}
                  >
                    Pay Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default SubscriptionPlans;
