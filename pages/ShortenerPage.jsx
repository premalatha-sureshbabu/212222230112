import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  Paper
} from '@mui/material';
import { logEvent } from '../middleware/logger';

const UrlShortenerForm = () => {
  const [formData, setFormData] = useState([
    { originalUrl: '', validity: '', customCode: '', result: null }
  ]);

  useEffect(() => {
    document.title = 'React URL Shortener';
  }, []);

  const handleChange = (index, field, value) => {
    const updated = [...formData];
    updated[index][field] = value;
    setFormData(updated);
  };

  const handleSubmit = (index) => {
    const item = formData[index];

    if (!item.originalUrl.trim()) {
      alert('Please enter a URL');
      return;
    }

    logEvent('SUBMIT_URL', { index, url: item.originalUrl });

    const code = item.customCode || `shrt${Date.now().toString().slice(-4)}`;
    const shortenedUrl = `http://shorts.ly/${code}`;
    const validity = item.validity || 30;

    const updated = [...formData];
    updated[index].result = {
      shortUrl: shortenedUrl,
      expiresIn: `${validity} minutes`
    };
    setFormData(updated);

    const existing = JSON.parse(localStorage.getItem('shortenedUrls') || '[]');
    existing.push({
      shortcode: code,
      original: item.originalUrl,
      validity: Number(validity),
    });
    localStorage.setItem('shortenedUrls', JSON.stringify(existing));
  };

  const addForm = () => {
    if (formData.length >= 5) {
      alert('You can only shorten up to 5 URLs');
      return;
    }
    setFormData([
      ...formData,
      { originalUrl: '', validity: '', customCode: '', result: null }
    ]);
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
        🖇️ URL Shortener
      </Typography>

      {formData.map((item, index) => (
        <Paper key={index} sx={{ p: 2, mb: 3 }} elevation={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Original URL"
                value={item.originalUrl}
                onChange={(e) => handleChange(index, 'originalUrl', e.target.value)}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                label="Validity (minutes)"
                type="number"
                value={item.validity}
                onChange={(e) => handleChange(index, 'validity', e.target.value)}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                label="Custom Short Code (optional)"
                value={item.customCode}
                onChange={(e) => handleChange(index, 'customCode', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={() => handleSubmit(index)}>
                Shorten URL
              </Button>
            </Grid>
            {item.result && (
              <Grid item xs={12}>
                <Typography variant="subtitle1" mt={2}>
                  🌐 Short URL:{' '}
                  <a href={item.result.shortUrl} target="_blank" rel="noreferrer">
                    {item.result.shortUrl}
                  </a><br />
                  ⚠️ Expires In: {item.result.expiresIn}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Paper>
      ))}
      <Button variant="outlined" onClick={addForm}>
        + Add Another URL
      </Button>
    </Box>
  );
};

export default UrlShortenerForm;
