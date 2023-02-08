import { useState } from 'react';
import { Check, Trash } from 'phosphor-react';

import styles from './Task.module.css';

interface TaskProps {
  task: Task;
  index: number;
  handleDeleteTask: (index: number) => void;
  handleTaskCompleted: (index: number) => void;
}

interface Task {
  task: string;
}

export function Task({ task, index, handleDeleteTask, handleTaskCompleted }: TaskProps) {
  const [completed, setCompleted] = useState(false);

  return (
    <>
      <div className={styles.Tasks}>
        <button
          className={`${styles.Check} ${completed ? styles.clicked : ''}`}
          onClick={() => {
            setCompleted(!completed);
            handleTaskCompleted(index);
          }}
        >
          {completed ? <Check size={21} color={'white'}/> : ' '}
        </button>
        <p className={completed ? styles.Completed : ''}>{task.task}</p>
        <button
          title="Delete task"
          className={styles.Trash}
          onClick={() => handleDeleteTask(index)}
        >
          <Trash size={24} color={'#808080'} />
        </button>
      </div>
    </>
  );
}
