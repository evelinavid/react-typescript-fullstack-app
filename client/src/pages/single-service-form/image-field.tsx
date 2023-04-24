import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import createId from 'uniqid';
import {
  Box,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';

type ImageFieldProps = {
  value: string[],
  onChange: (newVal: string[]) => void,
  errors?: string[],
};

const initialImgMap = {
  [createId()]: '',
};

const ImageField: React.FC<ImageFieldProps> = ({
  value,
  onChange,
  errors = [],
}) => {
  const [imgMap, setImgMap] = React.useState<Record<string, string>>(initialImgMap);
  const addImgField = () => {
    const newImgMap = {
      ...imgMap,
      [createId()]: '',
    };
    setImgMap(newImgMap);
    onChange(Object.values(newImgMap));
  };
  const removeImgField = (id: string) => {
    const newImgMap = Object.keys(imgMap).reduce<Record<string, string>>((prevMap, imgKey) => {
      const newMap = { ...prevMap };
      if (imgKey !== id) newMap[imgKey] = imgMap[imgKey];

      return newMap;
    }, {});

    setImgMap(newImgMap);
    onChange(Object.values(newImgMap));
  };

  const handleChange = (id: string, imgVal: string) => {
    const newImgMap = {
      ...imgMap,
      [id]: imgVal,
    };
    setImgMap(newImgMap);
    onChange(Object.values(newImgMap));
  };

  React.useEffect(() => {
    const currentIds = Object.keys(imgMap);
    const newImgMap = value.reduce<Record<string, string>>((prevMap, img, i) => ({
      ...prevMap,
      [currentIds[i] ?? createId()]: img,
    }), {});
    setImgMap(newImgMap);
  }, [value]);

  const imagesPairs = Object.entries(imgMap);

  return (
    <Box>
      <Box sx={{ width: 1, paddingBottom: 1 }}>
        {imagesPairs.map(([id, img], i) => (
          <TextField
            variant="standard"
            key={id}
            label="Image"
            name="images"
            fullWidth
            size="small"
            value={img}
            onChange={(e) => handleChange(id, e.target.value)}
            helperText={errors[i]}
            error={Boolean(errors[i])}
            InputProps={imagesPairs.length > 1 ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => removeImgField(id)}>
                    <DeleteIcon />
                  </IconButton>
                </InputAdornment>
              ),
            } : undefined}
          />
        ))}
      </Box>

      <Stack sx={{ alignItems: 'center' }}>
        <IconButton onClick={addImgField}>
          <AddCircleOutlineIcon sx={{ fontSize: 28 }} />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default ImageField;
