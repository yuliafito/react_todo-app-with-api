import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todos: Todo[];
  onDelete: (todoId: number) => void;
  loadingTodosIDs: number[];
  tempTodo: Todo | null;
  editingId: number | null;
  setEditingId: (id: number | null) => void;
  handleEditTodo: (todo: Todo) => void;
  onToggleStatus: (todo: Todo) => void;
  inputRef: React.RefObject<HTMLInputElement>;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onDelete,
  loadingTodosIDs,
  tempTodo,
  editingId,
  setEditingId,
  handleEditTodo,
  inputRef,
  onToggleStatus = () => {},
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          isLoading={loadingTodosIDs.includes(todo.id)}
          editingId={editingId}
          setEditingId={setEditingId}
          handleEditTodo={handleEditTodo}
          inputRef={inputRef}
          onToggleStatus={onToggleStatus}
        />
      ))}

      {tempTodo && <TodoItem todo={tempTodo} isLoading inputRef={inputRef} />}
    </section>
  );
};
