import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="text-center">
      <h1 className="text-3xl">Welcome to the Todo Application</h1>
      <p>
        Get started by navigating to the <Link to="/tasks" className="text-blue-500">Tasks</Link> page.
      </p>
    </div>
  );
};

export default Index;