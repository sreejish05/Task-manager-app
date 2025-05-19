import React from 'react';

interface TweetStatsProps {
  totalFetched: number;
  totalFiltered: number;
}

const TweetStats: React.FC<TweetStatsProps> = ({ totalFetched, totalFiltered }) => {
  return (
    <div style={{ marginBottom: '1rem', color: '#333' }}>
      <p>Tweets fetched from API: {totalFetched}</p>
      <p>Tweets matching keyword: {totalFiltered}</p>
    </div>
  );
};

export default TweetStats;
