import { Switch, Route } from "react-router-dom";

import ApplicationList from "../features/applications/views/ApplicationList";
import ApplicationDesigner from "../features/applications/views/ApplicationDesigner";
import SectionDesigner from "../features/applications/views/SectionDesigner";

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
