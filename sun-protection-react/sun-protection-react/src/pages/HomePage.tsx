import React, { useState, useEffect, useRef } from 'react';
import { Input, Button, Space, message, Card, Typography, Spin } from 'antd';
import { getUvIndexUsingGet } from '../services/sun-protection/uvController';
import { GoogleMap, Marker, useLoadScript, Autocomplete } from '@react-google-maps/api';

const { Title, Text } = Typography;

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const defaultCenter = { lat: -37.8136, lng: 144.9631 }; // 默认墨尔本

const HomePage: React.FC = () => {
  const [city, setCity] = useState('');
  const [uvData, setUvData] = useState<{ uvIndex: number; description: string } | null>(null);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>(defaultCenter);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyC7kxXvgXamZNKYN18r_r-SfomspXYwdoo',
    libraries: ['places'], // 添加 places 库
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          message.error('Can not get current position: ' + error.message);
        }
      );
    } else {
      message.error('System Error');
    }
  }, []);

  const handleSearch = async () => {
    if (!city) {
      message.warning('Enter City');
      return;
    }

    try {
      const response = await getUvIndexUsingGet({ city });
      console.log('UV Index:', response);

      if (response) {
        setUvData(response);
        message.success('Search Successfully');
      } else {
        message.warning('Can not get UV index');
      }

      // 使用 Google Geocoding API 获取地址的经纬度
      const geocodeResponse = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(city)}&key=AIzaSyC7kxXvgXamZNKYN18r_r-SfomspXYwdoo`
      );
      const geocodeData = await geocodeResponse.json();

      if (geocodeData.status === 'OK' && geocodeData.results.length > 0) {
        const location = geocodeData.results[0].geometry.location;
        setMapCenter({ lat: location.lat, lng: location.lng });
      } else {
        message.warning('Can not get position');
      }
    } catch (error) {
      console.error('Search Failed:', error);
      message.error('System Error');
    }
  };

  const handlePlaceSelect = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (!place.geometry || !place.address_components) {
        message.warning('Please select a valid location');
        return;
      }

      const lat = place.geometry.location?.lat();
      const lng = place.geometry.location?.lng();
      setMapCenter({ lat, lng });

      // 提取城市
      let selectedCity = '';

      place.address_components.forEach((component) => {
        if (component.types.includes('locality')) {
          selectedCity = component.long_name;
        }
      });

      setCity(selectedCity);
    }
  };

  return (
    <div style={{ padding: 40, minHeight: '100vh', background: '#f5f5f5' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 20 }}>UV Index Search</Title>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px' }}>
        <div style={{ flex: 1, maxWidth: 400 }}>
          <Card style={{ padding: 20, borderRadius: 10, boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              {isLoaded ? (
                <Autocomplete
                  onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                  onPlaceChanged={handlePlaceSelect}
                >
                  <Input
                    placeholder="Enter City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    style={{ height: 40 }}
                  />
                </Autocomplete>
              ) : (
                <Input
                  placeholder="Enter City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  style={{ height: 40 }}
                />
              )}
              <Button type="primary" block onClick={handleSearch} style={{ height: 40 }}>
                Search UV Index
              </Button>
            </Space>
          </Card>

          {uvData && (
            <Card style={{ marginTop: 20, borderRadius: 8, background: '#e6f7ff', textAlign: 'center' }}>
              <Title level={4} style={{ marginBottom: 10 }}>UV Index Result</Title>
              <Text strong>City: </Text><Text>{city}</Text><br />
              <Text strong>UV Index: </Text><Text style={{ fontSize: 20, color: '#1890ff' }}>{uvData.uvIndex}</Text>
            </Card>
          )}
        </div>

        <div style={{ flex: 2, minWidth: 400 }}>
          <Title level={3} style={{ textAlign: 'center' }}>Location on Map</Title>
          {loadError ? <p>Map load Failed</p> : !isLoaded ? <Spin tip="Loading..." /> : (
            <GoogleMap mapContainerStyle={mapContainerStyle} zoom={12} center={mapCenter}>
              <Marker position={mapCenter} />
            </GoogleMap>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
