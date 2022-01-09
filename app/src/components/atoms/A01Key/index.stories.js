import React from 'react';

import A01Key from '.';

export default {
    title: 'Atom/A01Key',
    component: A01Key,
    argTypes: {},
};
  
const Template = (args) => <A01Key {...args} />;
  
export const Default = Template.bind({});
Default.args = {
    label: 'B',
    onClick: () => console.log('PRESSED', 'B'),
};