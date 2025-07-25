import { createActorWithIdentity } from "@/lib/actor/aiWriterActor";
import { AuthClient } from "@dfinity/auth-client";

export const fetchUserContent = async () => {
    const actor = await createActorWithIdentity();
    const authClient = await AuthClient.create();
    const principal = authClient.getIdentity().getPrincipal();

    const posts = await actor.listByOwner(principal); // ✅ matches your canister
    return posts;
};
