import { createClient } from "@/utils/supabase/server";

export default async function Footer() {

  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

    return (
        <footer className="footer footer-center bg-base-300 text-base-content p-8 bg-transparent">
  <aside>
  {user && (
       
          <div className="flex space-x-4 items-center">
            <a target="_blank" href='https://insigh.to/b/challenger' className="md:hidden">
                <button className="btn btn-ghost text-xs md:text-md">
                    Feedback?
                </button>
            </a>
          </div>
   
      )}
  </aside>
</footer>
    );
}