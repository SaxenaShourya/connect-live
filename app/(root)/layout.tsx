import { ReactNode } from "react";
import { Nunito } from "next/font/google";
const nunito = Nunito({ subsets: ["latin"], weight: "700" });

import StreamVideoClientProvider from "@/providers/StreamVideoClientProvider";
import "@stream-io/video-react-sdk/dist/css/styles.css";

import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3500}
        draggable
        pauseOnHover={false}
        theme="dark"
        transition={Slide}
        toastClassName="max-w-xs ml-16 sm:ml-0 mb-2"
        bodyClassName={`${nunito.className} text-sm`}
      />
      <StreamVideoClientProvider>{children}</StreamVideoClientProvider>
    </>
  );
};

export default RootLayout;
