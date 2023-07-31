import { useParams } from 'react-router-dom';

interface SearchpageProps {}

const Searchpage = ({}: SearchpageProps) => {
  const { query } = useParams();

  return <>{query}</>;
};

export default Searchpage;
