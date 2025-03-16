import React, { useEffect, useState } from 'react';
import { Typography, Alert, Spin, message, Card, Row, Col } from 'antd';
import { getUvIndexByLatAndLonUsingGet } from '../services/sun-protection/uvController'; // Ensure API function exists
import { Line } from 'react-chartjs-2';
import { getDataUsingGet } from '../services/sun-protection/melanmaSkinCancerController';
import 'chart.js/auto';

const { Text, Title, Paragraph } = Typography;

// UV Index Levels and Recommendations
const uvLevels = [
  { min: 0, max: 2.9999, level: 'Low (0-2)', color: 'green' },
  { min: 3, max: 5.9999, level: 'Moderate (3-5)', color: 'blue' },
  { min: 6, max: 7.9999, level: 'High (6-7)', color: 'orange' },
  { min: 8, max: 10.9999, level: 'Very High (8-10)', color: 'red' },
  { min: 11, max: 99.9999, level: 'Extreme (11+)', color: 'purple' },
];

const UvDangerInfoPage: React.FC = () => {
  const [uvIndex, setUvIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await getUvIndexByLatAndLonUsingGet({ lat: latitude, lon: longitude });
            if (response && response.uvIndex !== undefined) {
              setUvIndex(response.uvIndex);
            } else {
              message.warning('UV index data unavailable.');
            }
          } catch (error) {
            message.error('Failed to fetch UV index.');
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          message.error('Failed to get location: ' + error.message);
          setLoading(false);
        }
      );
    } else {
      message.error('Geolocation is not supported by this browser.');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await getDataUsingGet();
        if (response && response.data) {
          const labels = response.data.map((entry: any) => new Date(entry.year).getFullYear());
          const dataPoints = response.data.map((entry: any) => parseInt(entry.count, 10));

          setChartData({
            labels,
            datasets: [
              {
                label: 'Melanoma Skin Cancer Cases Over Years',
                data: dataPoints,
                fill: false,
                borderColor: 'blue',
                backgroundColor: 'rgba(0, 0, 255, 0.2)',
                tension: 0.1,
              },
            ],
          });
        }
      } catch (error) {
        message.error('Failed to fetch chart data.');
      }
    };
    fetchChartData();
  }, []);

  const currentUvLevel = uvLevels.find((level) => uvIndex !== null && uvIndex >= level.min && uvIndex <= level.max);

  return (
    <div style={{ width: '100%', padding: '10px', background: '#f9f9f9', minHeight: '100vh' }}>
      {loading ? (
        <Spin size="small" style={{ display: 'block', marginBottom: '10px' }} />
      ) : uvIndex !== null ? (
        <Alert
          message={`Current Location UV Index: ${uvIndex} (${currentUvLevel?.level || 'Unknown'})`}
          type="warning"
          showIcon
          style={{
            marginBottom: '10px',
            padding: '10px',
            fontSize: '14px',
            borderLeft: `5px solid ${currentUvLevel?.color}`,
          }}
        />
      ) : (
        <Text style={{ color: 'red', display: 'block', marginBottom: '10px' }}>
          Failed to retrieve UV index.
        </Text>
      )}

      <div>
        <Text strong>Welcome to the UV Protection Page</Text>
        <p>Here, you can find information about sun protection, tips, and more.</p>
      </div>

      <Row gutter={[20, 20]} style={{ marginTop: 30 }}>
        <Col xs={24} md={12}>
          {chartData ? (
            <Line data={chartData} />
          ) : (
            <Spin size="large" style={{ display: 'block', marginTop: '10px' }} />
          )}
        </Col>
        <Col xs={24} md={12}>
          <Card style={{ padding: 20, background: '#fffbe6', borderRadius: 8 }}>
            <Title level={4}>Why is UV Radiation Dangerous?</Title>
            <Paragraph>
              Too much UV radiation from the sun or sunbeds can damage the DNA in our skin cells. DNA tells our cells how to function.
              If enough DNA damage builds up over time, it can cause cells to grow out of control, which can lead to skin cancer.
            </Paragraph>
            <Paragraph>
              Anyone can develop skin cancer, regardless of their skin type. Protecting yourself from excessive UV exposure is essential
              for reducing the risk. Use sunscreen, wear protective clothing, and avoid direct sun exposure during peak hours.
            </Paragraph>
          </Card>
        </Col>
      </Row>
      <div>
  <h3>Sun Protection Tips</h3>
  <a href="https://www.fda.gov/consumers/consumer-updates/tips-stay-safe-sun-sunscreen-sunglasses" target="_blank" rel="noopener noreferrer">
    FDA Sun Protection Tips
  </a>
  <br />
  <a href="https://www.cancer.org.au/cancer-information/causes-and-prevention/sun-safety" target="_blank" rel="noopener noreferrer">
    Cancer Council Sun Safety
  </a>
  <br />
  <a href="https://www.laroche-posay.com.au/blog/sun-protection-tips-for-all-year-round.html" target="_blank" rel="noopener noreferrer">
    La Roche-Posay Sun Protection Guide
  </a>
</div>

    </div>
  );
};

export default UvDangerInfoPage;