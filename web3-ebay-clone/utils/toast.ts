import { toast } from "react-hot-toast";

const options = {
  style: {
    border: "1px solid #F7CE68",
    padding: "16px",
    color: "#FFFAEE",
    backgroundImage: "linear-gradient(to right, #F7CE68, #FBAB7E)",
  },
  iconTheme: {
    primary: "#FBAB7E",
    secondary: "#FFFAEE",
  },
};
export const toastMessage = (fun: any, message: string = "Success") => {
  toast.dismiss();
  toast.promise(
    fun,
    {
      loading: "Loading...!",
      success: message,
      error: (error) => error.message,
    },
    options
  );
};

export const toastLoading = () => {
  toast.loading("Loading...!", options);
};

export const toastError = (message?: string) => {
  toast.dismiss();
  toast.error(`Opps! Something wrong...! ${message}`, options);
};

export const toastSuccess = (message: string) => {
  toast.dismiss();
  toast.success(message, options);
};
