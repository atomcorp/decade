import React, {Suspense} from 'react';

import Routes from 'components/Routes';
import css from './Home.module.css';

const Home: React.FC = () => (
  <>
    <section className={css.container}>
      <h1 className={css.title}>2010s</h1>
      <Suspense fallback={<div>Loading</div>}>
        <Routes />
      </Suspense>
    </section>
  </>
);

export default Home;
