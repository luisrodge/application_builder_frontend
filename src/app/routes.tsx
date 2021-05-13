import { Switch, Route } from "react-router-dom";

import DesignerRoot from "../features/application/DesignerRoot";
import SectionDesigner from "../features/application/SectionDesigner";
import ApplyRoot from "../features/apply/ApplyRoot";

const Routes = () => (
  <Switch>
    <Route path="/" exact>
      <DesignerRoot />
    </Route>
    <Route path="/sections/:sectionId" exact>
      <SectionDesigner />
    </Route>
    <Route path="/:applicationId/apply" exact>
      <ApplyRoot />
    </Route>
  </Switch>
);

export default Routes;
