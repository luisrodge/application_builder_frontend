import { Switch, Route } from "react-router-dom";

import ApplicationList from "../features/applications/ApplicationList";
import ApplicationDesigner from "../features/applications/ApplicationDesigner";
import SectionDesigner from "../features/applications/SectionDesigner";

const Routes = () => (
  <Switch>
    <Route path="/" exact>
      <ApplicationList />
    </Route>
    <Route path="/applications/:applicationId" exact>
      <ApplicationDesigner />
    </Route>
    <Route path="/applications/:applicationId/sections/:sectionId" exact>
      <SectionDesigner />
    </Route>
  </Switch>
);

export default Routes;
