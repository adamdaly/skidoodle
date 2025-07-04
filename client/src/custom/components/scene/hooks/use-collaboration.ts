import { useCallback, useEffect, useMemo, useState } from "react";
import {
  gql,
  useSubscription,
  useMutation,
  useQuery,
  OnDataOptions,
} from "@apollo/client";
import { useUser } from "@/custom/state/user";
import { debounce } from "@/custom/utils/debounce";
import { base64ToBlob } from "@/custom/utils/convert-base64-to-blob";
import { LayerTypes } from "../types";
import { Shared } from "./use-shared";

type Session = {
  sessionid: string;
  frameid: number;
  email: string;
  color: string;
};

type SubscriptionSessionsData = {
  sessions: Session[];
};

type QuerySessionsData = {
  getSessions: Session[];
};

type SessionsVariables = {
  sessionid?: string;
};

type ParentSessionMutation = {
  createParentSession: {
    parentSessionId: string;
  };
};

type ParentSessionMutationVariables = {
  sceneid: number;
  email: string;
  frameid: number | null;
};

type UpdateSessionMutation = {
  updateSession: {
    id: string;
    frames: {
      sessionid: string;
      frameid: number;
    }[];
  };
};

type UpdateSessionMutationVariables = {
  parentSessionId?: string;
  childSessionId?: string;
  frameid: number | null;
};

type FrameSelection = {
  sessionid: string;
  frameid: number;
}[];

type SubscriptionFrameSelection = {
  frameSelection: FrameSelection;
};

type QueryFrameSelection = {
  getFrameSelection: FrameSelection;
};

type FrameSelectionVariables = {
  sessionid?: string;
};

type SubscriptionPaint = {
  subscriptionPaint: {
    sessionid: string;
    frameid: number;
    data: string;
  };
};

type SubscriptionPaintVariables = {
  sessionid?: string;
};

