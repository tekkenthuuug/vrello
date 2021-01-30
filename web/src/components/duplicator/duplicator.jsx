import React from 'react';

const Duplicator = ({
  numberOfDuplicates = 1,
  children,
  Component,
  componentProps,
}) => {
  const duplicates = [];

  for (let i = 0; i < numberOfDuplicates; i++) {
    duplicates.push(
      <Component key={i} {...componentProps}>
        {children}
      </Component>
    );
  }

  return duplicates;
};

export default Duplicator;
