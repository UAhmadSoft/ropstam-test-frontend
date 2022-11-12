import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Card, Stack, Link, Container, Typography } from '@mui/material';
// layouts
// components
import Page from 'components/Page';
import { MHidden } from 'components/@material-extend';
import { LoginForm } from 'components/authentication/login';
import { RegisterForm } from 'components/authentication/register';
// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Register() {
  return (
    <RootStyle title='Register'>
      <MHidden width='mdDown'>
        <SectionStyle>
          <Typography variant='h3' sx={{ px: 5, mt: 10, mb: 5 }}>
            Welcome
          </Typography>
        </SectionStyle>
      </MHidden>

      <Container maxWidth='sm'>
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant='h4' gutterBottom>
              Signup
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Enter your details below.
            </Typography>
          </Stack>

          <RegisterForm />

          <Typography variant='body2' align='center' sx={{ mt: 3 }}>
            Already have an account?&nbsp;
            <Link variant='subtitle2' component={RouterLink} to='/login'>
              Login
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
