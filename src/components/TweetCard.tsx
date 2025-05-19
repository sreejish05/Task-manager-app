import React from 'react';
import './TaskCard.css';

interface Tweet {
  text: string;
  user: {
    username: string;
    name: string;
  };
  created_at: string;
}

const TweetCard: React.FC<{ tweet: Tweet }> = ({ tweet }) => {
  return (
    <div className="tweet-card">
      <p className="tweet-username"><strong>@{tweet.user.username}</strong></p>
      <p className="tweet-text">{tweet.text}</p>
      <p className="tweet-date">{new Date(tweet.created_at).toLocaleString()}</p>
    </div>
  );
};

export default TweetCard;
