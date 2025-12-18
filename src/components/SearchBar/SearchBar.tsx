import styles from "./SearchBar.module.css";
import toast from "react-hot-toast";


interface SearchBarProps {
  onSubmit : (movie : string) => Promise<void>;
}

async function submitAction (FormData : FormData, onSubmit : (query: string) => Promise<void>){
   
    const query = (FormData.get("query") as string).trim();
    
    if (query ===""){
 toast.error("Please enter your search query.");
    return;
    }
    onSubmit (query);
}


export  default function SearchBar({onSubmit}: SearchBarProps) {
  return ( 
  
  <header className={styles.header}>

    <div className={styles.container}>
  
      <a
        className={styles.link}
        href="https://www.themoviedb.org/"
        target="_blank"
        rel="noopener noreferrer"
      >
         Powered by TMDB {" "}
      </a>
  
      <form className={styles.form}
      action ={(formData: FormData) => submitAction(formData,onSubmit)}>

        <input
          className={styles.input}
          type="text"
          name="query"
          autoComplete="off"
          placeholder="Search movies..."
          autoFocus
        />

        <button className={styles.button} type="submit">
           Search {" "}
        </button>

      </form>

    </div>
  </header>);
}
