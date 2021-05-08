import { Switch, Route } from "react-router-dom";

import Designer from "../features/designer/Designer";

const Routes = () => (
  <Switch>
    <Route path="/" exact>
      <Designer />
    </Route>
  </Switch>
);

export default Routes;
