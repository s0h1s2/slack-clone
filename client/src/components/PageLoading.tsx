import { LoaderCircle } from "lucide-react";
const PageLoading = () => {
  return (
    <div className="min-h-full flex items-center justify-center">
      <LoaderCircle className="animate-spin size-12" />
    </div>
  );
};

export default PageLoading;
