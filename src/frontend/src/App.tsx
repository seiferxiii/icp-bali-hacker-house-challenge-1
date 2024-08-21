import { useEffect, useState } from 'react';

function App() {
  const [boardData, setBoardData] = useState(null as any)

  useEffect(()=>{
    if(boardData != null) return;

    fetch(`${import.meta.env.VITE_CANISTER_URL}/board`)
      .then(response => response.json()).then((json) => {
        setBoardData(json)
      });

  },[boardData])

  function handleSubmit(event: any) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const message = event.target.elements.message.value;
    fetch(`${import.meta.env.VITE_CANISTER_URL}/board/post`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        message
      })
    })
      .then(response => response.json()).then((json) => {
        setBoardData(null)
      });
  }

  return (
    <main>
      <center><strong>IC Proclamation</strong></center>
      <br />
      <br />
      <form action="#" onSubmit={handleSubmit}>
        <label htmlFor="name">Enter your name: &nbsp;</label>
        <input id="name" alt="Name" type="text" />

        <label htmlFor="message">Enter your message: &nbsp;</label>
        <input id="message" alt="Message" type="text" />

        <button type="submit">Proclaim!</button>
      </form>
      <section id="board">{boardData && boardData.map((x: any) => (<p><strong>{x.name}</strong>: {x.message} - {new Date(x.date_added).toLocaleString()}</p>))}</section>
    </main >
  );
}

export default App;
