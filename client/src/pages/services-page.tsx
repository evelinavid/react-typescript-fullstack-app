import React from 'react';
import {
  Typography, Box, Card, CardMedia, CardContent, CardActions, Button, IconButton,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import routes from 'navigation/routes';
import ApiService from 'services/api-service';

type ServiceCardModel = {
  serviceId:number
  title: string,
  description: string,
  src: string,
  price: string,
  likeCount: null | number,
};
const SerivcesPage = () => {
  const navigate = useNavigate();
  const [services, setService] = React.useState<ServiceCardModel[]>([]);

  const handleLiked = async (serviceId: number) => {
    await ApiService.likedService(serviceId);
    const fetchServices = await ApiService.fetchServices();
    setService(fetchServices);
  };

  React.useEffect(() => {
    (async () => {
      const fetchServices = await ApiService.fetchServices();
      setService(fetchServices);
    })();
  }, []);

  return (
    <Box sx={{
      margin: '1rem', display: 'grid', placeItems: 'center', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: '1rem',
    }}
    >
      {services.map((card) => (
        <Card key={card.serviceId} sx={{ minWidth: 330, maxWidth: 330, height: 350 }}>
          <Box sx={{ height: '100%' }} component="div">
            <CardMedia
              component="img"
              height="150"
              image={card.src}
              alt="img"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {card.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Price from:
                {' '}
                {card.price}
                {' '}
                EUR
              </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <IconButton onClick={() => handleLiked(card.serviceId)}>
                {!card.likeCount
                  ? <FavoriteBorderIcon color="error" />
                  : <FavoriteIcon color="error" />}
              </IconButton>
              <Button size="medium" variant="contained" color="primary" onClick={() => navigate(routes.SingleServicePage.createLink(card.serviceId))}>
                More info
              </Button>
            </CardActions>
          </Box>
        </Card>
      ))}

    </Box>
  );
};

export default SerivcesPage;
