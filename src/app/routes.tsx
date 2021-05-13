import { Switch, Route } from "react-router-dom";

import Applications from "../features/applications/Applications";
import DesignerRoot from "../features/applications/DesignerRoot";
import SectionDesigner from "../features/applications/SectionDesigner";

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
