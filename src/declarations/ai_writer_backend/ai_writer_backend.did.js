export const idlFactory = ({ IDL }) => {
  const Time = IDL.Int;
  const ContentEntry = IDL.Record({
    'id' : IDL.Nat,
    'cid' : IDL.Text,
    'contentType' : IDL.Text,
    'owner' : IDL.Principal,
    'createdAt' : Time,
    'tone' : IDL.Text,
    'prompt' : IDL.Text,
  });
  return IDL.Service({
    'createContent' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [IDL.Nat],
        [],
      ),
    'getContent' : IDL.Func([IDL.Nat], [IDL.Opt(ContentEntry)], ['query']),
    'listByOwner' : IDL.Func(
        [IDL.Principal],
        [IDL.Vec(ContentEntry)],
        ['query'],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
