import {
  ChatData,
  ChatError,
  ChatResponse,
  GetSessionDetailsError,
  GetSessionDetailsResponse,
  ReleaseBrowserSessionResponse,
  ReleaseBrowserSessionsError,
  ScreenshotError,
  ScreenshotResponse2,
} from "@/steel-client";
import { ReactNode } from "react";
import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";

export type SessionsContextType = {
  useReleaseSessionMutation: () => UseMutationResult<
    ReleaseBrowserSessionResponse,
    ReleaseBrowserSessionsError,
    string,
    unknown
  >;
  useSession: (
    id: string
  ) => UseQueryResult<GetSessionDetailsResponse | null, GetSessionDetailsError>;
  useScreenshot: () => UseMutationResult<
    ScreenshotResponse2,
    ScreenshotError,
    { url: string },
    unknown
  >;
  useChatMutation: () => UseMutationResult<
    ChatResponse,
    ChatError,
    ChatData["body"],
    unknown
  >;
  useAgenticTaskMutation: () => UseMutationResult<
    AgenticTaskResponse,
    AgenticTaskError,
    { sessionId: string },
    unknown
  >;
};

export type SessionsProviderProps = {
  children: ReactNode;
};
