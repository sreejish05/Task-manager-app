import React, { useState } from 'react';
import SearchButton from '../components/SearchButton'; 
import TweetCard from '../components/TweetCard';
import TweetStats from '../components/TweetStats';
import { tweetsOptions, fetchData } from '../api/fetchData';

interface Tweet {
  text: string;
  user: {
    username: string;
    name: string;
  };
  created_at: string;
}

const TweetsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [filteredTweets, setFilteredTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (searchTerm.trim()) {
      setLoading(true);
      try {
        const encodedQuery = encodeURIComponent(searchTerm);
        const url = `https://twitter-api45.p.rapidapi.com/search.php?query=${encodedQuery}&search_type=Top`;
        const tweetsData = await fetchData(url, tweetsOptions);

        if (Array.isArray(tweetsData?.timeline)) {
          const allTweets = tweetsData.timeline
            .filter((t: any) => t.type === 'tweet')
            .map((t: any) => ({
              text: t.text,
              created_at: t.created_at,
              user: {
                username: t.screen_name,
                name: t.screen_name,
              },
            }));

          const matchedTweets = allTweets.filter((tweet: Tweet) =>
            tweet.text.toLowerCase().includes(searchTerm.toLowerCase())
          );

          setTweets(allTweets);
          setFilteredTweets(matchedTweets);
        } else {
          setTweets([]);
          setFilteredTweets([]);
        }
      } catch (error) {
        console.error('Search failed', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <SearchButton
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onSearchClick={handleSearch}
      />

      {loading && <p style={{ marginTop: '1rem' }}>Loading tweets...</p>}

      {!loading && tweets.length > 0 && (
        <TweetStats
          totalFetched={tweets.length}
          totalFiltered={filteredTweets.length}
        />
      )}

      <div style={{ marginTop: '1rem' }}>
        {filteredTweets.map((tweet, index) => (
          <TweetCard key={index} tweet={tweet} />
        ))}
      </div>
    </div>
  );
};

export default TweetsPage;
