import { createContext, useState } from "react";
import {
  SessionsContextType,
  SessionsProviderProps,
} from "./sessions-context.types";
import {
  getSessions,
  getSessionDetails,
  GetSessionDetailsResponse,
  releaseBrowserSession,
  ReleaseBrowserSessionResponse,
  ReleaseBrowserSessionsError,
  SessionDetails,
  screenshot,
  ScreenshotError,
  ScreenshotResponse2,
  chat,
  ChatData,
  ChatError,
  ChatResponse,
  agenticTask,
  AgenticTaskData,
  AgenticTaskError,
  AgenticTaskResponse,
} from "@/steel-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { ErrorResponse } from "@remix-run/router";

export const SessionsContext = createContext<SessionsContextType | undefined>(
  undefined
);

export function SessionsProvider({
  children,
}: SessionsProviderProps): JSX.Element {
  const [currentSession, setCurrentSession] =
    useState<GetSessionDetailsResponse | null>(null);

  const useSession = (id: string) =>
    useQuery<SessionDetails, ErrorResponse>({
      queryKey: ["session", id],
      queryFn: async () => {
        if (!id) {
          const { error, data } = await getSessions();
          if (error || !data) {
            throw error;
          }
          return data[0];
        }
        const { error, data } = await getSessionDetails({
          path: {
            sessionId: id,
          },
        });
        if (error || !data) {
          throw error;
        }
        return data;
      },
      retry: false,
      refetchInterval: 1000,
      onSuccess: () => {
        setCurrentSession(currentSession);
      },
    });

  const useReleaseSessionMutation = () =>
    useMutation<
      ReleaseBrowserSessionResponse,
      ReleaseBrowserSessionsError,
      string
    >({
      mutationFn: async (id: string) => {
        const { error, data } = await releaseBrowserSession({
          path: {
            sessionId: id,
          },
        });
        if (error) {
          throw error;
        }
        queryClient.refetchQueries({ queryKey: ["session", id] });
        queryClient.invalidateQueries({ queryKey: ["sessionLogs", id] });
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["sessions"] });
      },
    });

  const useScreenshot = () =>
    useMutation<
      ScreenshotResponse2,
      ScreenshotError,
      { url: string }
    >({
      mutationFn: async ({ url }) => {
        const { error, data } = await screenshot({
          body: {
            url,
          },
        });
        if (error) {
          throw error;
        }
        return data;
      },
    });

  const useChatMutation = () =>
    useMutation<ChatResponse, ChatError, ChatData["body"]>({
      mutationFn: async (body) => {
        const { error, data } = await chat({
          body,
        });
        if (error) {
          throw error;
        }
        return data;
      },
    });

  const useAgenticTaskMutation = () =>
    useMutation<
      AgenticTaskResponse,
      AgenticTaskError,
      { sessionId: string }
    >({
      mutationFn: async ({ sessionId }) => {
        const { error, data } = await agenticTask({
          path: {
            sessionId,
          },
        });
        if (error) {
          throw error;
        }
        return data;
      },
    });

  const contextValue = {
    currentSession,
    useSession,
    useReleaseSessionMutation,
    useScreenshot,
    useChatMutation,
    useAgenticTaskMutation,
  };

  return (
    <SessionsContext.Provider value={contextValue}>
      {children}
    </SessionsContext.Provider>
  );
}

const useChatMutation = () =>
  useMutation<ChatResponse, ChatError, ChatData["body"]>({
    mutationFn: async (body) => {
      const { error, data } = await chat({
        body,
      });
      if (error) {
        throw error;
      }
      return data;
    },
  });
