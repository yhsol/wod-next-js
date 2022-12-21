import { GetStaticPaths, GetStaticProps } from "next";
import { supabase } from "../../../utils/supabase";

import type { SupabaseNote } from ".";

type Props = {
  note: SupabaseNote;
};

const Note = ({ note }: Props) => {
  return (
    <div className="w-full max-w-3xl mx-auto py-16 px-8">
      <h1 className="text-3xl mb-6">{note.title}</h1>
      <p>{note.description}</p>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await supabase.from("supabase-note").select("id");

  const paths =
    data?.map(({ id }) => ({ params: { noteId: id.toString() } })) || [];

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data: note } = await supabase
    .from("supabase-note")
    .select("*")
    .eq("id", params?.noteId)
    .single();

  return { props: { note } };
};

export default Note;
