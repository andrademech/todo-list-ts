import { useState, useEffect, ChangeEvent, InvalidEvent, KeyboardEvent, SyntheticEvent, FormEvent } from 'react';
import { Clipboard } from 'phosphor-react';

//Styles
import styles from './Tasks.module.css';

//Components
import { Button } from './Button';
import { Task } from './Task';

interface Task {
  task: string;
  completed: boolean;
}

export function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState<string>('');
  const [completedTasks, setCompletedTasks] = useState<number>(0);

  const handleCreateNewComment = (e: FormEvent) => {
    e.preventDefault();
    setTasks([...tasks, { task: newTaskText, completed: false }]);
    setNewTaskText('');

    console.log('Task created successfully! :D');
  };

  const handleNewTaskChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.target.setCustomValidity('');
    setNewTaskText(e.target.value);
  };

  const handleNewTaskInvalid = (e: InvalidEvent<HTMLTextAreaElement>) => {
    console.log(e.target.setCustomValidity('Este campo é obrigatório.'));
  };

  const handleDeleteTask = (index: number) => {
    setTasks(tasks.filter((task, i) => i !== index));

    console.log('Task removed successfully! :D');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      handleCreateNewComment(e);
    }
  };

  const handleTaskCompleted = (index: number) => {
    setTasks(
      tasks.map((task, i) => {
        if (i === index) {
          if (!task.completed) {
            setCompletedTasks(completedTasks + 1);
          }
          return { ...task, completed: !task.completed };
        }
        return task;
      }),
    );
  };

  const completed = tasks.filter((task) => task.completed).length;

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleCreateNewComment}>
        <textarea
          className={styles.textarea}
          placeholder="Adicione uma nova tarefa"
          value={newTaskText}
          onChange={handleNewTaskChange}
          onInvalid={handleNewTaskInvalid}
          onKeyDown={(e) => handleKeyDown(e)}
          required
        />
        <Button handleCreateNewComment={handleCreateNewComment} />
      </form>

      <header className={styles.header}>
        <h4>
          Tarefas criadas
          <span>{tasks.length || 0}</span>
        </h4>
        <h4>
          Tarefas concluídas
          <span>
            {completed} de {tasks.length}
          </span>
        </h4>
      </header>

      {tasks.length ? (
        tasks.map((task, index) => {
          return (
            <Task
              key={index}
              task={task}
              handleDeleteTask={handleDeleteTask}
              handleTaskCompleted={handleTaskCompleted}
              index={index}
            />
          );
        })
      ) : (
        <div className={styles.noTasks}>
          <Clipboard size={56} />
          <h3>Você ainda não tem tarefas cadastradas</h3>
          <span>Crie tarefas e organize seus itens a fazer</span>
        </div>
      )}
    </div>
  );
}
