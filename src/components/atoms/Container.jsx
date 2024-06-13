import React from 'react';

export default function Container({ children, className }) {
  let containerStyle = 'px-[15px] mx-auto w-full sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1250px]';
  containerStyle += ` ${className}`;

  return <div className={containerStyle}>{children}</div>;
}
