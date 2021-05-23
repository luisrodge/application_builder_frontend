import { Switch, Route } from "react-router-dom";

import ApplicationList from "../features/applications/ApplicationList";
import ApplicationDesigner from "../features/applications/ApplicationDesigner";
import SectionDesigner from "../features/applications/SectionDesigner";
import Apply from "../features/apply/Apply";
import ApplySuccess from "../features/apply/ApplySuccess";
import SimpleHome from "../components/SimpleHome";

const Routes = () => (
  <Switch>
    <Route path="/" exact>
      <SimpleHome />
    </Route>
    <Route path="/applications" exact>
      <ApplicationList />
    </Route>
    <Route path="/applications/:applicationId" exact>
      <ApplicationDesigner />
    </Route>
    <Route path="/applications/:applicationId/sections/:sectionId" exact>
      <SectionDesigner />
    </Route>
    <Route path="/applications/:applicationId/apply" exact>
      <Apply />
    </Route>
    <Route path="/apply/success" exact>
      <ApplySuccess />
    </Route>
  </Switch>
);

export default Routes;
