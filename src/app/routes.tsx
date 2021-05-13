import { Switch, Route } from "react-router-dom";

import Applications from "../features/application/Applications";
import DesignerRoot from "../features/application/DesignerRoot";
import SectionDesigner from "../features/application/SectionDesigner";

const Routes = () => (
  <Switch>
    <Route path="/" exact>
      <Applications />
    </Route>
    <Route path="/applications/:applicationId" exact>
      <DesignerRoot />
    </Route>
    <Route path="/sections/:sectionId" exact>
      <SectionDesigner />
    </Route>
  </Switch>
);

export default Routes;
