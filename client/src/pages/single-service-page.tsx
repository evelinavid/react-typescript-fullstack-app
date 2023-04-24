import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import './styles.css';

// import required modules
import { Pagination, Navigation } from 'swiper';
import { Box, Container } from '@mui/system';
import { Button, Typography } from '@mui/material';
import ApiService from 'services/api-service';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from 'redux/store/store';
import routes from 'navigation/routes';

const SingleServicePage = () => {
  const { id } = useParams();
  const [service, setService] = React.useState<undefined | ServiceSingleModel>(undefined);
  React.useEffect(() => {
    if (id !== undefined) {
      (async () => {
        const fetchSingleService = await ApiService.fetchSingleService(id);
        setService(fetchSingleService);
      })();
    }
  }, []);
  const navigate = useNavigate();
  const { token, user } = useAppSelector((state) => state.users);
  const isLogin = !!token;
  if (service === undefined) return null;
  return (
    <Container>
      <Swiper
        pagination={{
          type: 'fraction',
        }}
        navigation
        modules={[Pagination, Navigation]}
        style={{ height: 400, width: 600 }}
      >
        {service?.images.map((img) => (<SwiperSlide key={img}><img src={img} alt="contruction" width="100%" /></SwiperSlide>))}

      </Swiper>
      <Box sx={{
        width: 600, margin: 'auto', display: 'grid', gap: '0.5rem',
      }}
      >
        <Typography variant="h4">
          {service?.title}
        </Typography>
        <Typography variant="body1">{service?.description}</Typography>

        <Box sx={{ display: 'flex' }}>
          {user?.userId !== service.userId && (
          <Button sx={{ flexGrow: 1 }} variant="contained" onClick={() => (isLogin ? navigate(routes.ChatUserPage.createLink(service?.userId)) : navigate(routes.LoginPage))}>
            Message
            {' '}
            {service?.name}
          </Button>
          )}
          <Button variant="text">{service?.phone}</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SingleServicePage;
