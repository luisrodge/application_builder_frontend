import { Switch, Route } from "react-router-dom";

import DesignerRoot from "../features/designer/DesignerRoot";
import SectionDesigner from "../features/designer/SectionDesigner";

const Routes = () => (
  <Switch>
    <Route path="/" exact>
      <DesignerRoot />
    </Route>
    <Route path="/sections/:sectionId" exact>
      <SectionDesigner />
    </Route>
  </Switch>
);

export default Routes;
