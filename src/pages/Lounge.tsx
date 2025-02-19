import { useAuth } from "../hooks/useAuth";

export default function Lounge() {
  const { loginUser } = useAuth();
  return (
    <div>
      <h1>Current User: {loginUser!.nickname}</h1>
    </div>
  );
}
