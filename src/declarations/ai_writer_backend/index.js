import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "./ai_writer_backend.did.js";
import { canisterId } from "./canisterId.js";

export { idlFactory, canisterId };

export const createActor = (canisterId, options = {}) => {
  const agent = options.agent || new HttpAgent({ ...options.agentOptions });

  // Vite-compatible root key fetch
  if (import.meta.env.MODE !== "production") {
    agent.fetchRootKey().catch(err => {
      console.warn("Unable to fetch root key. Is your local replica running?");
      console.error(err);
    });
  }

  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...(options.actorOptions || {}),
  });
};

export const ai_writer_backend = createActor(canisterId);
