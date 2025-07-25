import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory, canisterId } from "@/declarations/ai_writer_backend";
import { AuthClient } from "@dfinity/auth-client";

export const createActorWithIdentity = async (): Promise<any> => {
    const authClient = await AuthClient.create();
    const identity = authClient.getIdentity();

    const agent = new HttpAgent({ identity });
    return Actor.createActor(idlFactory, {
        agent,
        canisterId,
    });
};
