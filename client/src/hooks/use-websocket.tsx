import { HubConnectionBuilder } from "@microsoft/signalr";

const baseUrl: string = import.meta.env.VITE_BASE_WEBSOCKET;
import React, { createContext, useContext, useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

const RealtimeContext = createContext<signalR.HubConnection | null>(null);
export const useRealtimeConnection = () => {
  const context = useContext(RealtimeContext);
  if (!context)
    throw new Error(
      "Error: useRealtimeConnect must be used inside RealtimeContext"
    );
  return context;
};

export const RealtimeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null
  );

  useEffect(() => {
    const conn = new HubConnectionBuilder()
      .withUrl(baseUrl + "/channels", {
        withCredentials: false,
      })
      .withAutomaticReconnect()
      .build();
    setConnection(conn);
    conn
      .start()
      .then(() => {})
      .catch((e) => console.log(e));
    return () => {
      conn
        .stop()
        .then(() => {
          console.log("disconnected from websocket");
        })
        .catch((e) => {
          console.log("Unable to disconnect from websocket", e);
        });
    };
  }, []);

  return (
    <RealtimeContext.Provider value={connection}>
      {children}
    </RealtimeContext.Provider>
  );
};
