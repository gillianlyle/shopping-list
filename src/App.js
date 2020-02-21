import React, {useReducer, useRef} from 'react';

function App() {

  const inputRef = useRef(); //reference to a form input, so we can extract its value
  const [items, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'add':
      //returns new array that includes all the old elements, plus the new one at the end
      return [
        ...state,
        {
          id: state.length,
          name: action.name
        }
      ];
      case 'remove':
      //keep everything except the one we want to remove
      return state.filter((_, index) => index != action.index);
      
      default:
        return state;
    }
  }, []);

  function handleSubmit(e){
    e.preventDefault(); //prevent full load page
    dispatch({
        type: 'add',
        name: inputRef.current.value
    });
    inputRef.current.value= ''; //clear input after item added
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input ref={inputRef} />
      </form>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name}
            <button onClick={()=> dispatch({type: 'remove', index})} > x</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