export const useCollaboration = ({
  scene,
  selected,
  frame,
  setFrameById,
  collabSession,
}: Shared) => {
  const user = useUser();

  const [createParentSession, parentSessionState] = useMutation<
    ParentSessionMutation,
    ParentSessionMutationVariables
  >(
    gql`
      mutation CreateParentSession(
        $email: String!
        $sceneid: Int!
        $frameid: Int!
      ) {
        createParentSession(
          email: $email
          sceneid: $sceneid
          frameid: $frameid
        ) {
          parentSessionId
        }
      }
    `,
    {
      variables: {
        sceneid: scene.id,
        email: user.state === "hasData" ? user?.data.username : "",
        frameid: selected,
      },
    }
  );

  const [storedParentSessionId, setStoredParentSessionId] = useState<
    string | undefined
  >(undefined);

  const updatedParentSessionId =
    parentSessionState.data?.createParentSession.parentSessionId ??
    collabSession?.parentSessionId;

  const parentSessionId = updatedParentSessionId ?? storedParentSessionId;

  const [storedChildSessionId, setStoredChildSessionId] = useState<
    string | undefined
  >(undefined);

  const updatedChildSessionId =
    parentSessionState.data?.createParentSession.parentSessionId ??
    collabSession?.sessionid;

  const childSessionId = updatedChildSessionId ?? storedChildSessionId;

  useEffect(() => {
    const currentStoredParentSessionId = localStorage.getItem(
      "shidoodle.collab.parentSessionId"
    );
    const currentStoredChildSessionId = localStorage.getItem(
      "shidoodle.collab.childSessionId"
    );
    if (currentStoredParentSessionId) {
      setStoredParentSessionId(currentStoredParentSessionId);
    }
    if (currentStoredChildSessionId) {
      setStoredChildSessionId(currentStoredChildSessionId);
    }
  }, []);

  useEffect(() => {
    if (parentSessionId) {
      localStorage.setItem("shidoodle.collab.parentSessionId", parentSessionId);
    }
    if (childSessionId) {
      localStorage.setItem("shidoodle.collab.childSessionId", childSessionId);
    }
  }, [parentSessionId, childSessionId]);

  console.log(parentSessionId);

  const [createInvite] = useMutation(
    gql`
      mutation CreateInvite($parentSessionId: String!, $email: String!) {
        createInvite(parentSessionId: $parentSessionId, email: $email) {
          id
        }
      }
    `,
    {
      variables: {
        parentSessionId,
      },
    }
  );

  const [updateSession] = useMutation<
    UpdateSessionMutation,
    UpdateSessionMutationVariables
  >(
    gql`
      mutation UpdateSession(
        $parentSessionId: String!
        $childSessionId: String!
        $frameid: Int!
      ) {
        updateSession(
          parentSessionId: $parentSessionId
          childSessionId: $childSessionId
          frameid: $frameid
        ) {
          sessionid
          frames {
            frameid
            sessionid
          }
        }
      }
    `,
    {
      variables: {
        parentSessionId,
        childSessionId,
        frameid: selected,
      },
    }
  );

  useEffect(() => {
    if (parentSessionId && childSessionId && selected) {
      updateSession();
    }
  }, [updateSession, selected]);

  const subscriptionSessions = useSubscription<
    SubscriptionSessionsData,
    SessionsVariables
  >(
    gql`
      subscription Session($sessionid: String!) {
        sessions(sessionid: $sessionid) {
          sessionid
          email
          color
        }
      }
    `,
    {
      variables: {
        sessionid: parentSessionId,
      },
      skip: !parentSessionId,
    }
  );

  const querySessions = useQuery<QuerySessionsData, SessionsVariables>(
    gql`
      query GetSessions($sessionid: String!) {
        getSessions(sessionid: $sessionid) {
          sessionid
          parentSessionId
          email
          color
        }
      }
    `,
    {
      variables: {
        sessionid: parentSessionId,
      },
      skip: !parentSessionId,
    }
  );

  const subscriptionFrameSelection = useSubscription<
    SubscriptionFrameSelection,
    FrameSelectionVariables
  >(
    gql`
      subscription FrameSelection($sessionid: String!) {
        frameSelection(sessionid: $sessionid) {
          sessionid
          frameid
        }
      }
    `,
    {
      variables: {
        sessionid: parentSessionId,
      },
      skip: !parentSessionId,
    }
  );

  const queryFrameSelection = useQuery<
    QueryFrameSelection,
    FrameSelectionVariables
  >(
    gql`
      query GetFrameSelection($sessionid: String!) {
        getFrameSelection(sessionid: $sessionid) {
          sessionid
          frameid
        }
      }
    `,
    {
      variables: {
        sessionid: parentSessionId,
      },
      skip: !parentSessionId,
    }
  );

  const [mutationPaint] = useMutation(gql`
    mutation MutationPaint(
      $sessionid: String!
      $frameid: Int!
      $data: String!
    ) {
      mutationPaint(sessionid: $sessionid, frameid: $frameid, data: $data) {
        sessionid
        frameid
        data
      }
    }
  `);

  const debouncedMutationPaint = useMemo(
    () => debounce(mutationPaint),
    [mutationPaint]
  );

  useEffect(() => {
    if (parentSessionId && frame?.data) {
      debouncedMutationPaint({
        variables: {
          sessionid: parentSessionId,
          frameid: selected,
          data: frame.data,
        },
      });
    }
  }, [frame?.data]);

  const onSubscriptionPaint = useCallback(
    (message: OnDataOptions<SubscriptionPaint>) => {
      const data = message.data.data?.subscriptionPaint;

      if (data && selected && data.frameid !== selected) {
        setFrameById(data.frameid, {
          data: data.data,
          layers: [
            {
              data: base64ToBlob(data.data),
              type: LayerTypes.draw,
            },
          ],
          isDirty: true,
        });
      }
    },
    [selected, setFrameById]
  );

  useSubscription<SubscriptionPaint, SubscriptionPaintVariables>(
    gql`
      subscription SubscriptionPaint($sessionid: String!) {
        subscriptionPaint(sessionid: $sessionid) {
          sessionid
          frameid
          data
        }
      }
    `,
    {
      variables: {
        sessionid: parentSessionId,
      },
      skip: !parentSessionId,
      onData: onSubscriptionPaint,
    }
  );

  return {
    sessions:
      subscriptionSessions.data?.sessions ??
      querySessions.data?.getSessions ??
      [],
    selectedFrames:
      subscriptionFrameSelection.data?.frameSelection ??
      queryFrameSelection.data?.getFrameSelection ??
      [],
    createParentSession,
    parentSessionState,
    createInvite,
  };
};
