import Link from "next/link";
import TaskCompleted from "../../components/TaskCompleted";
import { getTasks } from "../../components/Tasks";
import styles from "../../styles/Tasks.module.css";
import axios from "axios";

export default function Tasks({ nr, tasksLength, stations }) {
  const task = getTasks({ stations }).find((task) => task.id === nr);
  const isCompleted =
    typeof task.isCompleted === "function" ? task.isCompleted() : 0;
  return (
    <TaskCompleted isCompleted={isCompleted}>
      <div>
        <div className={styles.taskContainer}>{task.Component} </div>
        <div className={styles.buttonContainer}>
          {nr > 1 && (
            <Link href={`/tasks/${nr - 1}`} passHref>
              <a className={styles.button}>Forrige oppgave</a>
            </Link>
          )}
          {nr === 1 && (
            <Link href={`/`} passHref>
              <a className={styles.button}>Til oppgaveoversikten</a>
            </Link>
          )}
          {nr !== tasksLength && (
            <Link href={`/tasks/${nr + 1}`} passHref>
              <a className={styles.button}>Neste oppgave</a>
            </Link>
          )}
        </div>
      </div>
    </TaskCompleted>
  );
}

export async function getServerSideProps({ params }) {
  const tasks = getTasks();
  const task = tasks.find((task) => task.id === parseInt(params.nr));
  const tasksLength = tasks.length;
  const nr = parseInt(params.nr);
  let stations = [];

  /**Oppgave 5: Vis tilgjengelig stasjoner */
  if (nr === 3 || nr === 4 || nr === 5 || nr === 6 || nr === 7) {
    //TODO: Her skal du skrive et GET-kall og returnere korrekt data.
  }

  return {
    props: { pageTitle: task.title, nr, tasksLength, stations }, // will be passed to the page component as props
  };
}
