import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Card, Button, Row, Col } from 'antd';
import { IconFont } from 'components/icon-font';
import './home.scss';

const { Meta } = Card;

interface HomeProps extends RouteComponentProps {
  status: string;
  onLeaveOrJoinSession: () => void;
}

const Home: React.FunctionComponent<HomeProps> = (props) => {
  const { history, status, onLeaveOrJoinSession } = props;

  const onCardClick = (type: string) => {
    history.push(`/${type}${location.search}`);
  };

  const featureList = [
    {
      key: 'video',
      icon: 'icon-meeting',
      title: 'Audio, video and share',
      description: 'Gallery Layout, Start/Stop Audio, Mute/Unmute, Start/Stop Video, Start/Stop Screen Share'
    },
    {
      key: 'preview',
      icon: 'icon-meeting',
      title: 'Local Preview',
      description: 'Audio and Video preview'
    }
  ];

  const actionText = status === 'connected' ? 'Leave' : status === 'closed' ? 'Join' : null;

  return (
    <div>
      <div className="nav">
        <a href="/" className="navhome">
          <span>VideoSDK Demo</span>
        </a>
        <div className="navdoc"></div>
        {actionText && (
          <Button type="link" className="navleave" onClick={onLeaveOrJoinSession}>
            {actionText}
          </Button>
        )}
      </div>

      <div className="home">
        <h1>Zoom Video SDK Features</h1>
        <div className="feature-entry">
          {featureList.map((feature) => {
            const { key, icon, title, description } = feature;
            return (
              <Card
                cover={<IconFont style={{ fontSize: '72px' }} type={icon} />}
                hoverable
                className="entry-item"
                key={key}
                onClick={() => onCardClick(key)}
              >
                <Meta title={title} description={description} />
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
