import React, { useState } from 'react';
import { Radio, Typography, Alert } from 'antd';

const { Title, Text } = Typography;

const skinTypes = [
  { key: 'very-fair', label: 'Very fair skin that burns easily', risk: '🔥 Very high UV risk, it is recommended to avoid direct sunlight and use SPF 50+ sunscreen!' },
  { key: 'medium', label: 'Relatively dark white skin', risk: '🌞 High UV risk, use SPF 30+ sunscreen and shade appropriately.' },
  { key: 'olive', label: 'Olive or light brown skin', risk: '🌤️ Moderate UV risk, SPF 15+ sunscreen is recommended to avoid prolonged exposure.' },
];

const SkinTypePage: React.FC = () => {
  const [selectedSkin, setSelectedSkin] = useState<string | null>(null);

  const selectedRisk = skinTypes.find((type) => type.key === selectedSkin)?.risk || '';

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20, textAlign: 'center' }}>
      <Title level={2}>Select Your Skin Type</Title>
      <Text>Depending on your skin type, we will provide UV protection recommendations.</Text>

      <Radio.Group
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20 }}
        onChange={(e) => setSelectedSkin(e.target.value)}
        value={selectedSkin}
      >
        {skinTypes.map((type) => (
          <Radio key={type.key} value={type.key} style={{ marginBottom: 10 }}>
            {type.label}
          </Radio>
        ))}
      </Radio.Group>

      {selectedSkin && (
        <Alert
          message="UV Risk Notification"
          description={selectedRisk}
          type="warning"
          showIcon
          style={{ marginTop: 20 }}
        />
      )}
    </div>
  );
};

export default SkinTypePage;
