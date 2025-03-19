import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Modal, List, Spin, message } from 'antd';
import { getProductListUsingGet, getProductVoByIdUsingGet } from '@/services/sun-protection/productionController';

const { Search } = Input;

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalLoading, setModalLoading] = useState(false); 

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await getProductListUsingGet();

        if (response?.data && Array.isArray(response.data)) {
          setProducts(response.data.map(product => ({
            ...product,
            picture: product.picture && product.picture.startsWith("http")
              ? product.picture
              : `https://your-backend.com/${product.picture || "default-image.jpg"}`
          }))); 
        } else {
          message.warning('No product data received');
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

  const fetchProductDetails = async (id: number) => {
    setModalLoading(true);
    try {
      const response = await getProductVoByIdUsingGet({ id });

      if (response?.data) {
        setSelectedProduct({
          ...response.data,
          picture: response.data.picture && response.data.picture.startsWith("http")
            ? response.data.picture
            : `https://your-backend.com/${response.data.picture || "default-image.jpg"}`
        });
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

  const filteredProducts = searchTerm
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;

  return (
    <div style={{ padding: 20, maxWidth: 1200, margin: 'auto' }}>
      <h1 style={{ textAlign: 'center' }}>Product List</h1>


      {/* 商品列表 - 去掉固定高度，让商品自然排列 */}
      {loading ? (
        <div style={{ textAlign: 'center', marginTop: 50 }}>
          <Spin size="large" />
        </div>
      ) : (
        <List
          grid={{ gutter: 16, column: 4 }} // ✅ 让商品横向排列更均匀
          dataSource={filteredProducts.length > 0 ? filteredProducts : [{ id: 0, name: 'No Products Available', price: 0, picture: '' }]}
          renderItem={(product) => {
            const imageUrl = product.picture?.startsWith("http")
              ? product.picture
              : `https://your-backend.com/${product.picture}`;

            return (
              <List.Item>
                <Card
                  title={product.name}
                  bordered
                  hoverable
                  cover={
                    <img
                      alt={product.name}
                      src={imageUrl}
                      style={{ height: 180, objectFit: 'cover' }}
                      onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/180")}
                    />
                  }
                  style={{ textAlign: 'center', width: '100%' }}
                  onClick={() => fetchProductDetails(product.id)}
                >
                  <p>Price: ${product.price.toFixed(2)}</p>
                  <Button type="primary">Check Details</Button>
                </Card>
              </List.Item>
            );
          }}
        />
      )}

      {/* 商品详情弹窗 */}
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
            <img 
              src={selectedProduct?.picture} 
              alt={selectedProduct?.name} 
              style={{ width: '40%', maxHeight: 300, objectFit: 'cover', borderRadius: 8 }} 
            />
            <h3>Price: ${selectedProduct?.price.toFixed(2)}</h3>
            <p><strong>Category:</strong> {selectedProduct?.category}</p>
            <p><strong>Description:</strong> {selectedProduct?.detail}</p>
          </>
        )}
      </Modal>
    </div>
  );
};

export default ProductPage;
