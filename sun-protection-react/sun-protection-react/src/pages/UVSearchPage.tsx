import React, { useState, useEffect, useRef } from 'react';
import { Input, Button, Space, message, Typography, Spin } from 'antd';
import { useNavigate } from 'react-router-dom'; // ✅ 导入 useNavigate 进行页面跳转
import { getUvIndexUsingGet } from '../services/sun-protection/uvController';
import { GoogleMap, Marker, useLoadScript, Autocomplete } from '@react-google-maps/api';

const { Title, Text } = Typography;

const mapContainerStyle = {
  width: '100%',
  height: '500px',
};

const defaultCenter = { lat: -37.8136, lng: 144.9631 };

const UVSearchPage: React.FC = () => {
  const [city, setCity] = useState('');
  const [uvData, setUvData] = useState<{ uvIndex: number; description: string } | null>(null);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>(defaultCenter);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const navigate = useNavigate(); // ✅ 通过 useNavigate 进行跳转

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyC7kxXvgXamZNKYN18r_r-SfomspXYwdoo',
    libraries: ['places'],
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
      if (response) {
        setUvData(response);
        message.success('Search Successfully');
      } else {
        message.warning('Can not get UV index');
      }

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
    <div style={{ padding: 20, minHeight: '100vh', background: '#f5f5f5' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 10 }}>UV Index Search</Title>
      <Space direction="horizontal" size="middle" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        {isLoaded ? (
          <Autocomplete onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)} onPlaceChanged={handlePlaceSelect}>
            <Input
              placeholder="Enter City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={{ width: 300, height: 40 }}
            />
          </Autocomplete>
        ) : (
          <Input placeholder="Enter City" value={city} onChange={(e) => setCity(e.target.value)} style={{ width: 300, height: 40 }} />
        )}
        <Button type="primary" onClick={handleSearch} style={{ height: 40 }}>Search UV Index</Button>
      </Space>

      <div style={{ marginTop: 20 }}>
        {loadError ? (
          <p>Map load Failed</p>
        ) : !isLoaded ? (
          <Spin tip="Loading..." />
        ) : (
          <GoogleMap mapContainerStyle={mapContainerStyle} zoom={12} center={mapCenter}>
            <Marker position={mapCenter} />
          </GoogleMap>
        )}
      </div>

      {uvData && (
        <div style={{ textAlign: 'center', marginTop: 20, padding: 10, background: '#e6f7ff', borderRadius: 8 }}>
          <Title level={4} style={{ marginBottom: 10 }}>UV Index Result</Title>
          <Text strong>Current UV Index You Search: </Text>
          <Text style={{ fontSize: 20, color: '#1890ff' }}>{uvData.uvIndex}</Text>

          {/* ✅ 添加跳转到 PersonalizedRiskPage 的按钮 */}
          <div style={{ marginTop: 20 }}>
            <Button type="primary" onClick={() => navigate('/personalized-risk')} style={{ height: 40 }}>
              Go to Personalized Risk Page
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UVSearchPage;
