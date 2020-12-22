import React, { useState } from 'react';
import {
  AddCardBtn,
  Buttons,
  CardCreatorContainer,
  CloseIcon,
  DescriptionInput,
  DescriptionTextArea,
  TextAreaContainer,
} from './element-creator.styles';

/* eslint react/display-name: 0 */
const ElementCreator = React.forwardRef(
  (
    { onClose, onSubmit, asTextArea, className, buttonText, ...inputProps },
    ref
  ) => {
    const [inputText, setInputText] = useState('');

    let textAreaHeight = null;

    if (inputText.length > 120) {
      textAreaHeight = '120px';
    } else if (inputText.length > 80) {
      textAreaHeight = '80px';
    }

    const onSubmitPreventDefault = e => {
      e.preventDefault();
      onSubmit(inputText);
    };

    const InputComponent = asTextArea ? DescriptionTextArea : DescriptionInput;

    return (
      <CardCreatorContainer
        className={className}
        onSubmit={onSubmitPreventDefault}
        ref={ref}
      >
        <TextAreaContainer>
          <InputComponent
            value={inputText}
            height={textAreaHeight}
            onChange={e => setInputText(e.target.value)}
            {...inputProps}
          />
        </TextAreaContainer>
        <Buttons>
          <AddCardBtn type='submit'>{buttonText}</AddCardBtn>
          <CloseIcon onClick={onClose} />
        </Buttons>
      </CardCreatorContainer>
    );
  }
);

export default ElementCreator;
