import React, {Suspense} from 'react';

import Routes from 'components/Routes';

const Home: React.FC = () => (
  <section>
    <h1>2010s</h1>
    <Suspense fallback={<div>Loading</div>}>
      <Routes />
    </Suspense>
  </section>
);

export default Home;
