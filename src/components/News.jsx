import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

import { useGetCryptosQuery } from '../services/cryptoApi';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import Loader from './Loader';

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({simplified}) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const { data } = useGetCryptosQuery(100);
  const count=simplified?6:12;
  const{data:cryptoData,isFetching,error}=useGetCryptoNewsQuery({newsCategory,count:count});
  const cryptoNewsArray=cryptoData?.data;
  if(isFetching)return <Loader/>
  console.log(cryptoNewsArray)
  return (
    <Row gutter={[24, 24]}>
     {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="Cryptocurency">Cryptocurrency</Option>
            {data?.data?.coins?.map((currency) => <Option value={currency.name}> {currency.name}</Option>)}
          </Select>
        </Col>
      )}
    {cryptoNewsArray?.map((news, i) => (
      <Col xs={24} sm={12} lg={8} key={i}>
        <Card hoverable className="news-card">
          <a href={news.source_url} target="_blank" rel="noreferrer">
            <div className="news-image-container">
              <Title className="news-title" level={4}>{news.title}</Title>
              <img src={news.source_favicon_url|| demoImage} alt="" />
            </div>
            {/* <p>{news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}</p> */}
            <div className="provider-container">
              <div>
                <Avatar src={news.source_logo_url || demoImage} alt="" />
                <Text className="provider-name">{news.name}</Text>
              </div>
              <Text>{moment(news.published_datetime_ut).startOf('ss').fromNow()}</Text>
            </div>
          </a>
        </Card>
      </Col>
    ))}
  </Row>
  )
}

export default News
