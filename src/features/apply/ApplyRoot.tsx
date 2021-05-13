import { useParams } from "react-router";

const ApplyRoot = () => {
  const { applicationId } = useParams<{ applicationId: string }>();

  return <h2>Apply {applicationId}</h2>;
};

export default ApplyRoot;
