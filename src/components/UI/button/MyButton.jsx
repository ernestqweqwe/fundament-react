import React from 'react';
import classes from './MyButton.module.css';

function MyButton({ children, ...props }) {
  return (
    <button {...props} className={classes.myBtn}>
      {children}
    </button>
  );
}
// children вытягивает содержимое нашей кнопки(которая прописана в APP(надпись удалить)), конструкция ... props
// позваляет передавать пропсы в APP и они буду  добавляться к нашей кнопке здесь
// classes.myBtn - задание стилей через модули

export default MyButton;
