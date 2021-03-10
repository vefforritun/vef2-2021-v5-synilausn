import { Route, Switch } from 'react-router-dom';

import { Layout } from './components/layout/Layout';

import { Index } from './pages/Index';
import { NewsPage } from './pages/News';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <Layout title="RÚV fréttir" footer={
      <p>Fréttir frá <a href="https://www.ruv.is/">RÚV</a>.</p>
    }>
      <Switch>
        <Route exact path="/">
          <Index />
        </Route>
        <Route exact path="/:id" children={<NewsPage />} />
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
}
