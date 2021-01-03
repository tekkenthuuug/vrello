import React, { useState, memo } from 'react';
import {
  AddCardBtn,
  Buttons,
  CardCreatorContainer,
  CloseIcon,
  DescriptionInput,
  DescriptionTextArea,
  FieldContainerContainer,
  StyledColorSelector,
} from './element-creator.styles';
import { BOARD_COLORS } from '../../utils/constants';

/* eslint react/display-name: 0 */
const ElementCreator = React.forwardRef(
  (
    {
      onClose,
      onSubmit,
      asTextArea,
      className,
      buttonText,
      withColor,
      ...inputProps
    },
    ref
  ) => {
    const [inputText, setInputText] = useState('');
    const [color, setColor] = useState(withColor ? BOARD_COLORS[0] : undefined);

    let textAreaHeight = null;

    if (inputText.length > 120) {
      textAreaHeight = '120px';
    } else if (inputText.length > 80) {
      textAreaHeight = '80px';
    }

    const onSubmitPreventDefault = e => {
      e.preventDefault();
      onSubmit({ text: inputText, color });
    };

    const InputComponent = asTextArea ? DescriptionTextArea : DescriptionInput;

    return (
      <CardCreatorContainer
        className={className}
        onSubmit={onSubmitPreventDefault}
        ref={ref}
      >
        <FieldContainerContainer>
          <InputComponent
            value={inputText}
            height={textAreaHeight}
            onChange={e => setInputText(e.target.value)}
            {...inputProps}
          />
        </FieldContainerContainer>
        {withColor && (
          <FieldContainerContainer>
            <StyledColorSelector value={color} onSelect={setColor} />
          </FieldContainerContainer>
        )}
        <Buttons>
          <AddCardBtn type='submit'>{buttonText}</AddCardBtn>
          <CloseIcon onClick={onClose} />
        </Buttons>
      </CardCreatorContainer>
    );
  }
);

export default memo(ElementCreator);
