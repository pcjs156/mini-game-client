import { useAuthStore } from "../stores/auth";

export default function Lounge() {
  const { loginUser } = useAuthStore();
  return (
    <div>
      <h1>Current User: {loginUser!.nickname}</h1>
    </div>
  );
}
