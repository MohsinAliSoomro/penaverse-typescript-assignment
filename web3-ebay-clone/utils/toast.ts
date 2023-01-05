import { toast } from "react-hot-toast";
export const toastMessage = (fun: any, message: string = "Success") => {
  toast.promise(
    fun,
    {
      loading: "Loading...!",
      success: message,
      error: (error) => error.message,
    },
    {
      style: {
        border: "1px solid #2563eb",
        padding: "16px",
        color: "#FFFAEE",
        backgroundImage: "linear-gradient(to right, #0c4a6e, #0284c7,#38bdf8)",
      },
      iconTheme: {
        primary: "#93c5fd",
        secondary: "#FFFAEE",
      },
    }
  );
};
