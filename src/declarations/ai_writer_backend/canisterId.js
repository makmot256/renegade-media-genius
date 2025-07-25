import ids from "./canisterId.json";

export const canisterId =
    import.meta.env.MODE === "production" ? ids.ic : ids.local;
