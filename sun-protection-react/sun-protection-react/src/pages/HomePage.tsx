import React, { useState } from 'react';
import { Input, Button, Space, message } from 'antd';
import { getUvIndexUsingGet } from '../services/sun-protection/uvController';

const HomePage: React.FC = () => {
  const [city, setCity] = useState('');
  const [region, setRegion] = useState('');
  const [uvData, setUvData] = useState<{ uvIndex: number; description: string } | null>(null);

  const handleSearch = async () => {
    if (!city || !region) {
      message.warning('请输入城市和地区');
      return;
    }

    try {
      const response = await getUvIndexUsingGet({ city, region });
      console.log('后端返回的 UV 数据:', response);

      if (response) {
        setUvData(response);
        message.success('搜索成功！');
      } else {
        message.warning('未获取到 UV 指数数据');
      }
    } catch (error) {
      console.error('搜索失败:', error);
      message.error('搜索失败，请稍后重试');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>UV Search</h1>
      <Space direction="vertical" size="middle">
        <Input
          placeholder="Please enter a City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ width: 300 }}
        />
        <Input
          placeholder="Please enter a district"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          style={{ width: 300 }}
        />
        <Button type="primary" onClick={handleSearch}>
          Search UV Index
        </Button>
      </Space>

      {uvData && (
        <div style={{ marginTop: 20, padding: 10, border: '1px solid #ddd', borderRadius: 5 }}>
          <h3>UV searching result: </h3>
          <p><strong>City: </strong>{city}</p>
          <p><strong>Region: </strong>{region}</p>
          <p><strong>UV Index: </strong>{uvData.uvIndex}</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
