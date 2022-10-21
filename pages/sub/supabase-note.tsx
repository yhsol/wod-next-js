import { supabase } from "../../utils/supabase";

type DynamicObject = { title: string; description: string };

type SupabaseNote = {
  created_at: string;
  description: string;
  "dynamic-object": DynamicObject;
  id: number;
  title: string;
};

type Props = { supabaseNotes: SupabaseNote[] };

const Note = ({ supabaseNotes }: Props) => {
  return (
    <div>
      <h1>SupabaseNote</h1>
      <div>
        {supabaseNotes.map((note) => (
          <div key={note.id}>{JSON.stringify(note)}</div>
        ))}
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const { data } = await supabase.from("supabase-note").select("*");

  return {
    props: {
      supabaseNotes: data as SupabaseNote[],
    },
  };
};

export default Note;
