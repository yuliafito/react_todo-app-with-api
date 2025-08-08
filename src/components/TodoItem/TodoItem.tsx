/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useEffect, useState } from 'react';

type Props = {
  todo: Todo;
  onDelete?: (todoId: number) => void;
  isLoading?: boolean;
  editingId?: number | null;
  setEditingId?: (id: number | null) => void;
  handleEditTodo?: (todo: Todo) => void;
  onToggleStatus?: (todo: Todo) => void;
  inputRef: React.RefObject<HTMLInputElement>;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  onDelete = () => {},
  isLoading = false,
  editingId,
  setEditingId = () => {},
  handleEditTodo = () => {},
  onToggleStatus = () => {},
  inputRef,
}) => {
  const [editedTitle, setEditedTitle] = useState(todo.title);

  useEffect(() => {
    if (editingId === todo.id) {
      inputRef.current?.focus();
    }
  }, [editingId, inputRef, todo.id]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleEditTodo({ ...todo, title: editedTitle });
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      setEditedTitle(todo.title);
      setEditingId(null);
    }
  };

  const submitEditedTitle = () => {
    handleEditTodo({ ...todo, title: editedTitle });
  };

  return (
    <>
      <div
        data-cy="Todo"
        className={classNames('todo', {
          completed: todo.completed,
        })}
      >
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            checked={todo.completed}
            disabled={isLoading}
            onChange={() => onToggleStatus(todo)}
          />
        </label>

        {editingId === todo.id ? (
          <form onSubmit={submitEditedTitle}>
            <input
              ref={inputRef}
              data-cy="TodoTitleField"
              type="text"
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              value={editedTitle}
              onBlur={submitEditedTitle}
              onChange={e => setEditedTitle(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </form>
        ) : (
          <>
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() => setEditingId(todo.id)}
            >
              {todo.title}
            </span>

            {/* Remove button appears only on hover */}
            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={() => onDelete(todo.id)}
            >
              ×
            </button>
          </>
        )}

        {/* overlay will cover the todo while it is being deleted or updated */}
        <div
          data-cy="TodoLoader"
          className={classNames('modal overlay', {
            'is-active': isLoading,
          })}
        >
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div>
    </>
  );
};
