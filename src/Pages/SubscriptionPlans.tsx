import React from 'react';
import { Box, Button, Typography, Card, CardContent, ToggleButton, ToggleButtonGroup, useMediaQuery, useTheme } from '@mui/material';
import styled from '@emotion/styled';

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'rgba(0, 0, 0, 0.9)',
  color: '#fff',
  textAlign: 'center',
  padding: 2,
  borderRadius: '16px',
  backdropFilter: 'blur(10px)',
  width: '100%',
  transition: 'transform 0.3s ease-in-out',
  border: '1px solid #718096',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const PlanButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'light-blue',
  color: '#fff',
  marginTop: '8px',
  width: '100%',
  '&:hover': {
    backgroundColor: '#c53030',
  },
}));

const UpgradeButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'light-blue',
  color: '#fff',
  padding: '10px 20px',
  '&:hover': {
    backgroundColor: '#c53030',
  },
}));

const SubscriptionPlans = () => {
  const [billing, setBilling] = React.useState('monthly');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const handleBilling = (event, newBilling) => {
    if (newBilling !== null) setBilling(newBilling);
  };

  const plans = [
    { name: 'Basic', price: '$0', button: 'Current Plan', current: true },
    { name: 'Standard', price: billing === 'monthly' ? '$12' : '$120', button: 'Select Plan', current: false },
    { name: 'Professional', price: billing === 'monthly' ? '$24' : '$240', button: 'Current Plan', current: true },
  ];

  return (
    <Box sx={{ 
      mb:2,
      mt:2,
      p: { xs: 2, sm: 3 }, 
      background: 'black',
      borderRadius: { xs: '12px', sm: '16px' },
      maxWidth: '800px',
      mx: 'auto',
      overflow: 'hidden',
      border: '1px solid #718096',
    }}>
      <Typography 
        variant={isMobile ? "h5" : "h4"} 
        gutterBottom 
        align="center" 
        sx={{ color: '#fff', mb: 1 }}
      >
        Subscription Plans
      </Typography>
      <Typography 
        variant="body2" 
        align="center" 
        sx={{ 
          color: '#ccc', 
          mb: 2,
          px: { xs: 1, sm: 2, md: 3 }, 
        }}
      >
        Upgrade to access User Roles and Permissions, Mobile accessibility, integration with AI Tools and Standard Customer support.
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <ToggleButtonGroup
          value={billing}
          exclusive
          onChange={handleBilling}
          size={isMobile ? "small" : "medium"}
        >
          {/* {value==="Monthly" && */}
           <ToggleButton value="monthly" sx={{ 
            color: '#fff', 
            borderColor: '#718096',
            '&.Mui-selected': { backgroundColor: 'light-blue' } 
          }}>
            Monthly
          </ToggleButton>
{/* } */}
          <ToggleButton value="annual" sx={{ 
            color: '#fff', 
            borderColor: '#718096',
            '&.Mui-selected': { backgroundColor: 'light-blue' } 
          }}>
            Annual
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        },
        gap: { xs: 2, sm: 3 },
        mb: 3,
      }}>
        {plans.map((plan) => (
          <StyledCard key={plan.name}>
            <CardContent sx={{ py: 3 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>{plan.name}</Typography>
              <Typography variant="h5" sx={{ mb: 2 }}>{plan.price} <Typography component="span" variant="body2">/per user</Typography></Typography>
              <PlanButton variant="contained" disabled={plan.current}>
                {plan.button}
              </PlanButton>
            </CardContent>
          </StyledCard>
        ))}
      </Box>
      <Typography variant="body2" align="center" sx={{ color: '#ccc', mt: 2 }}>
        100% secure payment method with money back guarantee.
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 1 }}>
        <UpgradeButton variant="contained" fullWidth={isMobile} size={isMobile ? "large" : "medium"}>
          Upgrade now
        </UpgradeButton>
      </Box>
    </Box>
  );
};

export default SubscriptionPlans;
