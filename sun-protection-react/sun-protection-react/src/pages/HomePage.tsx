import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ 导入路由跳转
import './HomePage.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate(); // ✅ 使用 `useNavigate` 进行导航

  return (
    <div className="homepage-container">
      <h1>Welcome to Sun Protection</h1>
      <p>In Here You Can Get More Information About UV And Sun Protection Tips</p>

      {/* ✅ 导航按钮 */}
      <button className="navigate-button" onClick={() => navigate('/uv-index')}>
        Go to UV Search
      </button>
    </div>
  );
};

export default HomePage;
