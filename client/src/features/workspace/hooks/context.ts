import React from "react";
import { CurrentWorksapce } from "../types";

export const CurrentWorkspaceContext =
  React.createContext<CurrentWorksapce | null>(null);
