import { useEffect, useState } from 'react';

// Interface mô tả 1 công việc trong todo list
interface Todo {
  id: number;
  title: string;
}

const TodoList = () => {
  // State lưu danh sách các công việc
  const [todos, setTodos] = useState<Todo[]>([]);

  // State lưu nội dung input khi thêm công việc mới
  const [newTodo, setNewTodo] = useState<string>('');

  // State dùng cho chức năng chỉnh sửa
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState<string>('');

  // Khi load trang thì lấy dữ liệu todo từ localStorage (nếu có)
  useEffect(() => {
    const data = localStorage.getItem('todos');
    if (data) {
      setTodos(JSON.parse(data));
    }
  }, []);

  // Mỗi lần danh sách todo thay đổi thì lưu lại vào localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Hàm thêm công việc mới
  const addTodo = () => {
    if (!newTodo.trim()) return;

    const todo: Todo = {
      id: Date.now(), // dùng timestamp làm id cho đơn giản
      title: newTodo,
    };

    setTodos([...todos, todo]);
    setNewTodo(''); // reset input sau khi thêm
  };

  // Hàm xóa công việc theo id
  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Bắt đầu chỉnh sửa 1 công việc
  const startEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditingTitle(todo.title);
  };

  // Lưu lại nội dung sau khi chỉnh sửa
  const saveEdit = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, title: editingTitle } : todo
      )
    );
    setEditingId(null);
    setEditingTitle('');
  };

  return (
    <div>
      <h2>Todo List</h2>

      {/* Input thêm công việc */}
      <input
        type="text"
        placeholder="Nhập công việc..."
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Thêm</button>

      {/* Danh sách công việc */}
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {editingId === todo.id ? (
              <>
                {/* Giao diện khi đang chỉnh sửa */}
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                />
                <button onClick={() => saveEdit(todo.id)}>Lưu</button>
                <button onClick={() => setEditingId(null)}>Hủy</button>
              </>
            ) : (
              <>
                {/* Hiển thị bình thường */}
                <span>{todo.title}</span>
                <button onClick={() => startEdit(todo)}>Sửa</button>
                <button onClick={() => deleteTodo(todo.id)}>Xóa</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
