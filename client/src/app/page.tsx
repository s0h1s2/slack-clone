import AuthScreen from "@/features/auth/components/AuthScreen";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Home() {
  return (
    <>
      <AuthScreen />
      <ToastContainer />
    </>
  );
}
