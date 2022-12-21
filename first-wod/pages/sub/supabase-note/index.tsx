import Link from "next/link";
import { supabase } from "../../../utils/supabase";

type DynamicObject = { title: string; description: string };

export type SupabaseNote = {
  created_at: string;
  description: string;
  "dynamic-object": DynamicObject;
  id: number;
  title: string;
};

type Props = { supabaseNotes: SupabaseNote[] };

const Notes = ({ supabaseNotes }: Props) => {
  return (
    <div>
      <h1>SupabaseNote</h1>
      <div className="w-full max-w-3xl mx-auto my-16 px-2 cursor-pointer">
        {supabaseNotes.map((note) => (
          <Link key={note.id} href={`/sub/supabase-note/${note.id}`}>
            <a className="flex p-8 h-40 mb-4 rounded shadow text-xl">
              {note.title}
            </a>
          </Link>
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

export default Notes;
