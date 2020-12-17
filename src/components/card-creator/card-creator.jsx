import React, { useState } from 'react';
import {
  AddCardBtn,
  CardCreatorContainer,
  DescriptionTextArea,
  TextAreaContainer,
  Buttons,
  CloseIcon,
} from './card-creator.styles';

/* eslint react/display-name: 0 */
const CardCreator = React.forwardRef(({ onClose, onSubmit }, ref) => {
  const [inputText, setInputText] = useState('');

  let textAreaHeight = null;

  if (inputText.length > 120) {
    textAreaHeight = '120px';
  } else if (inputText.length > 80) {
    textAreaHeight = '80px';
  }

  const onSubmitPreventDefault = e => {
    e.preventDefault();
    onSubmit({ description: inputText });
  };

  return (
    <CardCreatorContainer onSubmit={onSubmitPreventDefault} ref={ref}>
      <TextAreaContainer>
        <DescriptionTextArea
          name='description'
          value={inputText}
          height={textAreaHeight}
          onChange={e => setInputText(e.target.value)}
          placeholder='Type card description here'
        />
      </TextAreaContainer>
      <Buttons>
        <AddCardBtn type='submit'>Add card</AddCardBtn>
        <CloseIcon onClick={onClose} />
      </Buttons>
    </CardCreatorContainer>
  );
});

export default CardCreator;
