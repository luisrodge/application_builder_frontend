import { Switch, Route } from "react-router-dom";

import Designer from "../features/designer/Designer";
import SectionDesigner from "../features/designer/SectionDesigner";

const Routes = () => (
  <Switch>
    <Route path="/" exact>
      <Designer />
    </Route>
    <Route path="/sections/:sectionId" exact>
      <SectionDesigner />
    </Route>
  </Switch>
);

export default Routes;
