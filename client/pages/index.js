import React from 'react';
import { useQuery } from 'urql';

const query = `
{
  Text
}
`;

const Index = () => { 
  const [res] = useQuery({ query });
  return <pre>{JSON.stringify(res, null, 2)}</pre>;
}

export default Index;