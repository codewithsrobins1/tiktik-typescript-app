import { VideoCard } from '../components/VideoCard';
import { NoResults } from '../components/NoResults';
import { Video } from '../types';
import axios from 'axios';
import { BASE_URL } from '../utils/index';

interface IProps {
  videos: Video[];
}

const Home = ({ videos }: IProps) => {
  return (
    <div className="flex flex-col gap-10 videos h-full">
      {videos.length ? (
        videos.map((video) => (
          <VideoCard post={video} key={video._id} />
        ))
      ) : (
          <NoResults text={'No videos'} />
      )}
    </div>
  );
};

// NextJs will prerender this page on each request using the data returned
export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
  }) => {
  let response = null;

  if (topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  } else {
    response = await axios.get(`${BASE_URL}/api/post`);
  }

  return {
    props: {
      videos: response.data,
    }
  };
};

export default Home;
