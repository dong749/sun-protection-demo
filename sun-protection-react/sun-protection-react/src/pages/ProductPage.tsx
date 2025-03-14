import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Modal, List, Spin, message } from 'antd';
import { getProductListUsingGet, getProductVoByIdUsingGet } from '@/services/sun-protection/productionController'; // 确保路径正确

const { Search } = Input;

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalLoading, setModalLoading] = useState(false); 

  // 发送请求获取数据
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await getProductListUsingGet();

        if (response?.data) {
          setProducts(response.data); 
        } else {
          message.warning('Can not get product details');
        }
      } catch (error) {
        message.error('Can not get product details');
        console.error('Error: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); 

  // 获取单个商品详情
  const fetchProductDetails = async (id: number) => {
    setModalLoading(true);
    try {
      const response = await getProductVoByIdUsingGet({ id });

      if (response?.data) {
        setSelectedProduct(response.data);
      } else {
        message.warning('Can not get product details');
      }
    } catch (error) {
      message.error('Load Failed');
      console.error('Can not get product details:', error);
    } finally {
      setModalLoading(false);
    }
  };

  // 过滤商品（搜索功能）
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: 'auto' }}>
      <h1 style={{ textAlign: 'center' }}>Product List</h1>

      {/* 搜索框 */}
      <Search
        placeholder="Search"
        enterButton
        onSearch={(value) => setSearchTerm(value)}
        style={{ marginBottom: 20 }}
      />

      {/* 加载状态 */}
      {loading ? (
        <div style={{ textAlign: 'center', marginTop: 50 }}>
          <Spin size="large" />
        </div>
      ) : (
        <List
          grid={{ gutter: 16, column: 2 }}
          dataSource={filteredProducts}
          renderItem={(product) => (
            <List.Item>
              <Card
                title={product.name}
                bordered
                hoverable
                style={{ textAlign: 'center' }}
                onClick={() => fetchProductDetails(product.id)}
              >
                <p>Price: ${product.price}</p>
                <Button type="primary">Check Details</Button>
              </Card>
            </List.Item>
          )}
        />
      )}

      <Modal
        title={selectedProduct?.name}
        open={!!selectedProduct}
        onCancel={() => setSelectedProduct(null)}
        footer={null}
      >
        {modalLoading ? (
          <Spin tip="Loading..." />
        ) : (
          <>
            <p>{selectedProduct?.description}</p>
            <p>Price: ${selectedProduct?.price}</p>
          </>
        )}
      </Modal>
    </div>
  );
};

export default ProductPage;
