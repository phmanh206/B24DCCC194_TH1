import { useEffect, useState } from 'react';

const Bai1 = () => {
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [guess, setGuess] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [count, setCount] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  // Sinh số ngẫu nhiên khi load trang
  useEffect(() => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
  }, []);

  // Xử lý đoán số
  const handleGuess = () => {
    if (gameOver) return;

    const num = Number(guess);
    const newCount = count + 1;
    setCount(newCount);

    if (num < targetNumber) {
      setMessage('Bạn đoán quá thấp!');
    } else if (num > targetNumber) {
      setMessage('Bạn đoán quá cao!');
    } else {
      setMessage('Chúc mừng! Bạn đã đoán đúng!');
      setGameOver(true);
      return;
    }

    if (newCount === 10) {
      setMessage(`Bạn đã hết lượt! Số đúng là ${targetNumber}`);
      setGameOver(true);
    }

    setGuess('');
  };

  return (
    <div>
      <h2>Game đoán số</h2>
      <p>Đoán số từ 1 đến 100 (tối đa 10 lượt)</p>

      <input
        type="number"
        value={guess}
        disabled={gameOver}
        onChange={(e) => setGuess(e.target.value)}
      />

      <button onClick={handleGuess} disabled={gameOver || !guess}>
        Đoán
      </button>

      <p>Lượt: {count}/10</p>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Bai1;
