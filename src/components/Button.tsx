import { PlusCircle } from 'phosphor-react';
import { FormEvent } from 'react';
import styles from './Button.module.css';


interface ButtonProps {
  handleCreateNewComment: (e: FormEvent) => void;
}

export function Button({ handleCreateNewComment }: ButtonProps) {
  return (
    <button className={styles.button} onClick={handleCreateNewComment}>
      Criar
      <PlusCircle size={20} />
    </button>
  );
}
