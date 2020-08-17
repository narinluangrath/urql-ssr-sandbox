import React from 'react';
import { useQuery } from 'urql';

const query = `
{
  Media(id: 1) {
    id
  }
}
`;

const Index = () => { 
  const [res] = useQuery({ query });
  return <pre>{JSON.stringify(res, null, 2)}</pre>;
}

export default Index;